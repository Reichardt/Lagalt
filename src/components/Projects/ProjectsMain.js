import Back from '../Global/Back';
import { useSelector } from 'react-redux';
import { profileSelector } from '../../features/Profile/profileSlice';
import Projects from '../ProjectList/Projects';
import { Link } from 'react-router-dom';

function ProjectsMain() {
	const { projects } = useSelector(profileSelector);

	return (
		<div className="col-lg-9 mb-5">
			<div className="bg-content border-bottom border-start border-end border-secondary text-darken p-3">
				<div className="d-flex align-items-center">
					<Back />
					<p className="fw-bold ms-3 m-0">Projects</p>
				</div>
			</div>
			{projects.length > 0 && <Projects projects={projects} />}
			{
				<div className="full-height d-flex justify-content-center align-items-center bg-content border-secondary border-start border-end border-bottom flex-column">
					<h4>{!projects.length && 'You are not apart of any projects'}</h4>
					<Link to="/home" className="btn btn-primary mt-4">
						Start looking for projects
					</Link>
				</div>
			}
		</div>
	);
}

export default ProjectsMain;
