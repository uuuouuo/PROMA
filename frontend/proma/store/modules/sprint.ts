import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { apiInstance } from "../../api";
const api = apiInstance();

//state type
export type SprintState = {};
//state
const initialState: SprintState = {};

//post new sprint api
export const createNewSprint = createAsyncThunk(
  "POST/SPRINT",
  async (newSprintInfo: any, thunkAPI) => {
    return await api
      .post(`/sprint`, newSprintInfo)
      .then((res) => res.data)
      .catch((err) => thunkAPI.rejectWithValue(err.response.data));
  }
);

const sprintSlice = createSlice({
  name: "sprint",
  initialState,
  reducers: {},
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(.fulfilled, (state, { payload }) => {
  //     });
  // },
});

export default sprintSlice.reducer;
