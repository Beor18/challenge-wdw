import React from "react";
import { Redirect, Route } from "react-router-dom";

import { useAuthState } from "../context";
import Login from '../pages/login/login';

const AppRoutes = ({ component: Component, path, isPrivate, ...rest }) => {
  const userDetails = useAuthState();
  console.log(Boolean(userDetails.token))
  return (
    <Route
      path={path}
      render={(props) =>
        <Component {...props} />
      }
      {...rest}
    />
  );
};

export default AppRoutes;
