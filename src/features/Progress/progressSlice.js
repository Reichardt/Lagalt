import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ProgressAPI from '../../api/ProgressAPI';

export const fetchAllProgress = createAsyncThunk(
	'progress/fetchAllProgress',
	async () => {
		return ProgressAPI.getAllProgress();
	}
);

export const progressSlice = createSlice({
	name: 'progress',
	initialState: {
		progress: [],
		loading: false,
		error: null,
	},
	extraReducers: {
		[fetchAllProgress.pending]: state => {
			state.loading = true;
		},
		[fetchAllProgress.fulfilled]: (state, action) => {
			state.progress = action.payload;
			state.loading = false;
		},
		[fetchAllProgress.rejected]: (state, action) => {
			state.error = action.payload;
		},
	},
});

export const progressSelector = state => state.progress;

export default progressSlice.reducer;
