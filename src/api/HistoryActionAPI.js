const HistoryActionAPI = {
	async getHistoryActions() {
		const res = await fetch(
			`${process.env.REACT_APP_API_URL}/userhistoryactions`
		);
		if (res.ok) {
			const data = res.json();
			return data;
		}
	},
};

export default HistoryActionAPI;
