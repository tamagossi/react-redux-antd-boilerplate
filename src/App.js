import React, { Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import './styles/colors.css';
import './styles/global.css';

import AtomSpinner from './components/atoms/spinner';
import OrganismErrorBoundary from './components/organisms/error-boundary';
import routes from './routes';
import { useSelector } from 'react-redux';

const App = () => {
	const { isLoggedIn } = useSelector((state) => state.base);

	const renderRoutes = () => {
		return routes.map((route, idx) => {
			if (route.guard) {
				return (
					<Route
						key={idx}
						path={route.path}
						exact={route.exact}
						name={route.name}
						render={(props) =>
							isLoggedIn ? (
								<route.component {...props} />
							) : (
								<Redirect key={idx} to="/login" />
							)
						}
					/>
				);
			} else {
				return (
					<Route
						key={idx}
						path={route.path}
						exact={route.exact}
						name={route.name}
						render={(props) => <route.component {...props} />}
					/>
				);
			}
		});
	};

	return (
		<div className="App">
			<OrganismErrorBoundary>
				<Switch>
					<Suspense fallback={<AtomSpinner />}>
						{renderRoutes()}
					</Suspense>
					<Redirect to="/" />
				</Switch>
			</OrganismErrorBoundary>
		</div>
	);
};

export default App;
