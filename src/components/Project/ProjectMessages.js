import React from 'react';

function ProjectMessages() {
	return (
		<div className="col-lg-6">
			<h5>Message Board</h5>
			<div className="messages border-secondary border-start border-top border-bottom">
				<div className="message-group">
					<div className="message p-3 border-secondary border-bottom d-flex">
						<p className="user me-2">Fednoob:</p>
						<p className="text">Hello</p>
					</div>
					<div className="reply p-3 border-secondary border-bottom border-end d-flex position-relative">
						<small className="position-absolute me-2 mt-1">
							Reply to Fednoob
						</small>
						<p className="user me-2">Fednoob:</p>
						<p className="text">Hello</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ProjectMessages;
