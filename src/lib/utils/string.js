//문자열 변환 유틸
class StringUtils {
	//숫자에 3자리 마다 콤마를 붙여줌
	static numberToAddComma(number = 0) {
		const parts = number.toString().split('.');
		parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
		return parts.join('.');
	}

	//콤마 제거
	static removeComma(str) {
		return str.replace(/,/g, '');
	}

	//특수 문자 제거
	static removeSpecialChar(str) {
		return str.replace(/[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi, '');
	}

	//- 없는 휴대번호 형식에 -을 추가
	static addHyphenPhoneStr(str) {
		return str.replace(/(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/, '$1-$2-$3');
	}

	static numberToString2Digits(number) {
		return number < 10 ? '0' + number.toString() : number.toString();
	}

	static isEmpty(str) {
		return !str || str.trim() === '';
	}
}

export default StringUtils;
