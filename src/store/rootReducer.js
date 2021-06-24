import { combineReducers } from '@reduxjs/toolkit';
import projectReducer from '../features/Project/projectSlice';
import profileReducer from '../features/Profile/profileSlice';
import searchReducer from '../features/Search/searchSlice';
import progressReducer from '../features/Progress/progressSlice';
import skillReducer from '../features/Skill/skillSlice';
import historyActionReducer from '../features/HistoryAction/historyActionSlice';

export default combineReducers({
	project: projectReducer,
	profile: profileReducer,
	search: searchReducer,
	progress: progressReducer,
	skill: skillReducer,
	historyAction: historyActionReducer,
});
