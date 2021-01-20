/* eslint-disable no-undef */
let config = {
	API_URL: 'http://localhost:3000',
};

if (process.env.NODE_ENV === 'development') {
	config['API_URL'] = 'http://localhost:5000/api';
} else {
	config['API_URL'] = 'https://lms-api.indihomestudy.com/api';
}

export default config;
