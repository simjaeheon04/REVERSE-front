import { axiosInstance } from "./axiosInstance";

export interface EmailPayload {
  email: string;
}

export interface EmailVerifyPayload extends EmailPayload {
  code: string;
}

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

export const sendEmailCode = async (payload: EmailPayload) => {
  const response = await axiosInstance.post<string>("/api/auth/email/send", payload);
  return response.data;
};

export const verifyEmailCode = async (payload: EmailVerifyPayload) => {
  const response = await axiosInstance.post<string>("/api/auth/email/verify", payload);
  return response.data;
};

export const registerUser = async (payload: RegisterPayload) => {
  const response = await axiosInstance.post<string>("/api/auth/register", payload);
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
