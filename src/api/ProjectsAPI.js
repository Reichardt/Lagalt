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
		await fetch(
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
	},
};

export default ProjectsAPI;
