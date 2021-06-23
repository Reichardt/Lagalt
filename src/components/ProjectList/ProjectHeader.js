import React from 'react';
import { FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function ProjectCreate() {
	return (
		<div className="bg-light border-start border-bottom border-end border-secondary text-darken pe-3 py-3 d-flex justify-content-between align-items-center">
			<div className="d-flex align-items-center px-3 py-2 border-secondary border-top border-end border-bottom bg-content">
				<FaUser />
				<p className="m-0 ms-2">Post a project</p>
			</div>
			<Link to="/create-project" className="btn btn-primary">
				Start
			</Link>
		</div>
	);
}

export default ProjectCreate;
