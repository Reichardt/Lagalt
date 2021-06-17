import { useHistory } from 'react-router-dom';

function ProjectSkill({ skill }) {
	const history = useHistory();

	const handleSkillClick = e => {
		e.stopPropagation();
		history.push(`/category/${skill.skillName}`);
	};
	return (
		<>
			<span className="badge rounded-pill bg-primary text-white me-2 text-capitalize skill">
				<span className="me-1" onClick={handleSkillClick}>
					{skill.skillName}
				</span>
				<span>
					({skill.foundCount} / {skill.requiredCount})
				</span>
			</span>
		</>
	);
}

export default ProjectSkill;
