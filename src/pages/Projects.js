import ProjectsMain from '../components/Projects/ProjectsMain';
import Sidenav from '../components/Sidenav/Sidenav';

function Projects() {
	return (
		<div className="container">
			<div className="d-flex">
				<Sidenav side={'left'} />
				<ProjectsMain />
			</div>
		</div>
	);
}

export default Projects;
