const ProgressAPI = {
    async getAllProgress() {
        const res = await fetch(
            `${process.env.REACT_APP_API_URL}/projectprogress`
        );
        const data = await res.json();

        return data;
    },
};

export default ProgressAPI;
