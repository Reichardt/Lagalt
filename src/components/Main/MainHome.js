import Projects from '../Projects/Projects';
import ProjectCreate from '../Projects/ProjectCreate';
import { useDispatch, useSelector } from 'react-redux';
import {
	fetchAllProjects,
	projectSelector,
} from '../../features/Project/projectSlice';
import { useEffect } from 'react';

function MainHome() {
	const dispatch = useDispatch();
	const { projects, loading, error } = useSelector(projectSelector);

	useEffect(() => {
		dispatch(fetchAllProjects());
	}, [dispatch]);

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
		<div className="col-lg-6">
			<div className="bg-content border-bottom border-start border-end border-secondary text-darken p-3">
				<p className="fw-bold m-0">Home</p>
			</div>
			<ProjectCreate />
			{!error && <Projects projects={projects} loading={loading} />}
			{error && 'There was an error fetching the projects'}
		</div>
	);
}

export default MainHome;
