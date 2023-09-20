import { useRouter } from 'next/router';
import { useEffect } from 'react';

export const GA_TRACKING_ID = 'G-EWJGXMMBJ4'; // 측정ID 설정: .env 파일로 관리해도된다.

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url) => {
	window.gtag('config', GA_TRACKING_ID, {
		page_path: url,
	});
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }) => {
	window.gtag('event', action, {
		event_category: category,
		event_label: label,
		value: value,
	});
};

export const useAnalytics = ({ action = '', category = '', label = '' }) => {
	const router = useRouter();
	useEffect(() => {
		const handleRouteChange = (url) => {
			pageview(url);
			event({
				action,
				category,
				label,
				value: location.pathname + location.search,
			});
		};
		router.events.on('routeChangeComplete', handleRouteChange);
		router.events.on('hashChangeComplete', handleRouteChange);
		return () => {
			router.events.off('routeChangeComplete', handleRouteChange);
			router.events.off('hashChangeComplete', handleRouteChange);
		};
	}, [router.events]);
};
