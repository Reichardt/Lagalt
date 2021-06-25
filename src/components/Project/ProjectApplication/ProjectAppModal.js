import { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { profileSelector } from '../../../features/Profile/profileSlice';
import {
	applyToProject,
	projectSelector,
} from '../../../features/Project/projectSlice';
import ProjectAppModalSkill from './ProjectAppModalSkill';
import { useKeycloak } from '../../../context/KeycloakContext';
import { addUserAction } from '../../../features/HistoryAction/historyActionSlice';
import Loader from '../../Global/Loader';

function ProjectAppModal({
	show,
	handleHide,
	project,
	actions,
	mainState,
	setMainState,
}) {
	const [state, setState] = useState({
		availSkills: [],
		motApp: '',
		success: false,
		error: false,
		btnDisable: false,
	});
	const { loading } = useSelector(projectSelector);
	const { userProfile } = useSelector(profileSelector);
	const { skills } = userProfile;
	const dispatch = useDispatch();
	const { keyCloak } = useKeycloak();

	useEffect(() => {
		const skillsAvailable = skills.filter(pskill =>
			project.skills.some(skill => skill.skillName === pskill.name)
		);
		setState({
			...state,
			availSkills: skillsAvailable.map(skill => {
				return {
					...skill,
					checked: false,
				};
			}),
			btnDisable: !skillsAvailable.length ? true : false,
		});
	}, []);

	const toggleSkill = skill => {
		const skillIdx = state.availSkills.findIndex(
			askill => askill.id === skill.id
		);
		const newArr = [...state.availSkills];
		newArr[skillIdx].checked = !newArr[skillIdx].checked;

		setState({
			...state,
			availSkills: newArr,
		});
	};

	const submitApplication = e => {
		e.preventDefault();

		const skills = state.availSkills
			.filter(skill => skill.checked)
			.map(skill => skill.id);

		if (skills.length && state.motApp.length) {
			const applicationData = {
				id: project.id,
				token: keyCloak.token,
				application: {
					motivationalText: state.motApp,
					skills,
				},
			};

			dispatch(applyToProject(applicationData)).then(res => {
				setState({
					...state,
					success: res.payload && true,
					error: !res.payload && true,
				});
				setMainState({
					...mainState,
					hasApplied: true,
				});
				const action = actions.find(action => action.name === 'Applied');
				const actionData = {
					id: userProfile.id,
					action: {
						userId: userProfile.id,
						projectId: project.id,
						userHistoryActionId: action.id,
					},
					token: keyCloak.token,
				};
				dispatch(addUserAction(actionData));
			});
		}
	};

	return (
		<>
			<Modal
				show={show}
				onHide={handleHide}
				className="project-app-modal  text-center"
			>
				{loading && <Loader />}
				{state.success && (
					<p className="m-5">Your application has been sent for review</p>
				)}
				{!state.success && (
					<form onSubmit={submitApplication}>
						<Modal.Header className="justify-content-center">
							<Modal.Title>
								<h4 className="mb-0">{project.title}</h4>
							</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							<div className="mb-2">
								<label htmlFor="application" className="form-label">
									Motivational application
								</label>
								<textarea
									className="form-control custom-input"
									name="mot-app"
									onChange={e => setState({ ...state, motApp: e.target.value })}
								></textarea>
							</div>
							<div className="application-settings">
								<p>
									{state.availSkills.length
										? 'Apply with skills:'
										: 'You dont have the required skills'}
								</p>
								<hr />
								{state.availSkills &&
									state.availSkills.map(skill => (
										<ProjectAppModalSkill
											skill={skill}
											toggleSkill={toggleSkill}
											key={skill.id}
										/>
									))}
							</div>
						</Modal.Body>
						<Modal.Footer>
							{state.error && <p>An error has occured</p>}
							<Button
								variant="primary"
								disabled={state.btnDisable}
								onClick={submitApplication}
							>
								Submit application
							</Button>
						</Modal.Footer>
					</form>
				)}
			</Modal>
		</>
	);
}

export default ProjectAppModal;
