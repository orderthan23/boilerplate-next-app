import ServiceManager from '@lib/service';
import { HTTP } from '@lib/constant';
import axios from 'axios';

class ExampleService extends ServiceManager {
	static REQUEST_MAPPING = '/gateway/shop';

	static fetchReviewList({ productCodes }) {
		const thirdPartyAxios = axios.create({
			dataType: 'json',
			contentType: 'application/json; charset=UTF-8;',
			baseURL: `${process.env.NEXT_PUBLIC_API_PATH}`,
			validateStatus: false,
			headers: { 'Content-Encoding': 'gzip', authToken: process.env.NEXT_PUBLIC_GATEWAY_TOKEN },
		});
		return this.createOtherRequest(thirdPartyAxios, '/reviewList.json', HTTP.METHOD.GET, { product_codes: productCodes });
	}
}

export default ExampleService;
