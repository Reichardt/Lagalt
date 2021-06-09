import React from 'react';
import MainCreate from '../components/Main/MainCreate';
import Sidenav from '../components/Sidenav/Sidenav';

function Create() {
	return (
		<div className="container">
			<div className="d-flex">
				<Sidenav side={'left'} />
				<MainCreate />
			</div>
		</div>
	);
}

export default Create;
