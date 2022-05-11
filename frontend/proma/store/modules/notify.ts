import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiInstance } from "../../api";
const api = apiInstance();

//state type
export type NotifyState = {};
//state
const initialState: NotifyState = {};

//get every notification api
export const getNotificationList = createAsyncThunk(
  "GET/NOTIFICATIONS",
  async (_, thunkAPI) => {
    return await api
      .get(`/notification`)
      .then((res) => res.data)
      .catch((err) => thunkAPI.rejectWithValue(err.response.data));
  }
);

//get user notification api
export const getUserNotificationList = createAsyncThunk(
  "GET/ONLYMYNOTIFICATIONS",
  async (userNo: string, thunkAPI) => {
    return await api
      .get(`/notification/${userNo}`)
      .then((res) => res.data)
      .catch((err) => thunkAPI.rejectWithValue(err.response.data));
  }
);

//update notification confirmed api
export const updateNotificationConfirmed = createAsyncThunk(
  "PUT/CONFIRMNOTIFICATION",
  async (notificationNo: number, thunkAPI) => {
    return await api
      .put(`/notification/${notificationNo}`)
      .then((res) => res.data)
      .catch((err) => thunkAPI.rejectWithValue(err.response.data));
  }
);

//post new notification api
export const sendNotification = createAsyncThunk(
  "POST/NOTIFICATION",
  async (userNo: string, thunkAPI) => {
    return await api
      .post(`/notification/send`, userNo)
      .then((res) => res.data)
      .catch((err) => thunkAPI.rejectWithValue(err.response.data));
  }
);

const notifySlice = createSlice({
  name: "notify",
  initialState,
  reducers: {},
  //   extraReducers: (builder) => {
  //     builder
  //       .addCase(.fulfilled, (state, { payload }) => {
  //       });
  //   },
});

export default notifySlice.reducer;
