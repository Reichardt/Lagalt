import { useEffect, useState } from 'react';
import {
	fetchProjectById,
	projectSelector,
	getProjectApplications,
	getProjectMessages,
} from '../../features/Project/projectSlice';
import {
	historyActionSelector,
	addUserAction,
} from '../../features/HistoryAction/historyActionSlice';
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
import ProjectUsersModal from './ProjectAdmin/ProjectUsersModal';

function ProjectMain({ id }) {
	const { keyCloak, Login } = useKeycloak();
	const { project, loading, projectApplications, projectMessages } =
		useSelector(projectSelector);
	const { userProfile, projects } = useSelector(profileSelector);
	const { actions } = useSelector(historyActionSelector);
	const [state, setState] = useState({
		showAppModal: false,
		showAppsModal: false,
		showUsersModal: false,
		hasApplied: false,
	});
	const [role, setRole] = useState(null);
	const dispatch = useDispatch();
	const history = useHistory();

	const handleAppHide = () => setState({ ...state, showAppModal: false });

	const handleAppShow = () => {
		if (!userProfile) {
			Login();
		} else {
			setState({ ...state, showAppModal: true });
		}
	};

	const handleAppsHide = () => setState({ ...state, showAppsModal: false });

	const handleAppsShow = () => setState({ ...state, showAppsModal: true });

	const handleUsersHide = () => setState({ ...state, showUsersModal: false });

	const handleUsersShow = () => setState({ ...state, showUsersModal: true });

	useEffect(() => {
		dispatch(fetchProjectById(id)).then(res => {
			if (res.payload) {
				if (userProfile) {
					dispatch(getProjectApplications(id)).then(res => {
						setState({
							...state,
							hasApplied: res.payload.some(
								application => application.user.id === userProfile.id
							),
						});
						const action = actions.find(action => action.name === 'Viewed');
						const actionData = {
							id: userProfile.id,
							action: {
								userId: userProfile.id,
								projectId: id,
								userHistoryActionId: action.id,
							},
							token: keyCloak.token,
						};
						dispatch(addUserAction(actionData));
					});
				}
				dispatch(getProjectMessages(id));
				const proj = projects.find(
					project => project.project.id === res.payload.id
				);
				setRole(
					proj && proj.projectRole
						? proj.projectRole
						: {
								name: 'init',
						  }
				);
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
								{userProfile && userProfile.username === project.creator && (
									<>
										<button
											className="btn btn-secondary me-2"
											onClick={handleUsersShow}
										>
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
								{userProfile &&
									userProfile.username !== project.creator &&
									role &&
									role.name !== 'Owner' && (
										<button
											className={`btn btn-${
												userProfile && !role ? 'primary' : 'secondary'
											}`}
											disabled={state.hasApplied}
											onClick={!role && handleAppShow}
										>
											{userProfile && !role
												? !state.hasApplied
													? 'Apply to project'
													: 'Application pending'
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
							<ProjectDetail project={project} role={role} />
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
			{state.showAppModal && (
				<ProjectAppModal
					show={state.showAppModal}
					handleHide={handleAppHide}
					project={project}
					actions={actions}
					mainState={state}
					setMainState={setState}
				/>
			)}
			{state.showAppsModal && (
				<ProjectApplicationsModal
					show={state.showAppsModal}
					handleHide={handleAppsHide}
					applications={projectApplications}
					project={project}
					actions={actions}
					profile={userProfile}
				/>
			)}
			{state.showUsersModal && (
				<ProjectUsersModal
					show={state.showUsersModal}
					handleHide={handleUsersHide}
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
