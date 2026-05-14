import { axiosInstance } from "./axiosInstance";

export type BoardType = "FREE" | "ACTIVITY" | "INFO" | "TRADE" | "QNA";
export type BoardSearchType = "TITLE" | "CONTENT" | "AUTHOR";

export interface BoardPostListItem {
  postId?: number;
  id?: number;
  title: string;
  content?: string;
  boardType?: BoardType;
  category?: BoardType;
  author?: string;
  authorName?: string;
  writerName?: string;
  nickname?: string;
  createdAt: string;
}

export interface BoardPostPayload {
  title: string;
  content: string;
  boardType: BoardType;
}

export interface BoardPostListParams {
  boardType?: BoardType;
  searchType?: BoardSearchType;
  keyword?: string;
  page?: number;
  size?: number;
}

export interface BoardPostListResult {
  posts: BoardPostListItem[];
  currentPage: number;
  totalPages: number;
}

interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

interface BoardPostPageData {
  content?: BoardPostListItem[];
  posts?: BoardPostListItem[];
  list?: BoardPostListItem[];
  items?: BoardPostListItem[];
  currentPage?: number;
  page?: number;
  totalPages?: number;
  totalPage?: number;
}

type BoardPostData = BoardPostListItem[] | BoardPostPageData;

const normalizePostList = (
  data: BoardPostData,
  fallbackPage: number
): BoardPostListResult => {
  if (Array.isArray(data)) {
    return {
      posts: data,
      currentPage: fallbackPage,
      totalPages: 1,
    };
  }

  const posts = data.content ?? data.posts ?? data.list ?? data.items ?? [];

  return {
    posts,
    currentPage: data.currentPage ?? data.page ?? fallbackPage,
    totalPages: data.totalPages ?? data.totalPage ?? 1,
  };
};

export const getBoardPosts = async (
  params: BoardPostListParams = {}
): Promise<BoardPostListResult> => {
  const response = await axiosInstance.get<ApiResponse<BoardPostData>>(
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

  return normalizePostList(response.data.data, params.page ?? 1);
};

export const createBoardPost = async (payload: BoardPostPayload) => {
  const response = await axiosInstance.post<ApiResponse<{ postId: number }>>(
    "/api/posts",
    payload,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};
