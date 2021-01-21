import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';

import 'antd/dist/antd.css';
import 'tachyons';

import App from './App';
import reportWebVitals from './reportWebVitals';
import { persistor, store } from './stores/store';

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<PersistGate persistor={persistor}>
				<HelmetProvider>
					<App />
				</HelmetProvider>
			</PersistGate>
		</BrowserRouter>
	</Provider>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
