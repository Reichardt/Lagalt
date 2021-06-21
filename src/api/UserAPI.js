const UserAPI = {
    async getUserById(id) {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/users/${id}`);
        if (res.ok) {
            const data = await res.json();
            return data;
        }
    },
    async getUserByName(name) {
        const res = await fetch(
            `${process.env.REACT_APP_API_URL}/users/${name}/profile`
        );
        if (res.ok) {
            const data = await res.json();
            return data;
        }
    },
    async addUser(user, token) {
        const newUser = {
            email: user.email,
            name: user.firstName,
            username: user.username,
            description: "hehe",
            isSkillsHidden: false,
            isActive: true,
        };
        const res = await fetch(`${process.env.REACT_APP_API_URL}/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
            body: JSON.stringify(newUser),
        });

        if (res.ok) {
            const data = await res.json();
            return data;
        }
    },
};

export default UserAPI;