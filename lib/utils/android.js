//안드로이드 관련 함수
export class AndroidUtils {
	/*
    since  : 2020-10-23 오후 2:53
    func   : 모바일 OS 구분
    des    : 안드로이드 or 아이폰   2021-10-08  아이패드 기기구분 오류 수정('LIKE MAC OS X')
*/
	static isAndroidDevice() {
		let bAndroidDevice = null;
		if (bAndroidDevice === null) {
			let ua = '' + navigator.userAgent;
			if (ua.toUpperCase().indexOf('IPHONE') !== -1 || ua.toUpperCase().indexOf('IPAD') !== -1 || ua.toUpperCase().match(/LIKE MAC OS X/i)) {
				bAndroidDevice = false;
			} else {
				bAndroidDevice = true;
			}
		}
		return bAndroidDevice;
	}

	/*
        since  : 2020-10-19 오후 9:31
        func   : 현재 페이지가 앱에서 진행중인지, 웹에서 진행중인지 체크
    */
	static isAppRunning() {
		const UserAgent = navigator.userAgent;
		if (UserAgent.indexOf('ivory_3.0') > 0) {
			console.log('앱 접속증입니다.');
			return true;
		} else {
			console.log('앱 접속이 아닙니다. agent : ' + UserAgent);
			return false;
		}
	}
}

export default AndroidUtils;
