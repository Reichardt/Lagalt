import React from 'react';

function CategoryItem({ category }) {
	return (
		<div className="bg-content border-bottom border-start border-end border-secondary text-darken p-3">
			<p className="m-0">View projects for {category.name}</p>
		</div>
	);
}

export default CategoryItem;
