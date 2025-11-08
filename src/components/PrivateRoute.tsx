import React from "react";
import { Navigate } from "react-router-dom";
import Loading from "./Loading";
import { useAuth } from "../hooks/useAuth";

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { isLoading, error } = useAuth();

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
