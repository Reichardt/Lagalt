import { combineReducers } from '@reduxjs/toolkit';
import projectReducer from '../features/Project/projectSlice';
import profileReducer from '../features/Profile/profileSlice';

export default combineReducers({
	project: projectReducer,
	profile: profileReducer,
});
