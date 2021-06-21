import React from 'react';
import { useHistory } from 'react-router-dom';
import { PeopleFill } from 'react-bootstrap-icons';
import ProjectSkill from './ProjectSkill';
import ProjectTag from './ProjectTag';

function ProjectItem({ project }) {
	const history = useHistory();

	const handleProjectClick = () => {
		history.push('/project/' + project.id);
	};

	const handleLinkClick = e => {
		e.stopPropagation();
		history.push(`/profile/${project.creator}`);
	};

	return (
		<div
			onClick={handleProjectClick}
			className="bg-content border-bottom border-start border-end project-item border-secondary text-darken p-3"
		>
			<div className="d-flex justify-content-between align-items-center">
				<div className="d-flex align-items-center">
					{project.skills &&
						project.skills.map((skill, index) => (
							<ProjectSkill skill={skill} key={`${skill}-${index}`} />
						))}
				</div>
				<span className="members">
					<PeopleFill />{' '}
					<span className="ms-1">
						{project.current} / {project.total}
					</span>
				</span>
			</div>
			<div className="tags mb-2">
				{project.tags &&
					project.tags.map(tag => <ProjectTag tag={tag} key={tag} />)}
			</div>
			<p>{project.title}</p>
			<div className="text-end">
				<small>
					Posted by{' '}
					<span className="link" onClick={handleLinkClick}>
						{project.creator}
					</span>
				</small>
			</div>
		</div>
	);
}

export default ProjectItem;
