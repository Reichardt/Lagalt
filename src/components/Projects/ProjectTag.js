import { Fragment } from 'react';

function ProjectTag({ tag }) {
	return (
		<Fragment>
			<span className="tag me-3 text-capitalize">{tag}</span>
		</Fragment>
	);
}

export default ProjectTag;
