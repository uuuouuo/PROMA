import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { apiInstance } from "../../api";
const api = apiInstance();

//state type
export type TeamState = {
  teamList: Array<Object>;
};
//state
const initialState: TeamState = {
  teamList: [],
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
  async (projectNo: string, thunkAPI) => {
    return await api
      .get(`/team/${projectNo}`)
      .then((res) => res.data)
      .catch((err) => thunkAPI.rejectWithValue(err.response.data));
  }
);

const teamSlice = createSlice({
  name: "team",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTeamList.fulfilled, (state, { payload }) => {
      state.teamList = payload;
    });
  },
});

export default teamSlice.reducer;
