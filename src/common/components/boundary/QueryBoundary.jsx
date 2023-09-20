import QueryErrorBoundary, { DefaultErrorComponent } from '@component/boundary/QueryErrorBoundary';
import React, { Suspense } from 'react';

const QueryBoundary = ({ children, fallbackRender = DefaultErrorComponent, Skeleton = () => <></> }) => {
	return (
		<QueryErrorBoundary fallbackRender={fallbackRender}>
			<Suspense fallback={<Skeleton />}>{children}</Suspense>
		</QueryErrorBoundary>
	);
};

export default QueryBoundary;
