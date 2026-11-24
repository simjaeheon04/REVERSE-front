import { AxiosError } from "axios";
import { create } from "zustand";
import {
  getRecruitmentList,
  getRecruitmentDetail,
  isRecruitmentOpen,
  submitRecruitApplication,
  type RecruitApplicationPayload,
  type RecruitmentItem,
} from "../services/recruitApi";

type RecruitState = {
  createdRecruitmentId: number | null;
  setCreatedRecruitmentId: (id: number) => void;
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
  createdRecruitmentId: null,
  setCreatedRecruitmentId: (id) => set({ createdRecruitmentId: id }),
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
      activeRecruitment: null,
      recruitmentError: null,
    });

    try {
      const recruitments = await getRecruitmentList();
      const sortedRecruitments = [...recruitments].sort((a, b) => b.id - a.id);
      let activeRecruitment: RecruitmentItem | null = null;
      let recruitmentError: string | null = null;
      for (const item of sortedRecruitments) {
        if (!item.isActive || item.isApplyPeriod === false) continue;
        try {
          const verified = item.isApplyPeriod == null
            ? await getRecruitmentDetail(item.id)
            : item;
          if (isRecruitmentOpen(verified)) {
            activeRecruitment = verified;
            break;
          }
          if (verified.isApplyPeriod == null) {
            recruitmentError = "모집 기간을 확인할 수 없습니다. 다시 조회해 주세요.";
          }
        } catch (error) {
          recruitmentError = getApiErrorMessage(error, "모집 기간을 확인하지 못했습니다.");
        }
      }

      set({
        recruitments: sortedRecruitments,
        activeRecruitment,
        recruitmentError: activeRecruitment ? null : recruitmentError,
      });
    } catch (error) {
      set({
        recruitments: [],
        activeRecruitment: null,
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
