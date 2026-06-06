import { axiosInstance } from "./axiosInstance";

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
