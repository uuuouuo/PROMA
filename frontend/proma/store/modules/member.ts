import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BACKEND_URL } from "../../config";
import axios from "axios";
import { apiInstance } from "../../api";
const api = apiInstance();

export type UserState = {
  userInfo: any;
  isLogin: boolean;
};

const initialState: UserState = {
  userInfo: [],
  isLogin: false,
};

export const getLogin = createAsyncThunk(
  "USER/LOGIN/GITHUB",
  async (_, thunkAPI) => {
    const code = localStorage.getItem("code");
    return await api
      .get(`/user/login/github?code=${code}`)
      .then((res) => res.data)
      .catch((err) => thunkAPI.rejectWithValue(err.response.data));
  }
);

export const getUserInfo = createAsyncThunk(
  "USER/DATA",
  async (_, { rejectWithValue }) => {
    const Authorization = localStorage.getItem("Authorization");
    return await axios
      .get(`http://localhost:3000/user/data`, {
        headers: {
          Authorization: `Bearer ${Authorization}`,
        },
      })
      .then((res) => res.data)
      .catch((err) => rejectWithValue(err.response.data));
  }
);


export const withdrawUser = createAsyncThunk(
  "USER/WITHDRWAWAL",
  async (_, { rejectWithValue }) => {
    const deletecode = localStorage.getItem("code");
    return await axios
      .delete(
        `http://localhost:3000/user/withdrawal/github?code=${deletecode}`
      )
      .then((res) => res.data)
      // .then((res) => localStorage.removeItem("code"))
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
        window.location.href = "/";
      })
      // .addCase(getLogout.fulfilled, (state) => {
      //   state.isLogin = false;
      // })
      // .addCase(getLogout.rejected, (state) => {
      //   state.isLogin = false;
      // })
      .addCase(withdrawUser.fulfilled, (state) => {
        // state.isLogin = false;
        // localStorage.removeItem("code");
        // localStorage.removeItem("Authorization");
        // localStorage.removeItem("RefreshToken");
        window.location.href = "/";
        console.log("탈퇴 성공");
      });
  },
});

export const { getLogout } = memberSlice.actions;
export default memberSlice.reducer;
