import ProfileImage from './ProfileImage';
import ProfileDesc from './ProfileDesc';
import ProfileSkills from './ProfileSkills';
import ProfilePortfolio from './ProfilePortfolio';

function MainProfile({ searchedUser, userProfile }) {
	return (
		<>
			{searchedUser !== null && (
				<>
					<div className="col-lg-9 bg-content border-bottom border-start border-end border-secondary profile">
						<div className="border-bottom border-secondary d-flex justify-content-between align-items-center text-darken p-3 profile-header">
							<p className="fw-bold m-0">Profile - {searchedUser.username}</p>
							{searchedUser &&
								userProfile.username === searchedUser.username && (
									<button className="btn btn-primary">View applications</button>
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
				</>
			)}
		</>
	);
}

export default MainProfile;
