import { axiosInstance } from "./axiosInstance";

export type RecruitmentItem = {
  id: number;
  title: string;
  description: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  applyStartDate?: string;
  applyEndDate?: string;
};

export type RecruitmentPayload = {
  roleId?: number;
  title: string;
  description: string;
  applyStartDate: string;
  applyEndDate: string;
  isActive?: boolean;
  updatedBy: string;
};

export type RecruitmentStatusPayload = {
  isActive: boolean;
};

export type RecruitApplicationPayload = {
  recruitmentId: number;
  applicantName: string;
  department: string;
  studentNumber: string;
  phoneNumber: string;
  grade: number;
  email: string;
  termsAgreed: boolean;
  categories: string[];
};

export type RecruitApplicationStatus = "PENDING" | "PASS" | "FAIL";

export type RecruitAdminApplicationListParams = {
  recruitmentId: number;
  roleId: number;
  name?: string;
  status?: RecruitApplicationStatus | "";
};

export type RecruitAdminApplicationStatusPayload = {
  roleId: number;
  applicationId: number;
  status: RecruitApplicationStatus;
};

export type RecruitAdminPagePayload = {
  roleId: number;
  adminId?: string;
  heroYear?: string;
  heroTitle?: string;
  heroSubTitle?: string;
  heroBtnText?: string;
  heroBgUrl?: string;
  intros?: Array<{ contents: string; sortOrder?: number }>;
  cards?: Array<{
    applyField: string;
    cardTitle: string;
    cardSubTitle?: string;
    cardDesc?: string;
    imageUrl?: string;
    sortOrder?: number;
  }>;
  galleries?: Array<{
    imageUrl: string;
    imageDesc?: string;
    tag?: string;
    sortOrder?: number;
  }>;
  contacts?: Array<{
    contactType: string;
    label: string;
    value: string;
    subValue?: string;
    sortOrder?: number;
  }>;
};

export type RecruitAdminSlotsPayload = {
  roleId: number;
  adminId?: string;
  slots: Array<{
    slotDate: string;
    capacity: number;
  }>;
};

type RecruitmentApiRecord = Partial<RecruitmentItem> & {
  recruitmentId?: number;
};

type RecruitmentApiResponse<T> =
  | T
  | {
      success?: boolean;
      data?: T;
    };

const toRecruitmentDateTime = (
  value: string,
  fallbackTime: "00:00:00" | "23:59:59"
) => {
  const trimmed = value.trim();

  if (!trimmed) {
    return trimmed;
  }

  if (trimmed.includes("T")) {
    return trimmed;
  }

  return `${trimmed}T${fallbackTime}`;
};

const normalizeRecruitmentPayload = (
  payload: RecruitmentPayload
): RecruitmentPayload => ({
  ...payload,
  applyStartDate: toRecruitmentDateTime(payload.applyStartDate, "00:00:00"),
  applyEndDate: toRecruitmentDateTime(payload.applyEndDate, "23:59:59"),
});

const unwrapRecruitmentResponse = <T>(payload: RecruitmentApiResponse<T>) => {
  if (payload && typeof payload === "object" && "data" in payload) {
    return payload.data as T;
  }

  return payload as T;
};

const normalizeRecruitmentItem = (
  item: RecruitmentApiRecord
): RecruitmentItem => ({
  id: Number(item.id ?? item.recruitmentId ?? 0),
  title: item.title ?? "",
  description: item.description ?? "",
  isActive: Boolean(item.isActive),
  createdAt: item.createdAt ?? "",
  updatedAt: item.updatedAt ?? "",
  applyStartDate: item.applyStartDate,
  applyEndDate: item.applyEndDate,
});

export const getRecruitmentList = async (): Promise<RecruitmentItem[]> => {
  const response = await axiosInstance.get<
    RecruitmentApiResponse<RecruitmentApiRecord[] | RecruitmentApiRecord>
  >(
    "/api/recruit"
  );
  const unwrapped = unwrapRecruitmentResponse(response.data);
  const items = Array.isArray(unwrapped) ? unwrapped : [unwrapped];

  return items
    .filter((item): item is RecruitmentApiRecord => Boolean(item))
    .map(normalizeRecruitmentItem);
};

