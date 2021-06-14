import { useEffect } from "react";
import Sidenav from "../components/Sidenav/Sidenav";
import ProjectList from "../components/ProjectList/ProjectList";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchAllProjects,
    projectSelector,
} from "../features/Project/projectSlice";
import Loader from "../components/Global/Loader";

function Home() {
    const dispatch = useDispatch();
    const { projects, loading } = useSelector(projectSelector);

    useEffect(() => {
        dispatch(fetchAllProjects());
    }, []);

    return (
        <div className='container'>
            <div className='row'>
                <Sidenav side={"left"} />
                {loading && <Loader />}
                {!loading && <ProjectList projects={projects} />}
                <Sidenav side={"right"} />
            </div>
        </div>
    );
}

export default Home;
