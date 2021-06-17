import { useState } from 'react';
import ProjectComment from './ProjectComment';
import ProjectReplyForm from './ProjectReplyForm';

function ProjectBoard() {
	const [showForm, setShowForm] = useState(false);

	const handleShow = () => setShowForm(true);
	const handleHide = () => setShowForm(false);

	return (
		<div className="col-lg-6">
			<h5>Messages</h5>
			<div className="comments shadow-sm border-secondary border-start border-top border-bottom">
				<ProjectComment handleShow={handleShow} />
			</div>
			{showForm && <ProjectReplyForm handleHide={handleHide} />}
		</div>
	);
}

export default ProjectBoard;
