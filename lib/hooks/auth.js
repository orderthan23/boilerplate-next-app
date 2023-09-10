import { useRouter } from 'next/router';
import CustomError from '@lib/error';

//특정 권한일 때 router.push 가능한 훅
export const usePrivateRouter = () => {
	const router = useRouter();
	//기본 값 지정
	return (url, filter, errorCode = 'MISSING_AUTH') => {
		try {
			if (filter) {
				router.push(url);
			} else {
				throw new CustomError(errorCode);
			}
		} catch (error) {
			CustomError.handler(error);
		}
	};
};
