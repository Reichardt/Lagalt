import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ProjectsAPI from '../../api/ProjectsAPI';
import SkillsAPI from '../../api/SkillsAPI';

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

export const fetchAllCategories = createAsyncThunk(
	'project/fetchAllCategories',
	async () => {
		return SkillsAPI.getAllSkills();
	}
);
export const projectSlice = createSlice({
	name: 'project',
	initialState: {
		projects: [],
		project: null,
		loading: false,
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
		[fetchAllCategories.pending]: state => {
			state.loading = true;
		},
		[fetchAllCategories.fulfilled]: (state, action) => {
			state.categories = action.payload;
			state.loading = false;
		},
		[fetchAllCategories.rejected]: (state, action) => {
			state.error = action.payload;
		},
	},
});

export const projectSelector = state => state.project;

export default projectSlice.reducer;
