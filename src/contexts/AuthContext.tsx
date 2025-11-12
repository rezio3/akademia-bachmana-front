import React, { createContext, useContext, useEffect } from "react";
import { useVerifyToken } from "../hooks/useVerifyToken";

type AuthContextType = {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
  logout: () => void;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const hasToken = !!localStorage.getItem("token");

  const { data, isLoading, isError } = useVerifyToken(hasToken);

  const isAuthenticated = hasToken && data?.success === true;

  useEffect(() => {
    if (isError && hasToken) {
      localStorage.removeItem("token");
    }
  }, [isError, hasToken]);

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const setIsAuthenticated = () => {
    console.warn("setIsAuthenticated is deprecated");
  };

  const loading = hasToken && isLoading;

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
