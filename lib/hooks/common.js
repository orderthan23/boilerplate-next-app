/**
 * @author 고종현
 * @version 0.0.1(2022.05.31)
 */
import { useEffect, useLayoutEffect, useReducer, useRef, useState } from 'react';
import ReducerManager from '@lib/reducer';
import CustomLogger from '@lib/console';
import { isEqual, reduce } from 'lodash';
import DateUtils from '@lib/utils/date';
import StringUtils from '@lib/utils/string';
import HighFunc from '@lib/function/hof';
import { useInView } from 'react-intersection-observer';
import useGlobalStore from '@store/global';

/**
 * @description 페이지네이션 커스텀 훅
 * @param totalElements 총 리스트갯수
 * @param currentPage 	현재 페이지
 * @param pageForSize 	한 페이지당 보여줄 리스트 갯수
 * @param groupSize 	최대 보여질 페이지네이션 버튼 갯수
 */
export const usePageAble = (totalElements, currentPage, pageForSize = 10, groupSize = 10) => {
	const [hasNext, setHasNext] = useState(false);
	const [hasPrev, setHasPrev] = useState(false);
	const [endPage, setEndPage] = useState(1);
	const [startPage, setStartPage] = useState(1);

	useEffect(() => {
		const totalPage = Math.ceil(totalElements / pageForSize); //총 페이지
		const pageGroup = Math.ceil(currentPage / groupSize); //최대 보여질 페이지 버튼 묶음
		const endPage = pageGroup * 10 > totalPage ? totalPage : pageGroup * 10; //한페이지에서 보여질 페이지네이션 버튼 중 마지막 버튼
		const startPage = endPage - (groupSize - 1) <= 0 ? 1 : endPage - (groupSize - 1); //한페이지에서 보여질 페이지네이션 버튼 중 첫번째 버튼
		const hasNext = currentPage < totalPage; //다음 페이지 존재여부
		const hasPrev = currentPage > 1; // 이전 페이지 존재여부

		setEndPage(endPage);
		setStartPage(startPage);
		setHasNext(hasNext);
		setHasPrev(hasPrev);
	}, [totalElements, currentPage, pageForSize, groupSize]);

	return [endPage, startPage, hasNext, hasPrev];
};

/**
 * @description 이전 렌더링에서의 값을 기억해두어야 하는 경우에 사용. 현재 렌더링과 이전 렌더링의 값을 비교할 필요가 있을 때 사용
 * @param value 상태 객체
 * @returns {undefined}
 */
export const usePrevious = (value) => {
	const ref = useRef(null);

	useEffect(() => {
		ref.current = value;
	}, [value]);

	return ref.current;
};

/**
 * @description 로컬스토리지 값 가져오고 변경하기
 * @param key  로컬스토리지에서 가져올 값의 키
 * @param initialValue 초기값
 * @returns {[unknown,setValue]}
 */
export const useLocalStorage = (key, initialValue) => {
	const [storedValue, setStoredValue] = useState(() => {
		if (typeof window === 'undefined') {
			return initialValue;
		}
		try {
			const item = window.localStorage.getItem(key);
			return item ? JSON.parse(item) : initialValue;
		} catch (error) {
			console.log(error);
			return initialValue;
		}
	});
	const setValue = (value) => {
		try {
			const valueToStore = value instanceof Function ? value(storedValue) : value;
			setStoredValue(valueToStore);
			if (typeof window !== 'undefined') {
				window.localStorage.setItem(key, JSON.stringify(valueToStore));
			}
		} catch (error) {
			console.log(error);
		}
	};
	return [storedValue, setValue];
};

/**
 * 날짜 지역상태를 자주쓰는 포멧으로 관리하는 훅
 * @param dateObj date 객체
 */
export const useDateFormat = (dateObj = new Date()) => {
	const dateStr = DateUtils.toDateString(dateObj);
	const [format, setFormat] = useState({});

	useEffect(() => {
		setFormat({
			//yyyymmdd 포멧 ex: 20220603
			yyyyMMdd: dateStr,
			//한국식 년월일 포멧 ex:2022년 6월 3일
			koreanDT: DateUtils.parseKoreanDate(dateStr),
			//ex : 10월 2일 일요일
			koreanDtWithWeekDayAndNoYear:
				`${StringUtils.numberToString2Digits(dateObj.getMonth() + 1)}월 ` +
				`${StringUtils.numberToString2Digits(dateObj.getDate())}일 ` +
				`${DateUtils.getDayOfWeek(dateObj)}요일`,
			//ex : 2022년 10월 2일 일요일
			koreanDtWithWeekDay:
				`${dateObj.getFullYear()}년 ` +
				`${StringUtils.numberToString2Digits(dateObj.getMonth() + 1)}월 ` +
				`${StringUtils.numberToString2Digits(dateObj.getDate())}일 ` +
				`${DateUtils.getDayOfWeek(dateObj)}요일`,
		});
	}, [dateObj]);

	return format;
};

