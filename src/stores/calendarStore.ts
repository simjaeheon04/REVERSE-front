import { create } from "zustand";
import { getHolidayList, type HolidayItem } from "../services/holidayApi";
import { getPublicSchedules, type ScheduleItem } from "../services/scheduleApi";

type CalendarState = {
  year: number;
  month: number;
  schedules: ScheduleItem[];
  holidays: HolidayItem[];
  isLoading: boolean;
  error: string | null;
  setMonth: (year: number, month: number) => void;
  fetchMonth: (year?: number, month?: number) => Promise<void>;
};

const getCurrentYearMonth = () => {
  const now = new Date();
  return {
    year: now.getFullYear(),
    month: now.getMonth() + 1,
  };
};

const { year: initialYear, month: initialMonth } = getCurrentYearMonth();

export const useCalendarStore = create<CalendarState>((set, get) => ({
  year: initialYear,
  month: initialMonth,
  schedules: [],
  holidays: [],
  isLoading: false,
  error: null,
  setMonth: (year, month) => {
    set({ year, month });
  },
  fetchMonth: async (year, month) => {
    const nextYear = year ?? get().year;
    const nextMonth = month ?? get().month;

    set({
      year: nextYear,
      month: nextMonth,
      isLoading: true,
      error: null,
    });

    try {
      const [schedules, holidays] = await Promise.all([
        getPublicSchedules(nextYear, nextMonth),
        getHolidayList(nextYear, nextMonth),
      ]);

      set({
        schedules: Array.isArray(schedules) ? schedules : [],
        holidays: Array.isArray(holidays) ? holidays : [],
      });
    } catch (error) {
      set({
        schedules: [],
        holidays: [],
        error:
          error instanceof Error
            ? error.message
            : "일정 정보를 불러오지 못했습니다.",
      });
    } finally {
      set({
        isLoading: false,
      });
    }
  },
}));
