import HighFunc from '@lib/function/hof';
import CustomError from '@lib/error';

export class QueryKeys {
	static EXAMPLE_QUERY_GROUP = ['EXAMPLE_QUERY_GROUP'];
	static PEOPLE_LIST_QUERY = [...QueryKeys.EXAMPLE_QUERY_GROUP, 'PEOPLE_LIST_QUERY'];
	static PERSON_QUERY = [...QueryKeys.EXAMPLE_QUERY_GROUP, 'PERSON_QUERY'];
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
