import { useQuery } from "@tanstack/react-query";
import { authAPI } from "../services/api";

export const useAuth = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: authAPI.getProfile,
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });
};