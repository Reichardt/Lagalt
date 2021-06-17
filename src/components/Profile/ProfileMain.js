import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ProfileImage from './ProfileImage';
import ProfileDesc from './ProfileDesc';
import ProfileSkills from './ProfileSkills';
import ProfilePortfolio from './ProfilePortfolio';
import { useDispatch, useSelector } from 'react-redux';
import {
	getProfileByUsername,
	profileSelector,
} from '../../features/Profile/profileSlice';
import Loader from '../Global/Loader';
import ProfileAppModal from './ProfileAppModal';

function ProfileMain({ username }) {
	const [show, setShow] = useState(false);
	const history = useHistory();
	const dispatch = useDispatch();
	const { searchedUser, searchedUserLoading, userProfile } =
		useSelector(profileSelector);
	const handleShow = () => setShow(true);
	const handleClose = () => setShow(false);

	useEffect(() => {
		dispatch(getProfileByUsername(username)).then(profile => {
			if (!profile.payload) {
				history.push('/404');
			}
		});
	}, [username]);

	return (
		<>
			{searchedUserLoading && <Loader />}
			{searchedUser && (
				<>
					<div className="col-lg-9 bg-content border-bottom border-start border-end border-secondary profile">
						<div className="border-bottom border-secondary d-flex justify-content-between align-items-center text-darken p-3 profile-header">
							<p className="fw-bold m-0">Profile - {searchedUser.username}</p>
							{searchedUser &&
								userProfile &&
								userProfile.username === searchedUser.username && (
									<button className="btn btn-primary" onClick={handleShow}>
										View applications
									</button>
								)}
						</div>
						<div className="row pt-5">
							<div className="col-lg-6 text-center">
								<ProfileImage
									profile={userProfile}
									profileParam={searchedUser}
								/>
								<ProfileDesc
									profile={userProfile}
									profileParam={searchedUser}
								/>
							</div>
							<div className="col-lg-6">
								<ProfileSkills
									profile={userProfile}
									profileParam={searchedUser}
								/>
							</div>
						</div>
						<div className="row py-3 pb-5">
							<div className="col-lg-12">
								<ProfilePortfolio
									profile={userProfile}
									profileParam={searchedUser}
								/>
							</div>
						</div>
					</div>
					{show && <ProfileAppModal show={show} handleClose={handleClose} />}
				</>
			)}
		</>
	);
}

export default ProfileMain;
