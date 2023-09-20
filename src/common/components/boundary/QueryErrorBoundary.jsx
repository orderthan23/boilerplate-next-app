import { IconIvory } from '@component/icon/IconIvory';
import COLORS from '@constants/colors';
import React from 'react';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';

export const DefaultErrorComponent = ({ resetErrorBoundary, message = '오류가 발생했습니다.' }) => {
	return (
		<div className="default_error_box">
			<IconIvory fill={COLORS.GRAY6} />
			<p style={{ whiteSpace: 'pre-line', textAlign: 'center' }}>{message}</p>
			<span
				onClick={(e) => {
					e.stopPropagation();
					resetErrorBoundary();
				}}
			>
				다시 시도
			</span>
		</div>
	);
};

export const BoxErrorComponent = ({ resetErrorBoundary }) => {
	return (
		<div>
			<DefaultErrorComponent resetErrorBoundary={resetErrorBoundary} />
		</div>
	);
};

const QueryErrorBoundary = ({ children, fallbackRender = DefaultErrorComponent }) => {
	const { reset } = useQueryErrorResetBoundary();
	return (
		<ErrorBoundary
			onReset={reset}
			fallbackRender={fallbackRender}
		>
			{children}
		</ErrorBoundary>
	);
};

export default QueryErrorBoundary;
