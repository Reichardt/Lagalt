import React from 'react';
import { Route } from 'react-router-dom';
import { useKeycloak } from '../context/KeycloakContext';

const ProtectedRoute = ({ component: Component, ...rest }) => {
	const { keyCloak } = useKeycloak();

	return (
		<Route
			{...rest}
			render={props => {
				return keyCloak.authenticated ? (
					<Component {...props} />
				) : (
					keyCloak.login()
				);
			}}
		></Route>
	);
};

export default ProtectedRoute;
