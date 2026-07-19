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

type HeaderAccessor = {
  get?: (key: string) => unknown;
  delete?: (key: string) => unknown;
};

const getHeaderValue = (headers: unknown, key: string) => {
  if (!headers) {
    return undefined;
  }

  const accessor = headers as HeaderAccessor;
  if (typeof accessor.get === "function") {
    return accessor.get(key);
  }

  return (headers as Record<string, unknown>)[key];
};

const removeHeader = (headers: unknown, key: string) => {
  if (!headers) {
    return;
  }

  const accessor = headers as HeaderAccessor;
  if (typeof accessor.delete === "function") {
    accessor.delete(key);
    return;
  }

  delete (headers as Record<string, unknown>)[key];
};

axiosInstance.interceptors.request.use((config) => {
  const accessToken = getStoredAccessToken();
  const requestUrl = config.url ?? "";
  const requestMethod = config.method?.toLowerCase() ?? "get";
  const requiresAuth = getHeaderValue(config.headers, "X-Require-Auth") === "true";
  const isAuthRequest = requestUrl.includes("/api/auth/");
  const isPublicProjectReadRequest =
    requestMethod === "get" &&
    /^\/api\/projects(?:\/[^/]+)?$/.test(requestUrl.split("?")[0]);
  removeHeader(config.headers, "X-Require-Auth");

  console.log("[axios/request]", {
    method: requestMethod,
    url: requestUrl,
    hasAccessToken: Boolean(accessToken),
    requiresAuth,
    isAuthRequest,
    isPublicProjectReadRequest,
    willAttachAuthorization:
      Boolean(accessToken) &&
      !isAuthRequest &&
      (!isPublicProjectReadRequest || requiresAuth),
  });

  if (
    accessToken &&
    !isAuthRequest &&
    (!isPublicProjectReadRequest || requiresAuth)
  ) {
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
        const storedAuthTokens = getStoredAuthTokens();

        setStoredAuthTokens({
          ...tokens,
          userId: storedAuthTokens?.userId ?? null,
          userName: storedAuthTokens?.userName ?? null,
          roleName: storedAuthTokens?.roleName ?? null,
          roleId: storedAuthTokens?.roleId ?? null,
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
