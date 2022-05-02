import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BACKEND_URL } from "../../config";
import axios from "axios";

export type MemberState = {
    memberList: any;
};

const initialState: MemberState = {
    memberList: [],
}

export const getMemberList = createAsyncThunk(
    "GET/USER/LOGIN/GITHUB",
    async (_, { rejectWithValue }) => {
        // return await axios
        //     .get(`http://k6c107.p.ssafy.io:8080/user/login/github?code=`, code)
        //     // .then((res) => res.data)
        //     .then((res) => console.log(res))

        // const code = localStorage.getItem("code");
        // const response = await axios.get(`${BACKEND_URL}/user/login/github?code=${code}`).then((res) => console.log(res))
        // console.log("된다");

        const code = localStorage.getItem("code");

        // return await axios
        // .get(`${BACKEND_URL}/user/login/github?code=`, {
        //     headers: {
        //     code: `${code}`,
        //     },
        // })
        // .then((res) => res.data)
        // .catch((err) => rejectWithValue(err.response.data));

        try {
            const response = await axios.get(`${BACKEND_URL}/user/login/github?code=${code}`);

            if (response.status !== 200) {
                throw new Error(response.statusText);
            }
            return response.data;

        } catch (error) {
            console.log("에러");
        }
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