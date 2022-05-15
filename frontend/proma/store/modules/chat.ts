import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiInstance } from "../../api";
const api = apiInstance();

export type UserState = {
  chatList: Array<Object>;
  chatInfo: Object;
};

const initialState: UserState = {
  chatList: [],
  chatInfo: {},
};

export const projectChat = createAsyncThunk(
  "CHAT/ROOM/PROJECT",
  async (projectNo: string, thunkAPI) => {
    return await api
      .get(`/chat/room/project/${projectNo}`)
      .then((res) => {
        return res.data;
      })
      .catch((err) => thunkAPI.rejectWithValue(err.response.data));
  }
);

export const projectChatScroll = createAsyncThunk(
  "CHAT/ROOM/PROJECT/SCROLL",
  async (params: any, thunkAPI) => {
    return await api
      .get(`/chat/room/project/${params.projectNo}?lastMsgNo=${params.lastMsgNo}`)
      .then((res) => {
        return res.data;
      })
      .catch((err) => thunkAPI.rejectWithValue(err.response.data));
  }
);

export const teamChat = createAsyncThunk(
  "CHAT/ROOM/TEAM",
  async (teamNo: string, thunkAPI) => {
    return await api
      .get(`/chat/room/team/${teamNo}`)
      .then((res) => {
        return res.data;
      })
      .catch((err) => thunkAPI.rejectWithValue(err.response.data));
  }
);

export const memberChat = createAsyncThunk(
  "CHAT/ROOM/USER",
  async (memberNo: string, thunkAPI) => {
    return await api
      .get(`/chat/room/user/${memberNo}`)
      .then((res) => {
        return res.data;
      })
      .catch((err) => thunkAPI.rejectWithValue(err.response.data));
  }
);

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(projectChat.fulfilled, (state, { payload }) => {
      state.chatInfo = payload.response;
    })
      .addCase(teamChat.fulfilled, (state, { payload }) => {
      state.chatInfo = payload.response;
    })
      .addCase(memberChat.fulfilled, (state, { payload }) => {
      state.chatInfo = payload.response;
    })
  },
});

export default chatSlice.reducer;
