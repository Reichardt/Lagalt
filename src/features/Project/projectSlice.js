import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ProjectsAPI from '../../api/ProjectsAPI';

export const fetchAllProjects = createAsyncThunk(
	'project/fetchAllProjects',
	async () => {
		let projects = await ProjectsAPI.getAllProjects();

		projects = projects.map(project => {
			return {
				...project,
				current: project.skills.reduce((acc, curr) => {
					return (acc += curr.foundCount);
				}, 0),
				total: project.skills.reduce((acc, curr) => {
					return (acc += curr.requiredCount);
				}, 0),
			};
		});

		return projects;
	}
);

export const fetchProjectById = createAsyncThunk(
	'project/fetchProjectById',
	async id => {
		let project = await ProjectsAPI.getProjectById(id);

		project = {
			...project,
			current: project.skills.reduce((acc, curr) => {
				return (acc += curr.foundCount);
			}, 0),
			total: project.skills.reduce((acc, curr) => {
				return (acc += curr.requiredCount);
			}, 0),
		};

		return project;
	}
);

export const fetchAllProjectsByCategory = createAsyncThunk(
	'project/fetchAllProjectsByCategory',
	async (category) => {
		let projects = await ProjectsAPI.getAllProjectsByCategory(category);

		projects = projects.map(project => {
			return {
				...project,
				current: project.skills.reduce((acc, curr) => {
					return (acc += curr.foundCount);
				}, 0),
				total: project.skills.reduce((acc, curr) => {
					return (acc += curr.requiredCount);
				}, 0),
			};
		});

		return projects;
	}
);

export const addNewProject = createAsyncThunk(
	'project/addNewProject',
	async projectData => {
		const { project, token } = projectData;
		const newProject = ProjectsAPI.addProject(project, token);

		return newProject;
	}
);

export const applyToProject = createAsyncThunk(
	'project/applyToProject',
	async applicationData => {
		const { application, id, token } = applicationData;
		const app = await ProjectsAPI.applyToProject(application, id, token);

		return app;
	}
);

export const getProjectApplications = createAsyncThunk(
	'project/getProjectApplications',
	async id => {
		const applications = await ProjectsAPI.getProjectApplications(id);

		return applications;
	}
);

export const getProjectUsers = createAsyncThunk(
	'project/getProjectUsers',
	async id => {
		const users = await ProjectsAPI.getProjectUsers(id);
		return users;
	}
);

export const updateProjectApplication = createAsyncThunk(
	'project/updateProjectApplication',
	async applicationData => {
		const { id, application, token } = applicationData;
		await ProjectsAPI.updateProjectApplication(id, application, token);
	}
);

export const addUserToProject = createAsyncThunk(
	'project/addUserToProject',
	async userData => {
		const { id, user, token } = userData;
		const returnedUser = await ProjectsAPI.addUserToProject(id, user, token);
		return returnedUser;
	}
);

export const updateProjectUsers = createAsyncThunk(
	'project/updateProjectUsers',
	async usersData => {
		const { id, users, token } = usersData;
		await ProjectsAPI.updateProjectUsers(id, users, token);
	}
);

export const getProjectMessages = createAsyncThunk(
	'project/getProjectMessages',
	async id => {
		const messages = await ProjectsAPI.getMessages(id);
		return messages;
	}
);

export const addMessage = createAsyncThunk(
	'project/addMessage',
	async messageData => {
		const { id, message, token } = messageData;
		const addedMessage = await ProjectsAPI.addMessage(id, message, token);
		return addedMessage;
	}
);

export const getRecommendedProjects = createAsyncThunk(
	'project/getRecommendedProjects',
	async name => {
		let projects = await ProjectsAPI.getRecommendedProjects(name);

		projects = projects.map(project => {
			return {
				...project,
				current: project.skills.reduce((acc, curr) => {
					return (acc += curr.foundCount);
				}, 0),
				total: project.skills.reduce((acc, curr) => {
					return (acc += curr.requiredCount);
				}, 0),
			};
		});

		return projects;
	}
);

export const projectSlice = createSlice({
	name: 'project',
	initialState: {
		projects: [],
		project: null,
		projectApplications: null,
		projectUsers: null,
		projectMessages: null,
		loading: false,
		appLoading: false,
		modalLoading: false,
		error: null,
	},
	reducers: {
		setProjectApplications: (state, action) => {
			state.projectApplications = action.payload;
		},
		setProject: (state, action) => {
			state.project = action.payload;
		},
	},
	extraReducers: {
		[fetchAllProjects.pending]: state => {
			state.loading = true;
		},
		[fetchAllProjects.fulfilled]: (state, action) => {
			state.projects = action.payload;
			state.loading = false;
		},
		[fetchAllProjects.rejected]: (state, action) => {
			state.error = action.payload;
		},
		[fetchProjectById.pending]: state => {
			state.loading = true;
		},
		[fetchProjectById.fulfilled]: (state, action) => {
			state.project = action.payload;
			state.loading = false;
		},
		[fetchProjectById.rejected]: (state, action) => {
			state.error = action.payload;
		},
		[fetchAllProjectsByCategory.pending]: state => {
			state.loading = true;
		},
		[fetchAllProjectsByCategory.fulfilled]: (state, action) => {
			state.projects = action.payload;
			state.loading = false;
		},
		[fetchAllProjectsByCategory.rejected]: (state, action) => {
			state.error = action.payload;
		},
		[addNewProject.pending]: state => {
			state.loading = true;
		},
		[addNewProject.fulfilled]: (state, action) => {
			state.loading = false;
		},
		[addNewProject.rejected]: (state, action) => {
			state.error = action.payload;
		},
		[applyToProject.pending]: state => {
			state.appLoading = true;
		},
		[applyToProject.fulfilled]: state => {
			state.appLoading = false;
		},
		[applyToProject.rejected]: (state, action) => {
			state.appLoading = false;
			state.error = action.payload;
		},
		[getProjectApplications.pending]: state => {
			state.loading = true;
		},
		[getProjectApplications.fulfilled]: (state, action) => {
			state.loading = false;
			state.projectApplications = action.payload;
		},
		[getProjectApplications.rejected]: (state, action) => {
			state.error = action.payload;
		},
		[getProjectUsers.pending]: state => {
			state.modalLoading = true;
		},
		[getProjectUsers.fulfilled]: (state, action) => {
			state.modalLoading = false;
			state.projectUsers = action.payload;
		},
		[getProjectUsers.rejected]: (state, action) => {
			state.error = action.payload;
		},
		[getProjectMessages.pending]: state => {
			state.loading = true;
		},
		[getProjectMessages.fulfilled]: (state, action) => {
			state.loading = false;
			state.projectMessages = action.payload;
		},
		[getProjectMessages.rejected]: (state, action) => {
			state.error = action.payload;
		},
		[getRecommendedProjects.pending]: state => {
			state.loading = true;
		},
		[getRecommendedProjects.fulfilled]: (state, action) => {
			state.loading = false;
			state.projects = action.payload;
		},
		[getRecommendedProjects.rejected]: (state, action) => {
			state.error = action.payload;
		},
	},
});

export const { setProjectApplications, setProject } = projectSlice.actions;

export const projectSelector = state => state.project;

export default projectSlice.reducer;
