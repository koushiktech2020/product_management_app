import React from "react";
import { Navigate } from "react-router-dom";
import Loading from "./Loading";
import { useAuth } from "../hooks/useAuth";

interface PublicRouteProps {
  children: React.ReactNode;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const { data, isLoading, error } = useAuth();

  if (isLoading) {
    return <Loading />;
  }

  if (!error && data) {
    return <Navigate to="/products" replace />;
  }

  return <>{children}</>;
};

export default PublicRoute;
