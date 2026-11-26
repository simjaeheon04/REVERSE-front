const ACCESS_TOKEN_KEY = "reverse.accessToken";
const REFRESH_TOKEN_KEY = "reverse.refreshToken";
const ACCESS_TOKEN_EXPIRY_KEY = "reverse.accessTokenExpiry";
const REFRESH_TOKEN_EXPIRY_KEY = "reverse.refreshTokenExpiry";
const USER_ID_KEY = "reverse.userId";
const USER_NAME_KEY = "reverse.userName";
const ROLE_NAME_KEY = "reverse.roleName";
const ROLE_ID_KEY = "reverse.roleId";

export type StoredAuthTokens = {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiry: string;
  refreshTokenExpiry: string;
  userId: string | null;
  userName: string | null;
  roleName: string | null;
  roleId: number | null;
};

const isBrowser = typeof window !== "undefined";

const getExpiryTime = (expiry: string, token: string) => {
  // LocalDateTime responses have no guaranteed timezone. JWT exp is an absolute time.
  const match = /^(\d{4}-\d{2}-\d{2})T(\d{2}:\d{2}:\d{2})(?:\.(\d{1,9}))?(Z|[+-]\d{2}:?\d{2})?$/i.exec(expiry);
  if (!match) {
    return NaN;
  }

  const dateTime = `${match[1]}T${match[2]}.${(match[3] ?? "").padEnd(3, "0").slice(0, 3)}`;
  const calendarTime = Date.parse(`${dateTime}Z`);
  if (!Number.isFinite(calendarTime) || new Date(calendarTime).toISOString() !== `${dateTime}Z`) {
    return NaN;
  }

  if (match[4]) {
    return Date.parse(`${dateTime}${match[4]}`);
  }

  try {
    const payload = JSON.parse(atob(token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/")));
    return typeof payload.exp === "number" && Number.isFinite(payload.exp)
      ? payload.exp * 1000
      : NaN;
  } catch {
    return NaN;
  }
};

const isExpired = (expiry: string, token: string, skewMs = 0) => {
  const expiresAt = getExpiryTime(expiry, token);

  return !Number.isFinite(expiresAt) || expiresAt <= Date.now() + skewMs;
};

export const isStoredAccessTokenExpired = (skewMs = 5_000) => {
  if (!isBrowser) {
    return false;
  }

  const expiry = window.localStorage.getItem(ACCESS_TOKEN_EXPIRY_KEY);
  return !expiry || isExpired(expiry, getStoredAccessToken() ?? "", skewMs);
};

export const getStoredAccessToken = () =>
  isBrowser ? window.localStorage.getItem(ACCESS_TOKEN_KEY) : null;

export const getStoredRefreshToken = () =>
  isBrowser ? window.localStorage.getItem(REFRESH_TOKEN_KEY) : null;

export const getStoredRoleName = () =>
  isBrowser ? window.localStorage.getItem(ROLE_NAME_KEY) : null;

const getStoredRoleId = () => {
  if (!isBrowser) {
    return null;
  }

  const storedRoleId = window.localStorage.getItem(ROLE_ID_KEY);
  const roleId = storedRoleId ? Number(storedRoleId) : null;

  return Number.isFinite(roleId) ? roleId : null;
};

export const getStoredAuthTokens = (): StoredAuthTokens | null => {
  if (!isBrowser) {
    return null;
  }

  const accessToken = window.localStorage.getItem(ACCESS_TOKEN_KEY);
  const refreshToken = window.localStorage.getItem(REFRESH_TOKEN_KEY);
  const accessTokenExpiry = window.localStorage.getItem(ACCESS_TOKEN_EXPIRY_KEY);
  const refreshTokenExpiry = window.localStorage.getItem(REFRESH_TOKEN_EXPIRY_KEY);
  const userId = window.localStorage.getItem(USER_ID_KEY);
  const userName = window.localStorage.getItem(USER_NAME_KEY);
  const roleName = getStoredRoleName();
  const roleId = getStoredRoleId();

  if (!accessToken || !refreshToken || !accessTokenExpiry || !refreshTokenExpiry) {
    return null;
  }

  if (!Number.isFinite(getExpiryTime(accessTokenExpiry, accessToken)) ||
      isExpired(refreshTokenExpiry, refreshToken)) {
    return null;
  }

  return {
    accessToken,
    refreshToken,
    accessTokenExpiry,
    refreshTokenExpiry,
    userId,
    userName,
    roleName,
    roleId,
  };
};

export const setStoredAuthTokens = (tokens: StoredAuthTokens) => {
  if (!isBrowser) {
    return;
  }

  if (!tokens.accessToken || !tokens.refreshToken ||
      !Number.isFinite(getExpiryTime(tokens.accessTokenExpiry, tokens.accessToken)) ||
      isExpired(tokens.refreshTokenExpiry, tokens.refreshToken)) {
    throw new Error("유효하지 않거나 만료된 인증 정보입니다.");
  }

  window.localStorage.setItem(ACCESS_TOKEN_KEY, tokens.accessToken);
  window.localStorage.setItem(REFRESH_TOKEN_KEY, tokens.refreshToken);
  window.localStorage.setItem(ACCESS_TOKEN_EXPIRY_KEY, tokens.accessTokenExpiry);
  window.localStorage.setItem(REFRESH_TOKEN_EXPIRY_KEY, tokens.refreshTokenExpiry);

  if (tokens.userId) {
    window.localStorage.setItem(USER_ID_KEY, tokens.userId);
  } else {
    window.localStorage.removeItem(USER_ID_KEY);
  }

  if (tokens.userName) {
    window.localStorage.setItem(USER_NAME_KEY, tokens.userName);
  } else {
    window.localStorage.removeItem(USER_NAME_KEY);
  }

  if (tokens.roleName) {
    window.localStorage.setItem(ROLE_NAME_KEY, tokens.roleName);
  } else {
    window.localStorage.removeItem(ROLE_NAME_KEY);
  }

  if (tokens.roleId) {
    window.localStorage.setItem(ROLE_ID_KEY, String(tokens.roleId));
  } else {
    window.localStorage.removeItem(ROLE_ID_KEY);
  }
};

export const clearStoredAuthTokens = () => {
  if (!isBrowser) {
    return;
  }

  window.localStorage.removeItem(ACCESS_TOKEN_KEY);
  window.localStorage.removeItem(REFRESH_TOKEN_KEY);
  window.localStorage.removeItem(ACCESS_TOKEN_EXPIRY_KEY);
  window.localStorage.removeItem(REFRESH_TOKEN_EXPIRY_KEY);
  window.localStorage.removeItem(USER_ID_KEY);
  window.localStorage.removeItem(USER_NAME_KEY);
  window.localStorage.removeItem(ROLE_NAME_KEY);
  window.localStorage.removeItem(ROLE_ID_KEY);
};
