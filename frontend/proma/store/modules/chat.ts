import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiInstance, userInstance } from "../../api";
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
        localStorage.setItem(
          "messageList",
          JSON.stringify(res.data.response.messageList)
        );
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
        localStorage.setItem(
          "messageList",
          JSON.stringify(res.data.response.messageList)
        );
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
    });
  },
});

export default chatSlice.reducer;
