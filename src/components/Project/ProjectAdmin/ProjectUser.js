function ProjectUser({ userData, handleRemoveUser }) {
	const { user, projectRole } = userData;

	return (
		<li className="list-group-item mb-3 border-secondary border">
			<div className="d-flex justify-content-between align-items-center">
				<p className="app-user text-capitalize">{user.username}</p>
				<small>{projectRole.name}</small>
			</div>
			<div className="d-flex justify-content-start my-3">
				<button
					className="btn btn-danger"
					onClick={() => handleRemoveUser(userData)}
				>
					Remove user
				</button>
			</div>
		</li>
	);
}

export default ProjectUser;
