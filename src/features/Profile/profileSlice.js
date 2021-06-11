import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import UserAPI from '../../data/UserAPI';

export const addNewProfile = createAsyncThunk(
	'profile/addNewProfile',
	async (user, token) => {
		try {
			return UserAPI.addUser(user, token);
		} catch (err) {
			console.log(err);
		}
	}
);

export const getProfile = createAsyncThunk('profile/getProfile', async id => {
	try {
		const user = UserAPI.getUser(id);
		return user;
	} catch (err) {
		console.log(err);
	}
});

export const profileSlice = createSlice({
	name: 'profile',
	initialState: {
		id: null,
		userProfile: null,
		loading: false,
		error: null,
	},
	reducers: {
		setProfile: (state, action) => {
			state.profile = action.payload;
		},
	},
	extraReducers: {
		[addNewProfile.pending]: state => {
			state.loading = true;
		},
		[addNewProfile.fulfilled]: (state, action) => {
			state.userProfile = action.payload;
			state.loading = false;
		},
		[addNewProfile.rejected]: (state, action) => {
			state.error = action.payload;
		},
		[getProfile.pending]: state => {
			state.loading = true;
		},
		[getProfile.fulfilled]: (state, action) => {
			state.userProfile = action.payload;
			state.loading = false;
		},
		[getProfile.rejected]: (state, action) => {
			state.error = action.payload;
			state.loading = false;
		},
	},
});

export const { setProfile } = profileSlice.actions;

export const profileSelector = state => state.profile;

export default profileSlice.reducer;
