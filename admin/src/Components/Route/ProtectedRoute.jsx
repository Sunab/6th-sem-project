import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Link, Route } from "react-router-dom";

const ProtectedRoute = ({ isAdmin, component: Component, ...rest }) => {
  const { loading, isLogin } = useSelector((state) => state.user);

  return (
    <Fragment>
      {loading === false && (
        <Route
          {...rest}
          render={(props) => {
            if (isLogin === false) {
              return <Link to="/login" />;
            }
            return <Component {...props} />;
          }}
        />
      )}
    </Fragment>
  );
};

export default ProtectedRoute;
