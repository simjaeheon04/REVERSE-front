import { axiosInstance } from "./axiosInstance";

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

export type StudyCreatePayload = {
  title: string;
  content: string;
  maxMembers: number;
};

export type StudyPostCreatePayload = {
  title: string;
  content: string;
  files?: File[];
};

export type StudyPostUpdatePayload = {
  title?: string;
  content?: string;
};

export type StudyMemberStatusPayload = {
  status: "approved" | "rejected";
};

export type StudyAdminReasonPayload = {
  reason?: string;
};

export const createStudyRecruitment = async (
  payload: StudyCreatePayload
): Promise<unknown> => {
  const response = await axiosInstance.post<ApiResponse<unknown>>("/api/studies", payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return unwrapApiData(response.data);
};

export const deleteStudyRecruitment = async (studyId: number | string) => {
  const response = await axiosInstance.delete(`/api/studies/${studyId}`);

  return response.data;
};

export const createStudyPost = async (
  studyId: number | string,
  payload: StudyPostCreatePayload
): Promise<unknown> => {
  const formData = new FormData();
  formData.append("title", payload.title);
  formData.append("content", payload.content);
  payload.files?.forEach((file) => formData.append("files", file));

  const response = await axiosInstance.post<ApiResponse<unknown>>(
    `/api/studies/${studyId}/posts`,
    formData
  );

  return unwrapApiData(response.data);
};

export const updateStudyPost = async (
  studyId: number | string,
  postId: number | string,
  payload: StudyPostUpdatePayload
): Promise<unknown> => {
  const response = await axiosInstance.patch<ApiResponse<unknown>>(
    `/api/studies/${studyId}/posts/${postId}`,
    payload,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return unwrapApiData(response.data);
};

export const deleteStudyPost = async (
  studyId: number | string,
  postId: number | string
) => {
  const response = await axiosInstance.delete(`/api/studies/${studyId}/posts/${postId}`);

  return response.data;
};

export const applyStudy = async (studyId: number | string): Promise<unknown> => {
  const response = await axiosInstance.post<ApiResponse<unknown>>(
    `/api/studies/${studyId}/apply`
  );

  return unwrapApiData(response.data);
};

export const updateStudyMemberStatus = async (
  studyId: number | string,
  userId: number | string,
  payload: StudyMemberStatusPayload
): Promise<unknown> => {
  const response = await axiosInstance.patch<ApiResponse<unknown>>(
    `/api/studies/${studyId}/members/${userId}`,
    payload,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return unwrapApiData(response.data);
};

export const forceEndStudy = async (
  studyId: number | string,
  payload: StudyAdminReasonPayload
) => {
  const response = await axiosInstance.delete(`/api/admin/studies/${studyId}`, {
    data: payload,
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.data;
};

export const kickStudyMember = async (
  studyId: number | string,
  memberId: number | string,
  payload: StudyAdminReasonPayload
) => {
  const response = await axiosInstance.delete(
    `/api/admin/studies/${studyId}/members/${memberId}`,
    {
      data: payload,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};
