import { configureStore } from "@reduxjs/toolkit";
import ThemeSlice from "./ThemeSlice";
import UserSlice from "./UserSlice";

export const store = configureStore({
  reducer: {
    theme: ThemeSlice,
    user: UserSlice,
  },
});
