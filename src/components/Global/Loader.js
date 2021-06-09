import React from "react";

function Loader() {
    return (
        <div className='spinner-border' style={spinnerStyles} role='status'>
            <span className='visually-hidden'>Loading...</span>
        </div>
    );
}

export default Loader;

const spinnerStyles = {
    position: "absolute",
    left: "50%",
};
