import ProjectReq from './ProjectReq';
import { Link } from 'react-router-dom';

function ProjectDetail({ project }) {
	return (
		<>
			<div className="col-lg-12 mb-3">
				<div className="px-3">
					<h2 className="pb-2">{project.title}</h2>
				</div>
			</div>
			<div className="col-lg-6">
				<div className="px-3 d-flex justify-content-between flex-column">
					<p>{project.description}</p>
				</div>
			</div>
			<div className="col-lg-6">
				<div className="p-3 project-details border-secondary border-start border-top border-bottom">
					<p className="require">Details</p>
					<hr />
					<p className="repo-url">
						Url:
						<Link
							to={{ pathname: project.repoURL }}
							className="ms-2"
							target="_blank"
						>
							{project.repoURL}
						</Link>
					</p>
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
