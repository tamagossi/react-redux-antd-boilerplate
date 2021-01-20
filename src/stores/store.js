/* eslint-disable no-undef */

import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { createStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';

import base from './base/reducer';

const persistConfig = {
	key: 'root',
	storage,
	whitelist: ['base'],
};

const rootReducer = combineReducers({
	base,
});

export const store = createStore(persistReducer(persistConfig, rootReducer));
export const persistor = persistStore(store);

export default { store, persistor };
