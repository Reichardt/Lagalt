import { useState } from 'react';
import ProfileImage from './ProfileImage';
import profileImage from '../../../images/default_profile.png';

function ProfileDesc({ profile, profileParam }) {
	const [checked, setChecked] = useState(false);
	const [state, setState] = useState({
		description: profileParam.description ? profileParam.description : '',
		imageUrl: profileParam.imageUrl ? profileParam.imageUrl : profileImage,
	});

	const handleSwitchChange = () => {
		setChecked(!checked);
	};

	const renderTextDesc = () => {
		return <p>{profileParam && state.description}</p>;
	};

	const renderTextArea = () => {
		return (
			<>
				<p>Description</p>
				<textarea
					className="form-control"
					value={state.description}
					onChange={e => setState({ ...state, description: e.target.value })}
				/>
			</>
		);
	};

	return (
		<>
			<ProfileImage checked={checked} setState={setState} state={state} />
			<div className="profile-desc ps-5 py-5 text-start">
				{checked ? renderTextArea() : renderTextDesc()}
				{profileParam && profile && profileParam.username === profile.username && (
					<div className="form-check form-switch">
						<label>Edit description</label>
						<input
							className="form-check-input custom-input"
							type="checkbox"
							id="flexSwitchCheckChecked"
							checked={checked}
							onChange={handleSwitchChange}
						/>
					</div>
				)}
			</div>
		</>
	);
}

export default ProfileDesc;
