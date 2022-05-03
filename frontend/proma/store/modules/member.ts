import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BACKEND_URL } from "../../config";
import axios from "axios";

export type UserState = {
    userInfo: Array<Object>;
    isLogin: boolean;
};

const initialState: UserState = {
    userInfo: [],
    isLogin: false,
}

export const getUserInfo = createAsyncThunk(
    "USER/DATA",
    async (_, { rejectWithValue }) => {

        const jwtToken = localStorage.getItem("jwtToken");
        return await axios
            .get(`http://k6c107.p.ssafy.io:8080/user/data`, {
                headers: {
                    Authorization: `Bearer ${jwtToken}`
                },
        })
        .then((res) => res.data)
        .catch((err) => rejectWithValue(err.response.data));
    }
);

export const getLogin = createAsyncThunk(
    "USER/LOGIN/GITHUB",
    async (_, thunkAPI) => {
        const code = localStorage.getItem("code");
        return await axios
            .get(`http://k6c107.p.ssafy.io:8080/user/login/github?code=${code}`)
            .then((res) => {
                localStorage.setItem("jwtToken", res.data.jwtToken);
                thunkAPI.dispatch(getUserInfo());
    })
        .catch((err) => thunkAPI.rejectWithValue(err.response.data));
    }
);

const memberSlice = createSlice({
    name: "member",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(
            getUserInfo.fulfilled,
            (state, { payload }: { payload: { userInfo: any } }) => {
                state.userInfo = payload.userInfo;
            }
        ).addCase(
            getLogin.fulfilled, (state) => {
                state.isLogin = true;
            }
        )
    },
});

// export const { } = memberSlice.actions;
export default memberSlice.reducer;