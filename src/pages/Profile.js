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

function Profile({ match }) {
	const history = useHistory();
	const dispatch = useDispatch();
	const { searchedUser, searchedUserLoading } = useSelector(profileSelector);

	useEffect(() => {
		dispatch(getProfileByUsername(match.params.name))
			.then(user => {
				console.log(user);
			})
			.catch(err => {
				console.log(err);
			});
	}, []);

	useEffect(() => {
		console.log(searchedUser);
		console.log(searchedUserLoading);
	}, []);
	if (searchedUserLoading && !searchedUser) {
		return <Loader />;
	} else {
		return (
			<div className="container">
				<div className="d-flex">
					<Sidenav side={'left'} />
					{searchedUserLoading && !searchedUser && <Loader />}
					{!searchedUserLoading && searchedUser && <MainProfile />}
				</div>
			</div>
		);
	}
}

export default Profile;
