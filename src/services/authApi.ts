import { axiosInstance } from "./axiosInstance";
import { AxiosError } from "axios";

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
  try {
    console.log("[auth/email/send] payload", payload);
    const response = await axiosInstance.post<string>(
      "/api/auth/email/send",
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("[auth/email/send] response", response.data);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log("[auth/email/send] error", {
        status: error.response?.status,
        data: error.response?.data,
        headers: error.response?.headers,
      });
    }

    throw error;
  }
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
    payload
  );
  return response.data;
};

export const verifyFindUsernameCode = async (
  payload: FindUsernameVerifyPayload
) => {
  const response = await axiosInstance.post<FindUsernameVerifyResponse>(
    "/api/auth/find-username/verify",
    payload
  );
  return response.data;
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
