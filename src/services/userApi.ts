import { axiosInstance } from "./axiosInstance";
import { uploadImageToR2 } from "./uploadApi";

export type CurrentUserResponse = {
  userId: string;
  userName: string;
  roleName: string;
};

export type AdminUserMutationResponse = {
  status?: string;
  message?: string;
};

export type AdminUserRoleId = 1 | 2 | 3 | 4 | 5;

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

export const updateAdminUserRole = async (
  targetUserId: string,
  roleId: AdminUserRoleId
): Promise<AdminUserMutationResponse> => {
  const requestBody = { roleId: Number(roleId) };

  console.log("[admin/users/role] request body", requestBody);

  const response = await axiosInstance.patch(
    `/api/admin/users/${encodeURIComponent(targetUserId)}/role`,
    requestBody,
    {
      headers: {
        "Content-Type": "application/json",
        "X-Require-Auth": "true",
      },
    }
  );
  return response.data;
};

export const deleteAdminUser = async (
  targetUserId: string
): Promise<AdminUserMutationResponse> => {
  const response = await axiosInstance.delete(
    `/api/admin/users/${encodeURIComponent(targetUserId)}`,
    {
      headers: {
        "X-Require-Auth": "true",
      },
    }
  );
  return response.data;
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

export type MyPagePhotoPayload = {
  attachedName: string;
  attachedUrl: string;
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
  const attachedUrl = await uploadImageToR2(file, "profile");
  const attachedName = decodeURIComponent(
    attachedUrl.split("/").pop() || file.name
  );
  const payload: MyPagePhotoPayload = {
    attachedName,
    attachedUrl,
    attachedSize: file.size,
  };

  const response = await axiosInstance.post<ApiResponse<MyPagePhotoResponse>>(
    "/api/mypage/photo",
    payload,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const result = unwrapApiData(response.data);

  return {
    attachedName: result?.attachedName ?? attachedName,
    attachedUrl: result?.attachedUrl ?? attachedUrl,
    attachedSize: result?.attachedSize ?? file.size,
  };
};
