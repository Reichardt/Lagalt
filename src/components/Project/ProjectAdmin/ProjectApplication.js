import getTimeDiff from '../../../util/getTimeDiff';

function ProjectApplication({ application }) {
	return (
		<li className="list-group-item" key={application.id}>
			<div className="d-flex justify-content-between align-items-center">
				<p className="app-user">{application.user.username}</p>
				<small>{getTimeDiff(application.createdAt)}</small>
			</div>
			<hr className="my-2" />
			<p className="app-mot-text">{application.motivationalText}</p>
			<div className="app-skills mt-3">
				<p className="fw-bold">Skills</p>
				<ul>
					{application.skills.map(skill => (
						<li className="text-capitalize" key={skill.id}>
							{skill.name}
						</li>
					))}
				</ul>
			</div>
			<hr />
			<div className="d-flex justify-content-end">
				<button className="btn btn-danger me-2">Deny</button>
				<button className="btn btn-success">Approve</button>
			</div>
		</li>
	);
}

export default ProjectApplication;
