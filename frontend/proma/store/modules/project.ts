import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BACKEND_URL } from "../../config";
import axios from "axios";

//state type
export type ProjectState = {
  projectList: Array<Object>;
};
//state
const initialState: ProjectState = {
  projectList: [],
};

//dummy token
const token =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJqd3TthqDtgbAiLCJ1c2VyTm8iOiI3R3djUGxwbzNaUGhnVEUiLCJleHAiOjE2NTEyMjg4Nzl9.F7vMnFFi-5Liib6ya0LDKPBJKXc5CjxrglwUEGjfbQBnxcZ98GPCV3XcDwzUrRVE2BPZSVfvfDNaxIZRHjyt7A";

//get every project api
export const getProjectList = createAsyncThunk(
  "GET/PROJECT",
  async (_, { rejectWithValue }) => {
    return await axios
      .get(`${BACKEND_URL}/project`, {
        headers: {
          JWT: `Bearer ${token}`,
        },
      })
      .then((res) => res.data)
      .catch((err) => rejectWithValue(err.response.data));
  }
);

//post project api
export const postNewProject = createAsyncThunk(
  "POST/PROJECT",
  async (newProjectInfo: any, thunkAPI) => {
    return await axios
      .post(`${BACKEND_URL}/project`, newProjectInfo, {
        headers: {
          JWT: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        alert("An invitation email has been sent to the members.");
        thunkAPI.dispatch(getProjectList());
      })
      .catch((err) => thunkAPI.rejectWithValue(err.response.data));
  }
);

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getProjectList.fulfilled,
      (state, { payload }: { payload: { projectList: any } }) => {
        state.projectList = payload.projectList;
      }
    );
  },
});

export default projectSlice.reducer;
