import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { apiInstance } from "../../api";
const api = apiInstance();

//state type
interface IssueType {
  issueNo: number;
  title: string;
}

export type IssueState = {
  issueList: any;
  issueInfo: any;
  toDoList: any;
  inProgressList: any;
  doneList: any;
  dndMoved: any;
  movedIssue: any;
};
//state
const initialState: IssueState = {
  issueList: [],
  issueInfo: {},
  toDoList: [],
  inProgressList: [],
  doneList: [],
  dndMoved: {},
  movedIssue: {},
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
      .then((res) => {
        console.log(res.data);

        return res.data;
      })
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

//update issue info api
export const updateIssueInfo = createAsyncThunk(
  "PUT/ISSUEINFO",
  async (issueInfo: any, thunkAPI) => {
    return await api
      .put(`/issue/${issueInfo.issueNo}`, issueInfo.issueDetail)
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
      .then((res) => res.data)
      .catch((err) => thunkAPI.rejectWithValue(err.response.data));
  }
);

//update issue sprint api
export const updateIssueStatus = createAsyncThunk(
  "PUT/ISSUESTATUS",
  async (issueInfo: any, thunkAPI) => {
    return await api
      .put(`/issue/status`, issueInfo)
      .then((res) => res.data)
      .catch((err) => thunkAPI.rejectWithValue(err.response.data));
  }
);

const issueSlice = createSlice({
  name: "issue",
  initialState,
  reducers: {
    setDndMoved(state: IssueState, { payload }) {
      //   const issues =
      //     state.issueList[payload.fromSprint].teams[payload.fromTeam].issues;
      //   console.log(issues);
      //   const newIssueList = issues.splice(payload.fromIndex, 1);
      //   console.log(newIssueList);
      //   const issueData = [...state.issueList];
      //   issueData[payload.fromSprint].teams[payload.fromTeam].issues.splice(
      //     payload.fromIndex,
      //     1
      //   );
      state.issueList[payload.fromSprint].teams[payload.fromTeam].issues = {};
    },
    setMovedIssue(state: IssueState, { payload }) {
      state.movedIssue = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIssueList.fulfilled, (state, { payload }) => {
        state.issueList = payload.issueList;
      })
      .addCase(getToDoIssues.fulfilled, (state, { payload }) => {
        state.toDoList = payload.issueList;
      })
      .addCase(getInProgressIssues.fulfilled, (state, { payload }) => {
        state.inProgressList = payload.issueList;
      })
      .addCase(getDoneIssues.fulfilled, (state, { payload }) => {
        state.doneList = payload.issueList;
      })
      .addCase(getIssueInfo.fulfilled, (state, { payload }) => {
        state.issueInfo = payload.issueDetail;
      });
  },
});

export const { setDndMoved, setMovedIssue } = issueSlice.actions;
export default issueSlice.reducer;
