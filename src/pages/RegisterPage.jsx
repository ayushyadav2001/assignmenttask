 
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
const schema = yup
  .object({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    mobileNumber: yup
      .string()
      .matches(/^[0-9]+$/, "Mobile number must be only digits")
      .required("Mobile number is required"),
    email: yup.string().email("Invalid email").required("Email ID is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
  })
  .required();
const RegisterPage = () => {
  const dispatch = useDispatch();

  const {
    register,
    setValue,
    formState: { errors, },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
    //
    mode: "all",
  });
  console.log("errors", errors);
  const navigate = useNavigate();
  
  const onSubmit = (data) => {
    const formData = {
      firstName: data.firstName,
      lastName: data.lastName,
      mobileNumber: data.mobileNumber,
      emailId: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
    };
   
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/auth/register`, formData)
      .then((response) => {
        dispatch(handleLogin(true));

        console.log("response", response);
 dispatch(setUserData(response.data.user));
 dispatch(setUserToken(response.data.token));
        localStorage.setItem("token", JSON.stringify(response?.data?.token));
        localStorage.setItem("userId", response?.data?.user?._id);
        localStorage.setItem("firstName", response?.data?.user?.firstName);
        localStorage.setItem("lastName", response?.data?.user?.lastName);

        localStorage.setItem("email", response?.data?.user?.email);
        setTimeout(() => {
          navigate("/");
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
 

  
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
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
                name="firstName"
                type="text"
                onChange={(e) => {
                  setValue("firstName", e.target.value);
                }}
                register={register}
                placeholder="Enter first name"
                className="h-[48px]   form-control py-2 h-[48px]  "
              />
              <div className={` mt-2  text-danger-500 block text-sm`}>
                {errors?.firstName?.message}
              </div>
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
                type="text"
                onChange={(e) => {
                  setValue("lastName", e.target.value);
                }}
                register={register}
                placeholder="Enter last name"
                className="h-[48px]   form-control py-2 h-[48px]  "
              />
              <div className={` mt-2  text-danger-500 block text-sm`}>
                {errors?.lastName?.message}
              </div>
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
                onChange={(e) => {
                  setValue("mobileNumber", e.target.value);
                }}
                type="number"
                register={register}
                placeholder="Enter mobile number"
                className="h-[48px]   form-control py-2 h-[48px]  "
              />
              <div className={` mt-2  text-danger-500 block text-sm`}>
                {errors?.mobileNumber?.message}
              </div>
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
                name="email"
                onChange={(e) => {
                  setValue("email", e.target.value);
                }}
                label="Email ID"
                // defaultValue={users[0].email}
                type="email"
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
          <div>
            <label
              htmlFor="confirmPassword"
              className={`block capitalize   ${"flex-0 mr-6 md:w-[200px] w-[60px] break-words"}`}
            >
              Confirm Password{" "}
            </label>
            <div className={`relative flex-1"}`}>
              <input
                name="confirmPassword"
                type="text"
                onChange={(e) => {
                  setValue("confirmPassword", e.target.value);
                }}
                register={register}
                placeholder="Enter your confirm password"
                className="h-[48px]   form-control py-2 h-[48px]  "
              />
              <div className={` mt-2  text-danger-500 block text-sm`}>
                {errors?.confirmPassword?.message}
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end "></div>

        <button className="btn bg-[#C00EAE] block w-full text-center">
          Sign Up
        </button>
      </form>

      <div className="md:max-w-[345px] mt-6 mx-auto font-normal text-slate-500 dark:text-slate-400mt-12 uppercase text-sm">
        ALREADY REGISTERED?
        <Link
          to="/"
          className="text-slate-900 dark:text-white font-medium hover:underline"
        >
          Sign in
        </Link>
      </div>
    </>
  );
};

export default RegisterPage;
