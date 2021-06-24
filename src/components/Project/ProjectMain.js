import { useEffect, useState } from 'react';
import {
	fetchProjectById,
	projectSelector,
	getProjectApplications,
	getProjectMessages,
} from '../../features/Project/projectSlice';
import { profileSelector } from '../../features/Profile/profileSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useKeycloak } from '../../context/KeycloakContext';
import Loader from '../Global/Loader';
import ProjectSkill from '../ProjectList/ProjectSkill';
import { PeopleFill } from 'react-bootstrap-icons';
import ProjectBoard from './ProjectMessageBoard/ProjectBoard';
import ProjectDetail from './ProjectDetail/ProjectDetail';
import ProjectAppModal from './ProjectApplication/ProjectAppModal';
import Back from '../Global/Back';
import { useHistory } from 'react-router-dom';
import ProjectApplicationsModal from './ProjectAdmin/ProjectApplicationsModal';

function ProjectMain({ id }) {
	const { Login } = useKeycloak();
	const { project, loading, projectApplications, projectMessages } =
		useSelector(projectSelector);
	const { userProfile, projects } = useSelector(profileSelector);
	const [showApplicationModal, setShowApplicationModal] = useState(false);
	const [showApplicationsModal, setShowApplicationsModal] = useState(false);
	const [role, setRole] = useState(null);
	const dispatch = useDispatch();
	const history = useHistory();

	const handleAppShow = () => {
		if (!userProfile) {
			Login();
		} else {
			setShowApplicationModal(true);
		}
	};

	const handleAppHide = () => {
		setShowApplicationModal(false);
	};

	const handleAppsShow = () => {
		setShowApplicationsModal(true);
	};

	const handleAppsHide = () => {
		setShowApplicationsModal(false);
	};

	useEffect(() => {
		dispatch(fetchProjectById(id)).then(res => {
			if (res.payload) {
				if (userProfile && userProfile.username === res.payload.creator) {
					dispatch(getProjectApplications(id));
				}
				dispatch(getProjectMessages(id));
				const proj = projects.find(
					project => project.project.id === res.payload.id
				);
				setRole(proj ? proj.projectRole : null);
			} else {
				history.push('/404');
			}
		});
	}, [dispatch, userProfile]);

	return (
		<>
			<div className="col-lg-9 bg-content border-bottom border-start border-end border-secondary project mb-5">
				{loading && <Loader styles={loaderStyles} />}
				{!loading && project && (
					<>
						<div className="border-bottom border-secondary d-flex justify-content-between align-items-center text-darken p-3">
							<div className="d-flex align-items-center">
								<Back />
								<p className="fw-bold ms-3 m-0">{project.title}</p>
							</div>
							<div className="d-flex align-items-center">
								{userProfile &&
									userProfile.username === project.creator &&
									role && (
										<>
											<button className="btn btn-secondary me-2">
												Manage users
											</button>
											{projectApplications && (
												<button
													className="btn btn-primary"
													onClick={handleAppsShow}
												>
													Applications{' '}
													{projectApplications && projectApplications.length}
												</button>
											)}
										</>
									)}
								{userProfile && (
									<button
										className={`btn btn-${
											userProfile && !role ? 'primary' : 'secondary'
										}`}
										onClick={handleAppShow}
									>
										{userProfile && !role
											? 'Apply to project'
											: 'Leave project'}
									</button>
								)}
							</div>
						</div>
						<div className="p-3 d-flex justify-content-between align-items-center">
							<div>
								{project.skills.map((skill, index) => (
									<ProjectSkill skill={skill} key={index} />
								))}
							</div>
							<div className="d-flex align-items-center border border-secondary p-1 pe-2 ps-2 rounded">
								<p className="mb-0 me-2">
									{project.current} / {project.total}
								</p>
								<PeopleFill />
							</div>
						</div>
						<div className="row mt-4">
							<ProjectDetail project={project} />
						</div>
						<div className="row mt-4">
							<ProjectBoard
								profile={userProfile}
								messages={projectMessages}
								project={project}
							/>
						</div>
					</>
				)}
			</div>
			{showApplicationModal && (
				<ProjectAppModal
					show={showApplicationModal}
					handleHide={handleAppHide}
					project={project}
				/>
			)}
			{showApplicationsModal && (
				<ProjectApplicationsModal
					show={showApplicationsModal}
					handleHide={handleAppsHide}
					applications={projectApplications}
					project={project}
				/>
			)}
		</>
	);
}

export default ProjectMain;

const loaderStyles = {
	top: '50%',
	left: '50%',
};
