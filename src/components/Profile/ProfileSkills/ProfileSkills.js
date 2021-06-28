import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import ProfileSkill from './ProfileSkill';
import uniqid from 'uniqid';
import { fetchAllSkills } from '../../../features/Skill/skillSlice';
import {
	setProfileSkills,
	updateProfileSkills,
	updateProfileDesc,
} from '../../../features/Profile/profileSlice';
import { useKeycloak } from '../../../context/KeycloakContext';
import { EyeFill, Eye } from 'react-bootstrap-icons';

function ProfileSkills({ profile, profileParam }) {
	const { keyCloak } = useKeycloak();
	const dispatch = useDispatch();

	const [state, setState] = useState({
		checked: false,
		skillOptions: [],
		skillsAdded: [],
		chosenSkill: null,
		skillsHidden: profileParam.isSkillsHidden,
	});

	useEffect(() => {
		dispatch(fetchAllSkills()).then(res => {
			setState({
				...state,
				skillOptions: res.payload.filter(so =>
					profileParam.skills.every(pskill => pskill.id !== so.id)
				),
				skillsAdded: res.payload.filter(so =>
					profileParam.skills.some(pskill => pskill.id === so.id)
				),
			});
		});

		return () => {
			setState();
		};
		// eslint-disable-next-line
	}, [dispatch]);

	const handleSwitchChange = () => {
		setState({
			...state,
			checked: !state.checked,
			skillOptions: state.skillsAdded.length
				? state.skillOptions.filter(option =>
						state.skillsAdded.some(skill => skill.name !== option.name)
				  )
				: state.skillOptions,
		});
		if (state.checked) {
			const skillIds = state.skillsAdded.map(skill => skill.id);
			dispatch(
				updateProfileSkills([skillIds, keyCloak.subject, keyCloak.token])
			);
			dispatch(setProfileSkills(state.skillsAdded));
		}
	};

	const addNewSkill = () => {
		if (state.chosenSkill) {
			setState({
				...state,
				skillsAdded: [...state.skillsAdded, state.chosenSkill],
				skillOptions: state.skillOptions.filter(
					option => !option.name.includes(state.chosenSkill.name)
				),
				chosenSkill: null,
			});
		}
	};

	const removeSkill = idToRemove => {
		const skill = state.skillsAdded.filter(skill => skill.id === idToRemove);
		setState({
			...state,
			skillsAdded: state.skillsAdded.filter(skill => skill.id !== idToRemove),
			skillOptions: [...state.skillOptions, skill[0]],
		});
	};

	const handleSelectChange = e => {
		const selectedSkill = state.skillOptions.find(
			skill => skill.id === Number(e.target.value)
		);
		setState({
			...state,
			chosenSkill: e.target.value !== '0' ? selectedSkill : null,
		});
	};

	const toggleSkills = bool => {
		const profileData = {
			updatedProfile: {
				...profileParam,
				isSkillsHidden: bool,
			},
			token: keyCloak.token,
		};
		dispatch(updateProfileDesc(profileData)).then(res => {
			setState({
				...state,
				skillsHidden: bool,
			});
		});
	};

	return (
		<div>
			<div className="d-flex justify-content-between align-items-center pe-3">
				<div className="d-flex align-items-center">
					<h2 className="text-primary mb-0 me-2">Skills</h2>
					{profileParam &&
						state &&
						(state.skillsHidden ? (
							<Eye onClick={() => toggleSkills(false)} />
						) : (
							<EyeFill onClick={() => toggleSkills(true)} />
						))}
				</div>
				{profileParam &&
					profile &&
					profileParam.username === profile.username &&
					state &&
					!state.skillsHidden && (
						<div className="form-check form-switch">
							<label>Edit skills</label>
							<input
								className="form-check-input custom-input"
								type="checkbox"
								checked={state && state.checked}
								onChange={handleSwitchChange}
							/>
						</div>
					)}
			</div>
			<hr />
			{state && state.checked && (
				<div className="d-flex justify-content-between align-items-center pe-3 mt-4">
					<select
						className="form-select"
						aria-label="Default select example"
						onChange={handleSelectChange}
						value={state.chosenSkill ? state.chosenSkill.id : '0'}
					>
						<option value="0">Choose skill</option>
						{state.skillOptions.map((option, index) => (
							<option key={`${option}-${index}`} value={option.id}>
								{option.name}
							</option>
						))}
					</select>
					<button
						className="btn btn-primary"
						disabled={!state.chosenSkill}
						onClick={addNewSkill}
					>
						Add skill
					</button>
				</div>
			)}
			{state &&
				!state.skillsHidden &&
				state.skillsAdded.map(skill => (
					<ProfileSkill
						skill={skill}
						checked={state.checked}
						removeSkill={removeSkill}
						key={uniqid()}
					/>
				))}
		</div>
	);
}

export default ProfileSkills;
