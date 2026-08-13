import { AxiosError } from "axios";
import { create } from "zustand";
import {
  login as loginRequest,
  logout as logoutRequest,
  type AuthTokenResponse,
} from "../services/authApi";
import { getCurrentUser, type CurrentUserResponse } from "../services/userApi";
import {
  clearStoredAuthTokens,
  getStoredAuthTokens,
  setStoredAuthTokens,
} from "../utils/tokenStorage";
import { resolveRoleIdFromName } from "../utils/memberPermission";

type AuthState = {
  userId: string | null;
  userName: string | null;
  roleName: string | null;
  roleId: number | null;
  accessToken: string | null;
  refreshToken: string | null;
  accessTokenExpiry: string | null;
  refreshTokenExpiry: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isProfileLoading: boolean;
  error: string | null;
  hydrate: () => void;
  initializeAuth: () => Promise<void>;
  login: (userId: string, userPassword: string) => Promise<void>;
  logout: () => Promise<void>;
  syncCurrentUser: () => Promise<CurrentUserResponse | null>;
  applyTokens: (tokens: AuthTokenResponse, userId?: string | null) => void;
  applyCurrentUser: (user: CurrentUserResponse) => void;
  clearAuth: () => void;
};

const getApiErrorMessage = (error: unknown, fallback: string) => {
  if (error instanceof AxiosError) {
    const message = error.response?.data;

    if (typeof message === "string" && message.trim()) {
      return message;
    }

    if (message && typeof message === "object") {
      const record = message as Record<string, unknown>;
      if (typeof record.message === "string" && record.message.trim()) {
        return record.message;
      }
    }
  }

  if (error instanceof Error && error.message.trim()) {
    return error.message;
  }

  return fallback;
};

const getInitialStoredTokens = () => {
  return getStoredAuthTokens();
};

const initialStoredTokens = getInitialStoredTokens();

export const useAuthStore = create<AuthState>((set, get) => ({
  userId: initialStoredTokens?.userId ?? null,
  userName: initialStoredTokens?.userName ?? null,
  roleName: initialStoredTokens?.roleName ?? null,
  roleId: initialStoredTokens?.roleId ?? null,
  accessToken: initialStoredTokens?.accessToken ?? null,
  refreshToken: initialStoredTokens?.refreshToken ?? null,
  accessTokenExpiry: initialStoredTokens?.accessTokenExpiry ?? null,
  refreshTokenExpiry: initialStoredTokens?.refreshTokenExpiry ?? null,
  isAuthenticated: Boolean(initialStoredTokens),
  isLoading: false,
  isProfileLoading: false,
  error: null,
  hydrate: () => {
    const storedTokens = getStoredAuthTokens();

    if (!storedTokens) {
      return;
    }

    set({
      ...storedTokens,
      isAuthenticated: true,
      error: null,
    });
  },
  initializeAuth: async () => {
    get().hydrate();

    if (!get().isAuthenticated) {
      return;
    }

    await get().syncCurrentUser();
  },
  applyTokens: (tokens, userId) => {
    const current = get();
    const resolvedUserId = userId ?? current.userId ?? null;

    setStoredAuthTokens({
      ...tokens,
      userId: resolvedUserId,
      userName: current.userName,
      roleName: current.roleName,
      roleId: current.roleId,
    });

    set({
      userId: resolvedUserId,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      accessTokenExpiry: tokens.accessTokenExpiry,
      refreshTokenExpiry: tokens.refreshTokenExpiry,
      isAuthenticated: true,
      error: null,
    });
  },
  applyCurrentUser: (user) => {
    const current = get();
    const resolvedRoleId = user.roleId ?? resolveRoleIdFromName(user.roleName);

    setStoredAuthTokens({
      accessToken: current.accessToken ?? "",
      refreshToken: current.refreshToken ?? "",
      accessTokenExpiry: current.accessTokenExpiry ?? "",
      refreshTokenExpiry: current.refreshTokenExpiry ?? "",
      userId: user.userId,
      userName: user.userName,
      roleName: user.roleName,
      roleId: resolvedRoleId,
    });

    set({
      userId: user.userId,
      userName: user.userName,
      roleName: user.roleName,
      roleId: resolvedRoleId,
      error: null,
    });
  },
  syncCurrentUser: async () => {
    if (!get().isAuthenticated) {
      return null;
    }

    set({
      isProfileLoading: true,
    });

    try {
      const currentUser = await getCurrentUser();

      get().applyCurrentUser(currentUser);
      return currentUser;
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 401) {
        set((prev) => ({
          ...prev,
          userName: null,
          roleName: null,
          roleId: null,
        }));
        return null;
      }

      return null;
    } finally {
      set({
        isProfileLoading: false,
      });
    }
  },
  clearAuth: () => {
    clearStoredAuthTokens();
    set({
      userId: null,
      userName: null,
      roleName: null,
      roleId: null,
      accessToken: null,
      refreshToken: null,
      accessTokenExpiry: null,
      refreshTokenExpiry: null,
      isAuthenticated: false,
      error: null,
    });
  },
  login: async (userId, userPassword) => {
    set({
      isLoading: true,
      error: null,
    });

    try {
      const tokens = await loginRequest({ userId, userPassword });
      get().applyTokens(tokens, userId);
      await get().syncCurrentUser();
    } catch (error) {
      set({
        error: getApiErrorMessage(error, "로그인에 실패했습니다."),
      });
      throw error;
    } finally {
      set({
        isLoading: false,
      });
    }
  },
  logout: async () => {
    const refreshToken = get().refreshToken;

    set({
      isLoading: true,
      error: null,
    });

    try {
      if (refreshToken) {
        await logoutRequest({ refreshToken });
      }
    } catch (error) {
      set({
        error: getApiErrorMessage(
          error,
          "로그아웃 처리 중 문제가 발생했습니다."
        ),
      });
    } finally {
      get().clearAuth();
      set({
        isLoading: false,
        isProfileLoading: false,
      });
    }
  },
}));
