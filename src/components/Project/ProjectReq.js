import { useState } from 'react';

function ProjectReq({ skill }) {
	const [required] = useState(skill.requiredCount - skill.foundCount);

	return (
		<>
			<p className="mb-2">
				<span>{required}</span>
				{required > 1 ? ' people' : ' person'} that knows{' '}
				<span>{skill.skillName}</span>
			</p>
		</>
	);
}

export default ProjectReq;
