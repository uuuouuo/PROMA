import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export type MemberState = {
    memberList: any;
};

const initialState: MemberState = {
    memberList: [],
}

export const getMemberList = createAsyncThunk(
    "GET/USER/LOGIN/GITHUB",
    async () => {
        // return await axios
        //     .get(`http://k6c107.p.ssafy.io:8080/user/login/github?code=`, code)
        //     // .then((res) => res.data)
        //     .then((res) => console.log(res))
        const code = localStorage.getItem("code");
        const response = await axios.get(`http://k6c107.p.ssafy.io:8080/user/login/github?code=${code}`).then((res) => console.log(res))
        // return response.data;
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
                state.memberList = payload;
            })
            .addCase(getMemberList.rejected, (state) => { });
    },
});

// export const { } = memberSlice.actions;
export default memberSlice.reducer;