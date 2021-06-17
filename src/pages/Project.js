import React from 'react';
import Sidenav from '../components/Sidenav/Sidenav';
import ProjectMain from '../components/Project/ProjectMain';

function Project({ match }) {
	return (
		<div className="container">
			<div className="d-flex">
				<Sidenav side={'left'} />
				<ProjectMain id={match.params.id} />
			</div>
		</div>
	);
}

export default Project;
