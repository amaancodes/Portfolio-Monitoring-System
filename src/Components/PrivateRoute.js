// PrivateRoute.js

import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, roles, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        const user = JSON.parse(localStorage.getItem('user'));

        if (!user) {
          // Not logged in
          return <Redirect to="/login" />;
        }

        // Check if route is restricted by role
        if (roles && roles.indexOf(user.accessLevel) === -1) {
          // Role not authorized so redirect to the appropriate dashboard
          const redirectPath = user.accessLevel === 'HOD' ? '/hod-dashboard' : '/faculty-dashboard';
          return <Redirect to={redirectPath} />;
        }

        // Authorized so return the component
        return <Component {...props} />;
      }}
    />
  );
};

export default PrivateRoute;
