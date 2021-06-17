import React from 'react';

function Category({ match }) {
	const { category } = match.params;
	return (
		<div>
			<p>{category}</p>
		</div>
	);
}

export default Category;
