const ProgressAPI = {
	async getAllProgress() {
		const res = await fetch('https://localhost:44381/api/v1/projectprogresses');
		const data = await res.json();

		return data;
	},
};

export default ProgressAPI;
