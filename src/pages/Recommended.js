import { useEffect } from 'react';
import Sidenav from '../components/Sidenav/Sidenav';
import ProjectList from '../components/ProjectList/ProjectList';
import { useDispatch, useSelector } from 'react-redux';
import {
	getRecommendedProjects,
	projectSelector,
} from '../features/Project/projectSlice';
import { profileSelector } from '../features/Profile/profileSlice';
import Loader from '../components/Global/Loader';

function Home() {
	const dispatch = useDispatch();
	const { projects, loading } = useSelector(projectSelector);
	const { userProfile } = useSelector(profileSelector);

	useEffect(() => {
		userProfile && dispatch(getRecommendedProjects(userProfile.username));
	}, [dispatch, userProfile]);

	return (
		<div className="container">
			<div className="row">
				<Sidenav side={'left'} />
				{loading && <Loader styles={loaderStyles} />}
				{!loading && (
					<>
						<ProjectList projects={projects} page="recommended" />
						<Sidenav side={'right'} />
					</>
				)}
			</div>
		</div>
	);
}

export default Home;

const loaderStyles = {
	top: '50%',
	left: '50%',
	zIndex: '2',
};
