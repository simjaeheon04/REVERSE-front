import { axiosInstance } from "./axiosInstance";

export type CurrentUserResponse = {
  userId: string;
  userName: string;
  roleName: string;
};

export const getCurrentUser = async (): Promise<CurrentUserResponse> => {
  const response = await axiosInstance.get("/api/user/me");
  return response.data;
};

type ApiResponse<T> =
  | T
  | {
      success?: boolean;
      message?: string;
      data?: T;
    };

const unwrapApiData = <T>(payload: ApiResponse<T>): T => {
  if (payload && typeof payload === "object" && "data" in payload) {
    return (payload as { data?: T }).data as T;
  }

  return payload as T;
};

export type MyPageProfile = {
  userId: string;
  userName: string;
  userEmail: string;
  userMbti: string;
  userIntroduce: string | null;
  userPhotoUrl: string | null;
  roleName: string;
  isOwner: boolean;
};

export type MyPageIntroducePayload = {
  userIntroduce: string;
};

export type MyPagePhotoResponse = {
  attachedName?: string;
  attachedUrl?: string;
  attachedSize?: number;
};

export const getMyPageProfile = async (
  targetUserId: string
): Promise<MyPageProfile> => {
  const response = await axiosInstance.get<ApiResponse<MyPageProfile>>(
    `/api/mypage/${targetUserId}`
  );

  return unwrapApiData(response.data);
};

export const updateMyPageIntroduce = async (
  payload: MyPageIntroducePayload
) => {
  const response = await axiosInstance.patch<ApiResponse<unknown>>(
    "/api/mypage/introduce",
    payload,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};

export const updateMyPagePhoto = async (
  file: File
): Promise<MyPagePhotoResponse> => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await axiosInstance.post<ApiResponse<MyPagePhotoResponse>>(
    "/api/mypage/photo",
    formData
  );

  return unwrapApiData(response.data);
};
