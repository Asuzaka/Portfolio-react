import { createSlice } from "@reduxjs/toolkit";

const dark = JSON.parse(localStorage.getItem("dark"))
  ? JSON.parse(localStorage.getItem("dark"))
  : false;
const initialState = {
  dark: dark,
};

const ThemeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleDarkMode: (state, action) => {
      localStorage.setItem("dark", JSON.stringify(action.payload));
      state.dark = action.payload;
    },
  },
});

export const { toggleDarkMode } = ThemeSlice.actions;
export default ThemeSlice.reducer;
