import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from './AuthContext';

function ProtectedRoute({ allowedRoles }) {
  const { userRole } = useContext(AuthContext);
  console.log('UserRole:', userRole);
  
  if (userRole === null) {
    return <h2>Loading...</h2>; // Show a loading message while role is being fetched
  }

  return allowedRoles.includes(userRole) ? <Outlet /> : <Navigate to="/dashboard" />;
}

export default ProtectedRoute;
