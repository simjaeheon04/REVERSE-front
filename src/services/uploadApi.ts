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

  console.log("[board/file] upload request", {
    url: "/api/posts/board/file",
    key: "file",
    fileName: file.name,
    fileType: file.type,
    fileSize: file.size,
  });

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

  const uploadedUrl = String(response.data).trim();

  console.log("[board/file] upload response", {
    url: uploadedUrl,
  });

  return uploadedUrl;
};

export const deleteR2File = async (fileUrl: string): Promise<string> => {
  const response = await axiosInstance.delete<string>("/api/r2/delete", {
    params: { fileUrl },
    responseType: "text",
  });

  return response.data;
};
