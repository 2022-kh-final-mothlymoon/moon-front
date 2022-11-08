import React from "react";
import { Navigate, Route } from "react-router-dom";
import { isAdmin } from "./IsAdmin";

const AuthRoute = ({ version, component: Component, ...rest }) => {
  if (version === 1) {
    return (
      <Route
        {...rest}
        render={(props) =>
          isAdmin() ? <Component {...props} /> : <Navigate to="/admin/login" />
        }
      />
    );
  }
};

export default AuthRoute;
