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
	profileSelector,
	addNewProfile,
	getProfileById,
	setProfile,
	getProfileApplications,
} from '../../features/Profile/profileSlice';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Loader from '../Global/Loader';

function SidenavAuth() {
	const { keyCloak, Login, Logout } = useKeycloak();
	const dispatch = useDispatch();
	const { userProfile, loading, applications } = useSelector(profileSelector);
	const history = useHistory();

	const handleLogin = () => {
		Login();
	};

	const handleLogout = () => {
		history.push('/');
		dispatch(setProfile(null));
		Logout();
	};

	useEffect(() => {
		if (keyCloak.authenticated && !userProfile) {
			keyCloak.loadUserProfile().then(profile => {
				dispatch(getProfileById(keyCloak.subject)).then(user => {
					if (!user.payload) {
						dispatch(addNewProfile([profile, keyCloak.token]));
					}
					dispatch(getProfileApplications(user.payload.name));
				});
			});
		}
	}, [dispatch, keyCloak, userProfile]);

	return (
		<>
			<div style={authStyles} className="icon-wrapper mt-3 position-relative">
				{loading && <Loader styles={loaderStyles} />}
				{keyCloak.authenticated && userProfile && !loading ? (
					<>
						<SidenavItem
							title={'recommended'}
							icon={<HandThumbsUp />}
							link={'/recommended'}
						/>
						<SidenavItem
							title={'projects' + applications.length}
							icon={<Envelope />}
							link={'/projects'}
						/>
						<SidenavItem
							title={'Profile'}
							link={'/profile/' + userProfile.username}
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
		</>
	);
}

export default SidenavAuth;

const authStyles = {
	display: 'flex',
	flexDirection: 'column',
};

const loaderStyles = {
	top: '50%',
	left: '50%',
};
