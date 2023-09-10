import HighFunc from '@lib/function/hof';
import CustomError from '@lib/error';

export class QueryKeys {
	//이미지 관련
	//DEPTH 1
	static IMAGE_QUERY_GROUP = ['IMAGE_QUERY_GROUP']; //이미지 관련 QUERY
	//------DEPTH 2
	static IMAGE_DETAIL = [...QueryKeys.IMAGE_QUERY_GROUP, 'IMAGE_DETAIL']; //이미지 상세
	static IMAGE_INFLUENCED = [...QueryKeys.IMAGE_QUERY_GROUP, 'IMAGE_INFLUENCED']; //한장의 이미지라도 변하면 영향을 받는 것들
	//------------DEPTH 3
	static IMAGE_LIST_BY_ALL = [...QueryKeys.IMAGE_INFLUENCED, 'LIST_BY_ALL']; //전체보기 이미지 목록
	static IMAGE_LIST_BY_META_DATE = [...QueryKeys.IMAGE_INFLUENCED, 'LIST_BY_META_DATE']; //월별 이미지 목록
	static IMAGE_LIST_BY_FOLDER = [...QueryKeys.IMAGE_INFLUENCED, 'LIST_BY_FOLDER']; //폴더별 이미지 목록
	static IMAGE_LIST_BY_FAVORITE = [...QueryKeys.IMAGE_INFLUENCED, 'LIST_BY_FAVORITE']; //즐겨찾기 리스트
	static IMAGE_LIST_BY_LOCATION = [...QueryKeys.IMAGE_INFLUENCED, 'LIST_BY_LOCATION']; //장소별 이미지 목록
	static IMAGE_LIST_BY_UPLOADED = [...QueryKeys.IMAGE_INFLUENCED, 'LIST_BY_UPLOADED']; //업로드 이미지 목록
	static IMAGE_LIST_BY_TRANSFER_FOLDER = [...QueryKeys.IMAGE_INFLUENCED, 'LIST_BY_TRANSFER_FOLDER']; //변경가능한 폴더의 이미지 목록
	static ALARM_LIST = [...QueryKeys.IMAGE_INFLUENCED, 'ALARM_LIST']; //알림 리스트
	static LOCATION_LIST = [...QueryKeys.IMAGE_INFLUENCED, 'LOCATION_LIST']; //장소 리스트
	static SLIDE_THUMB = [...QueryKeys.IMAGE_INFLUENCED, 'SLIDE_THUMB']; //슬라이드 썸네일
	static LATEST_FAVORITE = [...QueryKeys.IMAGE_INFLUENCED, 'LATEST_FAVORITE']; //최근 좋아요한 목록
	static LATEST_LOCATION = [...QueryKeys.IMAGE_INFLUENCED, 'LATEST_LOCATION']; //최근 장소
	static MAIN_DATE_LIST = [...QueryKeys.IMAGE_INFLUENCED, 'MAIN_DATE_LIST'];
	static STORAGE_SIZE = [...QueryKeys.IMAGE_INFLUENCED, 'STORAGE_SIZE']; // 사용중인 총 이미지 용량
	static FILTER_LIST = [...QueryKeys.IMAGE_INFLUENCED, 'FILTER_LIST']; //필터 집계정보
	static FOLDER_LIST = [...QueryKeys.IMAGE_INFLUENCED, 'FOLDER_LIST']; //폴더 리스트

	//가족 관련

	static FAMILY_QUERY_GROUP = ['FAMILY_QUERY_GROUP'];

	//아기 관련
	static BABY_QUERY_GROUP = ['BABY_QUERY_GROUP'];

	//클립 관련
	static CLIP_QUERY_GROUP = ['CLIP_QUERY_GROUP'];
}

export class QueryOptions {
	static DEFAULT_CACHE_TIME = 1000 * 60 * 60;
	static DEFAULT_STALE_TIME = 1000 * 60 * 60 * 3;
	static DEFAULT_MUTATION_OPTION = {
		onSuccess: HighFunc.emptyVoidFunction,
		onFailure: CustomError.handler,
		onSettled: HighFunc.emptyVoidFunction,
	};
}
