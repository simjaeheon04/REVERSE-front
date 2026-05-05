import { useEffect } from "react";
import {
  useForm,
  useWatch,
  type FieldErrors,
  type FieldPath,
  type FieldPathValue,
} from "react-hook-form";

export const SUPPORT_FIELDS = [
  { label: "메인 프로젝트", value: "메인프로젝트" },
  { label: "토이 프로젝트", value: "토이프로젝트" },
  { label: "스터디", value: "스터디" },
] as const;

export const GRADES = ["1학년", "2학년", "3학년", "4학년"];

export const EMAIL_DOMAINS = [
  "naver.com",
  "gmail.com",
  "nsu.ac.kr",
  "직접 입력",
];

export const CUSTOM_EMAIL_DOMAIN = "직접 입력";

export const INTERVIEW_TIMES = ["오후 5시", "오후 6시", "오후 7시", "오후 8시"];

export type RecruitApplyFormValues = {
  name: string;
  major: string;
  studentId: string;
  phone: string;
  supportFields: string[];
  grade: string;
  emailLocal: string;
  emailDomain: string;
  customEmailDomain: string;
  interviewDate: string;
  interviewTime: string;
  isPrivacyAgreed: boolean;
};

const defaultValues: RecruitApplyFormValues = {
  name: "",
  major: "",
  studentId: "",
  phone: "",
  supportFields: [],
  grade: "",
  emailLocal: "",
  emailDomain: "",
  customEmailDomain: "",
  interviewDate: "",
  interviewTime: "",
  isPrivacyAgreed: false,
};

export type RecruitApplyFormErrors = FieldErrors<RecruitApplyFormValues>;

export default function useRecruitApplyForm() {
  const {
    clearErrors,
    control,
    formState: { errors },
    getValues,
    register,
    setValue,
    trigger,
  } = useForm<RecruitApplyFormValues>({
    defaultValues,
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  useEffect(() => {
    register("supportFields", {
      validate: (value) =>
        value.length > 0 || "지원 분야를 1개 이상 선택해 주세요.",
    });
    register("grade", { required: "학년을 선택해 주세요." });
    register("emailDomain", { required: "이메일 도메인을 선택해 주세요." });
    register("customEmailDomain", {
      validate: (value, values) => {
        if (values.emailDomain !== CUSTOM_EMAIL_DOMAIN) {
          return true;
        }

        return value.trim() ? true : "이메일 도메인을 직접 입력해 주세요.";
      },
    });
    register("interviewDate", { required: "면접 일정을 선택해 주세요." });
    register("interviewTime", { required: "면접 시간을 선택해 주세요." });
    register("isPrivacyAgreed", {
      validate: (value) => value || "개인정보 수집 및 이용 동의가 필요합니다.",
    });
  }, [register]);

  const values = useWatch({ control }) as RecruitApplyFormValues;

  const setField = <Name extends FieldPath<RecruitApplyFormValues>>(
    name: Name,
    value: FieldPathValue<RecruitApplyFormValues, Name>
  ) => {
    setValue(name, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const toggleSupportField = (field: string) => {
    const currentSupportFields = getValues("supportFields");
    const nextSupportFields = currentSupportFields.includes(field)
      ? currentSupportFields.filter((item) => item !== field)
      : [...currentSupportFields, field];

    setValue("supportFields", nextSupportFields, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const selectEmailDomain = (domain: string) => {
    setValue("emailDomain", domain, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });

    if (domain !== CUSTOM_EMAIL_DOMAIN) {
      setValue("customEmailDomain", "", {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: false,
      });
      clearErrors("customEmailDomain");
    }
  };

  const validate = () => trigger();

  return {
    errors,
    register,
    selectEmailDomain,
    setField,
    toggleSupportField,
    validate,
    values,
  };
}
