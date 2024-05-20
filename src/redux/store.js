import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slice/authenticationSlice";
import userSlice from "./slice/userSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    user:userSlice
  },
});