/**
 * 시간 지역 상태를 자주쓰는 포멧으로 관리하는 훅
 * @param timeStr hhmmss 형태의 시분초 문자열
 * @param useSecond 초단위 사용 여부
 */
export const useTimeState = (timeStr = '000000', useSecond = false) => {
	const [time, setTime] = useState(timeStr);
	const [timeFormat, setTimeFormat] = useState(null);
	useEffect(() => {
		setTimeFormat({
			//국제적 시분초 포멧 ex: AM 10:10
			AMPM: DateUtils.parsePureTime(time, useSecond),
			//한국 스타일 시분초 포멧 ex : 10시 5분
			koreanTm: DateUtils.parseKoreanTime(time, useSecond),
		});
	}, [timeStr]);

	return [time, timeFormat, setTime];
};

export const usePrevNextDay = (searchDate) => {
	const [value, setValue] = useState([new Date(), new Date(), new Date()]);
	const tomorrowDate = searchDate.getTime() + 1 * 24 * 60 * 60 * 1000;
	const yesterDate = searchDate.getTime() - 1 * 24 * 60 * 60 * 1000;
	const tomorrow = new Date(searchDate).setTime(tomorrowDate);
	const yesterDay = new Date(searchDate).setTime(yesterDate);
	useEffect(() => {
		setValue([tomorrow, yesterDay, new Date().getTime()]);
	}, [searchDate]);

	return value;
};

export const useCustomReducer = (defaultState, actions, reducerMap) => {
	const [state, dispatch] = useReducer(defaultState);
	const actionFunctions = ReducerManager.actionBuilder(actions, dispatch);

	return useModuleWatcher({
		...state,
		...actionFunctions,
	});
};

export const useIntersectionObserver = (callback) => {
	const [observationTarget, setObservationTarget] = useState(null);
	const observer = useRef(
		new IntersectionObserver(([entry]) => {
			if (!entry.isIntersecting) {
				return;
			}
			callback();
		}, {}),
	);

	useEffect(() => {
		const currentTarget = observationTarget;
		const currentObserver = observer.current;
		if (currentTarget) {
			currentObserver.observe(currentTarget);
		}
		return () => {
			if (currentTarget) {
				currentObserver.unobserve(currentTarget);
			}
		};
	}, [observationTarget]);

	return setObservationTarget;
};

export const useDidMountEffect = (func, deps) => {
	const didMount = useRef(false);

	useLayoutEffect(() => {
		if (didMount.current) {
			func();
		} else {
			didMount.current = true;
		}
	}, deps);
};

export const useModuleWatcher = (states) => {
	const prevService = usePrevious(states);
	const changer = reduce(
		states,
		function (result, value, key) {
			const prevValue = prevService ? prevService[key] : undefined;
			return isEqual(value, prevValue)
				? result
				: result.concat({
						key,
						before: value,
						after: prevValue,
				  });
		},
		[],
	);

	if (!isEqual(states, prevService)) {
		CustomLogger.groupCollapsed('%cLocal State Change Detected', 'color: tomato; font-size : 14px; font-weight : bold;');
		CustomLogger.info(`%cCHANGE : `, 'color : green', changer);
		CustomLogger.info('%cDATA : ', 'color : yellow', states);
		CustomLogger.groupEnd();
	}
	return states;
};
export const useAsyncEffect = (asyncFunc, deps) => {
	useEffect(() => {
		const promise = asyncFunc();
		return HighFunc.cleanUpPromise(promise);
	}, deps);
};

export const useScrollDetectRef = (list, hasNext, fetchNext) => {
	const [scrollRef, isView] = useInView();
	const isLoading = useGlobalStore((state) => state.isLoading);
	useEffect(() => {
		if (isView && hasNext && !isLoading) {
			fetchNext();
		}
	}, [isView, list, isLoading]);

	return scrollRef;
};

export const useVisibilityChangeEffect = (onHidden = HighFunc.emptyVoidFunction(), onVisible = HighFunc.emptyVoidFunction(), deps = []) => {
	useEffect(() => {
		const onVisibilityChange = () => {
			if (document.hidden) {
				onHidden();
			} else {
				onVisible();
			}
		};
		document.addEventListener('visibilitychange', onVisibilityChange);
		return () => {
			document.removeEventListener('visibilitychange', onVisibilityChange);
		};
	}, deps);
};

export const useAutosizeTextarea = (value, maxLine) => {
	const ref = useRef(null);
	useEffect(() => {
		if (ref.current) {
			ref.current.style.height = '0px';
			const scrollHeight = ref.current.scrollHeight;
			const lineHeight = window.getComputedStyle(ref.current, null).getPropertyValue('line-height').split('px')[0];
			if (lineHeight * 3 <= scrollHeight) {
				ref.current.style.height = lineHeight * maxLine + 'px';
			} else {
				ref.current.style.height = scrollHeight + 'px';
			}
		}
	}, [ref, value]);

	return ref;
};
