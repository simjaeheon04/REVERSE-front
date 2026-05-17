import axios from "axios";
import {
  clearStoredAuthTokens,
  getStoredAccessToken,
  getStoredAuthTokens,
  getStoredRefreshToken,
  setStoredAuthTokens,
} from "../utils/tokenStorage";

const DEFAULT_BASE_URL = "http://localhost:8080";
const baseURL = import.meta.env.DEV
  ? ""
  : import.meta.env.VITE_API_BASE_URL || DEFAULT_BASE_URL;

export const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  const accessToken = getStoredAccessToken();
  const requestUrl = config.url ?? "";
  const isAuthRequest = requestUrl.includes("/api/auth/");

  if (accessToken && !isAuthRequest) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

let refreshPromise: Promise<string | null> | null = null;

const getRefreshedAccessToken = async () => {
  const refreshToken = getStoredRefreshToken();

  if (!refreshToken) {
    return null;
  }

  if (!refreshPromise) {
    refreshPromise = axios
      .post(`${baseURL}/api/auth/refresh`, { refreshToken }, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((response) => response.data as {
        accessToken: string;
        refreshToken: string;
        accessTokenExpiry: string;
        refreshTokenExpiry: string;
      })
      .then((tokens) => {
        setStoredAuthTokens({
          ...tokens,
          userId: getStoredAuthTokens()?.userId ?? null,
          userName: getStoredAuthTokens()?.userName ?? null,
          roleName: getStoredAuthTokens()?.roleName ?? null,
        });
        return tokens.accessToken;
      })
      .catch(() => {
        clearStoredAuthTokens();
        return null;
      })
      .finally(() => {
        refreshPromise = null;
      });
  }

  return refreshPromise;
};

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config as
      | (typeof error.config & { _retry?: boolean })
      | undefined;

    if (
      error.response?.status !== 401 ||
      !originalRequest ||
      originalRequest._retry
    ) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    const refreshedAccessToken = await getRefreshedAccessToken();

    if (!refreshedAccessToken) {
      return Promise.reject(error);
    }

    originalRequest.headers = originalRequest.headers ?? {};
    originalRequest.headers.Authorization = `Bearer ${refreshedAccessToken}`;

    return axiosInstance(originalRequest);
  }
);
