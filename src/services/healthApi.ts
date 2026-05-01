import { axiosInstance } from "./axiosInstance";

export const checkServerStatus = async (): Promise<string> => {
  const response = await axiosInstance.get("/test", {
    responseType: "text",
  });

  return response.data;
};
