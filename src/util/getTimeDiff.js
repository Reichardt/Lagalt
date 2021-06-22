const getTimeDiff = date => {
	const convertedDate = new Date(Date.parse(date.toString()));
	const now = new Date();
	const diff = now.getTime() - convertedDate.getTime();
	const days = diff / (1000 * 60 * 60 * 24);
	if (days < 1) {
		const hours = diff / (1000 * 60 * 60);
		if (hours < 1) {
			const minutes = diff / (1000 * 60);
			return `${Math.floor(minutes)} minutes ago`;
		}
		return `${Math.floor(hours)} hours ago`;
	}
	return `${Math.floor(days)} days ago`;
};

export default getTimeDiff;
