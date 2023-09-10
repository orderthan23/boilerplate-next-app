class QueryUtils {
	static infinityQueryFormatter = (list, hasNext, currentPage) => {
		return {
			list,
			hasNext,
			currentPage,
		};
	};

	static extractListForInfinity = (data) => {
		return data?.pages?.reduce((accumulator, currentValue) => [...accumulator, ...(currentValue?.list ?? [])], []) ?? [];
	};
}

export default QueryUtils;
