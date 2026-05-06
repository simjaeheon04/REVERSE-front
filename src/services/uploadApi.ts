import { axiosInstance } from "./axiosInstance";

export type R2Folder = "club" | "project" | "executive";

export const uploadImageToR2 = async (
  file: File,
  folder: R2Folder
): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("folder", folder);

  const response = await axiosInstance.post("/api/r2/upload", formData);

  return response.data;
};
