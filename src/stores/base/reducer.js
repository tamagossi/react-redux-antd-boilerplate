import BaseTypes from './types';

const INITIAL_STATE = {
	isSiderVisible: true,
	isLoggedIn: false,
	token: '',
	user: {
		id: null,
		name: 'John Doe',
	},
};

const baseReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case BaseTypes.SET_AUTH_TOKEN:
			return {
				...state,
				token: action.payload,
			};
		case BaseTypes.SET_CURRENT_USER:
			return {
				...state,
				user: action.payload,
			};
		case BaseTypes.SET_LOGIN_STATUS:
			return {
				...state,
				isLoggedIn: action.payload,
			};
		case BaseTypes.SET_SIDER_VISIBILITY:
			return {
				...state,
				isSiderVisible: action.payload,
			};
		default:
			return state;
	}
};

export default baseReducer;
