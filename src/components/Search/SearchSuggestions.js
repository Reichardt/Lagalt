import { useState, useRef, useEffect } from 'react';
import SearchSuggestion from './SearchSuggestion';
import useOnClickOutside from '../../hooks/useOnClickOutside';

function SearchSuggestions({ suggestions }) {
	const ref = useRef();
	const [isSearchOpen, setSearchOpen] = useState(true);
	useOnClickOutside(ref, () => setSearchOpen(false));

	useEffect(() => {
		setSearchOpen(true);
	}, [suggestions]);

	return (
		<>
			{isSearchOpen && (
				<div className="position-absolute suggestions" ref={ref}>
					{suggestions.map(searchSuggestion => (
						<SearchSuggestion
							searchSuggestion={searchSuggestion}
							key={searchSuggestion.id}
						/>
					))}
				</div>
			)}
		</>
	);
}

export default SearchSuggestions;
