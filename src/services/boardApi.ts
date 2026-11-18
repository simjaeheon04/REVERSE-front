import { AxiosError } from "axios";
import { axiosInstance } from "./axiosInstance";

export const getBoardErrorMessage = (error: unknown, fallback: string) => {
  if (!(error instanceof AxiosError)) {
    return error instanceof Error ? error.message : fallback;
  }

  const data: unknown = error.response?.data;
  const message = typeof data === "string"
    ? data.trim()
    : data && typeof data === "object" && "message" in data && typeof data.message === "string"
      ? data.message.trim()
      : "";
  const statusMessages: Record<number, string> = {
    400: "입력 내용을 확인해 주세요.",
    401: "로그인이 필요합니다. 다시 로그인해 주세요.",
    403: "게시판 접근 또는 변경 권한이 없습니다.",
    404: "해당 게시글 또는 게시판을 찾을 수 없습니다.",
    500: "서버 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.",
  };
  const statusMessage = statusMessages[error.response?.status ?? 0] ?? fallback;
  return message && message !== statusMessage ? `${statusMessage} ${message}` : statusMessage;
};

type ApiSuccessResponse<T> = {
  success?: boolean;
  status?: string;
  data: T;
  message?: string | null;
};

const unwrapApiData = <T>(payload: ApiSuccessResponse<T> | T): T => {
  if (
    payload &&
    typeof payload === "object" &&
    "data" in payload
  ) {
    return (payload as ApiSuccessResponse<T>).data;
  }

  return payload as T;
};

export type BoardType = "FREE" | "ACTIVITY" | "INFO" | "TRADE" | "QNA";
export type BoardSearchType = "TITLE" | "CONTENT" | "AUTHOR";

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
  content?: string;
  userId: string;
  author?: string;
  authorName?: string;
  writerName?: string;
  nickname?: string;
  createdAt: string;
  boardType?: BoardType;
  category?: BoardType | string;
  commentCount: number;
  likeCount: number;
  imageUrls: string[];
};

export type BoardPostListPage = {
  content: BoardPostListItem[];
  totalPages: number;
  totalElements: number;
  number: number;
};

export type BoardPostListParams = {
  boardType?: BoardType;
  searchType?: BoardSearchType;
  category?: string;
  type?: string;
  keyword?: string;
  page?: number;
  size?: number;
};

export type BoardPostListResult = {
  posts: BoardPostListItem[];
  currentPage: number;
  totalPages: number;
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
  title: string;
  content: string;
  imageUrls?: string[];
};

export type BoardPostCreatePayload = {
  title: string;
  content: string;
  category: string;
  imageUrls: string[];
  isPinned: boolean;
  isExternal: boolean;
};

export type BoardPostPayload = {
  title: string;
  content: string;
  boardType: BoardType;
};

export type BoardPostMutationResult = {
  status?: string;
  success?: boolean;
  message?: string;
  postId?: number;
};

export type AdminBoard = {
  boardId: number;
  boardName: string;
  boardDescription: string;
};

export type BoardCategory = AdminBoard;

export type AdminBoardPayload = {
  boardName: string;
  boardDescription: string;
};

export type BoardPostDetail = {
  id: number;
  boardId?: number | null;
  category?: string;
  title: string;
  content: string;
  userId: string;
  createdAt: string;
  modifiedAt: string | null;
  commentCount: number;
  likeCount: number;
  imageUrls: string[];
};

type RawBoardPostListItem = {
  id?: number;
  postId?: number;
  boardPostId?: number;
  postID?: number;
  post_id?: number;
  boardId?: number;
  boardID?: number;
  board_id?: number;
  title?: string;
  postTitle?: string;
  content?: string;
  postContents?: string;
  userId?: string;
  author?: string;
  authorName?: string;
  writerName?: string;
  nickname?: string;
  createdAt?: string;
  createdDate?: string;
  boardType?: BoardType;
  category?: BoardType | string;
  postCategory?: BoardType | string;
  commentCount?: number;
  postCommentCount?: number;
  likeCount?: number;
  postLikeCount?: number;
  imageUrls?: string[];
  fileUrls?: string[];
  attachmentUrls?: string[];
};

type RawBoardPostPage = {
  content?: RawBoardPostListItem[];
  posts?: RawBoardPostListItem[];
  list?: RawBoardPostListItem[];
  items?: RawBoardPostListItem[];
  totalPages?: number;
  totalPage?: number;
  totalElements?: number;
  number?: number;
  currentPage?: number;
  page?: number;
};

