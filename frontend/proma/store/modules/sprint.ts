import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { apiInstance } from "../../api";
const api = apiInstance();

//state type
export type SprintState = {
  sprintList: Array<Object>;
  isInProgress: boolean;
  inProgressSprintInfo: Object;
};
//state
const initialState: SprintState = {
  sprintList: [],
  isInProgress: false,
  inProgressSprintInfo: {},
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

//get in progress sprint api
export const getInProgressSprint = createAsyncThunk(
  "GET/SPRINTINPROGRESS",
  async (projectNo: string, thunkAPI) => {
    return await api
      .get(`/sprint/start/${projectNo}`)
      .then((res) => {
        thunkAPI.dispatch(getSprintList(projectNo));
        return res.data;
      })
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

//update sprint status api
export const updateSprintStatus = createAsyncThunk(
  "PUT/SPRINTSTATUS",
  async (sprintInfo: any, thunkAPI) => {
    return await api
      .put(`/sprint/status/${sprintInfo.sprintNo}`)
      .then((res) => {
        thunkAPI.dispatch(getInProgressSprint(sprintInfo.projectNo));
        return res.data;
      })
      .catch((err) => thunkAPI.rejectWithValue(err.response.data));
  }
);

//delete sprint api
export const deleteSprint = createAsyncThunk(
  "DELETE/SPRINT",
  async (sprintInfo: any, thunkAPI) => {
    return await api
      .delete(`/sprint/${sprintInfo.sprintNo}`)
      .then((res) => {
        thunkAPI.dispatch(getSprintList(sprintInfo.projectNo));
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
    builder
      .addCase(getSprintList.fulfilled, (state, { payload }) => {
        state.sprintList = payload.sprint;
      })
      .addCase(getInProgressSprint.fulfilled, (state, { payload }) => {
        state.isInProgress = true;
        state.inProgressSprintInfo = payload.sprint;
      })
      .addCase(getInProgressSprint.rejected, (state) => {
        state.isInProgress = false;
        state.inProgressSprintInfo = {};
      });
  },
});

export default sprintSlice.reducer;
