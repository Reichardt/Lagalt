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
		await ProjectsAPI.applyToProject(application, id, token);
	}
);

export const projectSlice = createSlice({
	name: 'project',
	initialState: {
		projects: [],
		project: null,
		loading: false,
		appLoading: false,
		error: null,
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
	},
});

export const projectSelector = state => state.project;

export default projectSlice.reducer;
