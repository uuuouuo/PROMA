import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BACKEND_URL } from "../../config";
import axios from "axios";
import { apiInstance, userInstance } from "../../api";
import { getProjectList } from "./project";
const api = apiInstance();
const userApi = userInstance();

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
                console.log(res.data)
                return res.data
            })
            // .then((res) => console.log(res.data))
            .catch((err) => thunkAPI.rejectWithValue(err.response.data));
    }
);

export const test = () => {
    console.log("성공")
}

const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(projectChat.fulfilled, (state, { payload }) => {
                state.chatInfo = payload.response;
            });
        },
    });

export default chatSlice.reducer;
