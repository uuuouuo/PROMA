import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { getProjectList } from "./project";

import { apiInstance } from "../../api";
const api = apiInstance();

//state type
export type TeamState = {
  teamList: Array<Object>;
  teamInfo: any;
};
//state
const initialState: TeamState = {
  teamList: [],
  teamInfo: {},
};

//get team list api
export const getTeamList = createAsyncThunk(
  "GET/TEAMS",
  async (projectNo: string, thunkAPI) => {
    return await api
      .get(`/team/${projectNo}`)
      .then((res) => res.data)
      .catch((err) => thunkAPI.rejectWithValue(err.response.data));
  }
);

//get team info api
export const getTeamInfo = createAsyncThunk(
  "GET/TEAM",
  async (teamNo: string, thunkAPI) => {
    return await api
      .get(`/team/info/${teamNo}`)
      .then((res) => res.data)
      .catch((err) => thunkAPI.rejectWithValue(err.response.data));
  }
);

//post new team api
export const createNewTeam = createAsyncThunk(
  "POST/TEAM",
  async (newTeamInfo: any, thunkAPI) => {
    return await api
      .post(`/team`, newTeamInfo)
      .then((res) => {
        thunkAPI.dispatch(getProjectList());
      })
      .catch((err) => thunkAPI.rejectWithValue(err.response.data));
  }
);

//update team info api
export const updateTeamInfo = createAsyncThunk(
  "PUT/TEAM",
  async (teamInfo: any, thunkAPI) => {
    console.log(teamInfo);

    return await api
      .put(`/team`, teamInfo)
      .then((res) => res.data)
      .catch((err) => thunkAPI.rejectWithValue(err.response.data));
  }
);

const teamSlice = createSlice({
  name: "team",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTeamList.fulfilled, (state, { payload }) => {
        state.teamList = payload;
      })
      .addCase(getTeamInfo.fulfilled, (state, { payload }) => {
        state.teamInfo = payload.team;
      });
  },
});

export default teamSlice.reducer;