type BoardPostDetailRaw = RawBoardPostListItem & {
  modifiedAt?: string | null;
  modifiedDate?: string | null;
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

const getRawPostId = (post: RawBoardPostListItem) =>
  post.postId ?? post.boardPostId ?? post.postID ?? post.post_id ?? post.id ?? 0;

const normalizeBoardPostListItem = (
  post: RawBoardPostListItem,
  fallbackBoardId: number | null = null
): BoardPostListItem => {
  const normalizedPostId = getRawPostId(post);

  return {
    id: normalizedPostId,
    postId: normalizedPostId,
    boardId: post.boardId ?? post.boardID ?? post.board_id ?? fallbackBoardId,
    title: post.postTitle ?? post.title ?? "",
    content: post.postContents ?? post.content,
    userId: post.userId ?? "",
    author: post.author,
    authorName: post.authorName,
    writerName: post.writerName,
    nickname: post.nickname,
    createdAt: post.createdDate ?? post.createdAt ?? "",
    boardType: post.boardType,
    category: post.postCategory ?? post.category,
    commentCount: post.postCommentCount ?? post.commentCount ?? 0,
    likeCount: post.postLikeCount ?? post.likeCount ?? 0,
    imageUrls: post.imageUrls ?? post.fileUrls ?? post.attachmentUrls ?? [],
  };
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
    id: getRawPostId(post),
    boardId: post.boardId ?? post.boardID ?? post.board_id ?? null,
    category: post.category ?? post.postCategory,
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
  const response = await axiosInstance.get<ApiSuccessResponse<RawBoardPostPage> | RawBoardPostPage>(
    "/api/posts/board",
    {
      params: { page, size: 10 },
    }
  );

  const payload = unwrapApiData(response.data);
  const rawContent = Array.isArray(payload)
    ? payload
    : payload.content ?? payload.posts ?? payload.list ?? payload.items ?? [];
  const normalizedContent = rawContent.map(normalizeBoardPostListItem);

  return {
    content: normalizedContent,
    totalPages: Array.isArray(payload) ? 1 : payload.totalPages ?? payload.totalPage ?? 1,
    totalElements: Array.isArray(payload)
      ? payload.length
      : payload.totalElements ?? rawContent.length,
    number: Array.isArray(payload)
      ? page
      : payload.number ?? payload.currentPage ?? payload.page ?? page,
  };
};

export const getBoardPosts = async (
  params: BoardPostListParams = {}
): Promise<BoardPostListResult> => {
  const response = await axiosInstance.get<ApiSuccessResponse<RawBoardPostPage> | RawBoardPostPage>(
    "/api/posts",
    {
      params: {
        boardType: params.boardType,
        searchType: params.searchType,
        keyword: params.keyword,
        page: params.page,
        size: params.size,
      },
    }
  );

  const payload = unwrapApiData(response.data);
  const rawPosts = payload.content ?? payload.posts ?? payload.list ?? payload.items ?? [];

  return {
    posts: rawPosts.map(normalizeBoardPostListItem),
    currentPage: payload.currentPage ?? payload.page ?? payload.number ?? params.page ?? 1,
    totalPages: payload.totalPages ?? payload.totalPage ?? 1,
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
        category?: string;
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
        category?: string;
        postCategory?: string;
        isPinned?: boolean;
        isModified?: boolean;
        isExternal?: boolean;
      }>;
      totalPages?: number;
      totalElements?: number;
      number?: number;
    }
  >("/api/board/my/posts", {
    params: { page, size },
  });

  const payload = unwrapApiData(response.data);
  const rawContent = Array.isArray(payload.content) ? payload.content : [];

  return {
    content: rawContent.map((post) => ({
      id: post.postId ?? post.id ?? 0,
      boardId: post.boardId ?? 0,
      title: post.postTitle ?? post.title ?? "",
      content: post.postContents ?? post.content ?? "",
      userId: post.userId ?? "",
      createdAt: post.createdDate ?? post.createdAt ?? "",
      modifiedAt: post.modifiedDate ?? post.modifiedAt ?? null,
      commentCount: post.postCommentCount ?? post.commentCount ?? 0,
      likeCount: post.postLikeCount ?? post.likeCount ?? 0,
      category: post.postCategory ?? post.category ?? "",
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
  if (
    !payload ||
    typeof (payload.title ?? payload.postTitle) !== "string" ||
    typeof (payload.content ?? payload.postContents) !== "string" ||
    !Array.isArray(payload.imageUrls) ||
    payload.imageUrls.some((url) => typeof url !== "string")
  ) {
    throw new Error("게시글 상세 응답을 확인할 수 없습니다. 다시 조회해 주세요.");
  }
  const normalizedDetail = normalizeBoardPostDetail(payload);

  if (normalizedDetail.id !== Number(postId)) {
    throw new Error("요청한 게시글과 상세 응답이 일치하지 않습니다.");
  }

  return normalizedDetail;
};

export const getMultiBoardPosts = async (
  boardId: number | string,
  params: BoardPostListParams = {}
): Promise<BoardPostListPage> => {
  const normalizedBoardId = Number(boardId);
  const response = await axiosInstance.get<ApiSuccessResponse<RawBoardPostPage> | RawBoardPostPage>(
    `/api/board/${boardId}`,
    {
      params: {
        category: params.category,
        type: params.type,
        keyword: params.keyword,
        page: params.page,
      },
    }
  );

  const payload = unwrapApiData(response.data);
  const rawContent = payload.content ?? payload.posts ?? payload.list ?? payload.items ?? [];

  return {
    content: rawContent.map((post) =>
      normalizeBoardPostListItem(post, Number.isFinite(normalizedBoardId) ? normalizedBoardId : null)
    ),
    totalPages: payload.totalPages ?? payload.totalPage ?? 0,
    totalElements: payload.totalElements ?? rawContent.length,
    number: payload.number ?? payload.currentPage ?? payload.page ?? params.page ?? 0,
  };
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

export const updateBoardComment = async (
  commentId: number | string,
  payload: BoardCommentPayload
): Promise<BoardComment | BoardPostMutationResult> => {
  const response = await axiosInstance.put<
    ApiSuccessResponse<BoardComment | BoardPostMutationResult> | BoardComment | BoardPostMutationResult
  >(`/api/posts/board/comments/${commentId}`, payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return unwrapApiData(response.data);
};

export const deleteBoardComment = async (
  commentId: number | string
): Promise<BoardPostMutationResult> => {
  const response = await axiosInstance.delete<
    ApiSuccessResponse<BoardPostMutationResult> | BoardPostMutationResult
  >(`/api/posts/board/comments/${commentId}`);

  return unwrapApiData(response.data);
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

type RawAdminBoard = {
  id?: number;
  boardId?: number;
  name?: string;
  boardName?: string;
  description?: string;
  boardDescription?: string;
};

const normalizeAdminBoard = (board: RawAdminBoard): AdminBoard => ({
  boardId: board.boardId ?? board.id ?? 0,
  boardName: board.boardName ?? board.name ?? "",
  boardDescription: board.boardDescription ?? board.description ?? "",
});

export const deleteAdminPost = async (
  postId: number | string
): Promise<BoardPostMutationResult> => {
  const response = await axiosInstance.delete<ApiSuccessResponse<null>>(
    `/api/admin/posts/${postId}`
  );

  if ("data" in response.data && ("success" in response.data || "status" in response.data)) {
    return {
      success: response.data.success,
      status: response.data.status,
      message: response.data.message ?? undefined,
    };
  }

  return {
    message: undefined,
  };
};

export const getAdminBoards = async (): Promise<AdminBoard[]> => {
  const response = await axiosInstance.get<ApiSuccessResponse<RawAdminBoard[]> | RawAdminBoard[]>(
    "/api/admin/boards"
  );

  const payload = unwrapApiData(response.data);
  return Array.isArray(payload)
    ? payload.map(normalizeAdminBoard).filter((board) => board.boardId && board.boardName)
    : [];
};

export const getBoardCategories = async (): Promise<BoardCategory[]> => {
  const response = await axiosInstance.get<ApiSuccessResponse<RawAdminBoard[]> | RawAdminBoard[]>(
    "/api/posts/board/categories"
  );

  const payload = unwrapApiData(response.data);

  return Array.isArray(payload)
    ? payload.map(normalizeAdminBoard).filter((board) => board.boardId && board.boardName)
    : [];
};

export const getAvailableBoards = async (): Promise<AdminBoard[]> => {
  try {
    return await getBoardCategories();
  } catch (error) {
    console.warn("[board] category list unavailable, falling back to post list", error);
  }

  const postPage = await getBoardPostList(0);
  const boardMap = new Map<number, AdminBoard>();

  postPage.content.forEach((post) => {
    if (!post.boardId || boardMap.has(post.boardId)) {
      return;
    }

    const boardName =
      typeof post.category === "string" && post.category.trim()
        ? post.category
        : post.boardType ?? `게시판 ${post.boardId}`;

    boardMap.set(post.boardId, {
      boardId: post.boardId,
      boardName,
      boardDescription: "",
    });
  });

  return Array.from(boardMap.values());
};

export const getAllBoardPosts = async (page = 0): Promise<BoardPostListPage> => {
  return getBoardPostList(page);
};

export const createAdminBoard = async (
  payload: AdminBoardPayload
): Promise<AdminBoard> => {
  const response = await axiosInstance.post<ApiSuccessResponse<RawAdminBoard> | RawAdminBoard>(
    "/api/admin/boards",
    payload,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return normalizeAdminBoard(unwrapApiData(response.data));
};

export const deleteAdminBoard = async (
  boardId: number | string
): Promise<BoardPostMutationResult> => {
  const response = await axiosInstance.delete<ApiSuccessResponse<null>>(
    `/api/admin/boards/${boardId}`
  );

  return {
    success: response.data.success,
    status: response.data.status,
    message: response.data.message ?? undefined,
  };
};

export async function createBoardPost(
  payload: BoardPostPayload
): Promise<ApiSuccessResponse<{ postId: number }>>;
export async function createBoardPost(
  boardId: number | string,
  payload: BoardPostCreatePayload
): Promise<BoardPostMutationResult>;
export async function createBoardPost(
  first: BoardPostPayload | number | string,
  second?: BoardPostCreatePayload
): Promise<ApiSuccessResponse<{ postId: number }> | BoardPostMutationResult> {
  if (typeof first === "object") {
    const response = await axiosInstance.post<ApiSuccessResponse<{ postId: number }>>(
      "/api/posts",
      first,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  }

  const response = await axiosInstance.post<
    ApiSuccessResponse<BoardPostMutationResult> | BoardPostMutationResult
  >(`/api/board/${first}`, second, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return unwrapApiData(response.data);
}
