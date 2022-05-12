import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BACKEND_URL } from "../../config";
import axios from "axios";
import { apiInstance, userInstance } from "../../api";
import { getProjectList } from "./project";
import SockJS from "sockjs-client";
import Stomp from "webstomp-client";

const api = apiInstance();
const userApi = userInstance();

export type UserState = {
  userInfo: any;
  isLogin: boolean;
};

const initialState: UserState = {
  userInfo: {},
  isLogin: false,
};

export const getUserInfo = createAsyncThunk(
  "USER/DATA",
  async (_, { rejectWithValue }) => {
    return await userApi
      .get(`/user/data`)
      .then((res) => res.data)
      .catch((err) => rejectWithValue(err.response.data));
  }
);

export const getLogin = createAsyncThunk(
  "USER/LOGIN/GITHUB",
  async (_, thunkAPI) => {
    const code = localStorage.getItem("code");
    return await userApi
      .get(`/user/login/github?code=${code}`)
      .then((res) => {
        thunkAPI.dispatch(getUserInfo());
        thunkAPI.dispatch(getProjectList());
        res.data;
      })
      .catch((err) => thunkAPI.rejectWithValue(err.response.data));
  }
);

export const withdrawUser = createAsyncThunk(
  "USER/WITHDRWAWAL",
  async (code: string, { rejectWithValue }) => {
    return await api
      .delete(`/user/withdrawal/github?code=${code}`)
      .then((res) => console.log("탈퇴 성공", res))
      .catch((err) => rejectWithValue(err.response.data));
  }
);

const memberSlice = createSlice({
  name: "member",
  initialState,
  reducers: {
    getLogout(state: UserState) {
      state.isLogin = false;
      state.userInfo = {};
      localStorage.removeItem("code");
      localStorage.removeItem("Authorization");
      localStorage.removeItem("RefreshToken");
      window.location.reload();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserInfo.fulfilled, (state, { payload }) => {
        state.userInfo = payload.userRes;
        localStorage.setItem("userNo", payload.userRes.no);
      })
      .addCase(getLogin.fulfilled, (state) => {
        state.isLogin = true;
      });
  },
});

export const { getLogout } = memberSlice.actions;
export default memberSlice.reducer;
