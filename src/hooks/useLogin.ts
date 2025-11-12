import { useMutation } from "@tanstack/react-query";
import { loginUser, type LoginCredentials } from "../api/auth";

export const useLogin = () => {
  return useMutation({
    mutationFn: (credentials: LoginCredentials) => loginUser(credentials),
    onSuccess: (data) => {
      if (data.token) {
        localStorage.setItem("token", data.token);
      }
    },
  });
};
