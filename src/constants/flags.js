/**
 * @file 상수 모음
 * @author 고종현
 * @version 0.0.2(2022.09.15)
 */

/**
 * @description 상수 플래그
 */

export default class FLAGS {
	static ACT_FLAG = {
		//성공
		SUCCESS: 1,
		//경고(문제 있음)
		WARNING: 8,
		//에러
		ERROR: 9,
	};
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

	//아이 성별
	static BABY_GENDER = {
		//여자
		GIRL: 0,
		//남자
		BOY: 1,
		//태아
		UNKNOWN: 2,
	};
}

/**
 * @description 상수 플래그 변환 객체
 */
export const FLAG_PARSER = {
	parseRelationCode: (code) => {
		return ['엄마', '아빠', '친할머니', '친할아버지', '외할머니', '외할아버지', '친인척', '지인'][Number(code)] ?? '알 수 없음';
	},
	parseBabyGender: (code) => {
		return ['여자 아이', '남자 아이', '태아'][Number(code)];
	},
};
