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

export const getProfileApplications = createAsyncThunk(
	'profile/getProfileApplications',
	async username => {
		const applications = await UserAPI.getProfileApplications(username);
		return applications;
	}
);

export const getProfileProjects = createAsyncThunk(
	'profile/getProfileProjects',
	async username => {
		const projects = await UserAPI.getProfileProjects(username);
		return projects;
	}
);

export const updateProfileDesc = createAsyncThunk(
	'profile/updateProfileDesc',
	async profileData => {
		const { updatedProfile, token } = profileData;
		await UserAPI.updateProfileDesc(updatedProfile, token);
	}
);

export const updateProfilePortfolioItems = createAsyncThunk(
	'profile/updateProfilePortfolioItems',
	async portfolioData => {
		const { portfolioItems, userId, token } = portfolioData;
		await UserAPI.updateProfilePortfolioItems(portfolioItems, userId, token);
	}
);

export const profileSlice = createSlice({
	name: 'profile',
	initialState: {
		userProfile: null,
		applications: [],
		projects: [],
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
		[getProfileApplications.pending]: state => {
			state.userAttributesLoading = true;
		},
		[getProfileApplications.fulfilled]: (state, action) => {
			state.userAttributesLoading = false;
			state.applications = action.payload;
		},
		[getProfileApplications.rejected]: (state, action) => {
			state.error = action.payload;
			state.userAttributesLoading = false;
		},
		[getProfileProjects.pending]: state => {
			state.userAttributesLoading = true;
		},
		[getProfileProjects.fulfilled]: (state, action) => {
			state.userAttributesLoading = false;
			state.projects = action.payload;
		},
		[getProfileProjects.rejected]: (state, action) => {
			state.error = action.payload;
			state.userAttributesLoading = false;
		},
	},
});

export const { setProfile, setProfileSkills } = profileSlice.actions;

export const profileSelector = state => state.profile;

export default profileSlice.reducer;
