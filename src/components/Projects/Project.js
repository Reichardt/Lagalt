import { useHistory } from 'react-router-dom';
import getTimeDiff from '../../util/getTimeDiff';

function Project({ project }) {
	const history = useHistory();

	const handleProjectClick = () => {
		history.push('/project/' + project.project.id);
	};

	return (
		<div
			onClick={handleProjectClick}
			className="bg-content border-bottom border-start border-end project-item border-secondary text-darken p-3 pt-2"
		>
			<div className="d-flex justify-content-between align-items-center mt-3">
				<p>{project.project.title}</p>
				<p>Role: {project.projectRole.name}</p>
			</div>
			<hr />
			<div className="d-flex justify-content-between desc">
				<p>{getTimeDiff(project.createdAt)}</p>
			</div>
		</div>
	);
}

export default Project;
