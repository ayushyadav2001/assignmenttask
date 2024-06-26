 
import React, { useState } from "react";
import { Link } from "react-router-dom";
// import LoginForm from "./common/login-form";
 
 
import { ToastContainer } from "react-toastify";

// image import

import Logo from "../../assets/images/logo/logo.png";
import Illustration from "../../assets/images/logo/ins.png";
import LoginForm from "../../pages/LoginPage";


const Login = () => {

    const [showLoginForm,setShowLoginForm]=useState(false);
    const toggleLoginForm=()=>{
        setShowLoginForm(!showLoginForm);
    }
  
  return (
    <>
      <ToastContainer />
      <div className="loginwrapper">
        <div className="lg-inner-column">
          <div className="left-column relative z-[1]">
            <div className="max-w-[520px] pl-10  ltr:pl-20 rtl:pr-20">
              <img
                src={Logo}
                alt=""
                className="mb-10 w-64 "
              />
            </div>
            <div className="absolute left-5 2xl:bottom-[-110px] bottom-[-130px] h-full w-full z-[-1]">
              <img
                src={Illustration}
                alt=""
                className="h-full w-[30rem] object-contain"
              />
            </div>
          </div>
          <div className="right-column relative">
            <div className="inner-content h-full flex flex-col bg-white dark:bg-slate-800">
              <div className="auth-box h-full flex flex-col justify-center">
                <div className="mobile-logo text-center mb-6 lg:hidden block">
                  <img src={Logo} alt="" className="mx-auto" />
                </div>
                <div className="text-center 2xl:mb-10 mb-4">
                  <h4 className="font-medium">Sign In</h4>
                  <div className="text-slate-500 text-base  ">
                    Sign In to your admin account
                  </div>
                </div>
                
                     <LoginForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
