import { useQuery } from "@tanstack/react-query";
import { verifyToken } from "../api/auth";

export const useVerifyToken = (enabled: boolean = true) => {
  return useQuery({
    queryKey: ["verify-token"],
    queryFn: verifyToken,
    retry: false,
    staleTime: Infinity,
    enabled,
  });
};
