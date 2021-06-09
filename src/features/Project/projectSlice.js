import { createSlice } from '@reduxjs/toolkit';

export const projectSlice = createSlice({
	name: 'project',
	initialState: {
		projects: [],
		loading: false,
		error: null,
	},
	reducers: {
		fetchProjects: state => {
			state.loading = true;
		},
		setProjects: (state, { payload }) => {
			state.projects = payload;
			state.loading = false;
			state.error = false;
		},
		setProjectError: state => {
			state.loading = false;
			state.error = true;
		},
	},
});

export const { fetchProjects, setProjects, setProjectError } =
	projectSlice.actions;

export const projectSelector = state => state.project;

export default projectSlice.reducer;
