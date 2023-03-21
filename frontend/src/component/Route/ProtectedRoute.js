import React, { Fragment } from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";

export const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);
  return (
    <Fragment>
      {!loading && (
        <Route
          {...rest}
          render={(props) => {
            if (!isAuthenticated) {
              return <Redirect to="/login" />;
            }
            return <Component {...props} />;
          }}
        />
      )}
    </Fragment>
  );
};
