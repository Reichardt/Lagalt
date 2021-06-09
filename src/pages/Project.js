import React from 'react';
import Sidenav from '../components/Sidenav/Sidenav';
import MainProject from '../components/Main/MainProject';

function Post() {
	return (
		<div className="container">
			<div className="d-flex">
				<Sidenav side={'left'} />
				<MainProject />
			</div>
		</div>
	);
}

export default Post;
