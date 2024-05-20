import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isAuth = useSelector((state) => state.auth.isAuth);

  // Check local storage if isAuth is not set in Redux state
  const isAuthFromLocalStorage = JSON.parse(localStorage.getItem("isAuth"));

  if (!isAuth && !isAuthFromLocalStorage) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
