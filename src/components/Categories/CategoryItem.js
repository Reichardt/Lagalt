import React from 'react';

function CategoryItem({ category }) {
	return (
		<div className="bg-content d-flex justify-content-center align-items-center border border-secondary text-darken p-3">
			<p className="m-0 text-capitalize">{category.name}</p>
		</div>
	);
}

export default CategoryItem;
