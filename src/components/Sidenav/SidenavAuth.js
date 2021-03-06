import { useKeycloak } from '../../context/KeycloakContext';
import SidenavItem from './SidenavItem';
import {
	PersonCircle,
	BoxArrowRight,
	BoxArrowLeft,
	FileEarmarkText,
	HandThumbsUp,
} from 'react-bootstrap-icons';
import { useDispatch, useSelector } from 'react-redux';
import {
	profileSelector,
	addNewProfile,
	getProfileById,
	setProfile,
	getProfileProjects,
	setProfileProjects,
} from '../../features/Profile/profileSlice';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function SidenavAuth() {
	const { keyCloak, Login, Logout } = useKeycloak();
	const dispatch = useDispatch();
	const { userProfile, loading, projects } = useSelector(profileSelector);
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
						dispatch(setProfileProjects([]));
					} else {
						dispatch(getProfileProjects(user.payload.username));
					}
				});
			});
		}
		// eslint-disable-next-line
	}, [dispatch, keyCloak]);

	return (
		<>
			<div style={authStyles} className="icon-wrapper mt-3 position-relative">
				{userProfile && !loading ? (
					<>
						<SidenavItem
							title={'recommended'}
							icon={<HandThumbsUp />}
							link={'/recommended'}
						/>
						<SidenavItem
							title={'projects'}
							icon={<FileEarmarkText />}
							link={'/projects'}
							projects={projects}
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
