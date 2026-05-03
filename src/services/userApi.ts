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
