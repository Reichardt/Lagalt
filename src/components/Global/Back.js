import React from 'react';
import { ArrowLeft } from 'react-bootstrap-icons';
import { useHistory } from 'react-router-dom';

function Back() {
	let history = useHistory();

	const handleClick = () => {
		history.goBack();
	};

	return <ArrowLeft style={btnStyles} onClick={handleClick} />;
}

export default Back;

const btnStyles = {
	cursor: 'pointer',
	color: '#4338ca',
	fontSize: '1.3em',
};
