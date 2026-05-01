import { axiosInstance } from "./axiosInstance";

export type HolidayItem = {
  id: number;
  holidayDate: string;
  holidayName: string;
  isHoliday: boolean;
  year: number;
};

export type HolidaySyncResponse = {
  status: string;
  message: string;
};

export const getHolidayList = async (
  year: number,
  month: number
): Promise<HolidayItem[]> => {
  const response = await axiosInstance.get("/api/holiday", {
    params: { year, month },
  });

  return response.data;
};

export const syncHolidayList = async (
  year: number
): Promise<HolidaySyncResponse> => {
  const response = await axiosInstance.post(
    "/api/holiday/admin/sync",
    undefined,
    {
      params: { year },
    }
  );

  return response.data;
};
