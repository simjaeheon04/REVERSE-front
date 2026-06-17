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
  studyName: string;
  leaderId: string;
  leaderName: string;
  language?: string;
  techStack?: string;
  description?: string;
  goal?: string;
  maxMembers?: number;
  location?: string;
  notice?: string;
  status?: "PENDING" | "ACTIVE" | "CLOSED";
  schedules?: Array<{
    dayOfWeek: number;
    meetTime: string;
  }>;
  curriculums?: Array<{
    week: number;
    contents: string;
  }>;
};

export type StudyRecord = {
  studyId: number;
  studyName: string;
  leaderId: string;
  leaderName: string;
  language?: string;
  techStack?: string;
  description?: string;
  goal?: string;
  maxMembers?: number;
  memberCount?: number;
  location?: string;
  notice?: string;
  status?: "PENDING" | "ACTIVE" | "CLOSED" | string;
  createdBy?: string;
  createdDate?: string;
  modifiedDate?: string;
  schedules?: Array<{
    dayOfWeek: number;
    meetTime: string;
  }>;
  curriculums?: Array<{
    week: number;
    contents: string;
  }>;
};

export type StudyPageResponse = {
  content: StudyRecord[];
  totalPages: number;
  totalElements: number;
  number: number;
};

export type StudyListParams = {
  keyword?: string;
  status?: "PENDING" | "ACTIVE" | "CLOSED";
  page?: number;
};

export const createStudyRecruitment = async (
  payload: StudyCreatePayload
): Promise<unknown> => {
  const response = await axiosInstance.post<ApiResponse<unknown>>(
    "/api/studies",
    payload,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return unwrapApiData(response.data);
};

export const getStudies = async (
  params: StudyListParams = {}
): Promise<StudyPageResponse> => {
  const response = await axiosInstance.get<StudyPageResponse>("/api/studies", {
    params: {
      keyword: params.keyword || undefined,
      status: params.status,
      page: params.page,
    },
  });

  return response.data;
};

export const getStudyDetail = async (
  studyId: number | string
): Promise<StudyRecord> => {
  const response = await axiosInstance.get<ApiResponse<StudyRecord>>(
    `/api/studies/${studyId}`
  );

  return unwrapApiData(response.data);
};

export const updateStudyRecruitment = async (
  studyId: number | string,
  payload: Partial<StudyCreatePayload>
): Promise<unknown> => {
  const response = await axiosInstance.put<ApiResponse<unknown>>(
    `/api/studies/${studyId}`,
    payload,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return unwrapApiData(response.data);
};

export const deleteStudyRecruitment = async (studyId: number | string) => {
  const response = await axiosInstance.delete(`/api/studies/${studyId}`);
  return response.data;
};

export const applyStudy = async (
  studyId: number | string
): Promise<unknown> => {
  void studyId;

  throw new Error("엔드포인트가 없습니다.");
};
