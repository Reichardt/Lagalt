import { XCircleFill } from 'react-bootstrap-icons';
import { useDispatch } from 'react-redux';
import { addMessage } from '../../../features/Project/projectSlice';
import { useState } from 'react';
import { useKeycloak } from '../../../context/KeycloakContext';

function ProjectReplyForm({ handleHide, project }) {
	const [message, setMessage] = useState('');
	const { keyCloak } = useKeycloak();
	const dispatch = useDispatch();

	const handleMessageAdd = () => {
		const messageData = {
			id: project.id,
			message: {
				text: message,
			},
			token: keyCloak.token,
		};

		dispatch(addMessage(messageData));
	};

	return (
		<div className="mt-3 pe-4 reply-form mb-3">
			<div className="d-flex justify-content-between">
				<label className="mb-2">Add a new message</label>
				<XCircleFill onClick={handleHide} />
			</div>
			<textarea
				type="text"
				name="reply"
				className="form-control"
				value={message}
				onChange={e => setMessage(e.target.value)}
			></textarea>
			<button className="btn btn-primary mt-2" onClick={handleMessageAdd}>
				Post
			</button>
		</div>
	);
}

export default ProjectReplyForm;
