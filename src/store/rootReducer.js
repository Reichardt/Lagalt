import { combineReducers } from "@reduxjs/toolkit";
import projectReducer from "../features/Project/projectSlice";
import profileReducer from "../features/Profile/profileSlice";
import searchReducer from "../features/Search/searchSlice";

export default combineReducers({
    project: projectReducer,
    profile: profileReducer,
    search: searchReducer,
});
