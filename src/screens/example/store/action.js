import { useExampleStore } from '@screens/example/store/store';
import { useZustandAction } from '@lib/zustand';

export const useExampleStoreAction = () => {
	const { setState } = useZustandAction(useExampleStore);

	return {
		setPeople: (people) => {
			setState((draft) => {
				draft.people = people;
			}, 'exampleStoreAction/setPeople');
		},
	};
};
