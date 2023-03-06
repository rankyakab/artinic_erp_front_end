import React from 'react';
import { Navigate, Outlet } from 'react-router';

const useProtected = () => {
  const user = { loggedIn: false };
  return user && user.loggedIn;
};

const ProtectedRoutes = () => {
  const isAuth = useProtected();
  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
