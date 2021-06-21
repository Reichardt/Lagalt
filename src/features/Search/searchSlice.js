import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ProjectsAPI from '../../api/ProjectsAPI';

export const searchProjects = createAsyncThunk(
	'search/searchProjects',
	async query => {
		return ProjectsAPI.getAllProjects();
	}
);

export const searchSlice = createSlice({
	name: 'search',
	initialState: {
		suggestions: [],
		query: '',
		loading: false,
		error: null,
	},
	reducers: {
		clearSuggestions: state => {
			state.suggestions = [];
		},
		setQuery: (state, { payload }) => {
			state.query = payload;
		},
	},
	extraReducers: {
		[searchProjects.pending]: state => {
			state.loading = true;
		},
		[searchProjects.fulfilled]: (state, action) => {
			state.loading = false;
			state.suggestions = action.payload;
		},
	},
});

export const { clearSuggestions, setQuery } = searchSlice.actions;

export const searchSelector = state => state.search;

export default searchSlice.reducer;
