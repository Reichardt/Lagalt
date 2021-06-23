function ProjectAppModalSkill({ skill, toggleSkill }) {
	const handleCheck = () => {
		toggleSkill(skill);
	};

	return (
		<div className="form-check text-start" key={skill.id}>
			<input
				className="form-check-input me-3 custom-input"
				type="checkbox"
				checked={skill.checked}
				value={skill.id}
				name={skill.skillName}
				onChange={handleCheck}
			/>
			<label
				className="form-check-label text-capitalize"
				htmlFor="flexCheckDefault"
			>
				{skill.name}
			</label>
		</div>
	);
}

export default ProjectAppModalSkill;
