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
  imageUrl: string;
  sourceUrl: string;
};

type ItIssueRecord = Partial<ItIssue> & {
  issueId?: string;
  newsId?: string;
  thumbnailUrl?: string;
  articleUrl?: string;
};

const normalizeItIssue = (item: ItIssueRecord, index: number): ItIssue => ({
  id: String(item.id ?? item.issueId ?? item.newsId ?? `iss_${index + 1}`),
  title: item.title ?? `IT 이슈 ${index + 1}`,
  imageUrl: item.imageUrl ?? item.thumbnailUrl ?? "",
  sourceUrl: item.sourceUrl ?? item.articleUrl ?? "",
});

export const getItIssues = async (): Promise<ItIssue[]> => {
  const response = await axiosInstance.get<ApiResponse<ItIssueRecord[]>>("/api/it-issues");
  const data = unwrapApiData(response.data);
  const issues = Array.isArray(data) ? data : [];

  return issues.slice(0, 6).map(normalizeItIssue);
};
