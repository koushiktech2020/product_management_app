import React from "react";
import { Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { authAPI } from "../services/api";
import Loading from "./Loading";

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["profile"],
    queryFn: authAPI.getProfile,
    retry: false,
  });

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
