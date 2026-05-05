import { axiosInstance } from "./axiosInstance";

export type LoginRequest = {
  userId: string;
  userPassword: string;
};

export type AuthTokenResponse = {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiry: string;
  refreshTokenExpiry: string;
};

export type RefreshTokenRequest = {
  refreshToken: string;
};

export type LogoutRequest = {
  refreshToken: string;
};

export const login = async (
  payload: LoginRequest
): Promise<AuthTokenResponse> => {
  const response = await axiosInstance.post("/api/auth/login", payload, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });

  return response.data;
};

export const refreshAccessToken = async (
  payload: RefreshTokenRequest
): Promise<AuthTokenResponse> => {
  const response = await axiosInstance.post("/api/auth/refresh", payload, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });

  return response.data;
};

export const logout = async (payload: LogoutRequest): Promise<string> => {
  const response = await axiosInstance.post("/api/auth/logout", payload, {
    headers: {
      "Content-Type": "application/json",
    },
    responseType: "text",
    withCredentials: true,
  });

  return response.data;
};
