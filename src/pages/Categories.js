import React from 'react';
import MainCategories from '../components/Categories/MainCategories';
import Sidenav from '../components/Sidenav/Sidenav';

function Categories() {
	return (
		<div className="container">
			<div className="row">
				<Sidenav side={'left'} />
				<MainCategories />
				<Sidenav side={'right'} />
			</div>
		</div>
	);
}

export default Categories;
