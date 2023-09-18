import { useCallback } from 'react';

class ReducerManager {
	static reducerBuilder(draft, action, reducerMap = null) {
		if (reducerMap) {
			return reducerMap[action.type]?.(draft, action) || draft;
		} else {
			Object.keys(action).forEach((key) => (draft[key] = action[key]));
		}
	}

	static combineActions(...actions) {
		return actions.reduce((newAction, action) => ({ ...action, ...newAction }), {});
	}

	static combineReducers =
		(...reducers) =>
		(prevState, value) =>
			reducers.reduce((newState, reducer) => reducer(newState, value), prevState);

	static actionBuilder(Actions = {}, dispatch) {
		const eventObj = {};
		Object.values(Actions).forEach((action) => {
			eventObj[action.name] = useCallback((...value) => dispatch(action(...value)), [dispatch]);
		});
		return eventObj;
	}
}

export default ReducerManager;
