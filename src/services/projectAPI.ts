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

type ApiProjectPageResponse =
  | ApiProjectPage
  | {
      projects?: ApiProjectPage;
      currentUserId?: string | null;
    };

const isWrappedProjectPageResponse = (
  payload: ApiProjectPageResponse
): payload is { projects?: ApiProjectPage; currentUserId?: string | null } =>
  "projects" in payload || "currentUserId" in payload;

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
  privacyAgreement: boolean;
};

type ProjectApplyResponse = {
  success: boolean;
  message: string;
};

export type ProjectCreateSchedule = {
  dayOfWeek: number;
  meetTime: string;
};

export type ProjectCreatePayload = {
  projectName: string;
  description: string;
  goal: string;
  location: string;
  notice: string;
  status: ProjectStatus;
  schedules: ProjectCreateSchedule[];
};

type ProjectCreateResponse = {
  success: boolean;
  projectId: number;
  message: string;
};

export type ProjectUpdatePayload = ProjectCreatePayload & {
  leaderName: string;
};

type ProjectMutationResponse = {
  success: boolean;
  message: string;
  projectId?: number;
};

export type ProjectManagementList = ProjectListPage & {
  currentUserId: string | null;
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
  const requestParams = {
    keyword: params.keyword?.trim() || undefined,
    status: params.status,
    page: params.page ?? 0,
    size: params.size ?? 6,
  };

  console.log("[project/list] request", {
    url: "/api/projects",
    params: requestParams,
  });

  const response = await axiosInstance.get<ApiProjectPageResponse>("/api/projects", {
    params: requestParams,
  });

  const responsePayload = response.data;
  const payload: ApiProjectPage = isWrappedProjectPageResponse(responsePayload)
    ? responsePayload.projects ?? {}
    : responsePayload;

  console.log("[project/list] response", {
    raw: responsePayload,
    normalized: payload,
    normalizedContentLength: Array.isArray(payload.content)
      ? payload.content.length
      : 0,
  });

  return {
    content: Array.isArray(payload.content) ? payload.content.map(normalizeProject) : [],
    pageNumber: payload.pageable?.pageNumber ?? params.page ?? 0,
    pageSize: payload.pageable?.pageSize ?? params.size ?? 6,
    totalPages: payload.totalPages ?? 0,
    totalElements: payload.totalElements ?? 0,
    last: Boolean(payload.last),
  };
};

export const getMyProjects = async (
  params: ProjectListParams = {}
): Promise<ProjectManagementList> => {
  const response = await axiosInstance.get<ApiProjectPageResponse>("/api/projects", {
    params: {
      keyword: params.keyword?.trim() || undefined,
      status: params.status,
      page: params.page ?? 0,
      size: params.size ?? 50,
    },
    headers: {
      "X-Require-Auth": "true",
    },
  });

  const responsePayload = response.data;
  const isWrapped = isWrappedProjectPageResponse(responsePayload);
  const payload: ApiProjectPage = isWrapped
    ? responsePayload.projects ?? {}
    : responsePayload;
  const currentUserId = isWrapped ? responsePayload.currentUserId ?? null : null;
  const content = Array.isArray(payload.content)
    ? payload.content.map(normalizeProject)
    : [];
  const myContent = currentUserId
    ? content.filter((project) => project.leaderId === currentUserId)
    : [];

  console.log("[project/manage] response", {
    currentUserId,
    totalContentLength: content.length,
    myContentLength: myContent.length,
    raw: responsePayload,
  });

  return {
    content: myContent,
    pageNumber: payload.pageable?.pageNumber ?? params.page ?? 0,
    pageSize: payload.pageable?.pageSize ?? params.size ?? 50,
    totalPages: payload.totalPages ?? 0,
    totalElements: myContent.length,
    last: Boolean(payload.last),
    currentUserId,
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

export const createProjectPost = async (
  payload: ProjectCreatePayload
): Promise<ProjectCreateResponse> => {
  const response = await axiosInstance.post<ProjectCreateResponse>(
    "/api/projects",
    payload,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};

export const updateProjectPost = async (
  projectId: number | string,
  payload: ProjectUpdatePayload
): Promise<ProjectMutationResponse> => {
  const response = await axiosInstance.put<ProjectMutationResponse>(
    `/api/projects/${projectId}`,
    payload,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};

export const deleteProjectPost = async (
  projectId: number | string
): Promise<ProjectMutationResponse> => {
  const response = await axiosInstance.delete<ProjectMutationResponse>(
    `/api/projects/${projectId}`
  );

  return response.data;
};

export const getAdminProjects = async (
  params: ProjectListParams = {}
): Promise<ProjectListPage> => {
  const response = await axiosInstance.get<ApiProjectPage>("/api/admin/projects", {
    params: {
      page: params.page ?? 0,
      size: params.size ?? 10,
    },
  });

  const payload = response.data;

  return {
    content: Array.isArray(payload.content) ? payload.content.map(normalizeProject) : [],
    pageNumber: payload.pageable?.pageNumber ?? params.page ?? 0,
    pageSize: payload.pageable?.pageSize ?? params.size ?? 10,
    totalPages: payload.totalPages ?? 0,
    totalElements: payload.totalElements ?? 0,
    last: Boolean(payload.last),
  };
};

export const closeAdminProject = async (
  projectId: number | string
): Promise<ProjectMutationResponse> => {
  const response = await axiosInstance.patch<ProjectMutationResponse>(
    `/api/admin/projects/${projectId}/close`,
    {}
  );

  return response.data;
};

export const deleteAdminProject = async (
  projectId: number | string
): Promise<ProjectMutationResponse> => {
  const response = await axiosInstance.delete<ProjectMutationResponse>(
    `/api/admin/projects/${projectId}`
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
