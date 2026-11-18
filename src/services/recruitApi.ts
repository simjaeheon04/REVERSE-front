import { axiosInstance } from "./axiosInstance";

export type RecruitmentItem = {
  id: number;
  title: string;
  description?: string | null;
  isActive: boolean;
  isApplyPeriod?: boolean | null;
  createdAt: string;
  updatedAt: string;
  applyStartDate?: string;
  applyEndDate?: string;
};

export type RecruitmentPayload = {
  roleId?: number;
  title: string;
  description: string | null;
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
  interviewSlotId: number;
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
  roleId?: number;
  adminId?: string;
  slots: Array<{
    slotId?: number | null;
    slotDate: string;
    startTime: string;
    endTime: string;
    capacity: number;
    isActive: boolean;
  }>;
};

export type InterviewSlot = {
  slotId: number;
  date: string;
  time?: string;
  startTime: string | null;
  endTime: string | null;
  isAvailable: boolean;
};

export type RecruitmentDetail = RecruitmentItem & {
  page: {
    interviewSlots: InterviewSlot[];
  } | null;
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

const assertRecruitmentSuccess = (value: unknown) => {
  const data: unknown = typeof value === "string" && value.trim().startsWith("{")
    ? JSON.parse(value)
    : value;
  if (data && typeof data === "object") {
    const result = data as { success?: boolean; status?: string; message?: string };
    if (result.success === false || ["error", "fail", "failed"].includes(result.status?.toLowerCase() ?? "")) {
      throw new Error(result.message || "서버에서 요청을 처리하지 못했습니다.");
    }
  }
};

export const formatInterviewSlotTime = (slot: InterviewSlot) =>
  `${slot.startTime?.slice(0, 5) ?? "시간 미정"} ~ ${slot.endTime?.slice(0, 5) ?? "시간 미정"}`;

const normalizeRecruitmentItem = (
  item: RecruitmentApiRecord
): RecruitmentItem => ({
  id: Number(item.id ?? item.recruitmentId ?? 0),
  title: item.title ?? "",
  description: item.description,
  isActive: Boolean(item.isActive),
  isApplyPeriod: item.isApplyPeriod,
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
): Promise<RecruitmentDetail> => {
  const response = await axiosInstance.get<RecruitmentApiResponse<RecruitmentApiRecord & { page?: RecruitmentDetail["page"] }>>(
    `/api/recruit/${id}`
  );
  const unwrapped = unwrapRecruitmentResponse(response.data);

  return { ...normalizeRecruitmentItem(unwrapped), page: unwrapped.page ?? null };
};

export const getRecruitmentInterviewSlots = async (
  recruitmentId: number
): Promise<InterviewSlot[]> => {
  const detail = await getRecruitmentDetail(recruitmentId);
  return detail.page?.interviewSlots ?? [];
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

export const updateRecruitmentStatus = async (): Promise<never> => {
  throw new Error("현재 백엔드는 공고 상태 변경 API를 지원하지 않습니다. 설명 원본을 조회할 수 없어 기본 정보 수정 API로도 안전하게 대체할 수 없습니다.");
};

export const isRecruitmentOpen = (recruitment: RecruitmentItem | null) =>
  recruitment?.isActive === true && recruitment.isApplyPeriod === true;

export const submitRecruitApplication = async (
  payload: RecruitApplicationPayload
): Promise<string> => {
  const recruitment = await getRecruitmentDetail(payload.recruitmentId);
  if (!isRecruitmentOpen(recruitment)) {
    throw new Error(recruitment.isApplyPeriod == null
      ? "모집 기간을 확인할 수 없어 지원서를 제출할 수 없습니다. 다시 조회해 주세요."
      : "현재 지원 가능한 모집공고가 아닙니다.");
  }
  const response = await axiosInstance.post("/api/recruit/apply", payload, {
    headers: {
      "Content-Type": "application/json",
    },
    responseType: "text",
  });

  assertRecruitmentSuccess(response.data);
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

export const assignRecruitAdminInterviews = async (payload: {
  applicationId: number;
  slotId: number;
}) => {
  if (!Number.isSafeInteger(payload.applicationId) || payload.applicationId <= 0 ||
      !Number.isSafeInteger(payload.slotId) || payload.slotId <= 0) {
    throw new Error("applicationId와 slotId를 양의 정수로 지정해 주세요.");
  }
  const response = await axiosInstance.post(
    "/api/recruit/admin/applications/interview",
    { applicationId: payload.applicationId, slotId: payload.slotId },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  assertRecruitmentSuccess(response.data);
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
  if (!Array.isArray(payload.slots) || !payload.slots.length) {
    throw new Error("저장할 면접 슬롯을 입력해 주세요.");
  }
  const slots = payload.slots.map((slot) => {
    if (!slot || typeof slot !== "object") {
      throw new Error("슬롯은 JSON 객체로 입력해 주세요.");
    }
    if (slot.slotId != null && (!Number.isSafeInteger(slot.slotId) || slot.slotId <= 0)) {
      throw new Error("기존 슬롯의 slotId는 양의 정수여야 합니다.");
    }
    if (typeof slot.slotDate !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(slot.slotDate) ||
        !Number.isFinite(Date.parse(`${slot.slotDate}T00:00:00Z`)) ||
        new Date(`${slot.slotDate}T00:00:00Z`).toISOString().slice(0, 10) !== slot.slotDate) {
      throw new Error("면접 날짜는 유효한 YYYY-MM-DD 형식이어야 합니다.");
    }
    const normalizeTime = (value: string) => {
      if (typeof value !== "string" || !/^([01]\d|2[0-3]):[0-5]\d(:[0-5]\d)?$/.test(value)) {
        throw new Error("면접 시간은 HH:mm:ss 형식으로 입력해 주세요.");
      }
      return value.length === 5 ? `${value}:00` : value;
    };
    const startTime = normalizeTime(slot.startTime);
    const endTime = normalizeTime(slot.endTime);
    if (endTime <= startTime) {
      throw new Error("면접 종료 시간은 시작 시간보다 늦어야 합니다.");
    }
    if (!Number.isSafeInteger(slot.capacity) || slot.capacity < 1) {
      throw new Error("정원은 1 이상의 정수로 명시해 주세요. 현재 조회 API는 기존 정원을 제공하지 않아 자동으로 채울 수 없습니다.");
    }
    if (typeof slot.isActive !== "boolean") {
      throw new Error("isActive는 true 또는 false로 지정해 주세요.");
    }
    return {
      ...(slot.slotId != null ? { slotId: slot.slotId } : {}),
      slotDate: slot.slotDate,
      startTime,
      endTime,
      capacity: slot.capacity,
      isActive: slot.isActive,
    };
  });
  const response = await axiosInstance.post(
    `/api/recruit/admin/${recruitmentId}/slots/v2`,
    { ...payload, slots },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  assertRecruitmentSuccess(response.data);
  return response.data;
};
