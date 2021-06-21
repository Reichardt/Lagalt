import { useState } from 'react';

function ProjectReq({ skill }) {
	const [required] = useState(skill.requiredCount - skill.foundCount);

	return (
		<>
			<p className="mb-2 p-3 rounded border-secondary border">
				<span>{required}</span>
				{required > 1 ? ' people' : ' person'} that knows{' '}
				<span className="fst-italic">{skill.skillName}</span>
			</p>
		</>
	);
}

export default ProjectReq;
