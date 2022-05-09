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
};
//state
const initialState: IssueState = {
  issueList: [],
  issueInfo: {},
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

const issueSlice = createSlice({
  name: "issue",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // builder
    //   .addCase(.fulfilled, (state, { payload }) => {
    //   });
  },
});

export default issueSlice.reducer;
