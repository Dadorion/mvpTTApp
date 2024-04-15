import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function AuthRedirect({ children }) {
  const isAuth = useSelector((state) => state.auth.isAuth);

  return isAuth ? children : <Navigate to="/login" />;
}

export default AuthRedirect;
