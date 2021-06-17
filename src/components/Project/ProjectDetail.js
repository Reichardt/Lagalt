import ProjectReq from './ProjectReq';

function ProjectDetail({ project }) {
	return (
		<div className="col-lg-6">
			<div className="px-3 project-details">
				<h3 className="pb-2">{project.title}</h3>
				<p>We're currently looking for</p>
				<div className="mt-3 required">
					{project.skills.map(skill => (
						<ProjectReq skill={skill} key={skill.id} />
					))}
				</div>
			</div>
		</div>
	);
}

export default ProjectDetail;
