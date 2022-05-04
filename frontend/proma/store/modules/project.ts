import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { apiInstance } from "../../api";
const api = apiInstance();

//state type
export type ProjectState = {
  projectList: Array<Object>;
  projectName: string;
};
//state
const initialState: ProjectState = {
  projectList: [],
  projectName: "",
};

//get every project api
export const getProjectList = createAsyncThunk(
  "GET/PROJECTS",
  async (_, { rejectWithValue }) => {
    return await api
      .get(`/project`)
      .then((res) => res.data)
      .catch((err) => rejectWithValue(err.response.data));
  }
);

//get one project api
export const getProjectInfo = createAsyncThunk(
  "GET/PROJECT",
  async (projectNo: string, { rejectWithValue }) => {
    return await api
      .get(`/project/${projectNo}`)
      .then((res) => res.data)
      .catch((err) => rejectWithValue(err.response.data));
  }
);

//post project api
export const postNewProject = createAsyncThunk(
  "POST/PROJECT",
  async (newProjectInfo: any, thunkAPI) => {
    return await api
      .post(`/project`, newProjectInfo)
      .then((res) => {
        alert("An invitation email has been sent to the members.");
        thunkAPI.dispatch(getProjectList());
      })
      .catch((err) => thunkAPI.rejectWithValue(err.response.data));
  }
);

//update project api
export const updateProjectInfo = createAsyncThunk(
  "PUT/PROJECT",
  async (newProjectInfo: any, thunkAPI) => {
    return await api
      .put(`/project/change`, newProjectInfo)
      .then((res) => {
        console.log("project is updated", res);

        thunkAPI.dispatch(getProjectInfo(newProjectInfo.projectNo));
        thunkAPI.dispatch(getProjectList());
      })
      .catch((err) => thunkAPI.rejectWithValue(err.response.data));
  }
);

//delete project api
export const deleteProject = createAsyncThunk(
  "DELETE/PROJECT",
  async (projectNo: string, thunkAPI) => {
    return await api
      .delete(`/project/${projectNo}`)
      .then((res) => {
        thunkAPI.dispatch(getProjectList());
      })
      .catch((err) => thunkAPI.rejectWithValue(err.response.data));
  }
);

//project join status api
export const getProjectJoinStatus = createAsyncThunk(
  "GET/JOINSTATUS",
  async (projectNo: string, thunkAPI) => {
    return await api
      .get(`/project/user/${projectNo}`)
      .then((res) => res.data)
      .catch((err) => thunkAPI.rejectWithValue(err.response.data));
  }
);

//join project api
export const joinProject = createAsyncThunk(
  "POST/JOINPROJECT",
  async (projectInfo: any, thunkAPI) => {
    return await api
      .post(`/project/join/`, projectInfo)
      .then((res) => res.data)
      .catch((err) => thunkAPI.rejectWithValue(err.response.data));
  }
);

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProjectList.fulfilled, (state, { payload }) => {
        state.projectList = payload.projectList;
      })
      .addCase(getProjectInfo.fulfilled, (state, { payload }) => {
        state.projectName = payload.project.title;
      });
  },
});

export default projectSlice.reducer;
