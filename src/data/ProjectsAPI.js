const ProjectsAPI = {
    async getAllProjects() {
        const res = await fetch("http://localhost:44382/api/v1/projects");
        const data = await res.json();

        return data;
    },
    async addProject() {},
    async getAllProgress() {
        const res = await fetch(
            "http://localhost:44382/api/v1/projectprogresses"
        );
        const data = await res.json();

        return data;
    },
};

export default ProjectsAPI;
