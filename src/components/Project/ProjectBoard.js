import { useState } from 'react';
import ProjectComment from './ProjectComment';
import ProjectReplyForm from './ProjectReplyForm';

function ProjectBoard() {
	const [showForm, setShowForm] = useState(false);

	const handleShow = () => setShowForm(true);
	const handleHide = () => setShowForm(false);

	return (
		<div className="col-lg-12">
			<div className="px-3">
				<h5>Messages</h5>
				<div className="comments border-top">
					<ProjectComment handleShow={handleShow} />
				</div>
				{showForm && <ProjectReplyForm handleHide={handleHide} />}
			</div>
		</div>
	);
}

export default ProjectBoard;
