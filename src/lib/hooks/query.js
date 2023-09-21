import { useGlobalStoreAction } from '@store/global';
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { QueryOptions } from '@constants/query';
import QueryUtils from '@lib/function/query';
import { useScrollDetectRef } from '@lib/hooks/common';
import CustomError from '@lib/error';
import { getHasNext } from '@lib/function/util';

export const useCustomInfinityQuery = (
	{ queryKey, queryFn, getNextPageParam = getHasNext, cacheTime = QueryOptions.DEFAULT_CACHE_TIME, staleTime = QueryOptions.DEFAULT_STALE_TIME },
	otherQueryOptions = {},
) => {
	const queryClient = useQueryClient();
	const { hideLoading } = useGlobalStoreAction();
	const { data, isSuccess, hasNextPage, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
		queryKey,
		queryFn,
		getNextPageParam,
		cacheTime,
		staleTime,
		...otherQueryOptions,
		onError: (error) => {
			CustomError.handler(error);
		},
		onSettled: (...param) => {
			otherQueryOptions?.onSettled?.(...param);
			hideLoading();
		},
	});

	const refreshQuery = () => {
		queryClient.invalidateQueries(queryKey);
	};

	const list = QueryUtils.extractListForInfinity(data);

	const scrollDetectRef = useScrollDetectRef(list, hasNextPage, fetchNextPage);

	const currentPage = data?.pageParams?.[(data?.pageParams?.length ?? 1) - 1] ?? 1;

	return {
		data,
		list,
		isSuccess,
		hasNextPage,
		fetchNextPage,
		isFetchingNextPage,
		refreshQuery,
		scrollDetectRef,
		currentPage,
	};
};
export const useCustomQuery = (options) => {
	const { hideLoading } = useGlobalStoreAction();

	return useQuery({
		...options,
		onError: (error) => {
			CustomError.handler(error);
		},
		onSettled: (...param) => {
			options?.onSettled?.(...param);
			hideLoading();
		},
	});
};

export const useCustomMutation = (options) => {
	const { hideLoading } = useGlobalStoreAction();
	return useMutation({
		...options,
		onError: (error) => {
			CustomError.handler(error);
		},
		onSettled: async (...param) => {
			options?.onSettled?.(...param);
			hideLoading();
		},
	});
};
