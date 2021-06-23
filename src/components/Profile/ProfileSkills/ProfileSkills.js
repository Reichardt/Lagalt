import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import ProfileSkill from './ProfileSkill';
import uniqid from 'uniqid';
import { fetchAllSkills } from '../../../features/Skill/skillSlice';
import {
	setProfileSkills,
	updateProfileSkills,
} from '../../../features/Profile/profileSlice';
import { useKeycloak } from '../../../context/KeycloakContext';

function ProfileSkills({ profile, profileParam }) {
	const { keyCloak } = useKeycloak();
	const dispatch = useDispatch();

	const [state, setState] = useState({
		checked: false,
		skillOptions: [],
		skillsAdded: [],
		chosenSkill: null,
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

	return (
		<div>
			<div className="d-flex justify-content-between align-items-center pe-3">
				<h2 className="text-primary">Skills</h2>
				{profileParam && profile && profileParam.username === profile.username && (
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
