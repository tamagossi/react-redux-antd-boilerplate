import axios from 'axios';

import config from '../config';
import { store } from '../stores/store';
import { setAuthToken } from '../stores/base/actions';

export default class RequestAdapterService {
	constructor() {
		const {
			base: { token },
		} = store.getState();

		this.baseUrl = config.API_URL;
		let headers = {
			'Content-Type': 'application/json',
		};

		if (token !== null) headers['Authorization'] = `Bearer ${token}`;

		this.reqClient = axios.create({ headers });
		this.reqClient.interceptors.response.use(
			(response) => response,
			(error) => {
				if (error.response)
					if (error.response.status === 401)
						store.dispatch(setAuthToken(null));

				throw error;
			}
		);
	}

	overrideAuthToken(token) {
		this.reqClient.defaults.headers.common[
			'Authorization'
		] = `Bearer ${token}`;
		return true;
	}

	sendDeleteRequest(URL, requestBody) {
		return this.reqClient.delete(URL, requestBody);
	}

	sendGetRequest(URL, params) {
		return this.reqClient.get(URL, { params });
	}

	sendPostMultipartRequest(URL, formData) {
		return this.reqClient.post(URL, formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});
	}

	sendPostRequest(URL, requestBody, withoutDestructuring = false) {
		if (withoutDestructuring) {
			return this.reqClient.post(URL, requestBody);
		} else {
			return this.reqClient.post(URL, { ...requestBody });
		}
	}

	sendPutRequest(URL, requestBody) {
		return this.reqClient.put(URL, requestBody);
	}

	static getURLParams = (url) => {
		const searchParams = new URLSearchParams(url);
		const params = {};
		for (let param of searchParams) params[param[0]] = param[1];

		return params;
	};
}
