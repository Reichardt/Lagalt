import React from 'react';
import profileImage from '../../../images/default_profile.png';

function ProfileImage() {
	return (
		<div className="profile-img">
			<img className="rounded-circle" src={profileImage} alt="profile" />
		</div>
	);
}

export default ProfileImage;
