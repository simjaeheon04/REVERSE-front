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

export type StudyAvailability = {
  dayOfWeek: number;
  availableTime: string;
};

export type StudyApplyPayload = {
  availabilities: StudyAvailability[];
};

export type StudyApplication = {
  studyApplicationId: number;
  studyId: number;
  userId: string;
  status: "PENDING" | "APPROVED" | "REJECTED" | string;
  appliedDate: string;
  availabilities: StudyAvailability[];
};

export type StudyApplicationMutationResponse = {
  success?: boolean;
  message?: string;
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
  studyId: number | string,
  payload: StudyApplyPayload
): Promise<StudyApplicationMutationResponse> => {
  const response = await axiosInstance.post<StudyApplicationMutationResponse>(
    `/api/studies/${studyId}/apply`,
    payload,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};

export const getStudyApplications = async (
  studyId: number | string
): Promise<StudyApplication[]> => {
  const response = await axiosInstance.get<ApiResponse<StudyApplication[]>>(
    `/api/studies/${studyId}/applications`
  );

  return unwrapApiData(response.data);
};

export const approveStudyApplication = async (
  applicationId: number | string
): Promise<StudyApplicationMutationResponse> => {
  const response = await axiosInstance.patch<StudyApplicationMutationResponse>(
    `/api/studies/applications/${applicationId}/approve`
  );

  return response.data;
};

export const rejectStudyApplication = async (
  applicationId: number | string
): Promise<StudyApplicationMutationResponse> => {
  const response = await axiosInstance.patch<StudyApplicationMutationResponse>(
    `/api/studies/applications/${applicationId}/reject`
  );

  return response.data;
};
