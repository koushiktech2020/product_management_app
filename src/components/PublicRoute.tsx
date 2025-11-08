import React from "react";
import { Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { authAPI } from "../services/api";
import Loading from "./Loading";

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
    return <Loading />;
  }

  if (!error && data) {
    return <Navigate to="/products" replace />;
  }

  return <>{children}</>;
};

export default PublicRoute;
