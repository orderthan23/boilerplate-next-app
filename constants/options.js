//아이 앨범 ui 혹은 정책 관련 설정
export default class OPTIONS {
	//요금제별 가용 용량
	static MAXIMUM_STORAGE = {
		FREE_TIER: 1 * 1024 * 1024 * 1024, //5GB
		PREMIUM: 10 * 1024 * 1024 * 1024, //10GB
	};

	static MAXIMUM_UPLOAD_ABLE_IMAGE_COUNT = {
		FREE_TIER: 1000,
		PREMIUM: 1000000,
	};

	static MAXIMUM_UPLOAD_ABLE_VIDEO_COUNT = {
		FREE_TIER: 100,
		PREMIUM: 1000,
	};

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

	static FAMILY_KRS = ['아빠', '친할머니', '친할아버지', '외할머니', '외할아버지', '친인척', '지인'];

	//전체 너비
	static MOBILE_MAX_WIDTH = 640;

	static URLS = {
		KAKAO_BANNER_IMAGE: 'https://iandna-contents.s3.ap-northeast-2.amazonaws.com/banner/album-kako-banner.png',
		MOBILE_PLAY_STORE: 'https://play.google.com/store/apps/details?id=com.namyang.bebe',
		WEB_PLAY_STORE: 'https://play.google.com/store/apps/details?id=com.namyang.bebe',
		MOBILE_APP_STORE: 'https://itunes.apple.com/kr/app/id1113295590',
		WEB_APP_STORE: 'https://itunes.apple.com/kr/app/id1113295590',
	};

	//인증 및 앨범 설정 정보가 필요없는 페이지 인지 확인
	static IGNORED_ESSENTIAL_LOGIC_PATHS = ['/404'];

	static MAXIMUM_FOLDER_STR_LENGTH = 25;

	// 공개범위 설정
	static PUBLIC_TYPE = [
		{ key: 'PARENTS', value: 1, title: '엄마, 아빠' },
		{ key: 'DADDY_FAMILY', value: 2, title: '친가' },
		{ key: 'MOMMY_FAMILY', value: 3, title: '외가' },
		{ key: 'OTHER_FAMILY', value: 4, title: '친인척' },
		{ key: 'FRIENDS', value: 5, title: '지인' },
	];
}
