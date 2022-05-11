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
  userInfo: [],
  isLogin: false,
};
// let sock = new SockJS("https://k6c107.p.ssafy.io/api/ws-stomp");
// let client = Stomp.over(sock);

export const getLogin = createAsyncThunk(
  "USER/LOGIN/GITHUB",
  async (_, thunkAPI) => {
    const code = localStorage.getItem("code");
    return await userApi
      .get(`/user/login/github?code=${code}`)
      .then((res) => {
        thunkAPI.dispatch(getProjectList());

        // client.connect(
        //   { Authorization: localStorage.getItem("Authorization")?.toString() },
        //   () => {
        //     //   client.send(
        //     //     "https://j6c103.p.ssafy.io:8081/notification/send?userNo=U001"
        //     //   );
        //     // client.send(`/app/chat/${(메세지받을대상)user.id}`,{},JSON.stringify(res.data));
        //     client.subscribe("/queue/notification/FISZ6HYHc6NwLYF", (res) => {
        //       const messagedto = JSON.parse(res.body);
        //       console.log(messagedto);
        //       alert(messagedto.message);
        //     });
        //   }
        // );

        return res.data;
      })
      .catch((err) => thunkAPI.rejectWithValue(err.response.data));
  }
);

export const getUserInfo = createAsyncThunk(
  "USER/DATA",
  async (_, { rejectWithValue }) => {
    return await userApi
      .get(`/user/data`)
      .then((res) => res.data)
      .catch((err) => rejectWithValue(err.response.data));
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
      localStorage.removeItem("code");
      localStorage.removeItem("Authorization");
      localStorage.removeItem("RefreshToken");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        getUserInfo.fulfilled,
        (state, { payload }: { payload: { userInfo: any } }) => {
          state.userInfo = payload;
        }
      )
      .addCase(getLogin.fulfilled, (state) => {
        state.isLogin = true;
      });
  },
});

export const { getLogout } = memberSlice.actions;
export default memberSlice.reducer;
