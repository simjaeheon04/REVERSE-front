import { axiosInstance } from "./axiosInstance";

export interface EmailPayload {
  email: string;
}

export interface EmailVerifyPayload extends EmailPayload {
  code: string;
}

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

export interface RegisterPayload {
  userId: string;
  userName: string;
  userEmail: string;
  userPassword: string;
  userIntroduce?: string;
  userMbti?: string;
  consents: {
    consentItemId: number;
    isAgreed: boolean;
  }[];
}

export interface FindUsernameSendCodePayload {
  userName: string;
  email: string;
}

export interface FindUsernameVerifyPayload {
  email: string;
  authCode: string;
}

export interface FindUsernameVerifyResponse {
  message: string;
  userId: string;
}

export interface FindPasswordSendCodePayload {
  userId: string;
  email: string;
}

export interface FindPasswordVerifyPayload {
  email: string;
  authCode: string;
}

export interface FindPasswordIssuePayload {
  userId: string;
  email: string;
}

interface MessageResponse {
  message: string;
}
export type LogoutRequest = {
  refreshToken: string;
};

type ApiResponse<T> =
  | T
  | {
      message?: string;
      data?: T;
    };

const unwrapApiData = <T>(payload: ApiResponse<T>): T => {
  if (payload && typeof payload === "object" && "data" in payload) {
    return (payload as { data?: T }).data as T;
  }

  return payload as T;
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

export const sendEmailCode = async (payload: EmailPayload) => {
  const response = await axiosInstance.post<string>(
    "/api/auth/email/send",
    payload,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

export const verifyEmailCode = async (payload: EmailVerifyPayload) => {
  const response = await axiosInstance.post<string>(
    "/api/auth/email/verify",
    payload
  );
  return response.data;
};

export const registerUser = async (payload: RegisterPayload) => {
  const response = await axiosInstance.post<string>(
    "/api/auth/register",
    payload
  );
  return response.data;
};

export const sendFindUsernameCode = async (
  payload: FindUsernameSendCodePayload
) => {
  const response = await axiosInstance.post<MessageResponse>(
    "/api/auth/find-username/send-code",
    payload,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

export const verifyFindUsernameCode = async (
  payload: FindUsernameVerifyPayload
) => {
  const response = await axiosInstance.post<ApiResponse<FindUsernameVerifyResponse>>(
    "/api/auth/find-username/verify",
    payload,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return unwrapApiData(response.data);
};

export const sendFindPasswordCode = async (
  payload: FindPasswordSendCodePayload
) => {
  const response = await axiosInstance.post<MessageResponse>(
    "/api/auth/find-password/send-code",
    payload
  );
  return response.data;
};

export const verifyFindPasswordCode = async (
  payload: FindPasswordVerifyPayload
) => {
  const response = await axiosInstance.post<MessageResponse>(
    "/api/auth/find-password/verify",
    payload
  );
  return response.data;
};

export const issueTemporaryPassword = async (
  payload: FindPasswordIssuePayload
) => {
  const response = await axiosInstance.post<MessageResponse>(
    "/api/auth/find-password/issue",
    payload
  );
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
