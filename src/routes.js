import React from 'react';

const routes = [
	{
		component: React.lazy(() => import('./pages/example')),
		exact: true,
		name: 'Example Pages',
		path: '/example',
	},
];

export default routes;
