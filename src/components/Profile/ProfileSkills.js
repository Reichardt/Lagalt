import { useState } from 'react';
import ProfileSkill from './ProfileSkill';
import uniqid from 'uniqid';

function ProfileSkills({ profile, profileParam }) {
	const [state, setState] = useState({
		checked: false,
		options: ['Web development', 'Music', 'Game development'],
		skills: [
			{
				id: uniqid(),
				title: 'Web development',
			},
		],
		chosenSkill: null,
	});

	const handleSwitchChange = () => {
		setState({
			...state,
			checked: !state.checked,
			options: state.options.filter(option =>
				state.skills.some(skill => skill.title !== option)
			),
		});
	};

	const addNewSkill = () => {
		if (state.chosenSkill) {
			setState({
				...state,
				skills: [
					...state.skills,
					{
						id: uniqid(),
						title: state.chosenSkill,
					},
				],
				options: state.options.filter(
					option => !option.includes(state.chosenSkill)
				),
				chosenSkill: null,
			});
		}
	};

	const removeSkill = idToRemove => {
		const skill = state.skills.filter(skill => skill.id === idToRemove);
		setState({
			...state,
			skills: state.skills.filter(skill => skill.id !== idToRemove),
			options: [...state.options, skill[0].title],
		});
	};

	const handleSelectChange = e => {
		setState({
			...state,
			chosenSkill: e.target.value !== '0' ? e.target.value : null,
		});
	};

	return (
		<div>
			<div className="d-flex justify-content-between align-items-center pe-3">
				<h2 className="text-primary">Skills</h2>
				{profileParam && profileParam.username === profile.username && (
					<div className="form-check form-switch">
						<label>Edit skills</label>
						<input
							className="form-check-input "
							type="checkbox"
							checked={state.checked}
							onChange={handleSwitchChange}
						/>
					</div>
				)}
			</div>
			<hr />
			{state.checked && (
				<div className="d-flex justify-content-between align-items-center pe-3 mt-4">
					<select
						className="form-select"
						aria-label="Default select example"
						onChange={handleSelectChange}
					>
						<option value="0">Choose skill</option>
						{state.options.map((option, index) => (
							<option key={`${option}-${index}`} value={option}>
								{option}
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
			{state.skills.map(skill => (
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
