import React from "react";
import Sidenav from "../components/Sidenav/Sidenav";
import MainProject from "../components/Project/MainProject";

function Project({ match }) {
    return (
        <div className='container'>
            <div className='d-flex'>
                <Sidenav side={"left"} />
                <MainProject id={match.params.id} />
            </div>
        </div>
    );
}

export default Project;
