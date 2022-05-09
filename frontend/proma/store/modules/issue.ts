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
  isUpdated: boolean;
};
//state
const initialState: IssueState = {
  issueList: [],
  issueInfo: {},
  toDoList: [],
  inProgressList: [],
  doneList: [],
  isUpdated: false,
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

//get issue info api
export const getIssueInfo = createAsyncThunk(
  "GET/ISSUE",
  async (params: any, thunkAPI) => {
    return await api
      .get(`/issue/details/${params.issueNo}`, { params })
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

//update issue sprint api
export const updateIssueSprint = createAsyncThunk(
  "PUT/ISSUESPRINT",
  async (issueInfo: any, thunkAPI) => {
    return await api
      .put(`/issue/sprint`, issueInfo)
      .then((res) => {
        thunkAPI.dispatch(
          getIssueList({
            onlyMyIssue: issueInfo.onlyMyIssue,
            teamNo: issueInfo.teamNo,
            sprintNo: issueInfo.sprintNo,
          })
        );
        thunkAPI.dispatch(
          getIssueList({
            onlyMyIssue: issueInfo.onlyMyIssue,
            teamNo: issueInfo.teamNo,
            sprintNo: issueInfo.fromSprint,
          })
        );
        return res.data;
      })
      .catch((err) => thunkAPI.rejectWithValue(err.response.data));
  }
);

const issueSlice = createSlice({
  name: "issue",
  initialState,
  reducers: {
    isNotUpdated(state: IssueState) {
      state.isUpdated = false;
    },
  },
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
      })
      .addCase(updateIssueSprint.fulfilled, (state) => {
        state.isUpdated = true;
      })
      .addCase(getIssueInfo.fulfilled, (state, { payload }) => {
        state.issueInfo = payload.issueDetail;
      });
  },
});

export const { isNotUpdated } = issueSlice.actions;
export default issueSlice.reducer;
