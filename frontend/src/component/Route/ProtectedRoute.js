import React, { Fragment } from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";

export const ProtectedRoute = ({ isAdmin, component: Component, ...rest }) => {
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);
  return (
    <Fragment>
      {loading === false && (
        <Route
          {...rest}
          render={(props) => {
            if (isAuthenticated === false) {
              return <Redirect to="/login" />;
            }

            if (isAdmin === true && user.role !== "admin") {
              return <Redirect to="/login" />;
            }
            return <Component {...props} />;
          }}
        />
      )}
    </Fragment>
  );
};
