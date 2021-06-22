import { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { profileSelector } from '../../features/Profile/profileSlice';
import { applyToProject } from '../../features/Project/projectSlice';
import ProjectAppModalSkill from './ProjectAppModalSkill';
import { useKeycloak } from '../../context/KeycloakContext';

function ProjectAppModal({ show, handleHide, project }) {
	const [state, setState] = useState({
		availSkills: [],
		motApp: '',
	});
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

		const applicationData = {
			id: project.id,
			token: keyCloak.token,
			application: {
				motivationalText: state.motApp,
				skills,
			},
		};

		dispatch(applyToProject(applicationData));
	};

	return (
		<>
			<Modal
				show={show}
				onHide={handleHide}
				className="project-app-modal  text-center"
			>
				<form onSubmit={submitApplication}>
					<Modal.Header className="justify-content-center">
						<Modal.Title>
							<h4 className="mb-0">Apply to {project.title}</h4>
						</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<div className="mb-2">
							<label htmlFor="application" className="form-label">
								Motivational application
							</label>
							<textarea
								className="form-control"
								name="mot-app"
								onChange={e => setState({ ...state, motApp: e.target.value })}
							></textarea>
						</div>
						<div className="application-settings">
							<p>Apply with skills:</p>
							<hr />
							{state.availSkills.map(skill => (
								<ProjectAppModalSkill
									skill={skill}
									toggleSkill={toggleSkill}
									key={skill.id}
								/>
							))}
						</div>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="primary" onClick={submitApplication}>
							Submit application
						</Button>
					</Modal.Footer>
				</form>
			</Modal>
		</>
	);
}

export default ProjectAppModal;
