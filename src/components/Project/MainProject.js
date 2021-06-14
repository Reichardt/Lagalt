import React, { useEffect } from "react";
import {
    fetchProjectById,
    projectSelector,
} from "../../features/Project/projectSlice";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Global/Loader";
import ProjectSkill from "../ProjectList/ProjectSkill";
import { PeopleFill } from "react-bootstrap-icons";

function MainProject({ id }) {
    const { project, loading } = useSelector(projectSelector);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProjectById(id));
    }, []);

    return (
        <>
            {loading && <Loader />}
            {!loading && project && (
                <div className='col-lg-9 bg-content border-bottom border-start border-end border-secondary'>
                    <div className='border-bottom border-secondary d-flex justify-content-between align-items-center text-darken p-3'>
                        <p className='fw-bold m-0'>Project - {project.title}</p>
                        <div className='d-flex align-items-center'>
                            <p className='mb-0 me-2'>{project.progress}</p>
                            <button className='btn btn-primary'>
                                Apply to project
                            </button>
                        </div>
                    </div>
                    <div className='p-3 d-flex justify-content-between align-items-center'>
                        <div>
                            {project.skills.map((skill) => (
                                <ProjectSkill skill={skill} key={skill.id} />
                            ))}
                        </div>
                        <div className='d-flex align-items-center border border-secondary p-1 pe-2 ps-2 rounded'>
                            <p className='mb-0 me-2'>
                                {project.current} / {project.total}
                            </p>
                            <PeopleFill />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default MainProject;
