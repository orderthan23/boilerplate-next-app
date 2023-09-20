import { useZustandAction, zustandBuilder, zustandMultiSelector } from '@lib/zustand';
import AlbumVO from '@model/AlbumVO';
import FLAGS from '@constants/flags';

/**
 * @description 아이 앨범 관련 전역 상태
 * @author 고종현
 */
export const globalInitialState = {
	isLoading: false, //로딩 여부
};
//
export const useGlobalStore = zustandBuilder(globalInitialState, `globalStore`);

export const useGlobalStoreSelector = zustandMultiSelector(useGlobalStore);

export const useGlobalStoreAction = () => {
	const { setState } = useZustandAction(useGlobalStore);
	return {
		dispatchAlbum: (result, redirectAlbumCode) => {
			setState((draft) => {
				let currentAlbum = result?.recentAlbum ? new AlbumVO(result.recentAlbum) : null;
				const abList = AlbumVO.arrayToVOList(result?.connectAlbumList || []);
				//로그인 유저가 앨범오너인 앨범이 있는지 확인
				const myAlbum = abList.length > 0 ? abList.find((album) => album.realCustNo === draft.myCustNo) : null;

				//앨범오너인 앨범이 있으면 최초앨범으로 지정 없을 시 index 0번 앨범으로 설정 앨범목록이 없는 경우는 null
				if (!currentAlbum) {
					currentAlbum = abList.length > 0 ? (myAlbum ? myAlbum : abList[0]) : null;
				}

				//타 서비스에서 앨범no를 넘겨받고 들어온 경우
				if (redirectAlbumCode) {
					currentAlbum = abList.find((album) => album.albumNo === redirectAlbumCode);
					window.sessionStorage.removeItem('redirectAlbumCode');
				}

				draft.albumList = abList;
				draft.myAlbum = myAlbum;
				draft.currentAlbum = currentAlbum;
			}, 'GlobalAction/dispatchGetAlbum');
		},

		/**
		 * @description 앨범 수정 시 전역 상태 변경 로직
		 */
		dispatchModifyAlbum: (albumTitle) => {
			setState((draft) => {
				const updatedAlbum = new AlbumVO({ ...draft.myAlbum, albumTitle });
				draft.myAlbum = updatedAlbum;

				//현재 앨범이 선택된 앨범일 경우
				if (draft.myAlbum?.albumNo === draft.currentAlbum.albumNo) {
					draft.currentAlbum = updatedAlbum;
				}
				//앨범 리스트 갱신
				draft.albumList[draft.albumList.findIndex((album) => album.albumNo === draft.myAlbum?.albumNo)] = updatedAlbum;
			}, 'GlobalAction/dispatchModifyAlbum');
		},

		/**
		 * @description 현재 타겟 앨범 변경
		 * @param albumNo
		 */
		dispatchChangeCurrentAlbum: (albumNo) => {
			setState((draft) => {
				draft.currentAlbum = draft.albumList.find((album) => album.albumNo === albumNo);
			}, 'GlobalAction/dispatchChangeCurrentAlbum');
		},

		/**
		 *
		 * @description 산모 여부 조회 시 전역 상태 변경 로직
		 */
		dispatchMotherPermit: (checkMotherPermitResult) => {
			setState((draft) => {
				draft.isMom = Number(checkMotherPermitResult?.authCd) === FLAGS.앨범생성_권한.베베캠_산모;
				draft.authCd = Number(checkMotherPermitResult.authCd);
				draft.nickname = checkMotherPermitResult?.custNickName || '알 수 없음';
			}, 'GlobalAction/dispatchMotherPermit');
		},

		dispatchIsUpload: (uploadMode, mediaType = FLAGS.MEDIA_TYPE.IMAGE) => {
			setState((draft) => {
				draft.isUpload = uploadMode === 'start';
				draft.mediaType = mediaType;
			}, 'GlobalAction/dispatchIsUpload');
		},

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
