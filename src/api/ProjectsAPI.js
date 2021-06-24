const ProjectsAPI = {
	async getAllProjects() {
		const res = await fetch(`${process.env.REACT_APP_API_URL}/projects`);
		const data = await res.json();

		if (res.ok) {
			return data;
		}
	},
	async addProject(project, token) {
		const res = await fetch(`${process.env.REACT_APP_API_URL}/projects`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + token,
			},
			body: JSON.stringify(project),
		});

		const data = await res.json();

		if (res.ok) {
			return data;
		}
	},
	async getProjectById(id) {
		const res = await fetch(`${process.env.REACT_APP_API_URL}/projects/${id}`);
		const data = await res.json();

		if (res.ok) {
			return data;
		}
	},
	async applyToProject(application, id, token) {
		const res = await fetch(
			`${process.env.REACT_APP_API_URL}/projects/${id}/applications`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + token,
				},
				body: JSON.stringify(application),
			}
		);
		const data = await res.json();

		if (res.ok) {
			return data;
		}
	},
	async getProjectApplications(id) {
		const res = await fetch(
			`${process.env.REACT_APP_API_URL}/projects/${id}/applications`
		);
		const data = await res.json();

		if (res.ok) {
			return data;
		}
	},
	async getProjectUsers(id) {
		const res = await fetch(
			`${process.env.REACT_APP_API_URL}/projects/${id}/users`
		);
		const data = await res.json();

		if (res.ok) {
			return data;
		}
	},
	async updateProjectApplication(id, application, token) {
		await fetch(
			`${process.env.REACT_APP_API_URL}/projects/${id}/applications/${application.id}`,
			{
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + token,
				},
				body: JSON.stringify(application),
			}
		);
	},
	async addUserToProject(id, user, token) {
		const res = await fetch(
			`${process.env.REACT_APP_API_URL}/projects/${id}/users`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + token,
				},
				body: JSON.stringify(user),
			}
		);
		const data = await res.json();

		if (res.ok) {
			return data;
		}
	},
	async updateProjectUsers(id, users, token) {
		const res = await fetch(
			`${process.env.REACT_APP_API_URL}/projects/${id}/users`,
			{
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + token,
				},
				body: JSON.stringify(users),
			}
		);
		const data = await res.json();

		if (res.ok) {
			return data;
		}
	},
	async getMessages(id) {
		const res = await fetch(
			`${process.env.REACT_APP_API_URL}/projects/${id}/messages`
		);
		const data = await res.json();

		if (res.ok) {
			return data;
		}
	},
	async addMessage(id, text, token) {
		const res = await fetch(
			`${process.env.REACT_APP_API_URL}/projects/${id}/messages`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + token,
				},
				body: JSON.stringify(text),
			}
		);
		const data = await res.json();

		if (res.ok) {
			return data;
		}
	},
	async getRecommendedProjects(name) {
		const res = await fetch(
			`${process.env.REACT_APP_API_URL}/projects/${name}/recommended`
		);
		const data = await res.json();

		if (res.ok) {
			return data;
		}
	},
};

export default ProjectsAPI;
