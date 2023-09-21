import { isEqual, reduce } from 'lodash';

export default class CustomLogger {
	static info(...param) {
		if (JSON.parse(process.env.NEXT_PUBLIC_USE_LOGGER)) {
			console.log(...param);
		}
	}

	static error(...param) {
		if (JSON.parse(process.env.NEXT_PUBLIC_USE_LOGGER)) {
			console.error(...param);
		}
	}

	static warning(...param) {
		if (JSON.parse(process.env.NEXT_PUBLIC_USE_LOGGER)) {
			console.warn(...param);
		}
	}

	static groupCollapsed(...param) {
		if (JSON.parse(process.env.NEXT_PUBLIC_USE_LOGGER)) {
			console.groupCollapsed(...param);
		}
	}

	static groupEnd() {
		if (JSON.parse(process.env.NEXT_PUBLIC_USE_LOGGER)) {
			console.groupEnd();
		}
	}

	static storeWatcher = (config, storeName) => (set, get, api) => {
		return config(
			(args) => {
				const beforeState = get();
				set(args);
				const currentState = get();

				if (JSON.parse(process.env.NEXT_PUBLIC_USE_LOGGER)) {
					const changer = reduce(
						beforeState,
						function (result, value, key) {
							const prevValue = currentState ? currentState[key] : undefined;
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

					if (changer.length > 0) {
						this.groupCollapsed('%cGlobal State Change Detected', 'color: teal; font-size : 14px;  font-weight : bold;', storeName);
						this.info(`%cBEFORE : `, 'color : green', beforeState);
						this.info('%cAFTER : ', 'color : yellow', currentState);
						this.info(`%cCHANGE : `, 'color : green', changer);
						this.groupEnd();
					}
				}
			},
			get,
			api,
		);
	};

	static httpWatcher(response) {
		const { config, status, data } = response;
		this.groupCollapsed('%cHTTP Call Results : ', 'color: olive; font-size : 14px;  font-weight : bold;', config?.url);
		this.info('%cSTATUS : ', 'color : green', status);
		this.info('%cDATA : ', 'color : yellow', data);
		this.groupEnd();
	}
}
