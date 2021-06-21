import ProjectReq from './ProjectReq';

function ProjectDetail({ project }) {
	return (
		<>
			<div className="col-lg-12">
				<div className="px-3">
					<h2 className="pb-2">{project.title}</h2>
				</div>
			</div>
			<div className="col-lg-6">
				<div className="px-3 project-details"></div>
			</div>
			<div className="col-lg-6">
				<div className="px-3 project-details">
					<p className="require">We're currently looking for</p>
					<div className="mt-3 required">
						{project.skills.map(skill => (
							<ProjectReq skill={skill} key={skill.id} />
						))}
					</div>
				</div>
			</div>
		</>
	);
}

export default ProjectDetail;
