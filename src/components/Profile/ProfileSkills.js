import React from 'react';
import ProfileSkill from './ProfileSkill';

function ProfileSkills() {
	return (
		<div>
			<h2 className="text-primary">Skills</h2>
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
