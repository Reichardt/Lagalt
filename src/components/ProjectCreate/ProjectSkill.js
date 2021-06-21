import { Trash } from 'react-bootstrap-icons';

function ProjectSkill({ skill, handleAmountChange, removeSkill }) {
	const handleChange = e => {
		if (e.target.value >= 1) {
			handleAmountChange(Number(e.target.value), skill.id);
		}
	};
	const handleDelete = () => {
		removeSkill(skill.id);
	};
	return (
		<div className="d-flex align-items-center justify-content-between mb-3 project-skill">
			<p className="mb-0">{skill.name}</p>
			<div className="d-flex align-items-center">
				<label htmlFor="amount-needed" className="form-label mb-0 me-2">
					People needed
				</label>
				<input
					value={skill.requiredCount}
					type="number"
					className="form-control me-3"
					onInput={handleChange}
					name="amount-needed"
				/>
				<Trash onClick={handleDelete} />
			</div>
		</div>
	);
}

export default ProjectSkill;
