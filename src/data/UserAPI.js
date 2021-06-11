const UserAPI = {
	async getUser() {
		const res = await fetch('https://localhost:44381/api/v1/users');
		const data = await res.json();

		return data;
	},
};

export default UserAPI;
