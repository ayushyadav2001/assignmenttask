import React, { lazy, Suspense } from "react";
import logo from './logo.svg';
import './App.css';
import "./index.css"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import Loading from "./utils/Loading";
import ProtectedRoute from "./hooks/ProtectedRoute";
 
 
 

const Login = lazy(() => import("./components/Login/Login"));
const Register = lazy(() => import("./components/register/register"));
const Profile = lazy(() => import("./pages/Profile"));

function Content({ isSidebarOpen }) {
  return (
    <div className={`${isSidebarOpen ? "content" : "content_two"} `}>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<Loading />}>
              <Login />
            </Suspense>
          }
        />

        <Route
          path="/register"
          element={
            <Suspense fallback={<Loading />}>
              <Register />
            </Suspense>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Suspense fallback={<Loading />}>
                <Profile />
              </Suspense>
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}
function App() {
  return (
    <div className="">
      <BrowserRouter>
    

        <Content  />
      </BrowserRouter>
     
    </div>
  );
}

export default App;
