import Posts from '../Posts/Posts';
import PostCreate from '../Posts/PostCreate';
import { usePosts } from '../../context/PostsContext';

function MainHome() {
	const { posts } = usePosts();

	return (
		<div>
			<div className="bg-content center-column border-bottom border-start border-end border-secondary text-darken p-3">
				<p className="fw-bold m-0">Home</p>
			</div>
			<PostCreate />
			<Posts posts={posts} />
		</div>
	);
}

export default MainHome;
