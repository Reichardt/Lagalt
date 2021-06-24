import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
	profileSelector,
	getProfileHistory,
} from '../../features/Profile/profileSlice';
import getTimeDiff from '../../util/getTimeDiff';

function SidenavRecent() {
	const dispatch = useDispatch();
	const { userProfile, history } = useSelector(profileSelector);

	useEffect(() => {
		userProfile && dispatch(getProfileHistory(userProfile.username));
	}, [userProfile]);

	return (
		<>
			{userProfile && (
				<>
					<div className="bg-light border border-secondary text-darken p-3 mt-3 recent-projects">
						<p className="mb-0">Recently viewed projects</p>
					</div>
					{history.map(project => (
						<div className="recent-project">
							<Link
								to={`/project/${project.project.id}`}
								className="bg-content border-secondary border-start border-end border-bottom p-3 d-flex flex-column"
							>
								<p className="mb-0">{project.project.title}</p>
								<hr className="my-2" />
								<small>Viewed {getTimeDiff(project.createdAt)}</small>
							</Link>
						</div>
					))}
				</>
			)}
		</>
	);
}

export default SidenavRecent;
