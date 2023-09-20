import { create } from 'zustand';
import CustomLogger from '@lib/console';
import { devtools, persist } from 'zustand/middleware';

import { isEqual } from 'lodash';
import { useEffect } from 'react';
import { immer } from 'zustand/middleware/immer';

export const zustandBuilder = (initialState, storeName) => {
	const storeNameWithMode = `${storeName}-${process.env.NEXT_PUBLIC_DEPLOY_MODE}`;
	return create(
		CustomLogger.storeWatcher(
			// (process.env.NEXT_PUBLIC_DEPLOY_MODE === 'local' ? devtools : (config) => config)
			devtools(
				immer(() => initialState),
				{ name: storeNameWithMode },
			),
			storeNameWithMode,
		),
	);
};

export const zustandLocalBuilder = (initialState, storeName) => {
	const storeNameWithMode = `${storeName}-${process.env.NEXT_PUBLIC_DEPLOY_MODE}`;
	return create(
		CustomLogger.storeWatcher(
			persist(
				(process.env.NEXT_PUBLIC_DEPLOY_MODE === 'local' ? devtools : (config) => config)(
					immer(() => initialState),
					{ name: storeNameWithMode },
				),
				{
					name: storeNameWithMode,
				},
			),
			storeNameWithMode,
		),
	);
};

export const zustandSessionBuilder = (initialState, storeName) => {
	const storeNameWithMode = `${storeName}-${process.env.NEXT_PUBLIC_DEPLOY_MODE}`;
	return create(
		CustomLogger.storeWatcher(
			persist(
				(process.env.NEXT_PUBLIC_DEPLOY_MODE === 'local' ? devtools : (config) => config)(
					immer(() => initialState),
					{ name: storeNameWithMode },
				),
				{
					name: storeNameWithMode,
					storage: window.sessionStorage,
				},
			),
			storeNameWithMode,
		),
	);
};

export const zustandMultiSelector = (storeHook) => {
	return (keys = []) => {
		return storeHook(
			(state) => {
				return keys.reduce(
					(acc, cur) => ({
						...acc,
						[cur]: state?.[cur],
					}),
					{},
				);
			},
			(a, b) => isEqual(a, b),
		);
	};
};

export const useZustandAction = (storeHook) => {
	return {
		setState: (stateChanger, actionType) => {
			return storeHook.setState(stateChanger, false, actionType);
		},

		getState(...something) {
			return storeHook.getState(...something);
		},
	};
};

export const useZustandResetUnmount = (storeHook, initialState) => {
	useEffect(() => {
		return () => {
			storeHook.setState(initialState, false, 'RESET');
		};
	}, []);
};

/**
 * @deprecated
 */
export class ZustandAction {
	/**
	 * @abstract
	 */
	zustandStore = new Error('zustandStore Must be override');

	chain() {
		return this;
	}

	/**
	 * zustand custom setter
	 * @param {function} stateChanger  전역 상태 변경 함수
	 * @param {string} actionType 발생할 액션의 이름
	 * @returns {*}
	 */
	setState(stateChanger, actionType) {
		return this.zustandStore.setState(stateChanger, false, actionType);
	}

	getState(...something) {
		return this.zustandStore?.getState(...something);
	}
}

export class ZustandManager {
	/**
	 * @deprecated
	 * @param initialState
	 * @param storeName
	 * @return {UseBoundStore<Mutate<StoreApi<State>, []>>}
	 */
	static localStorageStoreBuilder(initialState, storeName) {
		const storeNameWithMode = `${storeName}-${process.env.NEXT_PUBLIC_DEPLOY_MODE}`;
		return create(
			CustomLogger.storeWatcher(
				persist(
					(process.env.NEXT_PUBLIC_DEPLOY_MODE === 'local' ? devtools : (config) => config)(
						immer(() => initialState),
						{ name: storeNameWithMode },
					),
					{
						name: storeNameWithMode,
					},
				),
				storeNameWithMode,
			),
		);
	}

	/**
	 * @deprecated
	 * @param initialState
	 * @param storeName
	 * @return {UseBoundStore<Mutate<StoreApi<State>, []>>}
	 */
	static sessionStorageStoreBuilder(initialState, storeName) {
		const sessionStorageMiddleware = {
			getItem: async (key) => {
				const value = sessionStorage.getItem(key);
				return value ? JSON.parse(value) : null;
			},
			setItem: async (key, value) => {
				sessionStorage.setItem(key, JSON.stringify(value));
			},
			removeItem: async (key) => {
				sessionStorage.removeItem(key);
			},
		};
		const storeNameWithMode = `${storeName}-${process.env.NEXT_PUBLIC_DEPLOY_MODE}`;
		return create(
			CustomLogger.storeWatcher(
				persist(
					(process.env.NEXT_PUBLIC_DEPLOY_MODE === 'local' ? devtools : (config) => config)(
						immer(() => initialState),
						{ name: storeNameWithMode },
					),
					{
						name: storeNameWithMode,
						storage: sessionStorageMiddleware,
					},
				),
				storeNameWithMode,
			),
		);
	}

	/**
	 * @deprecated
	 * @param initialState
	 * @param storeName
	 * @return {UseBoundStore<Mutate<StoreApi<State>, []>>}
	 */
	static storeBuilder(initialState, storeName) {
		const storeNameWithMode = `${storeName}-${process.env.NEXT_PUBLIC_DEPLOY_MODE}`;
		return create(
			CustomLogger.storeWatcher(
				(process.env.NEXT_PUBLIC_DEPLOY_MODE === 'local' ? devtools : (config) => config)(
					immer(() => initialState),
					{ name: storeNameWithMode },
				),
				storeNameWithMode,
			),
		);
	}

	/**
	 * @deprecated
	 * @param storeHook
	 * @return {function([]=): *}
	 */
	static multiSelector(storeHook) {
		return (keys = []) => {
			return storeHook(
				(state) => {
					return keys.reduce(
						(acc, cur) => ({
							...acc,
							[cur]: state?.[cur],
						}),
						{},
					);
				},
				(a, b) => isEqual(a, b),
			);
		};
	}
}

export default ZustandManager;
