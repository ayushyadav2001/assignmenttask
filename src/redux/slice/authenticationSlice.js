import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";


const initialIsAuth = () => {
  const item = window.localStorage.getItem("isAuth");
  return item ? JSON.parse(item) : false;
};
const initialState = {
  isAuth: initialIsAuth(),
};
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    handleLogin: (state, action) => {
        // console.log("I am from handlelogin")
      state.isAuth = action.payload;
      window.localStorage.setItem("isAuth", JSON.stringify(state.isAuth));
      toast.success("User logged in successfully!", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    },
    handleLogout: (state, action) => {
      state.isAuth = action.payload;
      window.localStorage.removeItem("isAuth");
      toast.success("User logged out successfully!", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    },
  },
});

// Action creators are generated for each case reducer function
export const { handleLogin, handleLogout } = authSlice.actions;

export default authSlice.reducer;
