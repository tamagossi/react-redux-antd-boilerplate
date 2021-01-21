/* eslint-disable no-undef */

import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { createStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';

import auth from './auth/reducer';

const persistConfig = {
	key: 'root',
	storage,
	whitelist: ['auth'],
};

const rootReducer = combineReducers({
	auth,
});

export const store = createStore(persistReducer(persistConfig, rootReducer));
export const persistor = persistStore(store);

export default { store, persistor };
