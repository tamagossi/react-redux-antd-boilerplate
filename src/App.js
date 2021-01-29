import React, { Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import './styles/colors.css';
import './styles/global.css';

import AtomSpinner from './components/atoms/spinner';
import OrganismErrorBoundary from './components/organisms/error-boundary';
import routes from './routes';
import { useSelector } from 'react-redux';

const generateRoutes = (route, pathPrefix, customRender) => {
	return (
		<Route
			key={route.name}
			path={pathPrefix ? `${pathPrefix}${route.path}` : route.path}
			exact={route.exact}
			name={route.name}
			render={
				customRender
					? customRender
					: (props) => <route.component {...props} />
			}
		/>
	);
};

const renderLoggedInComponent = (isLoggedIn, route) => {
	return (props) =>
		isLoggedIn ? (
			<route.component {...props} />
		) : (
			<Redirect key="login-redirect" to="/login" />
		);
};

const renderRoutes = (isLoggedIn) => {
	return routes.map((route) =>
		route.guard
			? route.children
				? route.children.map((child) =>
						generateRoutes(
							child,
							route.path,
							renderLoggedInComponent(isLoggedIn, child)
						)
				  )
				: generateRoutes(
						route,
						null,
						renderLoggedInComponent(isLoggedIn, route)
				  )
			: route.children
			? route.children.map((child) => generateRoutes(child, route.path))
			: generateRoutes(route)
	);
};

const App = () => {
	const { isLoggedIn } = useSelector((state) => state.auth);

	return (
		<div className="App">
			<OrganismErrorBoundary>
				<Switch>
					<Suspense fallback={<AtomSpinner />}>
						{renderRoutes(isLoggedIn)}
					</Suspense>
					<Redirect to="/" />
				</Switch>
			</OrganismErrorBoundary>
		</div>
	);
};

export default App;
