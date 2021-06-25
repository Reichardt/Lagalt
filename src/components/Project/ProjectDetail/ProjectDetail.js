import ProjectReq from './ProjectReq';
import { Link } from 'react-router-dom';
import getTimeDiff from '../../../util/getTimeDiff';
import { useState } from 'react';

function ProjectDetail({ project, role }) {
	const [state, setState] = useState({
		checked: false,
	});

	const handleSwitchChange = () => {
		setState({
			...state,
			checked: !state.checked,
		});
	};
	return (
		<>
			<div className="col-lg-12 mb-3">
				<div className="px-3 d-flex justify-content-between align-items-center mb-3">
					<h2 className="text-capitalize">{project.title}</h2>
					{role.name === 'Owner' && (
						<div className="form-check form-switch mt-3">
							<label>Edit project</label>
							<input
								className="form-check-input custom-input"
								type="checkbox"
								id="flexSwitchCheckChecked"
								checked={state.checked}
								onChange={handleSwitchChange}
							/>
						</div>
					)}
				</div>
			</div>
			<div className="col-lg-6 main-desc">
				<div className="px-3 d-flex justify-content-between flex-column">
					<p>{project.description}</p>
				</div>
			</div>
			<div className="col-lg-6">
				<div className="p-3 project-details border-secondary border-start border-top border-bottom">
					<div className="d-flex justify-content-between align-items-center">
						<p className="require">Details</p>
						<small>{getTimeDiff(project.createdAt)}</small>
					</div>
					<hr />
					<p className="repo-url mb-2">
						Url:
						<Link
							to={{ pathname: project.repoURL }}
							className="ms-1"
							target="_blank"
						>
							{project.repoURL}
						</Link>
					</p>
					<p className="mb-0">Status: {project.progress}</p>
					<div className="mt-3 required">
						<p className="mb-2 intro">We're currently looking for</p>
						<ul>
							{project.skills.map((skill, index) => (
								<ProjectReq skill={skill} key={index} />
							))}
						</ul>
					</div>
				</div>
			</div>
		</>
	);
}

export default ProjectDetail;
