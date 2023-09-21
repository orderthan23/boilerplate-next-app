import { useCustomMutation, useCustomQuery } from '@lib/hooks/query';
import { QueryKeys } from '@constants/query';
import { useQueryClient } from '@tanstack/react-query';
import ExampleService from '@service/exampleService';

const ExampleQuery = {
	usePeople: (options = {}) => {
		const { data, isError, isLoading } = useCustomQuery({
			queryKey: [...QueryKeys.PEOPLE_LIST_QUERY],
			queryFn: async () => {
				const { data = [] } = await ExampleService.fetchPeople();
				return data;
			},
			...options,
		});
		return {
			data,
			isError,
			isLoading,
		};
	},

	usePerson: (personId, options = {}) => {
		const { data, isError, isLoading } = useCustomQuery({
			queryKey: [...QueryKeys.PERSON_QUERY, personId],
			queryFn: async () => {
				if (personId) {
					const { data = null } = await ExampleService.fetchPerson({ personId });
					return data;
				}

				return {
					name: '',
					age: 10,
					weight: 50,
					height: 150,
					job: '',
				};
			},
			...options,
		});
		return { data, isError, isLoading };
	},

	useClear: () => {
		const queryClient = useQueryClient();
		return () => {
			queryClient.invalidateQueries([...QueryKeys.EXAMPLE_QUERY_GROUP]);
		};
	},

	usePost: (options) => {
		const { mutate } = useCustomMutation({
			mutationFn: (person) => ExampleService.postPerson(person),
			...options,
		});

		return mutate;
	},

	usePut: (options) => {
		const { mutate } = useCustomMutation({
			mutationFn: (person) => ExampleService.putPerson(person),
			...options,
		});

		return mutate;
	},

	useDelete: (options) => {
		const { mutate } = useCustomMutation({
			mutationFn: (personId) => ExampleService.deletePerson({ personId }),
			...options,
		});

		return mutate;
	},
};

export default ExampleQuery;
