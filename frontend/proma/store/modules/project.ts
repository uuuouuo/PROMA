import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BACKEND_URL } from "../../config";
import axios from "axios";

export type ProjectState = {
  projectList: any;
};

const initialState: ProjectState = {
  projectList: [],
};
//dummy
const token =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJqd3TthqDtgbAiLCJ1c2VyTm8iOiI3R3djUGxwbzNaUGhnVEUiLCJleHAiOjE2NTExNjUwOTV9.x7SRTlI-vHzRLHEnPIZ3Pr6IonaKEHhPgt5f1rgAJy9TTby0j2HlTrbERPL4Zyc-v03hX5ejSlQK3Uwpdla6DQ";

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

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProjectList.fulfilled, (state, { payload }) => {
      state.projectList = payload.projectList;
    });
  },
});

export default projectSlice.reducer;
