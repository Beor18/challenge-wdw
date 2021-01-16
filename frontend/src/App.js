import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import routes from './config/routes';
import { AuthProvider } from './context';
import AppRoute from './components/appRoute';

function App() {
	return (
		<AuthProvider>
			<Router>
				<Switch>
					{routes.map((route) => (
						<AppRoute
							key={route.path}
							path={route.path}
							component={route.component}
							isPrivate={route.isPrivate}
						/>
					))}
				</Switch>
			</Router>
		</AuthProvider>
	);
}

export default App;