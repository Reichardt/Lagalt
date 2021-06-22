import { XCircleFill } from 'react-bootstrap-icons';

function ProjectReplyForm({ handleHide }) {
	return (
		<div className="mt-3 pe-4 reply-form">
			<div className="d-flex justify-content-between">
				<label className="mb-2">Reply to Fednoob</label>
				<XCircleFill onClick={handleHide} />
			</div>
			<textarea type="text" name="reply" className="form-control"></textarea>
			<button className="btn btn-primary mt-2">Reply</button>
		</div>
	);
}

export default ProjectReplyForm;
