import RequestAdapterService from './request-adapter';

import store from '../stores/store';
import {
	setAuthToken,
	setCurrentUser,
	setLoginStatus,
} from '../stores/base/actions';

export default class AuthService extends RequestAdapterService {
	async login(credential) {
		try {
			const user = await super.sendPostRequest(
				`${this.baseUrl}/user/login`,
				credential
			);

			store.dispatch(setAuthToken(user.token));
			store.dispatch(setCurrentUser(user.data));
			store.dispatch(setLoginStatus(false));
		} catch (error) {
			throw new Error(`Login failed: ${error.response.data.message}`);
		}
	}

	logout() {
		store.dispatch(setAuthToken(null));
		store.dispatch(setCurrentUser(null));
		store.dispatch(setLoginStatus(false));
		super.overrideAuthToken(null);
	}
}
