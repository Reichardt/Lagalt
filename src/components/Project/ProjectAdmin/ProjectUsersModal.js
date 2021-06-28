import { Button, Modal } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
	getProjectUsers,
	updateProjectUsers,
	setProject,
} from '../../../features/Project/projectSlice';
import ProjectUser from './ProjectUser';
import { useKeycloak } from '../../../context/KeycloakContext';

function ProjectUsersModal({ show, handleHide, project }) {
	const { keyCloak } = useKeycloak();
	const dispatch = useDispatch();
	const [state, setState] = useState({
		users: null,
	});

	useEffect(() => {
		dispatch(getProjectUsers(project.id)).then(res => {
			setState({
				users: res.payload,
			});
		});
		// eslint-disable-next-line
	}, [dispatch]);

	const handleRemoveUser = userData => {
		const { user, skills } = userData;
		setState({ users: state.users.filter(suser => suser.user.id !== user.id) });
		const updatedUsers = state.users
			.filter(suser => suser.user.id !== user.id)
			.map(user => {
				return {
					userId: user.user.id,
					skills: user.skills.map(skill => skill.id),
					userProjectRoleId: user.projectRole.id,
				};
			});
		const usersData = {
			id: project.id,
			users: updatedUsers,
			token: keyCloak.token,
		};
		dispatch(updateProjectUsers(usersData));
		const projectSkills = project.skills
			.filter(skill => skills.some(uskill => uskill.name === skill.skillName))
			.map(skill => {
				return {
					...skill,
					foundCount: skill.foundCount - 1,
				};
			});
		const updatedProject = {
			...project,
			skills: projectSkills,
		};
		dispatch(setProject(updatedProject));
	};

	return (
		<Modal show={show} onHide={handleHide} className="application-list-modal">
			<Modal.Header>
				<Modal.Title>Project users</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				{state.users && state.users.length ? (
					state.users.map(user => (
						<ProjectUser userData={user} handleRemoveUser={handleRemoveUser} />
					))
				) : (
					<p>There are no users in the project</p>
				)}
			</Modal.Body>
			<Modal.Footer>
				<Button variant="primary" onClick={handleHide}>
					Close
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default ProjectUsersModal;
