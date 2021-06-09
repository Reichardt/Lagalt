import React from "react";
import { NavLink } from "react-router-dom";

function SidenavItem({ title, icon, link }) {
    const marginStyle = {
        marginBottom: title !== "Profile" && "1.5em",
    };

    const renderItemTitle = () => {
        if (title === "notifications") {
            return (
                <>
                    {title}{" "}
                    <span className='badge bg-primary rounded-circle'>0</span>
                </>
            );
        }
        return <>{title}</>;
    };
    return (
        <div
            style={marginStyle}
            className='d-flex align-items-center icon-wrapper'>
            <NavLink activeClassName='active' exact to={link}>
                {icon}
                <span className='m-2'>{renderItemTitle()}</span>
            </NavLink>
        </div>
    );
}

export default SidenavItem;
