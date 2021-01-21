import AuthTypes from './types';

const setAuthToken = (payload) => ({
	type: AuthTypes.SET_AUTH_TOKEN,
	payload,
});
const setCurrentUser = (payload) => ({
	type: AuthTypes.SET_CURRENT_USER,
	payload,
});
const setLoginStatus = (payload) => ({
	type: AuthTypes.SET_LOGIN_STATUS,
	payload,
});

export { setAuthToken, setCurrentUser, setLoginStatus };
