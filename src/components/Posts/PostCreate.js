import React from 'react';
import { FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function PostCreate() {
	return (
		<div className="bg-light border border-secondary text-darken p-3 d-flex justify-content-between align-items-center">
			<div className="d-flex align-items-center">
				<FaUser />
				<p className="m-0 ms-2">Post a project</p>
			</div>
			<Link to="/create" className="btn btn-primary">
				Start
			</Link>
		</div>
	);
}

export default PostCreate;
