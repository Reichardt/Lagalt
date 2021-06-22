import React from 'react';

function Loader({ styles }) {
	return (
		<div
			className="spinner-border text-primary position-absolute"
			style={styles}
			role="status"
		>
			<span className="visually-hidden">Loading...</span>
		</div>
	);
}

export default Loader;
