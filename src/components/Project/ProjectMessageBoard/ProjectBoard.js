import { useState } from 'react';
import ProjectComment from './ProjectComment';
import ProjectReplyForm from './ProjectReplyForm';

function ProjectBoard({ profile, messages }) {
	const [showForm, setShowForm] = useState(false);

	const handleShow = () => setShowForm(true);
	const handleHide = () => setShowForm(false);

	return (
		<div className="col-lg-12 mt-3">
			<div className="px-3">
				<div className="mb-3 d-flex justify-content-between align-items-center">
					<h5 className="mb-0">Messages</h5>
					{profile && <button className="btn btn-primary">New message</button>}
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
			</div>
		</div>
	);
}

export default ProjectBoard;
