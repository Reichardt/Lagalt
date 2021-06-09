import { useKeycloak } from '../../context/KeycloakContext';
import SidenavItem from './SidenavItem';
import { FaUserCircle } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import {
	setProfile,
	setId,
	profileSelector,
} from '../../features/Profile/profileSlice';
import { useEffect } from 'react';

function SidenavAuth() {
	const { keyCloak, Login, Logout } = useKeycloak();
	const dispatch = useDispatch();
	const { profile } = useSelector(profileSelector);

	const handleLogin = () => {
		Login();
	};

	const handleLogout = () => {
		Logout();
	};

	useEffect(() => {
		if (keyCloak.authenticated) {
			keyCloak.loadUserProfile().then(profile => {
				dispatch(setId(keyCloak.subject));
				dispatch(setProfile(profile));
			});
		}
	}, [dispatch, keyCloak]);

	return (
		<div style={authStyles} className="icon-wrapper mt-3">
			{keyCloak.authenticated && profile ? (
				<div className="d-flex justify-content-between align-items-center">
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
				</div>
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
