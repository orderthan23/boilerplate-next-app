/**
 * @description 프로젝트별 상수 표시해야 할 옵션 값
 * @author 고종현
 * @version 0.0.1
 */
export default class OPTIONS {
	//슬라이드 쇼 옵션
	static SLIDE_SHOW = {
		NEXT_DELAY: 10000, //다음 슬라이드로 넘어가는 딜레이
		VIDEO_SPEED: 5000, //비디오 스피드
		MINIMUM_IMAGE_COUNT: 10, // 슬라이드영상 사진 제한값 기본: 10
	};

	static LIMITS = {
		MAIN_FAVORITE: 3, //메인 페이지에 노출될 즐겨찾기 썸네일 갯수
		MAIN_LOCATION: 3, //메인 페이지에 노출될 장소별 썸네일 갯수
	};

	static PAGEABLE = {
		SIZE: 30, //페이지 1회 호출당 불러올 데이터 수
		DEFAULT_PAGE: 1, //시작 페이지 넘버
	};
}
