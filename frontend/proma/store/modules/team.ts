import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { getProjectList } from "./project";

import { apiInstance } from "../../api";
const api = apiInstance();

//state type
export type TeamState = {
  teamList: Array<Object>;
  teamInfo: any;
  teamMembers: Array<Object>;
};
//state
const initialState: TeamState = {
  teamList: [],
  teamInfo: {},
  teamMembers: [],
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
    console.log(newTeamInfo);

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
    return await api
      .put(`/team`, teamInfo)
      .then((res) => res.data)
      .catch((err) => thunkAPI.rejectWithValue(err.response.data));
  }
);

//delete team api
export const deleteTeam = createAsyncThunk(
  "DELETE/TEAM",
  async (teamInfo: any, thunkAPI) => {
    return await api
      .delete(`/team/${teamInfo.teamNo}`)
      .then((res) => {
        window.location.href = `/project/${teamInfo.projectNo}`;
      })
      .catch((err) => thunkAPI.rejectWithValue(err.response.data));
  }
);

//out team api
export const outTeam = createAsyncThunk(
  "POST/OUTTEAM",
  async (teamInfo: any, thunkAPI) => {
    return await api
      .post(`/team/exit`, { teamNo: teamInfo.teamNo })
      .then((res) => {
        thunkAPI.dispatch(getProjectList());
      })
      .catch((err) => thunkAPI.rejectWithValue(err.response.data));
  }
);

//join team api
export const joinTeam = createAsyncThunk(
  "POST/JOINTEAM",
  async (teamInfo: any, thunkAPI) => {
    return await api
      .post(`/team/join`, teamInfo)
      .then((res) => {
        thunkAPI.dispatch(getProjectList());
      })
      .catch((err) => thunkAPI.rejectWithValue(err.response.data));
  }
);

//get team members api
export const getTeamMembers = createAsyncThunk(
  "GET/TEAMMEMBER",
  async (teamNo: number, thunkAPI) => {
    return await api
      .get(`/team/user/${teamNo}`)
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
        state.teamList = payload.teamList;
      })
      .addCase(getTeamInfo.fulfilled, (state, { payload }) => {
        state.teamInfo = payload.team;
      })
      .addCase(getTeamMembers.fulfilled, (state, { payload }) => {
        state.teamMembers = payload.memberList;
      });
  },
});

export default teamSlice.reducer;
