import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiInstance } from "../../api";
const api = apiInstance();

//state type
export type NotifyState = {
  notificationList: any;
};
//state
const initialState: NotifyState = {
  notificationList: [],
};

//get user notification api
export const getNotificationList = createAsyncThunk(
  "GET/NOTIFICATIONS",
  async (_, thunkAPI) => {
    return await api
      .get(`/notification`)
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

const notifySlice = createSlice({
  name: "notify",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getNotificationList.fulfilled, (state, { payload }) => {
      state.notificationList = payload.notificationList;
    });
  },
});

export default notifySlice.reducer;
