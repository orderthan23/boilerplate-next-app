import HighFunc from '@lib/function/hof';
import CustomError from '@lib/error';

export class QueryKeys {
	static TEST_QUERY = ['TEST_QUERY'];
}

export class QueryOptions {
	static DEFAULT_CACHE_TIME = 1000 * 60 * 60;
	static DEFAULT_STALE_TIME = 1000 * 60 * 60 * 3;
	static DEFAULT_MUTATION_OPTION = {
		onSuccess: HighFunc.emptyVoidFunction,
		onFailure: CustomError.handler,
		onSettled: HighFunc.emptyVoidFunction,
	};
}
