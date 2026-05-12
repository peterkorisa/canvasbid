import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { getUserRole } from '../services/api';

const ProtectedRoute = ({ allowedRoles }) => {
  const role = getUserRole();

  if (!role) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/error" replace state={{ message: "Access Denied. You do not have permission to view this page." }} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
