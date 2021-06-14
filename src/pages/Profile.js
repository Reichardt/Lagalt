import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import Sidenav from '../components/Sidenav/Sidenav';
import MainProfile from '../components/Profile/MainProfile';
import Loader from '../components/Global/Loader';
import { useDispatch, useSelector } from 'react-redux';
import {
	getProfileByUsername,
	profileSelector,
} from '../features/Profile/profileSlice';
import TestComponent from '../components/Profile/TestComponent';

function Profile({ match }) {
	const history = useHistory();
	const dispatch = useDispatch();
	const { searchedUser, searchedUserLoading, userProfile } =
		useSelector(profileSelector);

	useEffect(() => {
		dispatch(getProfileByUsername(match.params.name));
	}, []);

	return (
		<div className="container">
			<div className="d-flex">
				<Sidenav side={'left'} />
				{searchedUserLoading && !searchedUser && <Loader />}
				{!searchedUserLoading && searchedUser && (
					<TestComponent
						searchedUser={searchedUser}
						userProfile={userProfile}
					/>
				)}
			</div>
		</div>
	);
}

export default Profile;
