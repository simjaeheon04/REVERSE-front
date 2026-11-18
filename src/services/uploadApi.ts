import { axiosInstance } from "./axiosInstance";

export type R2Folder = "club" | "project" | "executive" | "board" | "profile";

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

export const uploadBoardFile = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await axiosInstance.post<string>(
    "/api/posts/board/file",
    formData,
    {
      headers: {
        Accept: "text/plain, application/json",
        "X-Require-Auth": "true",
      },
      responseType: "text",
    }
  );

  let uploadedUrl: unknown = response.data;
  if (typeof uploadedUrl === "string" && uploadedUrl.trim().startsWith('"')) {
    uploadedUrl = JSON.parse(uploadedUrl);
  }
  if (typeof uploadedUrl !== "string") {
    throw new Error("파일 업로드 응답에 URL이 없습니다.");
  }
  const normalizedUrl = uploadedUrl.trim();
  const url = new URL(normalizedUrl);
  if (url.protocol !== "https:" && url.protocol !== "http:") {
    throw new Error("파일 업로드 응답의 URL이 올바르지 않습니다.");
  }

  return normalizedUrl;
};

export const deleteR2File = async (fileUrl: string): Promise<string> => {
  const response = await axiosInstance.delete<string>("/api/r2/delete", {
    params: { fileUrl },
    responseType: "text",
  });

  return response.data;
};
