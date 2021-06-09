import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ProjectsAPI from "../../data/ProjectsAPI";

export const fetchAllProjects = createAsyncThunk(
    "project/fetchAllProjects",
    async () => {
        return ProjectsAPI.getAllProjects();
    }
);
export const projectSlice = createSlice({
    name: "project",
    initialState: {
        projects: [],
        loading: false,
        error: null,
    },
    extraReducers: {
        [fetchAllProjects.pending]: (state) => {
            state.loading = true;
        },
        [fetchAllProjects.fulfilled]: (state, action) => {
            state.projects = action.payload;
            state.loading = false;
        },
    },
});

export const projectSelector = (state) => state.project;

export default projectSlice.reducer;
