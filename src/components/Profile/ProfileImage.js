import React from 'react';
import profileImage from '../../profile.jpg';

function ProfileImage() {
	return (
		<div className="profile-img">
			<img className="rounded-circle" src={profileImage} alt="profile" />
		</div>
	);
}

export default ProfileImage;