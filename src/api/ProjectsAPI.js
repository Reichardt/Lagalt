const ProjectsAPI = {
    async getAllProjects() {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/projects`);
        const data = await res.json();

        if (res.ok) {
            return data;
        }
    },
    async addProject() {},
    async getProjectById(id) {
        const res = await fetch(
            `${process.env.REACT_APP_API_URL}/projects/${id}`
        );
        const data = await res.json();

        if (res.ok) {
            return data;
        }
    },
};

export default ProjectsAPI;
