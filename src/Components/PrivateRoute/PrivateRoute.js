import { useStoreState } from "easy-peasy";
import React from "react";
import { Redirect, Route } from "react-router";



const PrivateRoute = ({ component: Component, ...rest }) => {

  const isLogged = useStoreState(state => state.isLogged);
  
  return (
    <Route
      {...rest}
      render={(props) =>
        isLogged ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default PrivateRoute;
