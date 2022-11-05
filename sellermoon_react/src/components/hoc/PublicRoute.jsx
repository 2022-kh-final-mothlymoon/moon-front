import React from "react";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children, isLogin }) => {
  return isLogin === true ? <Navigate to="/" /> : children;
};

export default PublicRoute;
