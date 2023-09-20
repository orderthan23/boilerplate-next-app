import CustomLogger from '@lib/console';
import CustomError from '@lib/error';
import FLAGS from '@constants/flags';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import { FileUploadAxios, GeneralAxios } from '@service/config/axios';
import { HTTP } from '@lib/constant';
import { useGlobalStoreAction } from '@store/global';
import fp from 'lodash/fp';
import { isDev } from '@lib/function/util';

export class HttpManager {
	static REQUEST = 'request';
	static RESPONSE = 'response';
	static RETRY_OPTION = { retries: 3, onRetry: HttpManager.onRetry };

	/**
	 * @description 요청(request) 전 무조건 해야하는 동작
	 * @param config axios 옵션 객체
	 * @returns {*}
	 */
	static beforeSend(config) {
		return config;
	}

	/**
	 * @description request 오류 요청을 보내기 전에 수행할 동작
	 * @param error
	 */
	static clientException(error) {
		CustomLogger.info('error:', error);
		Promise.reject(error);
	}

	/**
	 * @description response 데이터 1차 가공 및 데이터 검증
	 * @param response api 응답 결과
	 * @returns {*}
	 */
	static preHandle(response) {
		const { data, status } = response;
		HttpManager.searchError(data, status);
		return response?.data?.result;
	}

	/**
	 * @description response 상에 status가 200이나 에러인 경우 예외처리
	 * @param data
	 * @param status
	 */
	static searchError(data, status) {
		const { resCd, resMsg, error, result } = data;
		if (status !== 200) {
			throw new CustomError(isDev() ? error + '' + status : '오류가 발생했습니다.');
		}

		if (resCd.toString() === CustomError.RESULT_CODE.FAILED_LOGIN) {
			throw new CustomError(CustomError.ERROR_MSG.FAILED_LOGIN, false, () => (location.href = '/login.do'));
		} else if (resCd.toString() !== HTTP.RESULT_CODE.SUCCESS) {
			throw new CustomError(resMsg, false);
		}

		if (result && result?.actFlag === FLAGS.ACT_FLAG.ERROR) {
			throw new CustomError(result.resMsg);
		}

		if (result && result?.actFlag === FLAGS.ACT_FLAG.WARNING) {
			CustomLogger.error(result?.resMsg);
		}
	}

	//인터셉터 바인드
	static interceptorBind(axios, type = HttpManager.REQUEST, action = []) {
		return axios.interceptors?.[type]?.use(...action);
	}

	//인터셉터 해제
	static interceptorClear(type = HttpManager.REQUEST, interceptor) {
		return axios.interceptors?.[type]?.eject(interceptor);
	}

	/**
	 * @description : 통합 APICall
	 * @param customAxios axios 종류 기본 memberAxios
	 * @param method HTTP 통신 타입 미기재 시 GET 기본
	 * @param url api url
	 * @param data 요청 데이터(get : param, post : body)
	 * @param useCache api 캐싱 사용여부
	 * @returns {*}
	 * @constructor
	 */
	static send = ({ customAxios = GeneralAxios, method = HTTP.METHOD.GET, url, data = {}, useCache = false, useLoading = false }) => {
		const config = { url, method };

		//todo 로딩 스피너 개선 예정 mutation api만 스피너 돌도록
		if (useLoading) {
			// eslint-disable-next-line react-hooks/rules-of-hooks
			useGlobalStoreAction().showLoading();
		}

		if (method === HTTP.METHOD.GET) {
			config.params = data;
			config.data = {};
		} else {
			config.data = data;
		}

		config.cache = useCache;

		return customAxios(config);
	};

	/**
	 * @param customAxios
	 * @param url
	 * @param data
	 * @returns {*}
	 */
	static sendFile({ customAxios = FileUploadAxios, url, data = {} }) {
		// eslint-disable-next-line react-hooks/rules-of-hooks
		useGlobalStoreAction().showLoading();
		const config = { url, method: HTTP.METHOD.POST };

		const formData = new FormData();
		fp.mapValues((value, key) => {
			formData.append(key, value);
		})(data);

		config.data = formData;

		return customAxios(config);
	}

	static onRetry(retryCount, error, requestConfig) {
		CustomLogger.warning(`${retryCount}회 째 재시도 중...`);
		CustomLogger.error(error.message);
		CustomLogger.info('requestConfig :', requestConfig);
	}

	static retryBind(targetAxios, retryOptions = HttpManager.RETRY_OPTION) {
		axiosRetry(targetAxios, retryOptions);
	}
}

export default class ServiceManager {
	//must override
	/**
	 * @abstract
	 * @type {string}
	 */
	static REQUEST_MAPPING = 'REQUEST_MAPPING_MUST_BE_OVERRIDE';

	/**
	 * @description API Request 생성 간소화
	 * @protected
	 * @param url
	 * @param method
	 * @param data
	 * @param isFileUpload
	 * @param useLoading
	 * @param useCache
	 * @returns {*}
	 */
	static createRequest(url, method, data, isFileUpload = false, useLoading = true, useCache = false) {
		const requestOption = {
			url: this.REQUEST_MAPPING + url,
			method,
			data,
			useCache,
			useLoading,
		};

		return isFileUpload ? HttpManager.sendFile(requestOption) : HttpManager.send(requestOption);
	}

	/**
	 * @description 별도의 axios configuration이 필요한 경우 사용하는 api request 생성
	 * @protected
	 * @param axios
	 * @param url
	 * @param method
	 * @param data
	 * @param isFileUpload
	 * @returns {*}
	 */
	static createOtherRequest(axios, url, method, data, isFileUpload = false) {
		const requestOption = {
			customAxios: axios,
			url: this.REQUEST_MAPPING + url,
			method,
			data,
		};
		return isFileUpload ? HttpManager.sendFile(requestOption) : HttpManager.send(requestOption);
	}
}
