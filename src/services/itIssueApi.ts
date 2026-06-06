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

export type ItIssue = {
  id: string;
  title: string;
  description?: string;
  status?: "open" | "in_progress" | "closed" | string;
  assigneeId?: string;
  imageUrl: string;
  sourceUrl: string;
};

type ItIssueRecord = Partial<ItIssue> & {
  issueId?: string;
  newsId?: string;
  thumbnailUrl?: string;
  url?: string;
  link?: string;
  articleUrl?: string;
  originUrl?: string;
  originalUrl?: string;
  sourceLink?: string;
};

const normalizeItIssue = (item: ItIssueRecord, index: number): ItIssue => ({
  id: String(item.id ?? item.issueId ?? item.newsId ?? `iss_${index + 1}`),
  title: item.title ?? `IT 이슈 ${index + 1}`,
  description: item.description,
  status: item.status ?? "open",
  assigneeId: item.assigneeId,
  imageUrl: item.imageUrl ?? item.thumbnailUrl ?? "",
  sourceUrl:
    item.sourceUrl ??
    item.articleUrl ??
    item.originUrl ??
    item.originalUrl ??
    item.sourceLink ??
    item.url ??
    item.link ??
    "",
});

export const getItIssues = async (): Promise<ItIssue[]> => {
  const response = await axiosInstance.get<ApiResponse<ItIssueRecord[]>>("/api/issues");
  const data = unwrapApiData(response.data);
  const issues = Array.isArray(data) ? data : [];

  return issues.slice(0, 6).map(normalizeItIssue);
};

export type ItIssueCreatePayload = {
  title: string;
  description?: string;
};

export type ItIssueUpdatePayload = {
  status?: "open" | "in_progress" | "closed";
  assigneeId?: string;
};

export const createItIssue = async (
  payload: ItIssueCreatePayload
): Promise<unknown> => {
  const response = await axiosInstance.post<ApiResponse<unknown>>("/api/issues", payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return unwrapApiData(response.data);
};

export const updateItIssue = async (
  issueId: string,
  payload: ItIssueUpdatePayload
): Promise<unknown> => {
  const response = await axiosInstance.patch<ApiResponse<unknown>>(
    `/api/issues/${issueId}`,
    payload,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return unwrapApiData(response.data);
};

export const deleteItIssue = async (issueId: string) => {
  const response = await axiosInstance.delete(`/api/issues/${issueId}`);

  return response.data;
};
