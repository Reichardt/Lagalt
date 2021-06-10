import { useState } from 'react';
import ProfileSkill from './ProfileSkill';

function ProfileSkills({ profile, profileParam }) {
	const [checked, setChecked] = useState(false);

	const handleSwitchChange = () => {
		setChecked(!checked);
	};

	return (
		<div>
			<div className="d-flex justify-content-between align-items-center pe-3">
				<h2 className="text-primary">Skills</h2>
				{profile && profileParam === profile.username && (
					<div className="form-check form-switch">
						<label>Edit skills</label>
						<input
							className="form-check-input "
							type="checkbox"
							id="flexSwitchCheckChecked"
							checked={checked}
							onChange={handleSwitchChange}
						/>
					</div>
				)}
			</div>
			<hr />
			<ProfileSkill skill={'Web development'} />
			<ProfileSkill skill={'Web development'} />
			<ProfileSkill skill={'Web development'} />
			<ProfileSkill skill={'Web development'} />
			<ProfileSkill skill={'Web development'} />
			<ProfileSkill skill={'Web development'} />
		</div>
	);
}

export default ProfileSkills;
