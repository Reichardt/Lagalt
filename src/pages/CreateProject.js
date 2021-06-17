import React from 'react';
import CreateMain from '../components/ProjectCreate/CreateMain';
import Sidenav from '../components/Sidenav/Sidenav';

function CreateProject() {
	return (
		<div className="container">
			<div className="d-flex">
				<Sidenav side={'left'} />
				<CreateMain />
			</div>
		</div>
	);
}

export default CreateProject;
