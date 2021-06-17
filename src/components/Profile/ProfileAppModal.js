import { Button, Modal } from 'react-bootstrap';

function ProfileAppModal({ show, handleClose }) {
	return (
		<>
			<Modal show={show} onHide={handleClose} className="profile-app-modal">
				<Modal.Header>
					<Modal.Title>
						<h4 className="mb-0">Your applications</h4>
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div className="d-flex justify-content-between">
						<p>Help us develop this site</p>
						<p className="status approved">Approved</p>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="primary" onClick={handleClose}>
						OK
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}

export default ProfileAppModal;
