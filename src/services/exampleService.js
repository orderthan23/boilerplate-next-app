import ServiceManager from '@lib/service';
import { HTTP } from '@lib/constant';
import axios from 'axios';

class ExampleService extends ServiceManager {
	static REQUEST_MAPPING = '/people';

	static TestAxios = axios.create({
		dataType: 'json',
		contentType: 'application/json; charset=UTF-8;',
		baseURL: `${process.env.NEXT_PUBLIC_API_PATH}`,
		validateStatus: false,
		// headers: { 'Content-Encoding': 'gzip' },
	});

	static fetchPeople() {
		return this.createOtherRequest(this.TestAxios, '', HTTP.METHOD.GET, {});
	}

	static fetchPerson({ personId }) {
		return this.createOtherRequest(this.TestAxios, `/${personId}`, HTTP.METHOD.GET, {});
	}

	static postPerson({ age, height, weight, name, job }) {
		return this.createOtherRequest(this.TestAxios, '', HTTP.METHOD.POST, { age, height, weight, name, job });
	}

	static putPerson({ personId, age, height, weight, name, job }) {
		return this.createOtherRequest(this.TestAxios, `/${personId}`, HTTP.METHOD.PUT, { age, height, weight, name, job });
	}

	static deletePerson({ personId }) {
		return this.createOtherRequest(this.TestAxios, `/${personId}`, HTTP.METHOD.DELETE, { personId });
	}
}

export default ExampleService;
