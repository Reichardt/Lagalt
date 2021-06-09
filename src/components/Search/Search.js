import React from 'react';
import { FaSearch } from 'react-icons/fa';
import { FaCogs } from 'react-icons/fa';

function Search() {
	return (
		<div className="d-flex justify-content-between align-items-center">
			<div className="bg-content search-wrapper position-relative">
				<input
					className="search-input bg-content border"
					type="text"
					placeholder="Search projects"
				/>
				<FaSearch
					style={searchIconStyles}
					className="position-absolute search-icon"
				/>
			</div>
			<FaCogs className="filter-icon" />
		</div>
	);
}

export default Search;

const searchIconStyles = {
	fontSize: '1em',
	right: '10px',
	top: '50%',
	transform: 'translate(-50%, -50%)',
	color: 'grey',
};
