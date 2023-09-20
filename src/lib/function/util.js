export const jsMediaQuery = (value, vw, max = 640) => {
	return vw > max ? value : vw * (value / max);
};

/**
 * @description 개발 모드에서만 동작하는 함수
 * @param {function} func - 개발 모드에서 실행할 함수
 */
export const runOnlyDev = (func) => {
	if (JSON.parse(process.env.NEXT_PUBLIC_DEV_MODE)) {
		func();
	}
};

export const isDev = () => process.env.NEXT_PUBLIC_DEPLOY_MODE === 'local';

export const refAnimate = (ref, animate, duration = 300, fill = 'forwards') => {
	if (ref !== null) {
		return ref.animate(animate, { duration, fill });
	}
};

// inner height 기준 100vh document style 설정
export const setVH = () => {
	const vh = window.innerHeight * 0.01;
	document.documentElement.style.setProperty('--vh', `${vh}px`);
};

export const getHasNext = (lastPage) => {
	return lastPage.hasNext ? lastPage.currentPage + 1 : undefined;
};
