import React from 'react';
import Sidenav from '../components/Sidenav/Sidenav';

function Categories() {
	return (
		<div className="container">
			<div className="d-flex">
				<Sidenav side={'left'} />
			</div>
		</div>
	);
}

export default Categories;
