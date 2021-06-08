import Keycloak from 'keycloak-js';
import { createContext, useContext, useEffect, useState } from 'react';

const KeycloakContext = createContext();

export const useKeycloak = () => {
	return useContext(KeycloakContext);
};

export function KeycloakProvider({ children }) {
	const [keyCloak, setKeyCloak] = useState(null);
	const [initialising, setInitialising] = useState(true);
	const [error, setError] = useState('');

	const handleKeycloakInitSuccess = keycloak => {
		setKeyCloak(keycloak);
		setInitialising(false);
		if (keycloak.token) {
			localStorage.setItem('token', keycloak.token);
		}
	};

	const handleKeycloakInitError = error => {
		setError(error);
	};

	const Login = async () => {
		try {
			keyCloak.login();
		} catch (error) {
			setError(error);
		}
	};

	const Logout = () => {
		keyCloak.logout();
		localStorage.removeItem('token');
	};

	useEffect(() => {
		if (keyCloak !== null) return;

		const keycloak = new Keycloak('/keycloak.json');
		keycloak
			.init({ onLoad: 'check-sso' })
			.then(_ => handleKeycloakInitSuccess(keycloak))
			.catch(handleKeycloakInitError);
	}, []);

	useEffect(() => {
		if (keyCloak && keyCloak.authenticated) {
			setInterval(() => {
				keyCloak
					.updateToken(70)
					.then(refreshed => {
						if (refreshed) {
						} else {
						}
					})
					.catch(error => console.error(error));
			}, 6000);
		}
	}, [keyCloak]);

	const value = {
		keyCloak,
		initialising,
		Login,
		Logout,
	};

	return (
		<KeycloakContext.Provider value={value}>
			{!initialising && children}
		</KeycloakContext.Provider>
	);
}
