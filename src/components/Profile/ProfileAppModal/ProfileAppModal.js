import { useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import {
	profileSelector,
	getProfileApplications,
} from '../../../features/Profile/profileSlice';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

function ProfileAppModal({ show, handleClose }) {
	const { applications, userProfile } = useSelector(profileSelector);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getProfileApplications(userProfile.name));
	}, [userProfile]);
	return (
		<>
			<Modal show={show} onHide={handleClose} className="profile-app-modal">
				<Modal.Header>
					<Modal.Title>
						<h4 className="mb-0">Your applications</h4>
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<ul className="list-group">
						<li className="list-group-item">
							{applications &&
								applications.map(application => (
									<div className="d-flex justify-content-between align-items-center">
										<Link>This is a sample text</Link>
										<p className="status pending">Approved</p>
									</div>
								))}
						</li>
					</ul>
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
