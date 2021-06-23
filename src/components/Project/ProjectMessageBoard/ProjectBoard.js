import { useState } from 'react';
import ProjectComment from './ProjectComment';
import ProjectReplyForm from './ProjectReplyForm';
import ProjectMessageForm from './ProjectMessageForm';

function ProjectBoard({ profile, messages, project }) {
	const [showForm, setShowForm] = useState(false);
	const [showMessageForm, setShowMessageForm] = useState(false);

	const handleShow = () => setShowForm(true);
	const handleHide = () => setShowForm(false);
	const handleMessageShow = () => setShowMessageForm(true);
	const handleMessageHide = () => setShowMessageForm(false);

	return (
		<div className="col-lg-12 mt-3">
			<div className="px-3">
				<div className="mb-3 d-flex justify-content-between align-items-center">
					<h5 className="mb-0">Messages</h5>
					{profile && (
						<button className="btn btn-secondary" onClick={handleMessageShow}>
							New message
						</button>
					)}
				</div>
				<div className="comments border-top">
					{messages && messages.length ? (
						messages.map(message => (
							<ProjectComment message={message} handleShow={handleShow} />
						))
					) : (
						<p className="full-height d-flex justify-content-center align-items-center py-5">
							There are no messages at the moment
						</p>
					)}
				</div>
				{showForm && <ProjectReplyForm handleHide={handleHide} />}
				{showMessageForm && (
					<ProjectMessageForm
						handleHide={handleMessageHide}
						project={project}
					/>
				)}
			</div>
		</div>
	);
}

export default ProjectBoard;
