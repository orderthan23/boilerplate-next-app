import axios from 'axios';
import { cacheAdapterEnhancer } from 'axios-extensions';
import { HttpManager } from '@lib/service';
import { isDev } from '@function/util';

/**
 * @author 고종현
 * @version 0.0.2(2022.11.10)
 * @description : axios configuration
 */

// const devHeaders = isDev() ? { 'test-id': process.env.NEXT_PUBLIC_TEST_ID } : {};

//일반
export const GeneralAxios = axios.create({
	dataType: 'json',
	contentType: 'application/json; charset=UTF-8;',
	baseURL: `${process.env.NEXT_PUBLIC_API_PATH}`,
	validateStatus: false,
	headers: { 'Content-Encoding': 'gzip', },
	adapter: cacheAdapterEnhancer(axios.defaults.adapter, { enabledByDefault: false }),
});

//파일 업로드용
export const FileUploadAxios = axios.create({
	contentType: 'multipart/form-data',
	baseURL: `${process.env.NEXT_PUBLIC_API_PATH}`,
	validateStatus: false,
	headers: { 'Content-Encoding': 'gzip', },
});

//파일 다운로드용
export const FileDownloadAxios = axios.create({
	dataType: 'json',
	contentType: 'application/json; charset=UTF-8;',
	baseURL: `${process.env.NEXT_PUBLIC_API_PATH}`,
	responseType: 'blob',
	validateStatus: false,
});

//아무 설정도 없는 순수한 axios
export const PureAxios = axios.create();

export const axiosConfigInit = () => {
	//retry bind
	HttpManager.retryBind(GeneralAxios, HttpManager.RETRY_OPTION);
	HttpManager.retryBind(FileUploadAxios, HttpManager.RETRY_OPTION);
	HttpManager.retryBind(FileDownloadAxios, HttpManager.RETRY_OPTION);

	//API Request 인터셉터 설정
	const requestInterceptor = HttpManager.interceptorBind(GeneralAxios, HttpManager.REQUEST, [HttpManager.beforeSend, HttpManager.clientException]);
	const fileRequestInterceptor = HttpManager.interceptorBind(FileUploadAxios, HttpManager.REQUEST, [HttpManager.beforeSend, HttpManager.clientException]);

	//API Response 인터셉터 설정
	const responseInterceptor = HttpManager.interceptorBind(GeneralAxios, HttpManager.RESPONSE, [HttpManager.preHandle]);
	const fileResponseInterceptor = HttpManager.interceptorBind(FileUploadAxios, HttpManager.RESPONSE, [HttpManager.preHandle]);

	return {
		disconnectRequestInterceptor: () => HttpManager.interceptorClear(HttpManager.REQUEST, requestInterceptor),
		disconnectFileRequestInterceptor: () => HttpManager.interceptorClear(HttpManager.REQUEST, fileRequestInterceptor),
		disconnectResponseInterceptor: () => HttpManager.interceptorClear(HttpManager.RESPONSE, responseInterceptor),
		disconnectFileResponseInterceptor: () => HttpManager.interceptorClear(HttpManager.RESPONSE, fileResponseInterceptor),
	};
};

//API Interceptor 인터셉터 제거 해야 하는 경우 호출 함수
