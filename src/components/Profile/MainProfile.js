import ProfileImage from './ProfileImage';
import ProfileDesc from './ProfileDesc';
import ProfileSkills from './ProfileSkills';
import ProfilePortfolio from './ProfilePortfolio';
import { useSelector } from 'react-redux';
import { profileSelector } from '../../features/Profile/profileSlice';

function MainProfile({ userParam }) {
	const { profile } = useSelector(profileSelector);

	return (
		<div className="col-lg-9 bg-content border-bottom border-start border-end border-secondary">
			<div className="border-bottom border-secondary d-flex justify-content-between text-darken p-3">
				{profile && <p className="fw-bold m-0">Profile - {profile.username}</p>}
			</div>
			<div className="row pt-5">
				<div className="col-lg-6 text-center">
					<ProfileImage profile={profile} profileParam={userParam} />
					<ProfileDesc profile={profile} profileParam={userParam} />
				</div>
				<div className="col-lg-6">
					<ProfileSkills profile={profile} profileParam={userParam} />
				</div>
			</div>
			<div className="row py-3 pb-5">
				<div className="col-lg-12">
					<ProfilePortfolio profile={profile} profileParam={userParam} />
				</div>
			</div>
		</div>
	);
}

export default MainProfile;
