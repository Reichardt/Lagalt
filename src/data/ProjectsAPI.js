const ProjectsAPI = {
	async getAllProjects() {
		const res = await fetch('https://localhost:44381/api/v1/projects');
		const data = await res.json();

		return data;
	},
};

export default ProjectsAPI;
