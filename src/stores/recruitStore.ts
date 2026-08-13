import { AxiosError } from "axios";
import { create } from "zustand";
import {
  getRecruitmentList,
  submitRecruitApplication,
  type RecruitApplicationPayload,
  type RecruitmentItem,
} from "../services/recruitApi";

type RecruitState = {
  recruitments: RecruitmentItem[];
  activeRecruitment: RecruitmentItem | null;
  isLoadingRecruitments: boolean;
  isSubmittingApplication: boolean;
  recruitmentError: string | null;
  applicationError: string | null;
  submitSuccessMessage: string | null;
  fetchRecruitments: () => Promise<void>;
  submitApplication: (payload: RecruitApplicationPayload) => Promise<string>;
  clearApplicationState: () => void;
};

const getApiErrorMessage = (error: unknown, fallback: string) => {
  if (error instanceof AxiosError) {
    const message = error.response?.data;

    if (typeof message === "string" && message.trim()) {
      return message;
    }

    if (message && typeof message === "object") {
      const record = message as Record<string, unknown>;
      if (typeof record.message === "string" && record.message.trim()) {
        return record.message;
      }
    }
  }

  if (error instanceof Error && error.message.trim()) {
    return error.message;
  }

  return fallback;
};

export const useRecruitStore = create<RecruitState>((set) => ({
  recruitments: [],
  activeRecruitment: null,
  isLoadingRecruitments: false,
  isSubmittingApplication: false,
  recruitmentError: null,
  applicationError: null,
  submitSuccessMessage: null,
  fetchRecruitments: async () => {
    set({
      isLoadingRecruitments: true,
      recruitmentError: null,
    });

    try {
      const recruitments = await getRecruitmentList();
      const sortedRecruitments = [...recruitments].sort((a, b) => b.id - a.id);
      const activeRecruitment =
        sortedRecruitments.find((item) => item.isActive) ?? sortedRecruitments[0] ?? null;

      set({
        recruitments: sortedRecruitments,
        activeRecruitment,
      });
    } catch (error) {
      set({
        recruitmentError: getApiErrorMessage(
          error,
          "모집 공고를 불러오지 못했습니다."
        ),
      });
    } finally {
      set({
        isLoadingRecruitments: false,
      });
    }
  },
  submitApplication: async (payload) => {
    set({
      isSubmittingApplication: true,
      applicationError: null,
      submitSuccessMessage: null,
    });

    try {
      const message = await submitRecruitApplication(payload);
      set({
        submitSuccessMessage: message,
      });
      return message;
    } catch (error) {
      const message = getApiErrorMessage(
        error,
        "지원서 제출에 실패했습니다."
      );

      set({
        applicationError: message,
      });
      throw error;
    } finally {
      set({
        isSubmittingApplication: false,
      });
    }
  },
  clearApplicationState: () => {
    set({
      applicationError: null,
      submitSuccessMessage: null,
    });
  },
}));
