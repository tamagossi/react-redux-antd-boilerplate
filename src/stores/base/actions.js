import BaseTypes from './types';

const setAuthToken = (payload) => ({
	type: BaseTypes.SET_AUTH_TOKEN,
	payload,
});
const setCurrentUser = (payload) => ({
	type: BaseTypes.SET_CURRENT_USER,
	payload,
});
const setLoginStatus = (payload) => ({
	type: BaseTypes.SET_LOGIN_STATUS,
	payload,
});
const setSideVisibility = (payload) => ({
	type: BaseTypes.SET_SIDER_STATUS,
	payload,
});

export { setAuthToken, setCurrentUser, setLoginStatus, setSideVisibility };
