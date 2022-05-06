import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

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
  "GET/TOPICS",
  async (projectNo: string, thunkAPI) => {
    return await api
      .get(`/topic/list/${projectNo}`)
      .then((res) => res.data)
      .catch((err) => thunkAPI.rejectWithValue(err.response.data));
  }
);

//get topic info api
export const getTopicInfo = createAsyncThunk(
  "GET/TOPIC",
  async (topicNo: string, thunkAPI) => {
    return await api
      .get(`/topic/detail/${topicNo}`)
      .then((res) => res.data)
      .catch((err) => thunkAPI.rejectWithValue(err.response.data));
  }
);

//post new topic api
export const createNewTopic = createAsyncThunk(
  "POST/TOPIC",
  async (newTopicInfo: any, thunkAPI) => {
    return await api
      .post(`/topic`, newTopicInfo)
      .then((res) => {
        thunkAPI.dispatch(getTopicList(newTopicInfo.projectNo));
        return res.data;
      })
      .catch((err) => thunkAPI.rejectWithValue(err.response.data));
  }
);

//update topic info api
export const updateTopicInfo = createAsyncThunk(
  "PUT/TOPIC",
  async (topicInfo: any, thunkAPI) => {
    return await api
      .put(`/topic/${topicInfo.topicNo}`, topicInfo.updatedInfo)
      .then((res) => {
        thunkAPI.dispatch(getTopicInfo(topicInfo.topicNo));
        return res.data;
      })
      .catch((err) => thunkAPI.rejectWithValue(err.response.data));
  }
);

//delete topic api
export const deleteTopic = createAsyncThunk(
  "DELETE/TOPIC",
  async (topicNo: string, thunkAPI) => {
    return await api
      .delete(`/topic/${topicNo}`)
      .then((res) => res.data)
      .catch((err) => thunkAPI.rejectWithValue(err.response.data));
  }
);

const topicSlice = createSlice({
  name: "topic",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTopicList.fulfilled, (state, { payload }) => {
        state.topicList = payload.topicList;
      })
      .addCase(getTopicInfo.fulfilled, (state, { payload }) => {
        state.topicInfo = payload.topicDetail;
      });
  },
});

export default topicSlice.reducer;
