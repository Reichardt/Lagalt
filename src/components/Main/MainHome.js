import Projects from '../Projects/Projects';
import ProjectCreate from '../Projects/ProjectCreate';
import { useDispatch, useSelector } from 'react-redux';
import {
	fetchProjects,
	projectSelector,
} from '../../features/Project/projectSlice';
import { useEffect } from 'react';

function MainHome() {
	const dispatch = useDispatch();
	const { projects, loading } = useSelector(projectSelector);

	useEffect(() => {
		dispatch(fetchProjects());
	}, [dispatch]);

	return (
		<div className="col-lg-6">
			<div className="bg-content border-bottom border-start border-end border-secondary text-darken p-3">
				<p className="fw-bold m-0">Home</p>
			</div>
			<ProjectCreate />
			<Projects projects={projects} loading={loading} />
		</div>
	);
}

export default MainHome;
