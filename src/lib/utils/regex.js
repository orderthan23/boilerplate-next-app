//유효성 체크
class RegexUtils {
	//이메일 유효성 체크
	static isEmail(str) {
		const regex = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
		return str.match(regex);
	}

	//핸드폰 유효성 체크
	static isPhone(str, hasHyphen) {
		const regex = hasHyphen ? /^01(?:0|1|[6-9])-(?:\d{3}|\d{4})-\d{4}$/ : /^01(?:0|1|[6-9])(?:\d{3}|\d{4})\d{4}$/;
		return str.match(regex);
	}

	//집 전화번호 체크
	static isTel(str) {
		const regex = /^\d{2,3}-\d{3,4}-\d{4}$/;
		return str.match(regex);
	}

	//한국어 체크
	static isKorean(str) {
		const regex = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
		return str.match(regex);
	}

	//영어 체크
	static isEnglish(str) {
		const regex = /^[a-zA-Z]*$/;
		return str.match(regex);
	}

	//숫자 체크
	static isNumber(str) {
		const regex = /^[0-9]+$/;
		return str.match(regex);
	}

	//공백 포함 여부 체크
	static hasBlank(str) {
		const regex = /\s/g;
		return str.match(regex);
	}

	//null, undefined, false, 빈문자열, 체크
	static isFalsy(str) {
		return str === null || str === undefined || str === false || str.trim() === '';
	}

	//이미지 확장자 체크
	static isImage(str) {
		const regex = /(.*?)\.(jpg|jpeg|png|gif|webp|JPG|JPEG|PNG|GIF|WEBP)$/;
		return str.match(regex);
	}

	static isGif(str) {
		const regex = /(.*?)\.(GIF|gif)$/;
		return str.match(regex);
	}
}

export default RegexUtils;
