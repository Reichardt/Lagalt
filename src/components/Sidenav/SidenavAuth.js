import React from 'react';
import { useKeycloak } from '../../context/KeycloakContext';
import { useProfile } from '../../context/ProfileContext';
import SidenavItem from './SidenavItem';
import { FaUserCircle } from 'react-icons/fa';

function SidenavAuth() {
	const { keyCloak, Login, Logout } = useKeycloak();
	const { profile } = useProfile();

	const handleLogin = () => {
		Login();
	};

	const handleLogout = () => {
		Logout();
	};

	return (
		<div style={authStyles} className="icon-wrapper mt-3">
			{keyCloak.authenticated ? (
				<>
					<SidenavItem
						title={'Profile'}
						link={'/profile/' + profile.username}
						icon={<FaUserCircle />}
					/>
					<button
						className="btn btn-primary text-center"
						onClick={handleLogout}
					>
						Logout
					</button>
				</>
			) : (
				<button className="btn btn-primary text-center" onClick={handleLogin}>
					Log in
				</button>
			)}
		</div>
	);
}

export default SidenavAuth;

const authStyles = {
	display: 'flex',
	flexDirection: 'column',
};
