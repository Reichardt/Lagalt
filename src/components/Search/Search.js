import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { FaCogs } from "react-icons/fa";
import SearchFilterModal from "./SearchFilterModal";
import SearchSuggestions from "./SearchSuggestions";
import { useDispatch, useSelector } from "react-redux";
import {
    searchProjects,
    clearSuggestions,
    searchSelector,
    setQuery,
} from "../../features/Search/searchSlice";

function Search() {
    const [show, setShow] = useState(false);
    const dispatch = useDispatch();
    const { suggestions } = useSelector(searchSelector);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const handleChange = (e) => {
        dispatch(setQuery(e.target.value));
        if (e.target.value < 1) {
            dispatch(clearSuggestions());
        } else {
            dispatch(searchProjects(e.target.value));
        }
    };

    return (
        <>
            <div className='d-flex justify-content-between align-items-center'>
                <div className='bg-content search-wrapper position-relative'>
                    <input
                        className='search-input bg-content border'
                        type='text'
                        placeholder='Search projects'
                        onChange={handleChange}
                    />
                    <FaSearch
                        style={searchIconStyles}
                        className='position-absolute search-icon'
                    />
                    {suggestions.length > 1 && (
                        <SearchSuggestions suggestions={suggestions} />
                    )}
                </div>
            </div>
            {show && (
                <SearchFilterModal show={show} handleClose={handleClose} />
            )}
        </>
    );
}

export default Search;

const searchIconStyles = {
    fontSize: "1em",
    right: "10px",
    top: "50%",
    transform: "translate(-50%, -50%)",
    color: "grey",
};
