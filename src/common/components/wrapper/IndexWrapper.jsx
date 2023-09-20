import React from 'react';
import ViewportWrapper from '@component/wrapper/ViewportWrapper';
import AxiosWrapper from '@component/wrapper/AxiosWrapper';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryOptions } from '@constants/query';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			cacheTime: QueryOptions.DEFAULT_CACHE_TIME,
			staleTime: QueryOptions.DEFAULT_STALE_TIME,
		},
		mutations: {
			...QueryOptions.DEFAULT_MUTATION_OPTION,
		},
	},
});
const IndexWrapper = ({ children }) => {
	return (
		<ViewportWrapper>
			<AxiosWrapper>
				<QueryClientProvider client={queryClient}>
					{process.env.NEXT_PUBLIC_DEPLOY_MODE === 'local' && <ReactQueryDevtools initialIsOpen={false} />}
					{children}
				</QueryClientProvider>
			</AxiosWrapper>
		</ViewportWrapper>
	);
};

export default IndexWrapper;
