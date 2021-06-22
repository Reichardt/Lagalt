import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

function SidenavRecent() {
	return (
		<Fragment>
			<div className="bg-light border border-secondary text-darken p-3 mt-3 recent-projects">
				<p className="mb-0">Recently viewed projects</p>
			</div>
			<div className="recent-project bg-content border-secondary border-start border-end border-bottom p-3 d-flex justify-content-between align-items-center">
				<p className="mb-0">Dummy project</p>
				<Link to="/project/1">View</Link>
			</div>
		</Fragment>
	);
}

export default SidenavRecent;
