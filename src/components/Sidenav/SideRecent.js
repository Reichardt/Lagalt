import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

function SideRecent() {
	return (
		<Fragment>
			<div className="bg-light border border-secondary text-darken p-3 mt-3 recent-projects">
				<p className="mb-0">Recent viewed projects</p>
			</div>
			<div className="recent-project border border-secondary p-3 d-flex justify-content-between align-items-center">
				<p className="mb-0">Dummy project</p>
				<Link to="/project/1">View</Link>
			</div>
		</Fragment>
	);
}

export default SideRecent;
