function ProjectReq({ skill }) {
	return (
		<>
			{skill.requiredCount !== skill.foundCount && (
				<li>
					<p className="mb-2 required-skill">
						<span>{skill.requiredCount - skill.foundCount}</span>
						{skill.requiredCount - skill.foundCount > 1
							? ' people'
							: ' person'}{' '}
						that knows <span>{skill.skillName}</span>
					</p>
				</li>
			)}
		</>
	);
}

export default ProjectReq;
