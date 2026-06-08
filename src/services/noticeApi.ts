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
  postId?: number;
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

type RawNoticeListItem = Partial<NoticeListItem> & {
  postId?: number;
  isExternal?: boolean | string | number;
};

type RawNoticeListPage = Omit<NoticeListPage, "content"> & {
  content: RawNoticeListItem[];
};

export type NoticeDetail = {
  id: number;
  postId?: number;
  title: string;
  content: string;
  createdAt: string;
  userId: string;
  category: NoticeCategory;
  isExternal: boolean;
  imageUrls: string[];
  isPinned?: boolean;
};

type RawNoticeDetail = Partial<NoticeDetail> & {
  postId?: number;
  isExternal?: boolean | string | number;
};

const normalizeBoolean = (value: unknown) => {
  if (typeof value === "boolean") {
    return value;
  }

  if (typeof value === "string") {
    return value.toLowerCase() === "true";
  }

  return Boolean(value);
};

export type Notice = NoticeDetail;

export type NoticeListParams = {
  category?: string;
  page?: number;
};

export type NoticeUpsertPayload = {
  postId?: number;
  title: string;
  content: string;
  isPinned: boolean;
  isExternal: boolean;
  category: string;
  imageUrls: string[];
};

export type NoticePayload = {
  postId?: number;
  title: string;
  content: string;
  isPinned: boolean;
};

export type NoticeUpsertResult = {
  postId: number;
};

export type NoticeDeleteResult = {
  postId: number;
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
  const requestParams = {
    category: params.category?.trim() || "전체",
    page: params.page ?? 0,
  };

  console.log("[notice/list] request", {
    url: "/api/notices",
    params: requestParams,
  });

  const response = await axiosInstance.get<ApiSuccessResponse<RawNoticeListPage>>(
    "/api/notices",
    {
      params: requestParams,
    }
  );

  console.log("[notice/list] response", response.data);

  return {
    ...response.data.data,
    content: response.data.data.content.map((notice) => ({
      id: notice.id ?? notice.postId ?? 0,
      postId: notice.postId ?? notice.id,
      title: notice.title ?? "",
      createdAt: notice.createdAt ?? "",
      userId: notice.userId ?? "",
      category: notice.category ?? "",
      isExternal: normalizeBoolean(notice.isExternal),
    })),
  };
};

export const getNoticeDetail = async (
  noticeId: number | string,
  options: { requiresAuth?: boolean } = {}
): Promise<NoticeDetail> => {
  console.log("[notice/detail] request", {
    url: `/api/notices/${noticeId}`,
    noticeId,
    requiresAuth: Boolean(options.requiresAuth),
  });

  const response = await axiosInstance.get<ApiSuccessResponse<RawNoticeDetail>>(
    `/api/notices/${noticeId}`,
    {
      headers: options.requiresAuth
        ? {
            "X-Require-Auth": "true",
          }
        : undefined,
    }
  );

  console.log("[notice/detail] response", response.data);

  const notice = response.data.data;

  return {
    id: notice.id ?? notice.postId ?? Number(noticeId),
    postId: notice.postId ?? notice.id,
    title: notice.title ?? "",
    content: notice.content ?? "",
    createdAt: notice.createdAt ?? "",
    userId: notice.userId ?? "",
    category: notice.category ?? "",
    isExternal: normalizeBoolean(notice.isExternal),
    imageUrls: Array.isArray(notice.imageUrls) ? notice.imageUrls : [],
    isPinned: notice.isPinned,
  };
};

export const saveNotice = async (
  payload: NoticeUpsertPayload
): Promise<NoticeUpsertResult> => {
  console.log("[notice/save] request", {
    url: "/api/posts/notices",
    payload,
  });

  const response = await axiosInstance.post<ApiSuccessResponse<NoticeUpsertResult>>(
    "/api/posts/notices",
    payload,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  console.log("[notice/save] response", response.data);

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
