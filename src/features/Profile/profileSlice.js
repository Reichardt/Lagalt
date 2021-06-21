import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import UserAPI from '../../api/UserAPI';

export const addNewProfile = createAsyncThunk(
	'profile/addNewProfile',
	async data => {
		try {
			return UserAPI.addUser(data[0], data[1]);
		} catch (err) {
			console.log(err);
		}
	}
);

export const getProfileById = createAsyncThunk(
	'profile/getProfileById',
	async id => {
		try {
			const user = UserAPI.getUserById(id);
			return user;
		} catch (err) {
			console.log(err);
		}
	}
);

export const getProfileByUsername = createAsyncThunk(
	'profile/getProfileByUsername',
	async username => {
		try {
			const user = await UserAPI.getUserByName(username);
			return user;
		} catch (err) {
			console.log(err);
		}
	}
);

export const updateProfileSkills = createAsyncThunk(
	'profile/updateProfileSkills',
	async data => {
		await UserAPI.updateProfileSkills(data[0], data[1], data[2]);
	}
);

export const profileSlice = createSlice({
	name: 'profile',
	initialState: {
		userProfile: null,
		searchedUser: null,
		searchedUserLoading: false,
		loading: false,
		userAttributesLoading: false,
		error: null,
	},
	reducers: {
		setProfile: (state, action) => {
			state.userProfile = action.payload;
		},
		setProfileSkills: (state, action) => {
			state.userProfile.skills = action.payload;
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
		[getProfileById.pending]: state => {
			state.loading = true;
		},
		[getProfileById.fulfilled]: (state, action) => {
			state.userProfile = action.payload;
			state.loading = false;
		},
		[getProfileById.rejected]: (state, action) => {
			state.error = action.payload;
			state.loading = false;
		},
		[getProfileByUsername.pending]: state => {
			state.searchedUserLoading = true;
		},
		[getProfileByUsername.fulfilled]: (state, action) => {
			state.searchedUser = action.payload;
			state.searchedUserLoading = false;
		},
		[getProfileByUsername.rejected]: (state, action) => {
			state.searchedUser = null;
			state.error = action.payload;
			state.searchedUserLoading = false;
		},
		[updateProfileSkills.pending]: state => {
			state.userAttributesLoading = true;
		},
		[updateProfileSkills.fulfilled]: state => {
			state.userAttributesLoading = false;
		},
		[updateProfileSkills.rejected]: (state, action) => {
			state.error = action.payload;
			state.userAttributesLoading = false;
		},
	},
});

export const { setProfile, setProfileSkills } = profileSlice.actions;

export const profileSelector = state => state.profile;

export default profileSlice.reducer;
