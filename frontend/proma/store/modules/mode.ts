import { createSlice } from "@reduxjs/toolkit";

export type ModeState = {
  darkMode: boolean;
  onlyMyIssue: boolean;
};

const initialState: ModeState = {
  darkMode: false,
  onlyMyIssue: false,
};

const modeSlice = createSlice({
  name: "mode",
  initialState,
  reducers: {
    switchTheme(state: ModeState) {
      state.darkMode = !state.darkMode;
    },
    switchViewOption(state: ModeState) {
      state.onlyMyIssue = !state.onlyMyIssue;
    },
  },
});

export const { switchTheme, switchViewOption } = modeSlice.actions;
export default modeSlice.reducer;
