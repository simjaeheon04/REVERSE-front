import { axiosInstance } from "./axiosInstance";

type ApiSuccessResponse<T> = {
  success: boolean;
  data: T;
  message?: string | null;
};

const unwrapApiData = <T>(payload: ApiSuccessResponse<T> | T): T => {
  if (
    payload &&
    typeof payload === "object" &&
    "data" in payload &&
    "success" in payload
  ) {
    return (payload as ApiSuccessResponse<T>).data;
  }

  return payload as T;
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
  postId: number;
  boardId: number | null;
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

export type BoardMyStats = {
  postCount: number;
  totalLikes: number;
};

export type BoardMyPostItem = {
  id: number;
  boardId: number;
  title: string;
  content: string;
  userId: string;
  createdAt: string;
  modifiedAt: string | null;
  commentCount: number;
  likeCount: number;
  category: string;
  isPinned: boolean;
  isModified: boolean;
  isExternal: boolean;
};

export type BoardMyPostPage = {
  content: BoardMyPostItem[];
  totalPages: number;
  totalElements: number;
  number: number;
};

export type BoardPostMutationPayload = {
  title?: string;
  content?: string;
};

export type BoardPostCreatePayload = {
  title: string;
  content: string;
  category: string;
  imageUrls: string[];
  isPinned: boolean;
  isExternal: boolean;
};

export type BoardPostMutationResult = {
  status?: string;
  message?: string;
  postId?: number;
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

type BoardPostDetailRaw = {
  id?: number;
  postId?: number;
  boardId?: number;
  title?: string;
  postTitle?: string;
  content?: string;
  postContents?: string;
  userId?: string;
  createdAt?: string;
  createdDate?: string;
  modifiedAt?: string | null;
  modifiedDate?: string | null;
  commentCount?: number;
  postCommentCount?: number;
  likeCount?: number;
  postLikeCount?: number;
  imageUrls?: string[];
  fileUrls?: string[];
  attachmentUrls?: string[];
  attachments?: Array<
    | string
    | {
        url?: string;
        fileUrl?: string;
        imageUrl?: string;
        attachmentUrl?: string;
      }
  >;
};

const normalizeBoardPostDetail = (post: BoardPostDetailRaw): BoardPostDetail => {
  const attachmentUrls =
    post.imageUrls ??
    post.fileUrls ??
    post.attachmentUrls ??
    post.attachments
      ?.map((attachment) => {
        if (typeof attachment === "string") {
          return attachment;
        }

        return attachment.url ?? attachment.fileUrl ?? attachment.imageUrl ?? attachment.attachmentUrl ?? "";
      })
      .filter(Boolean) ??
    [];

  return {
    id: post.postId ?? post.id ?? post.boardId ?? 0,
    title: post.postTitle ?? post.title ?? "",
    content: post.postContents ?? post.content ?? "",
    userId: post.userId ?? "",
    createdAt: post.createdDate ?? post.createdAt ?? "",
    modifiedAt: post.modifiedDate ?? post.modifiedAt ?? null,
    commentCount: post.postCommentCount ?? post.commentCount ?? 0,
    likeCount: post.postLikeCount ?? post.likeCount ?? 0,
    imageUrls: attachmentUrls,
  };
};

export const getBoardPostList = async (page = 0): Promise<BoardPostListPage> => {
  const response = await axiosInstance.get<
    ApiSuccessResponse<{
      content?: Array<{
        id?: number;
        postId?: number;
        boardId?: number;
        title?: string;
        postTitle?: string;
        userId?: string;
        createdAt?: string;
        createdDate?: string;
        commentCount?: number;
        postCommentCount?: number;
        likeCount?: number;
        postLikeCount?: number;
      }>;
      totalPages?: number;
      totalElements?: number;
      number?: number;
    }> | {
      content?: Array<{
        id?: number;
        postId?: number;
        boardId?: number;
        title?: string;
        postTitle?: string;
        userId?: string;
        createdAt?: string;
        createdDate?: string;
        commentCount?: number;
        postCommentCount?: number;
        likeCount?: number;
        postLikeCount?: number;
      }>;
      totalPages?: number;
      totalElements?: number;
      number?: number;
    }
  >("/api/posts/board", {
    params: { page },
  });

  const payload = unwrapApiData(response.data);
  const rawContent = Array.isArray(payload.content) ? payload.content : [];

  return {
    content: rawContent.map((post) => ({
      id: post.id ?? post.postId ?? 0,
      postId: post.postId ?? post.id ?? 0,
      boardId: post.boardId ?? null,
      title: post.postTitle ?? post.title ?? "",
      userId: post.userId ?? "",
      createdAt: post.createdDate ?? post.createdAt ?? "",
      commentCount: post.postCommentCount ?? post.commentCount ?? 0,
      likeCount: post.postLikeCount ?? post.likeCount ?? 0,
    })),
    totalPages: payload.totalPages ?? 0,
    totalElements: payload.totalElements ?? 0,
    number: payload.number ?? 0,
  };
};

export const getMyBoardStats = async (): Promise<BoardMyStats> => {
  const response = await axiosInstance.get<ApiSuccessResponse<BoardMyStats> | BoardMyStats>(
    "/api/board/my/stats"
  );

  return unwrapApiData(response.data);
};

export const getMyBoardPosts = async (
  page = 0,
  size = 10
): Promise<BoardMyPostPage> => {
  const response = await axiosInstance.get<
    ApiSuccessResponse<{
      content?: Array<{
        postId?: number;
        boardId?: number;
        postTitle?: string;
        postContents?: string;
        userId?: string;
        createdDate?: string;
        modifiedDate?: string | null;
        postCommentCount?: number;
        postLikeCount?: number;
        postCategory?: string;
        isPinned?: boolean;
        isModified?: boolean;
        isExternal?: boolean;
      }>;
      totalPages?: number;
      totalElements?: number;
      number?: number;
    }> | {
      content?: Array<{
        postId?: number;
        boardId?: number;
        postTitle?: string;
        postContents?: string;
        userId?: string;
        createdDate?: string;
        modifiedDate?: string | null;
        postCommentCount?: number;
        postLikeCount?: number;
        postCategory?: string;
        isPinned?: boolean;
        isModified?: boolean;
        isExternal?: boolean;
      }>;
      totalPages?: number;
      totalElements?: number;
      number?: number;
    }
  >(
    "/api/board/my/posts",
    {
      params: { page, size },
    }
  );

  const payload = unwrapApiData(response.data);
  const rawContent = Array.isArray(payload.content) ? payload.content : [];

  return {
    content: rawContent.map((post) => ({
      id: post.postId ?? 0,
      boardId: post.boardId ?? 0,
      title: post.postTitle ?? "",
      content: post.postContents ?? "",
      userId: post.userId ?? "",
      createdAt: post.createdDate ?? "",
      modifiedAt: post.modifiedDate ?? null,
      commentCount: post.postCommentCount ?? 0,
      likeCount: post.postLikeCount ?? 0,
      category: post.postCategory ?? "",
      isPinned: Boolean(post.isPinned),
      isModified: Boolean(post.isModified),
      isExternal: Boolean(post.isExternal),
    })),
    totalPages: payload.totalPages ?? 0,
    totalElements: payload.totalElements ?? 0,
    number: payload.number ?? 0,
  };
};

export const getBoardPostDetail = async (
  postId: number | string
): Promise<BoardPostDetail> => {
  const response = await axiosInstance.get<ApiSuccessResponse<BoardPostDetailRaw> | BoardPostDetailRaw>(
    `/api/posts/board/${postId}`
  );
  const payload = unwrapApiData(response.data);
  const normalized = normalizeBoardPostDetail(payload);

  console.log("[board/detail] raw response", response.data);
  console.log("[board/detail] normalized", normalized);

  return normalized;
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

export const updateBoardPost = async (
  postId: number | string,
  payload: BoardPostMutationPayload
): Promise<BoardPostMutationResult> => {
  const response = await axiosInstance.patch<
    ApiSuccessResponse<BoardPostMutationResult> | BoardPostMutationResult
  >(`/api/board/post/${postId}`, payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return unwrapApiData(response.data);
};

export const deleteBoardPost = async (
  postId: number | string
): Promise<BoardPostMutationResult> => {
  const response = await axiosInstance.delete<
    ApiSuccessResponse<BoardPostMutationResult> | BoardPostMutationResult
  >(`/api/board/post/${postId}`);

  return unwrapApiData(response.data);
};

export const createBoardPost = async (
  boardId: number | string,
  payload: BoardPostCreatePayload
): Promise<BoardPostMutationResult> => {
  const response = await axiosInstance.post<
    ApiSuccessResponse<BoardPostMutationResult> | BoardPostMutationResult
  >(`/api/board/${boardId}`, payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return unwrapApiData(response.data);
};
