import { axiosInstance } from "./axiosInstance";

type ApiSuccessResponse<T> = {
  success: true;
  data: T;
  message?: string;
};

export type NoticeListItem = {
  id: number;
  title: string;
  createdAt: string;
};

export type NoticeDetail = {
  id: number;
  title: string;
  content: string;
  createdAt: string;
};

export type NoticeUpsertPayload = {
  title: string;
  content: string;
  isPinned: boolean;
  noticeId?: number;
};

export type NoticeUpsertResult = {
  noticeId: number;
};

export type NoticeDeleteResult = {
  noticeId: number;
};

export const getNoticeList = async (): Promise<NoticeListItem[]> => {
  const response =
    await axiosInstance.get<ApiSuccessResponse<NoticeListItem[]>>("/api/notices");

  return response.data.data;
};

export const getNoticeDetail = async (
  noticeId: number | string
): Promise<NoticeDetail> => {
  const response = await axiosInstance.get<ApiSuccessResponse<NoticeDetail>>(
    `/api/notices/${noticeId}`
  );

  return response.data.data;
};

export const saveNotice = async (
  payload: NoticeUpsertPayload
): Promise<NoticeUpsertResult> => {
  const response = await axiosInstance.post<ApiSuccessResponse<NoticeUpsertResult>>(
    "/api/posts/notices",
    payload,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data.data;
};

export const deleteNotice = async (
  noticeId: number | string
): Promise<NoticeDeleteResult> => {
  const response = await axiosInstance.delete<ApiSuccessResponse<NoticeDeleteResult>>(
    `/api/posts/notices/${noticeId}`
  );

  return response.data.data;
};
