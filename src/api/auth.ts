import { baseUrl } from "../assets/baseUrl";

export type LoginCredentials = {
  login: string;
  password: string;
};

export type LoginResponse = {
  success: boolean;
  token?: string;
  message?: string;
};

export type VerifyResponse = {
  success: boolean;
  user?: any;
  message?: string;
};

export const loginUser = async (
  credentials: LoginCredentials
): Promise<LoginResponse> => {
  const response = await fetch(`${baseUrl}api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Błąd logowania");
  }

  return await response.json();
};

export const verifyToken = async (): Promise<VerifyResponse> => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Brak tokena");
  }

  const response = await fetch(`${baseUrl}api/auth/verify`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Nieprawidłowy token");
  }

  return await response.json();
};
