import { createSlice } from '@reduxjs/toolkit';

export const profileSlice = createSlice({
	name: 'profile',
	initialState: {
		id: null,
		profile: null,
		loading: false,
		error: false,
		authenticated: false,
	},
	reducers: {
		setId: (state, { payload }) => {
			state.id = payload;
		},
		setProfile: (state, { payload }) => {
			state.profile = payload;
			state.loading = false;
			state.error = false;
		},
	},
});

export const { setProfile, setId } = profileSlice.actions;

export const profileSelector = state => state.profile;

export default profileSlice.reducer;
