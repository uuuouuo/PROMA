import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { getProjectList } from "./project";

import { apiInstance } from "../../api";
const api = apiInstance();

//state type
interface topicType {
  topicNo: number;
  title: string;
}

export type TopicState = {
  topicList: Array<topicType>;
  topicInfo: any;
};
//state
const initialState: TopicState = {
  topicList: [],
  topicInfo: {},
};

//get topic list api
export const getTopicList = createAsyncThunk(
  "GET/TOPIC",
  async (projectNo: string, thunkAPI) => {
    return await api
      .get(`/topic/list/${projectNo}`)
      .then((res) => res.data)
      .catch((err) => thunkAPI.rejectWithValue(err.response.data));
  }
);

const topicSlice = createSlice({
  name: "topic",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTopicList.fulfilled, (state, { payload }) => {
      state.topicList = payload.topicList;
    });
  },
});

export default topicSlice.reducer;
