import { useState } from 'react';
import ProfileImage from './ProfileImage';
import profileImage from '../../../images/default_profile.png';
import { useKeycloak } from '../../../context/KeycloakContext';
import { updateProfileDesc } from '../../../features/Profile/profileSlice';
import { useDispatch } from 'react-redux';

function ProfileDesc({ profile, profileParam }) {
	const dispatch = useDispatch();
	const { keyCloak } = useKeycloak();
	const [checked, setChecked] = useState(false);
	const [state, setState] = useState({
		description: profileParam.description ? profileParam.description : '',
		imageUrl: profileParam.imageUrl ? profileParam.imageUrl : profileImage,
	});

	const handleSwitchChange = () => {
		setChecked(!checked);
		if (checked) {
			const profileData = {
				updatedProfile: {
					...profile,
					description: state.description,
					imageUrl: state.imageUrl,
				},
				token: keyCloak.token,
			};

			dispatch(updateProfileDesc(profileData));
		}
	};

	const renderTextDesc = () => {
		return (
			<>
				{state.description.length ? (
					<div className="ps-5 py-3 bg-secondary border-secondary border-top border-end border-bottom">
						<h5 className="mb-3 pe-3 text-capitalize">
							<span>About</span> {profileParam && profileParam.username}
						</h5>
						<hr />
						<p className="pe-3">{profileParam && state.description}</p>
					</div>
				) : (
					<p>This user has no description</p>
				)}
			</>
		);
	};

	const renderTextArea = () => {
		return (
			<div className="ps-5">
				<p>Description</p>
				<textarea
					className="form-control custom-input"
					value={state.description}
					onChange={e => setState({ ...state, description: e.target.value })}
				/>
			</div>
		);
	};

	return (
		<>
			<ProfileImage checked={checked} setState={setState} state={state} />
			<div className="profile-desc py-5 text-start">
				{checked ? renderTextArea() : renderTextDesc()}
				{profileParam && profile && profileParam.username === profile.username && (
					<div className="ps-5">
						<div className="form-check form-switch mt-3">
							<label>Edit description</label>
							<input
								className="form-check-input custom-input"
								type="checkbox"
								id="flexSwitchCheckChecked"
								checked={checked}
								onChange={handleSwitchChange}
							/>
						</div>
					</div>
				)}
			</div>
		</>
	);
}

export default ProfileDesc;
