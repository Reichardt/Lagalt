import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import HistoryActionAPI from '../../api/HistoryActionAPI';

export const fetchAllActions = createAsyncThunk(
	'historyAction/fetchAllActions',
	async () => {
		return await HistoryActionAPI.getHistoryActions();
	}
);

export const addUserAction = createAsyncThunk(
	'historyAction/addUserAction',
	async actionData => {
		const { id, action, token } = actionData;
		return await HistoryActionAPI.addUserAction(id, action, token);
	}
);

export const historyActionSlice = createSlice({
	name: 'historyAction',
	initialState: {
		actions: [],
		loading: false,
		error: null,
	},
	extraReducers: {
		[fetchAllActions.pending]: state => {
			state.loading = true;
		},
		[fetchAllActions.fulfilled]: (state, action) => {
			state.actions = action.payload;
			state.loading = false;
		},
		[fetchAllActions.rejected]: (state, action) => {
			state.error = action.payload;
		},
	},
});

export const historyActionSelector = state => state.historyAction;

export default historyActionSlice.reducer;
