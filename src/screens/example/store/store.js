import { useZustandResetUnmount, zustandBuilder } from '@lib/zustand';

export const exampleInitialState = {
	people: [],
};

export const useExampleStore = zustandBuilder(exampleInitialState, 'exampleStore');

export const useExampleStoreReset = () => useZustandResetUnmount(useExampleStore, exampleInitialState);
