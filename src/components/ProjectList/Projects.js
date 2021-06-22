import ProjectItem from './ProjectItem';

function Projects({ projects }) {
	return (
		<div className="posts bg-content center-column position-relative">
			{projects.map(project => (
				<ProjectItem project={project} key={project.id} />
			))}
		</div>
	);
}

export default Projects;
