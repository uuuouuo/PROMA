import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiInstance, userInstance } from "../../api";
import { getProjectList } from "./project";
const api = apiInstance();
const userApi = userInstance();

export type UserState = {
  userInfo: any;
  isLogin: boolean;
};

export const initialState: UserState = {
  userInfo: {},
  isLogin: false,
};

export const getUserInfo = createAsyncThunk(
  "GET/USERINFO",
  async (_, thunkAPI) => {
    return await userApi
      .get(`/user/data`)
      .then((res) => {
        thunkAPI.dispatch(getProjectList());
        return res.data;
      })
      .catch((err) => thunkAPI.rejectWithValue(err.response.data));
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
      .then((res) => {
        localStorage.removeItem("code");
        localStorage.removeItem("Authorization");
        localStorage.removeItem("RefreshToken");
        window.location.reload();
        return res.data;
      })
      .catch((err) => rejectWithValue(err.response.data));
  }
);

export const updateUserImage = createAsyncThunk(
  "PUT/USERIMAGE",
  async (newUserImage: any, thunkAPI) => {
    if (newUserImage !== "") {
      return await api
        .put(`/user/update/image`, newUserImage, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => res.data)
        .catch((err) => thunkAPI.rejectWithValue(err.response.data));
    } else {
      return await api
        .put(`/user/update/image`, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => res.data)
        .catch((err) => thunkAPI.rejectWithValue(err.response.data));
    }
  }
);

export const updateUserNickname = createAsyncThunk(
  "PUT/USERNICKNAME",
  async (newNickname: any, thunkAPI) => {
    return await api
      .put(`/user/update/nickname`, newNickname)
      .then((res) => res.data)
      .catch((err) => thunkAPI.rejectWithValue(err.response.data));
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
      })
      .addCase(getLogin.fulfilled, (state) => {
        state.isLogin = true;
      })
      .addCase(updateUserImage.rejected, (state) => {
        alert("이미지는 5MB 이하만 첨부가능합니다.");
      });
  },
});

export const { getLogout } = memberSlice.actions;
export default memberSlice.reducer;
