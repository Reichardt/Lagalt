import { Fragment } from 'react';

function ProjectSkill({ skill }) {
	return (
		<Fragment>
			<span className="badge rounded-pill bg-primary text-white me-2 text-capitalize">
				{skill.skillName}{' '}
				<span>
					({skill.foundCount} / {skill.requiredCount})
				</span>
			</span>
		</Fragment>
	);
}

export default ProjectSkill;
