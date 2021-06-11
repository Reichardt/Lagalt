import ProfileImage from './ProfileImage';
import ProfileDesc from './ProfileDesc';
import ProfileSkills from './ProfileSkills';
import ProfilePortfolio from './ProfilePortfolio';
import { useSelector } from 'react-redux';
import { profileSelector } from '../../features/Profile/profileSlice';

function MainProfile({ userParam }) {
	const { userProfile } = useSelector(profileSelector);

	return (
		<div className="col-lg-9 bg-content border-bottom border-start border-end border-secondary profile">
			<div className="border-bottom border-secondary d-flex justify-content-between align-items-center text-darken p-3 profile-header">
				{userProfile && (
					<p className="fw-bold m-0">Profile - {userProfile.username}</p>
				)}
				{userProfile && userProfile.username === userParam && (
					<button className="btn btn-primary">View applications</button>
				)}
			</div>
			<div className="row pt-5">
				<div className="col-lg-6 text-center">
					<ProfileImage profile={userProfile} profileParam={userParam} />
					<ProfileDesc profile={userProfile} profileParam={userParam} />
				</div>
				<div className="col-lg-6">
					<ProfileSkills profile={userProfile} profileParam={userParam} />
				</div>
			</div>
			<div className="row py-3 pb-5">
				<div className="col-lg-12">
					<ProfilePortfolio profile={userProfile} profileParam={userParam} />
				</div>
			</div>
		</div>
	);
}

export default MainProfile;
