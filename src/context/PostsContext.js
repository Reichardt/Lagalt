import { createContext, useContext, useEffect, useState } from 'react';
import PostsAPI from '../data/PostsAPI';

const PostsContext = createContext();

export const usePosts = () => {
	return useContext(PostsContext);
};

export function PostsProvider({ children }) {
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		PostsAPI.getPosts().then(posts => {
			setPosts(posts);
			setLoading(false);
		});
	}, []);

	const value = {
		posts,
	};

	return (
		<PostsContext.Provider value={value}>
			{!loading && children}
		</PostsContext.Provider>
	);
}
