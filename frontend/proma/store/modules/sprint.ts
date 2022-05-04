import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { apiInstance } from "../../api";
const api = apiInstance();

//state type
export type SprintState = {
  sprintList: Array<Object>;
};
//state
const initialState: SprintState = {
  sprintList: [],
};

//get sprint list api
export const getSprintList = createAsyncThunk(
  "GET/SPRINTS",
  async (projectNo: string, thunkAPI) => {
    return await api
      .get(`/sprint/list/${projectNo}`)
      .then((res) => res.data)
      .catch((err) => thunkAPI.rejectWithValue(err.response.data));
  }
);

//post new sprint api
export const createNewSprint = createAsyncThunk(
  "POST/SPRINT",
  async (newSprintInfo: any, thunkAPI) => {
    return await api
      .post(`/sprint`, newSprintInfo)
      .then((res) => {
        thunkAPI.dispatch(getSprintList(newSprintInfo.projectNo));
        return res.data;
      })
      .catch((err) => thunkAPI.rejectWithValue(err.response.data));
  }
);

//update sprint api
export const updateSprint = createAsyncThunk(
  "PUT/SPRINT",
  async (sprintObj: any, thunkAPI) => {
    return await api
      .put(`/sprint/${sprintObj.sprintNo}`, sprintObj.sprintInfo)
      .then((res) => {
        thunkAPI.dispatch(getSprintList(sprintObj.sprintInfo.projectNo));
        return res.data;
      })
      .catch((err) => thunkAPI.rejectWithValue(err.response.data));
  }
);

const sprintSlice = createSlice({
  name: "sprint",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSprintList.fulfilled, (state, { payload }) => {
      state.sprintList = payload.sprint;
    });
  },
});

export default sprintSlice.reducer;
