import React from 'react';
import ProjectItem from './ProjectItem';

function Projects({ projects, loading }) {
	return (
		<div className="d-flex flex-column">
			<div className="posts bg-content center-column">
				{loading && <p>Loading..</p>}
				{projects.map(project => (
					<ProjectItem project={project} key={project.id} />
				))}
			</div>
		</div>
	);
}

export default Projects;
