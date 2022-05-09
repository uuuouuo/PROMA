import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { apiInstance } from "../../api";
const api = apiInstance();

//state type
interface IssueType {
  issueNo: number;
  title: string;
}

export type IssueState = {
  issueList: Array<IssueType>;
  issueInfo: any;
  toDoList: any;
  inProgressList: any;
  doneList: any;
};
//state
const initialState: IssueState = {
  issueList: [],
  issueInfo: {},
  toDoList: [],
  inProgressList: [],
  doneList: [],
};

//create issue api
export const createNewIssue = createAsyncThunk(
  "POST/ISSUE",
  async (issueInfo: any, thunkAPI) => {
    return await api
      .post(`/issue`, issueInfo)
      .then((res) => res.data)
      .catch((err) => thunkAPI.rejectWithValue(err.response.data));
  }
);

//get issue list api
export const getIssueList = createAsyncThunk(
  "GET/ISSUES",
  async (params: any, thunkAPI) => {
    return await api
      .get(`/issue`, { params })
      .then((res) => res.data)
      .catch((err) => thunkAPI.rejectWithValue(err.response.data));
  }
);

//get todo issues api
export const getToDoIssues = createAsyncThunk(
  "GET/ISSUESTODO",
  async (params: any, thunkAPI) => {
    return await api
      .get(`/issue/${params.teamNo}`, { params })
      .then((res) => res.data)
      .catch((err) => thunkAPI.rejectWithValue(err.response.data));
  }
);
//get inprogress issues api
export const getInProgressIssues = createAsyncThunk(
  "GET/ISSUESINPROGRESS",
  async (params: any, thunkAPI) => {
    return await api
      .get(`/issue/${params.teamNo}`, { params })
      .then((res) => res.data)
      .catch((err) => thunkAPI.rejectWithValue(err.response.data));
  }
);
//get done issues api
export const getDoneIssues = createAsyncThunk(
  "GET/ISSUESDONE",
  async (params: any, thunkAPI) => {
    return await api
      .get(`/issue/${params.teamNo}`, { params })
      .then((res) => res.data)
      .catch((err) => thunkAPI.rejectWithValue(err.response.data));
  }
);

const issueSlice = createSlice({
  name: "issue",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getToDoIssues.fulfilled, (state, { payload }) => {
        state.toDoList = payload.issueList;
      })
      .addCase(getInProgressIssues.fulfilled, (state, { payload }) => {
        state.inProgressList = payload.issueList;
      })
      .addCase(getDoneIssues.fulfilled, (state, { payload }) => {
        state.doneList = payload.issueList;
      });
  },
});

export default issueSlice.reducer;
