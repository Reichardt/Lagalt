import { createContext, useContext, useEffect, useState } from 'react';
import { useKeycloak } from './KeycloakContext';

const ProfileContext = createContext();

export const useProfile = () => {
	return useContext(ProfileContext);
};

export function ProfileProvider({ children }) {
	const [profile, setProfile] = useState(null);
	const [loading, setLoading] = useState(true);
	const { keyCloak } = useKeycloak();

	useEffect(() => {
		if (!keyCloak.authenticated) {
			setLoading(false);
			return;
		}
		keyCloak.loadUserProfile().then(profile => {
			setLoading(false);
			setProfile(profile);
		});
	}, []);

	const value = {
		profile,
	};

	return (
		<ProfileContext.Provider value={value}>
			{!loading && children}
		</ProfileContext.Provider>
	);
}
