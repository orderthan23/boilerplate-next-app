import { useZustandAction, zustandBuilder, zustandMultiSelector } from "@lib/zustand";

/**
 * @description 아이 앨범 관련 전역 상태
 * @author 고종현
 */
export const globalInitialState = {
	isLoading: false, //로딩 여부
};

export const useGlobalStore = zustandBuilder(globalInitialState, `globalStore`);

export const useGlobalStoreSelector = zustandMultiSelector(useGlobalStore);

export const useGlobalStoreAction = () => {
	const { setState } = useZustandAction(useGlobalStore);
	return {
		showLoading: () => {
			setState((draft) => {
				draft.isLoading = true;
			}, 'GlobalAction/showLoading');
		},

		hideLoading: () => {
			setTimeout(() => {
				setState((draft) => {
					draft.isLoading = false;
				}, 'GlobalAction/hideLoading');
			}, 300);
		},

		dispatchUploadCount: (successUploadCount, totalUploadCount) => {
			setState((draft) => {
				draft.successUploadCount = successUploadCount;
				draft.totalUploadCount = totalUploadCount;
			}, 'GlobalAction/dispatchUploadCount');
		},

		clearUploadCount: () => {
			setState((draft) => {
				draft.successUploadCount = 0;
				draft.totalUploadCount = 0;
			}, 'GlobalAction/clearUploadCount');
		},
	};
};

export default useGlobalStore;
