import { axiosInstance } from "./axiosInstance";

export interface EventListItem {
  title: string;
  startDate: string;
  endDate: string;
  location: string;
}

export interface CalendarEventDetail {
  eventId: number;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  location: string;
}

export interface CalendarEventPayload {
  title: string;
  description?: string;
  startTime?: string;
  endTime?: string;
  location?: string;
}

interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

// 외부 행사 일정 목록 조회
export const getEventList = async (): Promise<EventListItem[]> => {
  const response = await axiosInstance.get<ApiResponse<EventListItem[]>>(
    "/api/events"
  );
  return response.data.data;
};

// 일정 상세 조회
export const getCalendarEventDetail = async (
  eventId: string | number
): Promise<CalendarEventDetail> => {
  const response = await axiosInstance.get<ApiResponse<CalendarEventDetail>>(
    `/api/calendar/${eventId}`
  );
  return response.data.data;
};

// 일정 생성
export const createCalendarEvent = async (payload: CalendarEventPayload) => {
  const response = await axiosInstance.post<ApiResponse<{ eventId: number }>>(
    "/api/calendar",
    payload,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};

// 일정 수정
export const updateCalendarEvent = async (
  eventId: string | number,
  payload: CalendarEventPayload
) => {
  const response = await axiosInstance.patch<ApiResponse<{ eventId: number }>>(
    `/api/calendar/${eventId}`,
    payload,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};

// 일정 삭제
export const deleteCalendarEvent = async (eventId: string | number) => {
  const response = await axiosInstance.delete<ApiResponse<{ eventId: number }>>(
    `/api/calendar/${eventId}`
  );
  return response.data;
};