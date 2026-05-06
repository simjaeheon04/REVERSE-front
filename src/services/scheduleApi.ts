import { axiosInstance } from "./axiosInstance";

export type ScheduleCategory = {
  id: number;
  categoryName: string;
  colorCode: string;
  sortOrder: number;
  isVisible: boolean;
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
};

export type ScheduleItem = {
  id: number;
  categoryId: number;
  categoryName: string;
  colorCode: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  startTime?: string | null;
  endTime?: string | null;
  isAllDay: boolean;
  isVisible: boolean;
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
};

export type ScheduleCategoryPayload = {
  categoryName: string;
  colorCode?: string;
  sortOrder?: number;
  isVisible?: boolean;
  updatedBy: string;
};

export type SchedulePayload = {
  categoryId: number;
  title: string;
  description?: string;
  startDate: string;
  endDate: string;
  startTime?: string;
  endTime?: string;
  isAllDay?: boolean;
  isVisible?: boolean;
  updatedBy: string;
};

export const getVisibleScheduleCategories = async (): Promise<ScheduleCategory[]> => {
  const response = await axiosInstance.get("/api/schedule/category");
  return response.data;
};

export const getPublicSchedules = async (
  year?: number,
  month?: number
): Promise<ScheduleItem[]> => {
  const response = await axiosInstance.get("/api/schedule", {
    params: { year, month },
  });

  return response.data;
};

export const getScheduleDetail = async (
  id: number | string
): Promise<ScheduleItem> => {
  const response = await axiosInstance.get(`/api/schedule/${id}`);
  return response.data;
};

export const getAdminScheduleCategories = async (): Promise<ScheduleCategory[]> => {
  const response = await axiosInstance.get("/api/schedule/admin/category");
  return response.data;
};

export const createScheduleCategory = async (
  payload: ScheduleCategoryPayload
): Promise<ScheduleCategory> => {
  const response = await axiosInstance.post(
    "/api/schedule/admin/category",
    payload,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};

export const updateScheduleCategory = async (
  id: number | string,
  payload: ScheduleCategoryPayload
): Promise<ScheduleCategory> => {
  const response = await axiosInstance.put(
    `/api/schedule/admin/category/${id}`,
    payload,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};

export const deleteScheduleCategory = async (
  id: number | string
): Promise<string> => {
  const response = await axiosInstance.delete(
    `/api/schedule/admin/category/${id}`,
    {
      responseType: "text",
    }
  );

  return response.data;
};

export const getAdminSchedules = async (
  year: number,
  month: number
): Promise<ScheduleItem[]> => {
  const response = await axiosInstance.get("/api/schedule/admin", {
    params: { year, month },
  });

  return response.data;
};

export const createSchedule = async (
  payload: SchedulePayload
): Promise<ScheduleItem> => {
  const response = await axiosInstance.post("/api/schedule/admin", payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.data;
};

export const updateSchedule = async (
  id: number | string,
  payload: SchedulePayload
): Promise<ScheduleItem> => {
  const response = await axiosInstance.put(`/api/schedule/admin/${id}`, payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.data;
};

export const deleteSchedule = async (id: number | string): Promise<string> => {
  const response = await axiosInstance.delete(`/api/schedule/admin/${id}`, {
    responseType: "text",
  });

  return response.data;
};
