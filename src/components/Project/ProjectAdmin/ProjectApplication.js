import getTimeDiff from '../../../util/getTimeDiff';
import { useKeycloak } from '../../../context/KeycloakContext';
import { useDispatch } from 'react-redux';
import {
	updateProjectApplication,
	addUserToProject,
} from '../../../features/Project/projectSlice';
import { addUserAction } from '../../../features/HistoryAction/historyActionSlice';

function ProjectApplication({
	application,
	removeApplication,
	acceptApplication,
	actions,
	profile,
}) {
	const { keyCloak } = useKeycloak();
	const dispatch = useDispatch();

	const handleRequest = accepted => {
		const applicationData = {
			id: application.project.id,
			application: {
				...application,
				isAccepted: accepted,
				isPending: false,
				userId: application.user.id,
				projectId: application.project.id,
			},
			token: keyCloak.token,
		};

		dispatch(updateProjectApplication(applicationData)).then(res => {
			removeApplication(application.id);
		});

		if (accepted) {
			const userData = {
				id: application.project.id,
				user: {
					userId: application.user.id,
					skills: application.skills,
				},
				token: keyCloak.token,
			};
			dispatch(addUserToProject(userData)).then(res => {
				removeApplication(application.id);
				acceptApplication(application.skills);
				const action = actions.find(action => action.name === 'Contributed');
				const actionData = {
					id: application.user.id,
					action: {
						userId: application.user.id,
						projectId: res.payload.project.id,
						userHistoryActionId: action.id,
					},
					token: keyCloak.token,
				};
				dispatch(addUserAction(actionData));
			});
		}
	};

	return (
		<li
			className="list-group-item mb-3 border-secondary border"
			key={application.id}
		>
			<div className="d-flex justify-content-between align-items-center">
				<p className="app-user">{application.user.username}</p>
				<small>{getTimeDiff(application.createdAt)}</small>
			</div>
			<hr className="my-2" />
			<p className="app-mot-text">{application.motivationalText}</p>
			<div className="app-skills mt-3">
				<p className="fw-bold">Skills</p>
				<ul>
					{application.skills.map(skill => (
						<li className="text-capitalize" key={skill.id}>
							{skill.name}
						</li>
					))}
				</ul>
			</div>
			<hr />
			<div className="d-flex justify-content-end mb-2">
				<button
					className="btn btn-danger me-2"
					onClick={() => handleRequest(false)}
				>
					Deny
				</button>
				<button className="btn btn-success" onClick={() => handleRequest(true)}>
					Approve
				</button>
			</div>
		</li>
	);
}

export default ProjectApplication;
