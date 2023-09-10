/**
 * @file 상수 모음
 * @author 고종현
 * @version 0.0.1(2022.07.06)
 */

/**
 * @description 아이 앨범 구분 코드
 */

export default class FLAGS {
	//가족 관계
	static FAMILY_TYPE = {
		//엄마
		MOTHER: 0,
		//아빠
		FATHER: 1,
		//친할머니
		FGR_MOTHER: 2,
		//친할아버지
		FGR_FATHER: 3,
		//외할머니
		MGR_MOTHER: 4,
		//외할아버지
		MGR_FATHER: 5,
		//사촌
		COUSIN: 6,
		//지인
		FRIEND: 7,
	};
	//장소 타입
	static LOCATION_TYPE = {
		//국내
		DOMESTIC: 1,
		//국외
		INTERNATIONAL: 2,
		//기타 장소
		OTHER: 3,
	};

	//리스트 정렬 타입
	static SORT_TYPE = {
		//사진 메타데이터 오름차
		META_ASC: 1,
		//사진 메타데이터 내림차
		META_DESC: 2,
		//업로드 시간 오름차
		UPLOAD_ASC: 3,
		//업로드 시간 내림차
		UPLOAD_DESC: 4,
	};

	//알람 종류
	static ALARM_TYPE = {
		//신규 이미지 추가
		ADD_IMAGES: 1,
		//앨범에 가족 이탈
		DISCONNECTED: 2,
		//앨범에 가족 추가
		CONNECTED: 3,
	};

	//아이 성별
	static BABY_GENDER = {
		//여자
		GIRL: 0,
		//남자
		BOY: 1,
		//태아
		UNKNOWN: 2,
	};

	//멤버 요금제
	static PLAN = {
		//무료 고객
		FREE_TIER: 0,
		//유료 고객
		PREMIUM: 1,
	};

	static FILTER_TYPE = {
		//모든 앨범
		ALL_ALBUM: 1,
		//폴더 조회
		FOLDER: 2,
		//장소별 조회
		PLACE: 3,
		//즐겨찾기 조회
		FAVORITE: 4,
		//연도별 조회
		BY_YEAR: 5,
	};

	static FAVORITE_TYPE = {
		//즐겨찾기
		SUBSCRIBED: 1,
		//즐겨찾기 해제
		UNSUBSCRIBED: 9,
	};

	static SVC_CD = {
		//정규 앨범
		GENERAL: 1,
		//임시 앨범
		TEMP: 2,
	};

	static FOLDER_TYPE = {
		//미분류
		UNCLASSIFIED: 0,
		//일반적인 페이지
		NORMAL: 1,
		//육아수첩 성장사진 페이지
		DIARY: 2,
		//베베짤 페이지
		BEBE_ZZAL: 3,
		//베베클립 페이지
		BEBE_CLIP: 4,
		//100일, 200일, 300일, 돌
		BABY_EVENT: [11, 12, 13, 14],
	};

	static PREMIUM_AUTH_TYPE = {
		//아이앨범
		NORMAL: 1,
		//육아수첩
		DIARY: 2,
		//베베짤 페이지
		BEBE_ZZAL: 3,
		//베베클립 페이지
		BEBE_CLIP: 4,
		//베베픽
		BEBE_PICK: 5,
	};

	static USER_PREMIUM_AUTH = {
		NONE: 'none',
		PREMIUM: 'premium',
		BEBE_ZZAL: 'bbj',
		REFUND_PREMIUM: 'refundPremium',
		REFUND_ZZAL: 'refundBbj',
	};

	static ACT_FLAG = {
		//성공
		SUCCESS: 1,
		//경고(문제 있음)
		WARNING: 8,
		//에러
		ERROR: 9,
	};

	static BEBE_CLIP = {
		//베베클립 제작 시도안함
		NONE: '-1',
		//베베클립 만드는중
		MAKING: '0',
		//베베클립 만듬
		DONE: '1',
	};

	static MEDIA_TYPE = {
		IMAGE: 'image',
		VIDEO: 'video',
	};

	static FILE_FILTER_TYPE = {
		ALL: -1,
		IMAGE: 0,
		VIDEO: 1,
	};
}

/**
 * @description 상수 코드 변환 객체
 */
export const GBN_CD_PARSER = {
	parseRelationCode: (code) => {
		return ['엄마', '아빠', '친할머니', '친할아버지', '외할머니', '외할아버지', '친인척', '지인'][Number(code)] ?? '알 수 없음';
	},
	parseBabyGender: (code) => {
		return ['여자 아이', '남자 아이', '태아'][Number(code)];
	},

	parseLocationType: (code) => {
		return ['국내', '국외', '기타 장소'][Number(code)];
	},

	isModifiableFolderType: (folderType) => [FLAGS.FOLDER_TYPE.NORMAL, ...FLAGS.FOLDER_TYPE.BABY_EVENT].includes(folderType),
};
