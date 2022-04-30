import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export type MemberState = {
    members: Array<object>;
};

const initialState: MemberState = {
    members: [],
}

export const getMemberList = createAsyncThunk(
    "GET/USER/LOGIN/GITHUB",
    async ({ code }: { code: string }, { rejectWithValue }) => {
        return await axios
            .get(`http://k6c107.p.ssafy.io:8080/user/login/github?code=${code}`)
            .then((res) => res.data)
            .catch((err) => rejectWithValue(err.response.data));
    }
);

const memberSlice = createSlice({
    name: "member",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getMemberList.pending, (state) => { })
            .addCase(getMemberList.fulfilled, (state, { payload }) => {
                state.members = payload;
            })
            .addCase(getMemberList.rejected, (state) => { });
    },
});

// export const { } = memberSlice.actions;
export default memberSlice.reducer;