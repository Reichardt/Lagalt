import { useEffect, useState } from 'react';
import {
	fetchProjectById,
	projectSelector,
	getProjectApplications,
	getProjectMessages,
	getProjectUsers,
	updateProjectUsers,
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
	const {
		project,
		loading,
		projectApplications,
		projectMessages,
		modalLoading,
	} = useSelector(projectSelector);
	const { userProfile } = useSelector(profileSelector);
	const { actions } = useSelector(historyActionSelector);
	const [state, setState] = useState({
		showAppModal: false,
		showAppsModal: false,
		showUsersModal: false,
		hasApplied: false,
		role: null,
		users: [],
	});
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

	const handleRemoveUser = () => {
		const users = state.users
			.filter(user => user.user.username !== userProfile.username)
			.map(user => {
				return {
					userId: user.user.id,
					skills: user.skills.map(skill => skill.id),
					userProjectRoleId: user.projectRole.id,
				};
			});
		const usersData = {
			id: Number(id),
			users,
			token: keyCloak.token,
		};
		dispatch(updateProjectUsers(usersData));
	};

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
						const action =
							actions && actions.find(action => action.name === 'Viewed');
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

						dispatch(getProjectUsers(id)).then(res => {
							const users = res.payload;
							if (users) {
								const user = users.find(
									user => user.user.username === userProfile.username
								);
								if (user) {
									setState({
										...state,
										users,
										role: user.projectRole.name,
									});
								}
							}
						});
					});
				}
				dispatch(getProjectMessages(id));
			} else {
				history.push('/404');
			}
		});
		// eslint-disable-next-line
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
									!modalLoading && (
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
									!state.role &&
									!modalLoading && (
										<button
											className="btn btn-primary"
											disabled={state.hasApplied}
											onClick={handleAppShow}
										>
											{state.hasApplied
												? 'Application pending'
												: 'Apply to project'}
										</button>
									)}
								{userProfile &&
									state.role &&
									!modalLoading &&
									state.role !== 'Owner' && (
										<button
											className="btn btn-secondary"
											onClick={handleRemoveUser}
										>
											Leave project
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
							<ProjectDetail
								projectprop={project}
								userProfile={userProfile}
								token={keyCloak.token}
							/>
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
					profile={userProfile}
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
