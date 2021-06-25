import { useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import {
	profileSelector,
	getProfileApplications,
} from '../../../features/Profile/profileSlice';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import uniqid from 'uniqid';

function ProfileAppModal({ show, handleClose }) {
	const { applications, userProfile } = useSelector(profileSelector);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getProfileApplications(userProfile.username));
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
						{applications &&
							applications.map(application => (
								<li
									className="list-group-item ps-2 pb-2 pt-2 pe-0"
									key={uniqid()}
								>
									<div className="d-flex justify-content-between align-items-center">
										<Link to={`/project/${application.project.id}`}>
											{application.project.title}
										</Link>
										<p
											className={`status p-2 bg-secondary border-secondary border-top border-bottom border-start rounded-start text-primary ${
												application.isAccepted && 'accepted'
											} ${application.isPending && 'pending'} ${
												!application.isPending &&
												!application.isAccepted &&
												'declined'
											}`}
										>
											{application.isAccepted && 'Accepted'}
											{application.isPending && 'Pending'}
											{!application.isPending &&
												!application.isAccepted &&
												'Declined'}
										</p>
									</div>
								</li>
							))}
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
