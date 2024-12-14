import React from 'react';
import { Navigate } from '@react-navigation/native';
import { useUser } from '../contexts/UserContext';

const ProtectedRoute = ({ children }) => {
  const { user } = useUser();

  if (!user || !user.isAdmin) {
    // Redirect to login if user is not logged in or is not an admin
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;

