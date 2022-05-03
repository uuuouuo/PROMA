import { createSlice } from "@reduxjs/toolkit";

export type ThemeState = {
  darkMode: boolean;
};

const initialState: ThemeState = {
  darkMode: false,
};

const themeSlice = createSlice({
  name: "darkMode",
  initialState,
  reducers: {
    switchTheme(state: ThemeState) {
      state.darkMode = !state.darkMode;
    },
  },
});

export const { switchTheme } = themeSlice.actions;
export default themeSlice.reducer;
