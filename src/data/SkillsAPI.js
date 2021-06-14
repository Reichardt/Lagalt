const SkillsAPI = {
    async getAllSkills() {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/skills`);
        const data = await res.json();

        return data;
    },
};

export default SkillsAPI;
