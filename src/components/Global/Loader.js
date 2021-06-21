import React from 'react';

function Loader() {
	return (
		<div
			className="spinner-border text-primary"
			style={spinnerStyles}
			role="status"
		>
			<span className="visually-hidden">Loading...</span>
		</div>
	);
}

export default Loader;

const spinnerStyles = {
	position: 'absolute',
	left: '50%',
	top: '25%',
};
