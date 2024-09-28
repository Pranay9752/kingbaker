// PrivateRoute.js

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import isAuthenticated from '../atom/utils/isAuthenticated';

const PrivateRoute = () => {
    
    return isAuthenticated() ? <Outlet /> : <Navigate to={`account/login?next=${encodeURIComponent(location.pathname)}`} />;
};

export default PrivateRoute;
