import CustomError from '@lib/error';

/**
 * @description 함수를 리턴하는 고차함수 모음
 * @author 고종현
 */
class HighFunc {
	static errorFallback(callback = () => {}, fallback = (error) => CustomError.handler(error)) {
		return async (...param) => {
			try {
				await callback(...param);
			} catch (error) {
				if (error instanceof Error) {
					fallback(error);
				}
			}
		};
	}

	static cleanUpPromise(promise) {
		return () => {
			Promise.reject(promise);
		};
	}

	static emptyVoidFunction() {
		return () => {};
	}

	static emptyReturnableFunction() {
		return () => null;
	}
}

export default HighFunc;
