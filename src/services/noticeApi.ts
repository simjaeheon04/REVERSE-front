import { axiosInstance } from "./axiosInstance";

type ApiSuccessResponse<T> = {
  success?: boolean;
  status?: string;
  message?: string | null;
  data: T;
};

export const NOTICE_CATEGORIES = ["전체", "동아리 활동", "대외활동"] as const;

export type NoticeCategory = (typeof NOTICE_CATEGORIES)[number] | string;

export type NoticeListItem = {
  id: number;
  title: string;
  createdAt: string;
  userId: string;
  category: NoticeCategory;
  isExternal: boolean;
};

export type NoticeListPage = {
  content: NoticeListItem[];
  totalPages: number;
  totalElements: number;
  number: number;
  size: number;
};

export type NoticeDetail = {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  userId: string;
  category: NoticeCategory;
  isExternal: boolean;
  imageUrls: string[];
  isPinned?: boolean;
};

export type Notice = NoticeDetail;

export type NoticeListParams = {
  category?: string;
  page?: number;
};

export type NoticeUpsertPayload = {
  title: string;
  content: string;
  isPinned: boolean;
  isExternal: boolean;
  category: string;
  imageUrls: string[];
  noticeId?: number;
};

export type NoticePayload = {
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

export const uploadNoticeImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await axiosInstance.post("/api/notices/image", formData, {
    responseType: "text",
  });

  return response.data;
};

export const getNoticeList = async (
  params: NoticeListParams = {}
): Promise<NoticeListPage> => {
  const response = await axiosInstance.get<ApiSuccessResponse<NoticeListPage>>(
    "/api/notices",
    {
      params: {
        category: params.category?.trim() || "전체",
        page: params.page ?? 0,
      },
    }
  );

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

export const createNotice = async (
  payload: NoticePayload
): Promise<ApiSuccessResponse<NoticeUpsertResult>> => {
  const response = await axiosInstance.post<ApiSuccessResponse<NoticeUpsertResult>>(
    "/api/posts/notices",
    payload,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};

export const deleteNotice = async (
  noticeId: number | string
): Promise<NoticeDeleteResult> => {
  const response = await axiosInstance.delete<ApiSuccessResponse<NoticeDeleteResult>>(
    `/api/posts/notices/${noticeId}`
  );

  return response.data.data;
};
