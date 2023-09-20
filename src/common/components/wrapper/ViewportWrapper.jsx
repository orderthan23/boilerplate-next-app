import { useEffect } from 'react';
import { setVH } from '@lib/function/util';

const ViewportWrapper = ({ children }) => {
	useEffect(() => {
		setVH();
		window.addEventListener('resize', setVH);

		return () => {
			window.removeEventListener('resize', setVH);
		};
	}, []);
	return children;
};

export default ViewportWrapper;
