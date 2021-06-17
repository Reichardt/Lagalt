import React from 'react';
import CategoriesMain from '../components/Categories/CategoriesMain';
import Sidenav from '../components/Sidenav/Sidenav';

function Categories() {
	return (
		<div className="container">
			<div className="row">
				<Sidenav side={'left'} />
				<CategoriesMain />
				<Sidenav side={'right'} />
			</div>
		</div>
	);
}

export default Categories;
