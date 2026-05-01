import { axiosInstance } from "./axiosInstance";

export type ClubIntroPayload = {
  title: string;
  subTitle: string;
  bannerUrl: string;
  isActive: boolean;
  updatedBy: string;
};

export type ClubIntroResponse = ClubIntroPayload & {
  clubIntroId?: number;
  id?: number;
  createdAt?: string;
  updatedAt?: string;
  createdDate?: string;
  modifiedDate?: string;
};

export const getClubIntroList = async (): Promise<ClubIntroResponse[]> => {
  const response = await axiosInstance.get("/api/club-intro");
  return response.data;
};

export const createClubIntro = async (
  payload: ClubIntroPayload
): Promise<ClubIntroResponse> => {
  const response = await axiosInstance.post("/api/club-intro", payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.data;
};

export const uploadClubIntroImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await axiosInstance.post("/api/club-intro/image", formData, {
    responseType: "text",
  });

  return response.data;
};

export const updateClubIntroImage = async (
  id: number | string,
  file: File
): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await axiosInstance.put(
    `/api/club-intro/${id}/image`,
    formData,
    {
      responseType: "text",
    }
  );

  return response.data;
};

export const updateClubIntro = async (
  id: number | string,
  payload: ClubIntroPayload
): Promise<ClubIntroResponse> => {
  const response = await axiosInstance.put(`/api/club-intro/${id}`, payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.data;
};

export const deleteClubIntro = async (id: number | string) => {
  const response = await axiosInstance.delete(`/api/club-intro/${id}`);
  return response.data;
};
