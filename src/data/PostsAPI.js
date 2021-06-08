const PostsAPI = {
	async getPosts() {
		const res = await fetch('https://jsonplaceholder.typicode.com/posts');
		const data = await res.json();

		return data;
	},
};

export default PostsAPI;
