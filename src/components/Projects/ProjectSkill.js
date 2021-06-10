import { Fragment } from 'react';

function ProjectSkill({ skill }) {
	return (
		<Fragment>
			<span className="badge rounded-pill bg-primary text-white me-2">
				{skill.skillName}
			</span>
		</Fragment>
	);
}

export default ProjectSkill;
