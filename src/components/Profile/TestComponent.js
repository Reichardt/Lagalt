import React from 'react';

function TestComponent({ searchedUser, userProfile }) {
	return (
		<div>
			<p>{searchedUser.username}</p>
		</div>
	);
}

export default TestComponent;
