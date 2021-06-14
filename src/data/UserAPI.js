const UserAPI = {
	async getUserById(id) {
		const res = await fetch(`https://localhost:44381/api/v1/users/${id}`);
		if (res.ok) {
			const data = await res.json();
			return data;
		}
	},
	async getUserByName(name) {
		const res = await fetch(
			`https://localhost:44381/api/v1/users/${name}/profile`
		);
		if (res.ok) {
			const data = await res.json();
			return data;
		}
	},
	async getUserByNameAndId(name, id) {},
	async addUser(user, token) {
		const newUser = {
			email: user.email,
			name: user.firstName,
			username: user.username,
			description: 'hehe',
			isSkillsHidden: false,
			isActive: true,
		};
		const res = await fetch('https://localhost:44381/api/v1/users', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + token,
			},
			body: JSON.stringify(newUser),
		});

		if (res.ok) {
			const data = await res.json();
			return data;
		}
	},
};

export default UserAPI;
