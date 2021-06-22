import ProjectItem from './ProjectItem';

function Projects({ projects, loading }) {
	return (
		<div className="d-flex flex-column">
			<div className="posts bg-content center-column position-relative">
				{projects.map(project => (
					<ProjectItem project={project} key={project.id} />
				))}
			</div>
		</div>
	);
}

export default Projects;
