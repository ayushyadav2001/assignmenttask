/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setUserData, setUserToken } from '../redux/slice/userSlice';
import { handleLogout } from '../redux/slice/authenticationSlice';


const Profile = () => {
  const { tokenRedux } = useSelector((state) => state.user);
   const token = JSON.parse (localStorage.getItem("token")) || tokenRedux; 
   const dispatch=useDispatch()
   const { data } = useSelector((state) => state.user);
    
 useEffect(() => {
   const fetchData = async () => {
     try {
       const response = await axios.get(
         `${process.env.REACT_APP_BACKEND_URL}/user/getProfile`,
         {
           headers: {
             Authorization: `Bearer ${token}`, // Add the token to the headers
           },
         }
       ).then((res)=>{
        
  dispatch(setUserData(res?.data?.user));
       })
     
       
     } catch (error) {
       console.error("Error fetching data", error);
     }
   };

   fetchData();
 }, [token]);

  
  return (
    <div className="inner-content min-h-[100vh] flex justify-center items-center bg-white dark:bg-slate-800">
      <div className="auth-box shadow-md  h-full flex flex-col justify-center  p-6 bg-white dark:bg-slate-900 rounded-lg">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label
              htmlFor="firstName"
              className={`block capitalize   ${"flex-0 mr-6 md:w-[100px] w-[60px] break-words"}`}
            >
              First Name
            </label>
            <div className={`relative flex-1"}`}>
              <input
                disabled
                name="firstName"
                type="text"
                defaultValue={data?.firstName}
                placeholder="Enter first name"
                className="h-[48px] cursor-not-allowed  form-control py-2 "
              />
              <div className={` mt-2  text-danger-500 block text-sm`}></div>
            </div>
          </div>
          <div>
            <label
              htmlFor="lastName"
              className={`block capitalize   ${"flex-0 mr-6 md:w-[100px] w-[60px] break-words"}`}
            >
              Last Name
            </label>
            <div className={`relative flex-1"}`}>
              <input
                name="lastName"
                defaultValue={data?.lastName}
                type="text"
                disabled
                placeholder="Enter last name"
                className="h-[48px]  cursor-not-allowed form-control py-2  "
              />
              <div className={` mt-2  text-danger-500 block text-sm`}></div>
            </div>
          </div>
          <div>
            <label
              htmlFor="mobileNumber"
              className={`block capitalize   ${"flex-0 mr-2 md:w-[200px] w-[60px] break-words"}`}
            >
              Mobile Number
            </label>
            <div className={`relative flex-1"}`}>
              <input
                name="mobileNumber"
                disabled
                type="number"
                defaultValue={data?.mobileNumber}
                placeholder="Enter mobile number"
                className="h-[48px] cursor-not-allowed  form-control py-2   "
              />
              <div className={` mt-2  text-danger-500 block text-sm`}></div>
            </div>
          </div>
          <div>
            <label
              htmlFor="email"
              className={`block capitalize   ${"flex-0 mr-6 md:w-[100px] w-[60px] break-words"}`}
            >
              Email{" "}
            </label>
            <div className={`relative flex-1"}`}>
              <input
                disabled
                name="email"
                label="Email ID"
                defaultValue={data?.email}
                type="email"
                placeholder="Enter Email ID"
                className="  cursor-not-allowed form-control py-2 h-[48px]  "
              />
              <div className={` mt-2  text-danger-500 block text-sm`}></div>
            </div>
          </div>
        </div>
        <button onClick={(e)=>{
dispatch(handleLogout())
        }} className="btn bg-[#C00EAE] block w-full text-center">
          Logout
        </button>
      </div>
    </div>
  );
}

export default Profile