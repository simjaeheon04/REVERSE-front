import { axiosInstance } from "./axiosInstance";

export type OfficerPayload = {
  name: string;
  generation: number;
  role: string;
  department: string;
  email: string;
  photoUrl: string;
  sortOrder: number;
  isVisible: boolean;
  updatedBy: string;
};

export type OfficerResponse = OfficerPayload & {
  officerId?: number;
  id?: number;
  createdDate?: string;
  modifiedDate?: string;
  createdAt?: string;
  updatedAt?: string;
};

const extractImageUrl = (data: unknown): string => {
  if (typeof data === "string") return data;
  if (data && typeof data === "object") {
    const record = data as Record<string, unknown>;

    if (typeof record.url === "string") return record.url;
    if (typeof record.photoUrl === "string") return record.photoUrl;
    if (typeof record.imageUrl === "string") return record.imageUrl;
    if (typeof record.data === "string") return record.data;
  }

  throw new Error("Unable to resolve uploaded officer image URL from response.");
};

export const uploadOfficerImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await axiosInstance.post("/api/officer/image", formData, {
    responseType: "text",
  });
  return extractImageUrl(response.data);
};

export const updateOfficerImage = async (
  id: number | string,
  file: File
): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await axiosInstance.put(`/api/officer/${id}/image`, formData, {
    responseType: "text",
  });
  return extractImageUrl(response.data);
};

export const createOfficer = async (
  payload: OfficerPayload
): Promise<OfficerResponse> => {
  const response = await axiosInstance.post("/api/officer", payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.data;
};

export const getOfficerList = async (): Promise<OfficerResponse[]> => {
  const response = await axiosInstance.get("/api/officer");
  return response.data;
};

export const updateOfficer = async (
  id: number | string,
  payload: OfficerPayload
): Promise<OfficerResponse> => {
  const response = await axiosInstance.put(`/api/officer/${id}`, payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.data;
};

export const deleteOfficer = async (id: number | string) => {
  const response = await axiosInstance.delete(`/api/officer/${id}`);
  return response.data;
};
