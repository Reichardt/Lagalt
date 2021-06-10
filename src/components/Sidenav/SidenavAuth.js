import { useKeycloak } from '../../context/KeycloakContext';
import SidenavItem from './SidenavItem';
import {
	PersonCircle,
	BoxArrowRight,
	BoxArrowLeft,
	Envelope,
	HandThumbsUp,
} from 'react-bootstrap-icons';
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
				<>
					<SidenavItem
						title={'recommended'}
						icon={<HandThumbsUp />}
						link={'/recommended'}
					/>
					<SidenavItem
						title={'notifications'}
						icon={<Envelope />}
						link={'/notifications'}
					/>
					<SidenavItem
						title={'Profile'}
						link={'/profile/' + profile.username}
						icon={<PersonCircle />}
					/>
					<div
						className="d-flex align-items-center icon-wrapper logout"
						onClick={handleLogout}
					>
						<span>
							<BoxArrowLeft />
							<span className="ms-2">Logout</span>
						</span>
					</div>
				</>
			) : (
				<div
					className="d-flex align-items-center icon-wrapper login"
					onClick={handleLogin}
				>
					<span>
						<BoxArrowRight />
						<span className="ms-2">Login</span>
					</span>
				</div>
			)}
		</div>
	);
}

export default SidenavAuth;

const authStyles = {
	display: 'flex',
	flexDirection: 'column',
};
