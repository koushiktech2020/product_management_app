import React from "react";
import { Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { authAPI } from "../services/api";

interface PublicRouteProps {
  children: React.ReactNode;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["profile"],
    queryFn: authAPI.getProfile,
    retry: false,
  });

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!error && data) {
    return <Navigate to="/products" replace />;
  }

  return <>{children}</>;
};

export default PublicRoute;
