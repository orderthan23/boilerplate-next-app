class CookieUtils {
	static getCookie(cName) {
		cName = cName + '=';
		const cookieData = document.cookie;
		let start = cookieData.indexOf(cName);
		let cValue = '';
		if (start !== -1) {
			start += cName.length;
			let end = cookieData.indexOf(';', start);
			if (end === -1) {
				end = cookieData.length;
			}
			cValue = cookieData.substring(start, end);
		}
		return decodeURI(cValue);
	}

	static setCookie(cName, cValue, cDay) {
		const expire = new Date();
		expire.setDate(expire.getDate() + cDay);
		let cookies = cName + '=' + encodeURI(cValue) + '; path=/ '; // 한글 깨짐을 막기위해 escape(cValue)를 합니다.
		if (typeof cDay !== 'undefined') {
			cookies += ';expires=' + expire.toGMTString() + ';';
		}
		document.cookie = cookies;
	}

	//쿠키삭제
	static deleteCookie(name) {
		document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
	}
}

export default CookieUtils;
