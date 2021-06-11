const SkillsAPI = {
	async getAllSkills() {
		const res = await fetch('https://localhost:44381/api/v1/skills');
		const data = await res.json();

		return data;
	},
};

export default SkillsAPI;
