import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialIsAuth = () => {
  const item = window.localStorage.getItem("isAuth");
  return item ? JSON.parse(item) : false;
};
const initialState = {
  isAuth: initialIsAuth(),
  data:[],
  token:""
};
export const userSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    
    setUserData:(state,action)=>{
state.data = action.payload;

    },
    setUserToken:(state,action)=>{
state.token = action.payload;

    },

     
  },
});
 
export const { setUserData, setUserToken } = userSlice.actions;

export default userSlice.reducer;
