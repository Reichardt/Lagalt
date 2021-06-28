import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	fetchAllProjectsByCategory,
	projectSelector,
} from '../features/Project/projectSlice';
import Sidenav from '../components/Sidenav/Sidenav';
import ProjectList from '../components/ProjectList/ProjectList';
import Loader from '../components/Global/Loader';

function Category({ match }) {
	const { category } = match.params;
	const dispatch = useDispatch();
	const { projects, loading } = useSelector(projectSelector);

	useEffect(() => {
		dispatch(fetchAllProjectsByCategory(category));
		// eslint-disable-next-line
	}, [dispatch]);

	return (
		<div className="container">
			<div className="row">
				<Sidenav side={'left'} />
				{loading && <Loader styles={loaderStyles} />}
				{!loading && (
					<>
						<ProjectList projects={projects} page={`category - ${category}`} />
						<Sidenav side={'right'} />
					</>
				)}
			</div>
		</div>
	);
}

export default Category;

const loaderStyles = {
	top: '50%',
	left: '50%',
	zIndex: '2',
};
