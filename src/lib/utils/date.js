//날짜 변환 유틸
class DateUtils {
	//유효한(존재하는) 월(月)인지 체크
	static isValidMonth(month) {
		const parseMonth = parseInt(month, 10);
		return parseMonth >= 1 && parseMonth <= 12;
	}

	// 유효한(존재하는) 일(日)인지 체크
	static isValidDay(year, month, day) {
		const parseMonth = parseInt(month, 10) - 1;
		const parseDay = parseInt(day, 10);

		const endDayForMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
		if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
			endDayForMonth[1] = 29;
		}

		return parseDay >= 1 && parseDay <= endDayForMonth[parseMonth];
	}

	// 유효한(존재하는) 시(時)인지 체크
	static isValidHour(hour) {
		const parseHour = parseInt(hour, 10);
		return parseHour >= 1 && parseHour <= 24;
	}

	// 유효한(존재하는) 분(分)인지 체크
	static isValidMin(minute) {
		const parseMinute = parseInt(minute, 10);
		return parseMinute >= 1 && parseMinute <= 60;
	}

	// Time 형식인지 체크(느슨한 체크)
	static isValidTimeFormat(time) {
		return !isNaN(time) && time.length === 12;
	}

	// 유효하는(존재하는) Time 인지 체크
	static isValidTime(dateStr) {
		const year = dateStr.substring(0, 4);
		const month = dateStr.substring(4, 6);
		const day = dateStr.substring(6, 8);
		const hour = dateStr.substring(8, 10);
		const min = dateStr.substring(10, 12);

		if (
			parseInt(year, 10) >= 1900 &&
			DateUtils.isValidMonth(month) &&
			DateUtils.isValidDay(year, month, day) &&
			DateUtils.isValidHour(hour) &&
			DateUtils.isValidMin(min)
		) {
			return true;
		}
		return false;
	}

	//date 객체인지 확인
	static isDateObject(something) {
		return typeof something === 'object' && something instanceof Date;
	}

	/**
	 * Time 스트링을 자바스크립트 Date 객체로 변환
	 * parameter time: Time 형식의 String
	 */
	static toDateObject(dateStr, isTime) {
		//parseTime(time)
		const year = dateStr.substr(0, 4);
		const month = dateStr.substr(4, 2) - 1; // 1월=0,12월=11
		const day = dateStr.substr(6, 2);

		if (isTime) {
			const hour = dateStr.substr(8, 2);
			const min = dateStr.substr(10, 2);
			return new Date(year, month, day, hour, min);
		}

		return new Date(year, month, day);
	}

	/**
	 * 자바스크립트 Date 객체를 Time 스트링으로 변환
	 * parameter date: JavaScript Date Object
	 */
	static toDateString(dateObject, seperator = '', isTime) {
		//formatTime(date)
		let year = dateObject.getFullYear();
		let month = dateObject.getMonth() + 1; // 1월=0,12월=11이므로 1 더함
		let day = dateObject.getDate();
		let hour = dateObject.getHours();
		let min = dateObject.getMinutes();

		if (('' + month).length === 1) {
			month = '0' + month;
		}
		if (('' + day).length === 1) {
			day = '0' + day;
		}
		if (('' + hour).length === 1) {
			hour = '0' + hour;
		}
		if (('' + min).length === 1) {
			min = '0' + min;
		}

		if (isTime) {
			return '' + year + seperator + month + seperator + day + seperator + hour + seperator + min;
		} else {
			return '' + year + seperator + month + seperator + day;
		}
	}

	/**
	 * Time이 현재시각 이후(미래)인지 체크
	 */
	static isFuture(date) {
		if (!DateUtils.isDateObject(date)) {
			date = DateUtils.toDateObject(date);
		}
		return date > new Date();
	}

	/**
	 * Time이 현재시각 이전(과거)인지 체크
	 */
	static isPast(date) {
		if (!DateUtils.isDateObject(date)) {
			date = DateUtils.toDateObject(date);
		}
		return date < new Date();
	}

	/**
	 * 주어진 Time 과 y년 m월 d일 h시 차이나는 Time을 리턴

	 * ex) var time = form.time.value; //"20000101000"
	 *     alert(shiftTime(time,0,0,-100,0));
	 *     => 2000/01/01 00:00 으로부터 100일 전 Time
	 */
	static shiftTime(date, year = 0, month = 0, day = 0, hour = 0) {
		//moveTime(time,y,m,d,h)

		if (!DateUtils.isDateObject(date)) {
			date = DateUtils.toDateObject(date);
		}

		date.setFullYear(date.getFullYear() + year); //y년을 더함
		date.setMonth(date.getMonth() + month); //m월을 더함
		date.setDate(date.getDate() + day); //d일을 더함
		date.setHours(date.getHours() + hour); //h시를 더함

		return DateUtils.toDateString(date);
	}

	/**
	 * 두 Date가 몇 개월 차이나는지 구함

	 * beforeDate가 afterDate 보다 크면(미래면) minus(-)
	 */
	static getMonthInterval(beforeDate, afterDate) {
		if (!DateUtils.isDateObject(beforeDate)) {
			beforeDate = DateUtils.toDateObject(beforeDate);
		}

		if (!DateUtils.isDateObject(afterDate)) {
			afterDate = DateUtils.toDateObject(afterDate);
		}

		const years = afterDate.getFullYear() - beforeDate.getFullYear();
		const months = afterDate.getMonth() - beforeDate.getMonth();
		const days = afterDate.getDate() - beforeDate.getDate();

		return years * 12 + months + (days >= 0 ? 0 : -1);
	}

	/**
	 * 두 Time이 며칠 차이나는지 구함
	 * time1이 time2보다 크면(미래면) minus(-)
	 */
	static getDayInterval(beforeDate, afterDate) {
		if (!DateUtils.isDateObject(beforeDate)) {
			beforeDate = DateUtils.toDateObject(beforeDate);
		}

		if (!DateUtils.isDateObject(afterDate)) {
			afterDate = DateUtils.toDateObject(afterDate);
		}
		const day = 1000 * 3600 * 24; //24시간

		return parseInt((afterDate - beforeDate) / day, 10);
	}

	/**
	 * 두 Time이 몇 시간 차이나는지 구함
	 * time1이 time2보다 크면(미래면) minus(-)
	 */
	static getHourInterval(beforeDate, afterDate) {
		if (!DateUtils.isDateObject(beforeDate)) {
			beforeDate = DateUtils.toDateObject(beforeDate);
		}

		if (!DateUtils.isDateObject(afterDate)) {
			afterDate = DateUtils.toDateObject(afterDate);
		}
		const hour = 1000 * 3600; //1시간
		return parseInt((afterDate - beforeDate) / hour, 10);
	}

	static getMinuteInterval(beforeDate, afterDate) {
		if (!DateUtils.isDateObject(beforeDate)) {
			beforeDate = DateUtils.toDateObject(beforeDate);
		}

		if (!DateUtils.isDateObject(afterDate)) {
			afterDate = DateUtils.toDateObject(afterDate);
		}
		const hour = 60000; //1분
		return parseInt((afterDate - beforeDate) / hour, 10);
	}

	/**
	 * 현재 시각을 Time 형식으로 리턴

	 */
	static getCurrentTime() {
		return DateUtils.toDateString(new Date());
	}

	/**
	 * 현재 시각과 y년 m월 d일 h시 차이나는 Time을 리턴
	 */
	static getRelativeTime(year = 0, month = 0, day = 0, hour = 0) {
		return DateUtils.shiftTime(DateUtils.getCurrentTime(), year, month, day, hour);
	}

	/**
	 * 오늘의 요일 구하기
	 */
	static getDayOfWeek(dateObject) {
		const day = dateObject.getDay(); //일요일=0,월요일=1,...,토요일=6
		const week = ['일', '월', '화', '수', '목', '금', '토'];

		return week[day];
	}

	// 시분초 hhmmss 형태로 변환
	static parseHHMMSS(
		hour = '00', //시
		minute = '00', //분
		second = '00', //초
		separator = '', //구분자
		useSecond = false, //초 사용여부
	) {
		const arr = [hour, minute];

		if (useSecond) {
			arr.push(second);
		}
		return arr.map((time) => (('' + time).length === 1 ? '0' + time : time)).join(separator);
	}

	// YYYYMMDD -> YYYY년 MM월 DD일 (요일)
	static parseKoreanDateWithWeek(str) {
		return `${DateUtils.parseKoreanDate(str)} (${DateUtils.getDayOfWeek(new Date(DateUtils.parseForIOSDate(str)))})`;
	}

	// YYYYMMDD -> YYYY년 MM월 DD일 D
	static parseKoreanDateWithWeekOne(str, isFull = false) {
		return `${DateUtils.parseKoreanDate(str)} ${DateUtils.getDayOfWeek(new Date(DateUtils.parseForIOSDate(str)))}${isFull ? '요일' : ''}`;
	}

	// YYYYMM -> YYYY년 MM월
	static parseKoreanDateLimitMonth(str) {
		return str.replace(/(\d{4})(\d{2})/g, '$1년 $2월');
	}

	//YYYYMMDD -> YYYY년 MM월 DD일
	static parseKoreanDate(str) {
		return str.replace(/(\d{4})(\d{2})(\d{2})/g, '$1년 $2월 $3일');
	}

	//hhmmss - AMPM XX:XX
	static parsePureTime(str, useSecond) {
		const hour = Number(str.substring(0, 2));
		const min = str.substring(2, 4);
		const second = useSecond ? `${str.substring(4, 6)}초` : '';
		const pureHour = hour > 12 ? hour - 12 : hour;
		const pureHourStr = pureHour.toString().length < 2 ? `0${pureHour}:` : `${pureHour}:`;
		const pureAmPm = hour >= 12 ? 'PM' : 'AM';
		return (pureAmPm + ' ' + pureHourStr + min + second).trimEnd();
	}

	//hhmmss - X시간 00분
	static parseKoreanTime(str, useSecond) {
		const hour = Number(str.substring(0, 2));
		const min = str.substring(2, 4);
		const second = useSecond ? `:${str.substring(4, 6)}초` : '';
		const koreanHour = hour > 12 ? hour - 12 : hour;
		const koreanHourStr = `${koreanHour}시간`;
		const koreanMinStr = min.toString().length < 2 ? `0${min}분` : `${min}분`;
		return ((hour > 0 ? `${koreanHourStr} ` : '') + koreanMinStr + second).trimEnd();
	}

	//YYYYMMDD -> YYYY.MM.DD
	static addDotDate(str) {
		return str.substring(0, 4) + '.' + str.substring(4, 6) + '.' + str.substring(6, 8);
	}

	// yyyyMMdd -> [yyyy, mm ,dd]
	static addDotDateArr(str) {
		return [str.substring(0, 4), str.substring(4, 6), str.substring(6, 8)];
	}

	//60 -> 010000 분을 시분초(hhmmss)로 변환
	static minuteToHHMMSS(time) {
		const [hour, minute] = [Math.floor(Number(time) / 60), Number(time) % 60];
		const hourStr = hour.toString().length < 2 ? '0' + hour.toString() : hour.toString();
		const minuteStr = minute.toString().length < 2 ? '0' + minute.toString() : minute.toString();
		return hourStr + '' + minuteStr + '' + '00';
	}

	// mm:ss 깜빡임
	static flashingColon(time) {
		if (time.indexOf(':') > -1) {
			return {
				mm: time.split(':')[0].length > 1 ? time.split(':')[0] : `0${time.split(':')[0]}`,
				ss: time.split(':').pop().length > 1 ? time.split(':').pop() : `0${time.split(':').pop()}`,
			};
		}
	}

	// yyyyMMdd ios 대응 date 객체 생성용 텍스트 변환
	static parseForIOSDate(str) {
		return `${str.substring(0, 4)}/${str.substring(4, 6)}/${str.substring(6, 8)} 00:00:00`;
	}

	// yyyyMMddhhmmss ios 대응 date 객체 생성용 텍스트 변환
	static parseForIOSDateTime(str) {
		return `${str.substring(0, 4)}/${str.substring(4, 6)}/${str.substring(6, 8)} ${str.substring(8, 10)}:${str.substring(10, 12)}:${str.substring(12, 14)}`;
	}
}

export default DateUtils;
