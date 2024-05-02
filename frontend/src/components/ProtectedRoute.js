import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import authService from '../services/authService';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = authService.getCurrentUser();

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        )
      }
    />
  );
};

export default ProtectedRoute;