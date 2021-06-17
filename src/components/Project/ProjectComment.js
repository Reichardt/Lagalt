import { ReplyFill } from 'react-bootstrap-icons';

function ProjectComment({ handleShow }) {
	return (
		<div className="comment px-3">
			<div className="comment-heading">
				<div className="comment-info">
					<a href="#" className="comment-author">
						Fednoob
					</a>
					<p className="m-0">3 days ago</p>
				</div>
			</div>
			<div className="comment-body">
				<p>This is a comment</p>
				<ReplyFill onClick={handleShow} />
			</div>
			<div className="replies border-secondary border-start">
				<div className="comment" id="comment-2">
					<div className="comment-heading">
						<div className="comment-info">
							<a href="#" className="comment-author">
								randomperson81
							</a>
							<p className="m-0">3 days ago</p>
						</div>
					</div>
					<div className="comment-body">
						<p>Took the words right out of my mouth!</p>
						<ReplyFill onClick={handleShow} />
					</div>
				</div>
			</div>
		</div>
	);
}

export default ProjectComment;
