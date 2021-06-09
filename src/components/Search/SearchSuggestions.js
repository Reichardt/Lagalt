import { useState, useRef, useEffect } from "react";
import SearchSuggestion from "./SearchSuggestion";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import { Fragment } from "react";

function SearchSuggestions({ suggestions }) {
    const ref = useRef();
    const [isSearchOpen, setSearchOpen] = useState(true);
    useOnClickOutside(ref, () => setSearchOpen(false));

    useEffect(() => {
        setSearchOpen(true);
    }, [suggestions]);

    return (
        <Fragment>
            {isSearchOpen && (
                <div className='position-absolute suggestions' ref={ref}>
                    <SearchSuggestion />
                    <SearchSuggestion />
                    <SearchSuggestion />
                </div>
            )}
        </Fragment>
    );
}

export default SearchSuggestions;
