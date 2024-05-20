import React, { useState } from "react";
 

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
 
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// import { handleLogin } from "./store";
import { toast } from "react-toastify";
import axios from "axios";
import { handleLogin } from "../redux/slice/authenticationSlice";
import { setUserData, setUserToken } from "../redux/slice/userSlice";
import Loading from "../utils/Loading";
const schema = yup
  .object({
    email: yup.string().email("Invalid email").required("Email ID is required"),
    password: yup.string().required("Password is required"),
  })
  .required();
const LoginForm = () => {
  const dispatch = useDispatch();

  const {
    register,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
    //
    mode: "all",
  });
  console.log("errors", errors);
  const navigate = useNavigate();
   
  const[loading,setLoading]=useState(false)
  const onSubmit = (data) => {
    const formData = {
      emailId: data.email,
      password: data.password,
    };
    setLoading(true);
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/admin/login`, formData)
      .then((response) => {
        dispatch(handleLogin(true));

         
        dispatch(setUserData(response.data.user));
        dispatch(setUserToken(response.data.token));


        localStorage.setItem("token", JSON.stringify(response?.data?.token));
        localStorage.setItem("userId", response?.data?.user?._id);

        localStorage.setItem("firstName", response?.data?.user?.firstName);
        localStorage.setItem("lastName", response?.data?.user?.lastName);
        localStorage.setItem("isAuth", true);

        localStorage.setItem("email", response?.data?.user?.email);
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
    setLoading(false);

        setTimeout(() => {
          navigate("/profile");
        }, 1500);
      })
      .catch((error) => {
        toast.error("Invalid credentials", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        console.error("Error fetching roles:", error);
      });
  };

 

   if(loading){
    return <Loading/>
   }
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
        <div>
          <label
            htmlFor="email"
            className={`block capitalize   ${"flex-0 mr-6 md:w-[100px] w-[60px] break-words"}`}
          >
            Email{" "}
          </label>
          <div className={`relative flex-1"}`}>
            <input
              name="email"
              label="Email ID"
              // defaultValue={users[0].email}
              type="email"
              onChange={(e) => {
                setValue("email", e.target.value);
              }}
              register={register}
              placeholder="Enter Email ID"
              error={errors.email}
              className="h-[48px]   form-control py-2 h-[48px]  "
            />
            <div className={` mt-2  text-danger-500 block text-sm`}>
              {errors?.email?.message}
            </div>
          </div>
        </div>
        <div>
          <label
            htmlFor="password"
            className={`block capitalize   ${"flex-0 mr-6 md:w-[100px] w-[60px] break-words"}`}
          >
            Password{" "}
          </label>
          <div className={`relative flex-1"}`}>
            <input
              name="password"
              type="text"
              onChange={(e) => {
                setValue("password", e.target.value);
              }}
              register={register}
              placeholder="Enter your password"
              error={errors.email}
              className="h-[48px]   form-control py-2 h-[48px]  "
            />
            <div className={` mt-2  text-danger-500 block text-sm`}>
              {errors?.password?.message}
            </div>
          </div>
        </div>
        <div className="flex justify-end "></div>

        <button className="btn bg-[#C00EAE] block w-full text-center">
          Sign In
        </button>
      </form>

      <div className="md:max-w-[345px] mt-6 mx-auto font-normal text-slate-500 dark:text-slate-400mt-12 uppercase text-sm">
        Don’t have an account?{" "}
        <Link
          to="/register"
          className="text-slate-900 dark:text-white font-medium hover:underline"
        >
          Sign up
        </Link>
      </div>
    </>
  );
};

export default LoginForm;
