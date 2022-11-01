import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, isLogin }) => {
  return isLogin === false ? <Navigate to="/" /> : children;
};

export default PrivateRoute;
