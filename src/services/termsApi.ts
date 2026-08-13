import { axiosInstance } from "./axiosInstance";

export type TermsPayload = {
  title: string;
  contents: string;
  isCurrent: boolean;
  sortOrder: number;
  version: string;
  updatedBy: string;
};

export type TermsResponse = TermsPayload & {
  id: number;
};

export const getTermsList = async (): Promise<TermsResponse[]> => {
  const response = await axiosInstance.get("/api/terms");
  return response.data;
};

export const createTerms = async (
  payload: TermsPayload
): Promise<TermsResponse> => {
  const response = await axiosInstance.post("/api/terms", payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.data;
};

export const updateTerms = async (
  id: number | string,
  payload: TermsPayload
): Promise<TermsResponse> => {
  const response = await axiosInstance.put(`/api/terms/${id}`, payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.data;
};

export const deleteTerms = async (id: number | string) => {
  const response = await axiosInstance.delete(`/api/terms/${id}`);
  return response.data;
};
