import { useState } from 'react';

function ProfileDesc({ profile, profileParam }) {
	const [checked, setChecked] = useState(false);

	const handleSwitchChange = () => {
		setChecked(!checked);
	};

	const renderTextDesc = () => {
		return <p>{profileParam && profileParam.description}</p>;
	};

	const renderTextArea = () => {
		return (
			<textarea
				className="form-control"
				defaultValue={profileParam.description}
			/>
		);
	};

	return (
		<div className="profile-desc ps-5 py-5 text-start">
			{checked ? renderTextArea() : renderTextDesc()}
			{profileParam && profileParam.username === profile.username && (
				<div className="form-check form-switch">
					<label>Edit description</label>
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
	);
}

export default ProfileDesc;
