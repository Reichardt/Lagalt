import { Button, Modal } from 'react-bootstrap';

function ProjectAppModal({ show, handleHide }) {
	return (
		<>
			<Modal
				show={show}
				onHide={handleHide}
				className="project-app-modal  text-center"
			>
				<Modal.Header className="justify-content-center">
					<Modal.Title>
						<h4 className="mb-0">Apply to project</h4>
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div className="mb-2">
						<label htmlFor="application" className="form-label">
							Motivational application
						</label>
						<textarea className="form-control" name="mot-app"></textarea>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="primary" onClick={handleHide}>
						Submit application
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}

export default ProjectAppModal;
