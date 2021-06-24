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
	async addUserAction(id, action, token) {
		await fetch(`${process.env.REACT_APP_API_URL}/users/${id}/history`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + token,
			},
			body: JSON.stringify(action),
		});
	},
};

export default HistoryActionAPI;
