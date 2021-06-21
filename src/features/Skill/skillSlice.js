import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import SkillsAPI from '../../api/SkillsAPI';

export const fetchAllSkills = createAsyncThunk(
	'project/fetchAllSkills',
	async () => {
		return SkillsAPI.getAllSkills();
	}
);

export const skillSlice = createSlice({
	name: 'skill',
	initialState: {
		loading: false,
		error: null,
		skills: [],
	},
	extraReducers: {
		[fetchAllSkills.pending]: state => {
			state.loading = true;
		},
		[fetchAllSkills.fulfilled]: (state, action) => {
			state.skills = action.payload;
			state.loading = false;
		},
		[fetchAllSkills.rejected]: (state, action) => {
			state.error = action.payload;
		},
	},
});

export const skillSelector = state => state.skill;

export default skillSlice.reducer;
