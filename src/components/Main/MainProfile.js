import React, { useState } from 'react';
import { useProfile } from '../../context/ProfileContext';
import ProfileImage from '../Profile/ProfileImage';
import ProfileDesc from '../Profile/ProfileDesc';
import ProfileSkills from '../Profile/ProfileSkills';
import ProfilePortfolio from '../Profile/ProfilePortfolio';

function MainProfile({ userParam }) {
	const { profile } = useProfile();
	const [checked, setChecked] = useState(false);

	const handleSwitchChange = () => {
		setChecked(!checked);
	};

	return (
		<div className="right-column border-bottom border-start border-end border-secondary">
			<div className="bg-content border-bottom border-secondary d-flex justify-content-between text-darken p-3">
				{profile && userParam == profile.username && (
					<>
						<p className="fw-bold m-0">Profile - {profile.username}</p>
						<div className="form-check form-switch">
							<input
								className="form-check-input "
								type="checkbox"
								id="flexSwitchCheckChecked"
								checked={checked}
								onChange={handleSwitchChange}
							/>
						</div>
					</>
				)}
			</div>
			<div className="row pt-5">
				<div className="col-lg-6 text-center">
					<ProfileImage />
					<ProfileDesc />
				</div>
				<div className="col-lg-6">
					<ProfileSkills />
				</div>
			</div>
			<div className="row py-3 pb-5">
				<div className="col-lg-12">
					<ProfilePortfolio />
				</div>
			</div>
		</div>
	);
}

export default MainProfile;
