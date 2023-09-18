import CustomAlert from '@lib/alert';

/**
 * @author 고종현
 * @version 0.0.2(2022.11.07)
 */

/**
 * @description 아이 앨범용 커스텀 에러
 * @author 고종현
 */
export default class CustomError extends Error {
	static RESULT_CODE = {
		FAILED_LOGIN: 'E902',
	};
	static ERROR_MSG = {
		UNKNOWN: '알 수 없는 오류 발생',
		FAILED_LOGIN: '로그인이 필요한 서비스 입니다. 로그인페이지로 이동합니다.',
	};

	constructor(message = CustomError.ERROR_MSG.UNKNOWN, isInfo = false, callBack = () => null) {
		super(message);
		this.name = CustomError;
		this.isInfo = isInfo;
		this.message = message;
		this.callBack = callBack;
	}

	/**
	 * @description DiaryError 타입 확인02
	 *
	 *
	 *
	 * @param something 에러 객체
	 * @returns {boolean}
	 */
	static isCustomError(something) {
		return typeof something === 'object' && something instanceof CustomError;
	}

	/**
	 * @description 에러발생 시 발생할 기본 동작 핸들러
	 * @param error
	 */
	static handler(error) {
		if (this.isCustomError(error)) {
			error.printTrace();
			error.alert();
		} else {
			console.log(error);
		}
	}

	printTrace() {
		console.error(this.message);
	}

	alert() {
		if (this.isInfo) {
			CustomAlert.info(this.message, this.callBack);
		} else {
			CustomAlert.error(this.message, this.callBack);
		}
	}
}