export const getRecruitmentDetail = async (
  id: number | string
): Promise<RecruitmentItem> => {
  const response = await axiosInstance.get<RecruitmentApiResponse<RecruitmentApiRecord>>(
    `/api/recruit/${id}`
  );
  const unwrapped = unwrapRecruitmentResponse(response.data);

  return normalizeRecruitmentItem(unwrapped);
};

export const createRecruitment = async (
  payload: RecruitmentPayload
): Promise<RecruitmentItem> => {
  const response = await axiosInstance.post(
    "/api/recruit/admin",
    normalizeRecruitmentPayload(payload),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return normalizeRecruitmentItem(
    unwrapRecruitmentResponse(response.data as RecruitmentApiResponse<RecruitmentApiRecord>)
  );
};

export const updateRecruitment = async (
  id: number | string,
  payload: RecruitmentPayload
): Promise<RecruitmentItem> => {
  const response = await axiosInstance.put(
    `/api/recruit/admin/${id}`,
    normalizeRecruitmentPayload(payload),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return normalizeRecruitmentItem(
    unwrapRecruitmentResponse(response.data as RecruitmentApiResponse<RecruitmentApiRecord>)
  );
};

export const getRecruitmentRequestPreview = (payload: RecruitmentPayload) =>
  normalizeRecruitmentPayload(payload);

export const deleteRecruitment = async (
  id: number | string,
  roleId?: number
): Promise<string> => {
  const response = await axiosInstance.delete(`/api/recruit/admin/${id}`, {
    params: roleId ? { roleId } : undefined,
    responseType: "text",
  });

  return response.data;
};

export const updateRecruitmentStatus = async (
  id: number | string,
  roleId: number,
  payload: RecruitmentStatusPayload
) => {
  const response = await axiosInstance.patch(
    `/api/recruit/admin/${id}/status`,
    payload,
    {
      params: { roleId },
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};

export const submitRecruitApplication = async (
  payload: RecruitApplicationPayload
): Promise<string> => {
  const response = await axiosInstance.post("/api/recruit/apply", payload, {
    headers: {
      "Content-Type": "application/json",
    },
    responseType: "text",
  });

  return response.data;
};

export const subscribeRecruitNotification = async (
  email: string
): Promise<string> => {
  const response = await axiosInstance.post("/api/recruit/subscribe", { email }, {
    headers: {
      "Content-Type": "application/json",
    },
    responseType: "text",
  });

  return response.data;
};

export const getRecruitAdminApplications = async (
  params: RecruitAdminApplicationListParams
) => {
  const response = await axiosInstance.get("/api/recruit/admin/applications", {
    params,
  });

  return response.data;
};

export const getRecruitAdminApplicationDetail = async (
  applicationId: number | string,
  roleId: number
) => {
  const response = await axiosInstance.get(
    `/api/recruit/admin/applications/${applicationId}`,
    {
      params: { roleId },
    }
  );

  return response.data;
};

export const updateRecruitAdminApplicationStatus = async (
  payload: RecruitAdminApplicationStatusPayload
) => {
  const response = await axiosInstance.patch(
    "/api/recruit/admin/applications/status",
    payload,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};

export const assignRecruitAdminInterviews = async (roleId: number) => {
  const response = await axiosInstance.post(
    "/api/recruit/admin/applications/interview",
    { roleId },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};

export const downloadRecruitAdminApplicationsExcel = async (
  recruitmentId: number,
  roleId: number
): Promise<Blob> => {
  const response = await axiosInstance.get(
    "/api/recruit/admin/applications/excel",
    {
      params: { recruitmentId, roleId },
      responseType: "blob",
    }
  );

  return response.data;
};

export const updateRecruitAdminPage = async (
  recruitmentId: number | string,
  payload: RecruitAdminPagePayload
) => {
  const response = await axiosInstance.patch(
    `/api/recruit/admin/${recruitmentId}/page`,
    payload,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};

export const updateRecruitAdminSlots = async (
  recruitmentId: number | string,
  payload: RecruitAdminSlotsPayload
) => {
  const response = await axiosInstance.post(
    `/api/recruit/admin/${recruitmentId}/slots`,
    payload,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};
