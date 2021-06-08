import React from "react";
import logo from "../../logo.png";

const SidenavLogo = () => {
    return (
        <div className='img-wrapper mb-3'>
            <img src={logo} style={logoStyles} alt='logo' />
        </div>
    );
};

export default SidenavLogo;

const logoStyles = {
    width: "30%",
};
