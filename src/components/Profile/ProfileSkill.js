import React from 'react';

function ProfileSkill({ skill }) {
	return (
		<div className="profile-skill p-3 mt-4 border border-light shadow-sm rounded">
			<p className="mb-0">{skill}</p>
		</div>
	);
}

export default ProfileSkill;
