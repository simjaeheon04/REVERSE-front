import { axiosInstance } from "./axiosInstance";

type ApiPageable = {
  pageNumber?: number;
  pageSize?: number;
};

type ApiProjectSchedule = {
  dayOfWeek: string | number;
  meetTime: string;
};

type ApiProjectPost = {
  projectId: number;
  projectName: string;
  leaderId: string;
  leaderName: string;
  photoUrl: string;
  description: string;
  goal: string;
  memberCount: number;
  location: string;
  notice: string;
  status: string;
  schedules: ApiProjectSchedule[];
};

type ApiProjectPage = {
  content?: ApiProjectPost[];
  pageable?: ApiPageable;
  totalPages?: number;
  totalElements?: number;
  first?: boolean;
  last?: boolean;
};

export type ProjectStatus = "ACTIVE" | "INACTIVE" | "CLOSED" | string;

export type ProjectSchedule = {
  dayOfWeek: string;
  meetTime: string;
};

export type ProjectListItem = {
  id: number;
  projectId: number;
  projectName: string;
  leaderId: string;
  leaderName: string;
  photoUrl: string;
  description: string;
  goal: string;
  memberCount: number;
  location: string;
  notice: string;
  status: ProjectStatus;
  schedules: ProjectSchedule[];
};

export type ProjectListParams = {
  keyword?: string;
  status?: ProjectStatus;
  page?: number;
  size?: number;
};

export type ProjectListPage = {
  content: ProjectListItem[];
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  totalElements: number;
  last: boolean;
};

export type ProjectApplyPayload = {
  email: string;
  availableDate: string;
  availableTime: string;
  privacyAgreement: boolean;
};

type ProjectApplyResponse = {
  success: boolean;
  message: string;
};

const normalizeProject = (project: ApiProjectPost): ProjectListItem => ({
  id: project.projectId,
  projectId: project.projectId,
  projectName: project.projectName ?? "",
  leaderId: project.leaderId ?? "",
  leaderName: project.leaderName ?? "",
  photoUrl: project.photoUrl ?? "",
  description: project.description ?? "",
  goal: project.goal ?? "",
  memberCount: project.memberCount ?? 0,
  location: project.location ?? "",
  notice: project.notice ?? "",
  status: project.status ?? "",
  schedules: Array.isArray(project.schedules)
    ? project.schedules.map((schedule) => ({
        dayOfWeek: String(schedule.dayOfWeek),
        meetTime: schedule.meetTime ?? "",
      }))
    : [],
});

export const getProjects = async (
  params: ProjectListParams = {}
): Promise<ProjectListPage> => {
  const response = await axiosInstance.get<ApiProjectPage>("/api/projects", {
    params: {
      keyword: params.keyword?.trim() || undefined,
      status: params.status,
      page: params.page ?? 0,
      size: params.size ?? 6,
    },
  });

  const payload = response.data;

  return {
    content: Array.isArray(payload.content) ? payload.content.map(normalizeProject) : [],
    pageNumber: payload.pageable?.pageNumber ?? params.page ?? 0,
    pageSize: payload.pageable?.pageSize ?? params.size ?? 6,
    totalPages: payload.totalPages ?? 0,
    totalElements: payload.totalElements ?? 0,
    last: Boolean(payload.last),
  };
};

export const getProjectDetail = async (
  projectId: number | string
): Promise<ProjectListItem> => {
  const response = await axiosInstance.get<ApiProjectPost>(`/api/projects/${projectId}`);

  return normalizeProject(response.data);
};

export const applyProject = async (
  projectId: number | string,
  payload: ProjectApplyPayload
): Promise<ProjectApplyResponse> => {
  const response = await axiosInstance.post<ProjectApplyResponse>(
    `/api/projects/${projectId}/apply`,
    payload,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};

export interface ClubProject {
  projectId: number;
  projectName: string;
  projectUrl: string;
  thumbnailUrl: string;
  sortOrder: number;
  updatedBy: string;
  createdDate: string;
  modifiedDate: string;
}

export interface ClubProjectPayload {
  projectName: string;
  projectUrl: string;
  thumbnailUrl: string;
  sortOrder: number;
  updatedBy: string;
}

export const getProjectList = async (): Promise<ClubProject[]> => {
  const response = await axiosInstance.get("/api/club-project");
  return response.data;
};

export const uploadProjectImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await axiosInstance.post("/api/club-project/image", formData, {
    responseType: "text",
  });
  return response.data;
};

export const updateProjectImage = async (
  id: number | string,
  file: File
): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await axiosInstance.put(`/api/club-project/${id}/image`, formData, {
    responseType: "text",
  });

  return response.data;
};

export const createProject = async (
  payload: ClubProjectPayload
): Promise<ClubProject> => {
  const response = await axiosInstance.post("/api/club-project", payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const updateProject = async (
  id: number | string,
  payload: ClubProjectPayload
): Promise<ClubProject> => {
  const response = await axiosInstance.put(`/api/club-project/${id}`, payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.data;
};

export const deleteProject = async (id: number | string) => {
  const response = await axiosInstance.delete(`/api/club-project/${id}`);
  return response.data;
};
