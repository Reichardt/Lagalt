import { FaSearch } from 'react-icons/fa';
import SearchSuggestions from './SearchSuggestions';
import { useDispatch, useSelector } from 'react-redux';
import {
	searchProjects,
	clearSuggestions,
	searchSelector,
	setQuery,
} from '../../features/Search/searchSlice';
import { useState, useRef, useEffect } from 'react';
import SearchOverlay from './SearchOverlay';
import useOnClickOutside from '../../hooks/useOnClickOutside';

function Search() {
	const dispatch = useDispatch();
	const ref = useRef();
	const { suggestions } = useSelector(searchSelector);
	const [state, setState] = useState({
		showOverlay: false,
	});
	useOnClickOutside(ref, () => setState({ showOverlay: false }));
	const handleChange = e => {
		dispatch(setQuery(e.target.value));
		if (e.target.value < 1) {
			dispatch(clearSuggestions());
		} else {
			const searchData = {
				query: e.target.value,
			};
			dispatch(searchProjects(searchData));
		}
	};

	useEffect(() => {
		dispatch(clearSuggestions());
	}, [dispatch]);

	return (
		<div className="d-flex justify-content-between align-items-center">
			<div className="bg-content search-wrapper position-relative">
				<input
					className="form-control search-input bg-content custom-input"
					type="text"
					placeholder="Search projects"
					onChange={handleChange}
					onClick={() => setState({ showOverlay: true })}
					ref={ref}
				/>
				<FaSearch
					style={searchIconStyles}
					className="position-absolute search-icon"
				/>
				{state.showOverlay && <SearchOverlay />}
				{suggestions.length > 0 && (
					<SearchSuggestions suggestions={suggestions} />
				)}
			</div>
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
