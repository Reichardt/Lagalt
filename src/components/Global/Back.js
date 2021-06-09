import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';

function Back() {
	let history = useHistory();

	const handleClick = () => {
		history.goBack();
	};

	return <FaArrowLeft onClick={handleClick} />;
}

export default Back;
