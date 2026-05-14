import { axiosInstance } from "./axiosInstance";

type ApiSuccessResponse<T> = {
  success: boolean;
  data: T;
  message?: string | null;
};

export type BoardComment = {
  commentId: number;
  userId: string;
  commentDetail: string;
  parentCommentId: number | null;
  createdAt: string;
  modifiedAt: string | null;
  replies: BoardComment[];
};

export type BoardCommentPayload = {
  commentDetail: string;
};

export type BoardPostListItem = {
  id: number;
  title: string;
  userId: string;
  createdAt: string;
  commentCount: number;
  likeCount: number;
};

export type BoardPostListPage = {
  content: BoardPostListItem[];
  totalPages: number;
  totalElements: number;
  number: number;
};

export type BoardPostDetail = {
  id: number;
  title: string;
  content: string;
  userId: string;
  createdAt: string;
  modifiedAt: string | null;
  commentCount: number;
  likeCount: number;
  imageUrls: string[];
};

export const getBoardPostList = async (page = 0): Promise<BoardPostListPage> => {
  const response = await axiosInstance.get<ApiSuccessResponse<BoardPostListPage>>(
    "/api/posts/board",
    {
      params: { page },
    }
  );

  return response.data.data;
};

export const getBoardPostDetail = async (
  postId: number | string
): Promise<BoardPostDetail> => {
  const response = await axiosInstance.get<ApiSuccessResponse<BoardPostDetail>>(
    `/api/posts/board/${postId}`
  );

  return response.data.data;
};

export const getBoardComments = async (
  postId: number | string
): Promise<BoardComment[]> => {
  const response = await axiosInstance.get<ApiSuccessResponse<BoardComment[]>>(
    `/api/posts/board/${postId}/comments`
  );

  return Array.isArray(response.data.data) ? response.data.data : [];
};

export const createBoardComment = async (
  postId: number | string,
  payload: BoardCommentPayload
): Promise<BoardComment> => {
  const response = await axiosInstance.post<ApiSuccessResponse<BoardComment>>(
    `/api/posts/board/${postId}/comments`,
    payload,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data.data;
};

export const createBoardReply = async (
  postId: number | string,
  commentId: number | string,
  payload: BoardCommentPayload
): Promise<BoardComment> => {
  const response = await axiosInstance.post<ApiSuccessResponse<BoardComment>>(
    `/api/posts/board/${postId}/comments/${commentId}/reply`,
    payload,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data.data;
};

export const toggleBoardLike = async (postId: number | string): Promise<boolean> => {
  const response = await axiosInstance.post<ApiSuccessResponse<boolean>>(
    `/api/posts/board/${postId}/like`
  );

  return response.data.data;
};
