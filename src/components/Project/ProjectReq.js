import { useState } from 'react';

function ProjectReq({ skill }) {
	const [required] = useState(skill.requiredCount - skill.foundCount);

	return (
		<li>
			<p className="mb-2 required-skill">
				<span>{required}</span>
				{required > 1 ? ' people' : ' person'} that knows{' '}
				<span>{skill.skillName}</span>
			</p>
		</li>
	);
}

export default ProjectReq;
