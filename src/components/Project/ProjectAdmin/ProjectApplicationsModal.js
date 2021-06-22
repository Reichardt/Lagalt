import { Button, Modal } from 'react-bootstrap';
import ProjectApplication from './ProjectApplication';

function ProjectApplicationsModal({ show, handleHide, applications }) {
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
								key={application.id}
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
