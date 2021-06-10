import { Fragment } from 'react';

function ProjectTag({ tag }) {
	return (
		<Fragment>
			<span className="tag me-3">{tag}</span>
		</Fragment>
	);
}

export default ProjectTag;
