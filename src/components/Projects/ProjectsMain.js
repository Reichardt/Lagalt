import Back from '../Global/Back';
import { useSelector, useDispatch } from 'react-redux';
import {
	profileSelector,
	getProfileProjects,
} from '../../features/Profile/profileSlice';
import Project from './Project';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import Loader from '../Global/Loader';

function ProjectsMain() {
	const { projects, userProfile, userAttributesLoading } =
		useSelector(profileSelector);
	const dispatch = useDispatch();

	useEffect(() => {
		userProfile && dispatch(getProfileProjects(userProfile.username));
	}, []);

	return (
		<div className="col-lg-9 mb-5">
			<div className="bg-content border-bottom border-start border-end border-secondary text-darken p-3">
				<div className="d-flex align-items-center">
					<Back />
					<p className="fw-bold ms-3 m-0">Projects</p>
				</div>
			</div>
			{userAttributesLoading && <Loader styles={loaderStyles} />}
			{!userAttributesLoading &&
				projects.length > 0 &&
				projects.map(project => <Project project={project} />)}
			{!userAttributesLoading && projects.length === 0 && (
				<div className="full-height d-flex justify-content-center align-items-center bg-content border-secondary border-start border-end border-bottom flex-column">
					<h4>{!projects.length && 'You are not apart of any projects'}</h4>
					<Link to="/home" className="btn btn-primary mt-4">
						Start looking for projects
					</Link>
				</div>
			)}
		</div>
	);
}

export default ProjectsMain;

const loaderStyles = {
	top: '50%',
	left: '50%',
};
