import React from "react";
import { FaSearch } from "react-icons/fa";

function Search() {
    return (
        <div className='bg-content search-wrapper position-relative'>
            <input
                className='search-input bg-content border'
                type='text'
                placeholder='Search projects'
            />
            <FaSearch
                style={searchIconStyles}
                className='position-absolute search-icon'
            />
        </div>
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
