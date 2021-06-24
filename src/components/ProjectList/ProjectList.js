import Projects from './Projects';
import ProjectHeader from './ProjectHeader';
import { useEffect } from 'react';

function ProjectList({ projects, page }) {
	useEffect(() => {
		window.scrollTo(0, localStorage.getItem('pos'));
	}, []);

	const handleScroll = () => {
		const position = window.pageYOffset;
		localStorage.setItem('pos', position);
	};

	useEffect(() => {
		window.addEventListener('scroll', handleScroll, { passive: true });

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	return (
		<div className="col-lg-6 mb-5">
			<div className="bg-content border-bottom border-start border-end border-secondary text-darken p-3">
				<p className="fw-bold m-0 text-capitalize">{page}</p>
			</div>
			<ProjectHeader />
			<Projects projects={projects} />
		</div>
	);
}

export default ProjectList;
