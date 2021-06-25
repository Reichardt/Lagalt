import { Button, Modal } from 'react-bootstrap';
import ProjectApplication from './ProjectApplication';
import { useDispatch } from 'react-redux';
import {
	setProjectApplications,
	setProject,
} from '../../../features/Project/projectSlice';

function ProjectApplicationsModal({
	show,
	handleHide,
	applications,
	project,
	actions,
	profile,
}) {
	const dispatch = useDispatch();

	const removeApplication = id => {
		const modApplications = applications.filter(app => app.id !== id);
		dispatch(setProjectApplications(modApplications));
	};

	const acceptApplication = appSkills => {
		const projectSkills = project.skills
			.filter(skill =>
				appSkills.some(askill => askill.name === skill.skillName)
			)
			.map(skill => {
				return {
					...skill,
					foundCount: skill.foundCount + 1,
				};
			});
		const updatedProject = {
			...project,
			current: project.current + 1,
			skills: projectSkills,
		};
		dispatch(setProject(updatedProject));
	};

	return (
		<Modal show={show} onHide={handleHide} className="application-list-modal">
			<Modal.Header>
				<Modal.Title>Project applications</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				{applications && !applications.length && (
					<p>There are no applications at the moment</p>
				)}
				{applications && (
					<ul className="list-group">
						{applications.map(application => (
							<ProjectApplication
								application={application}
								removeApplication={removeApplication}
								acceptApplication={acceptApplication}
								key={application.id}
								actions={actions}
								profile={profile}
							/>
						))}
					</ul>
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

export default ProjectApplicationsModal;
