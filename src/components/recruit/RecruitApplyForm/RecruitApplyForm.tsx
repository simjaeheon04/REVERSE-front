import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecruitStore } from "../../../stores/recruitStore";
import RecruitInterviewCalendar from "../RecruitInterviewCalendar/RecruitInterviewCalendar";
import * as S from "./RecruitApplyForm.styles";
import useRecruitApplyForm, {
  CUSTOM_EMAIL_DOMAIN,
  EMAIL_DOMAINS,
  GRADES,
  INTERVIEW_TIMES,
  SUPPORT_FIELDS,
} from "./useRecruitApplyForm";

const getErrorMessage = (message: unknown) =>
  typeof message === "string" ? message : null;

const toValidDate = (value?: string | null) => {
  if (!value) {
    return null;
  }

  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
};

export default function RecruitApplyForm() {
  const navigate = useNavigate();
  const activeRecruitment = useRecruitStore((state) => state.activeRecruitment);
  const isLoadingRecruitments = useRecruitStore(
    (state) => state.isLoadingRecruitments
  );
  const isSubmittingApplication = useRecruitStore(
    (state) => state.isSubmittingApplication
  );
  const recruitmentError = useRecruitStore((state) => state.recruitmentError);
  const applicationError = useRecruitStore((state) => state.applicationError);
  const fetchRecruitments = useRecruitStore((state) => state.fetchRecruitments);
  const submitApplication = useRecruitStore((state) => state.submitApplication);
  const clearApplicationState = useRecruitStore(
    (state) => state.clearApplicationState
  );
  const {
    errors,
    register,
    selectEmailDomain,
    setField,
    toggleSupportField,
    validate,
    values,
  } = useRecruitApplyForm();
  const [isDomainMenuOpen, setIsDomainMenuOpen] = useState(false);
  const [isInterviewTimeMenuOpen, setIsInterviewTimeMenuOpen] = useState(false);
  const [isSubmitConfirmOpen, setIsSubmitConfirmOpen] = useState(false);

  useEffect(() => {
    clearApplicationState();
    void fetchRecruitments();
  }, [clearApplicationState, fetchRecruitments]);

  const applyStartDate = toValidDate(activeRecruitment?.applyStartDate);
  const applyEndDate = toValidDate(activeRecruitment?.applyEndDate);
  const now = new Date();
  const isApplyPeriodKnown = Boolean(applyStartDate && applyEndDate);
  const isWithinApplyPeriod = isApplyPeriodKnown
    ? now >= applyStartDate! && now <= applyEndDate!
    : true;
  const applyPeriodMessage =
    isApplyPeriodKnown && !isWithinApplyPeriod
      ? `현재는 지원 기간이 아닙니다. 지원 가능 기간은 ${activeRecruitment?.applyStartDate?.slice(0, 10)} ~ ${activeRecruitment?.applyEndDate?.slice(0, 10)} 입니다.`
      : null;

  const isCustomEmailDomain = values.emailDomain === CUSTOM_EMAIL_DOMAIN;
  const domainDisplayText = values.emailDomain || "선택";
  const interviewTimeDisplayText = values.interviewTime || "선택";

  const handleDomainSelect = (domain: string) => {
    selectEmailDomain(domain);
    setIsDomainMenuOpen(false);
  };

  const handleInterviewTimeSelect = (time: string) => {
    setField("interviewTime", time);
    setIsInterviewTimeMenuOpen(false);
  };

  const handleSubmitClick = async () => {
    if (!isWithinApplyPeriod) {
      return;
    }

    const isValid = await validate();

    if (!isValid || !activeRecruitment) {
      return;
    }

    setIsSubmitConfirmOpen(true);
  };

  const handleConfirmSubmit = async () => {
    if (!activeRecruitment) {
      return;
    }

    const emailDomain =
      values.emailDomain === CUSTOM_EMAIL_DOMAIN
        ? values.customEmailDomain.trim()
        : values.emailDomain;

    const payload = {
      recruitmentId: activeRecruitment.id,
      applicantName: values.name.trim(),
      department: values.major.trim(),
      studentNumber: values.studentId.trim(),
      phoneNumber: values.phone.trim(),
      grade: Number(values.grade.replace(/\D/g, "")),
      email: `${values.emailLocal.trim()}@${emailDomain}`,
      termsAgreed: values.isPrivacyAgreed,
      applyFields: values.supportFields,
    };

    try {
      await submitApplication(payload);

      setIsSubmitConfirmOpen(false);
      navigate("/recruit/apply/complete");
    } catch {
      setIsSubmitConfirmOpen(false);
    }
  };

  return (
    <>
      <S.FormPanel aria-label="REVERSE 부원 지원서">
        <S.FormGrid>
          <S.Field>
            <S.Label htmlFor="apply-name">이름</S.Label>
            <S.Input
              id="apply-name"
              type="text"
              {...register("name", { required: "이름을 입력해 주세요." })}
            />
            {errors.name ? (
              <S.ErrorMessage>{getErrorMessage(errors.name.message)}</S.ErrorMessage>
            ) : null}
          </S.Field>

          <S.Field>
            <S.Label htmlFor="apply-major">학과</S.Label>
            <S.Input
              id="apply-major"
              type="text"
              {...register("major", { required: "학과를 입력해 주세요." })}
            />
            {errors.major ? (
              <S.ErrorMessage>{getErrorMessage(errors.major.message)}</S.ErrorMessage>
            ) : null}
          </S.Field>

          <S.Field>
            <S.Label htmlFor="apply-student-id">학번</S.Label>
            <S.Input
              id="apply-student-id"
              type="text"
              {...register("studentId", { required: "학번을 입력해 주세요." })}
            />
            {errors.studentId ? (
              <S.ErrorMessage>
                {getErrorMessage(errors.studentId.message)}
              </S.ErrorMessage>
            ) : null}
          </S.Field>

          <S.Field>
            <S.Label htmlFor="apply-phone">전화번호</S.Label>
            <S.Input
              id="apply-phone"
              type="tel"
              {...register("phone", {
                required: "전화번호를 입력해 주세요.",
              })}
            />
            {errors.phone ? (
              <S.ErrorMessage>{getErrorMessage(errors.phone.message)}</S.ErrorMessage>
            ) : null}
          </S.Field>
        </S.FormGrid>

        <S.Fieldset>
          <S.Legend>지원 분야</S.Legend>
          <S.OptionRow>
            {SUPPORT_FIELDS.map((field) => (
              <S.RadioLabel key={field.value}>
                <input
                  type="checkbox"
                  name="supportField"
                  value={field.value}
                  checked={values.supportFields.includes(field.value)}
                  onChange={() => toggleSupportField(field.value)}
                />
                <span>{field.label}</span>
              </S.RadioLabel>
            ))}
          </S.OptionRow>
          {errors.supportFields ? (
            <S.ErrorMessage>
              {getErrorMessage(errors.supportFields.message)}
            </S.ErrorMessage>
          ) : null}
        </S.Fieldset>

        <S.Fieldset>
          <S.Legend>학년</S.Legend>
          <S.OptionRow>
            {GRADES.map((grade) => (
              <S.RadioLabel key={grade}>
                <input
                  type="radio"
                  name="grade"
                  value={grade}
                  checked={values.grade === grade}
                  onChange={() => setField("grade", grade)}
                />
                <span>{grade}</span>
              </S.RadioLabel>
            ))}
          </S.OptionRow>
          {errors.grade ? (
            <S.ErrorMessage>{getErrorMessage(errors.grade.message)}</S.ErrorMessage>
          ) : null}
        </S.Fieldset>

        <S.EmailGroup>
          <S.Field>
            <S.Label htmlFor="apply-email">이메일</S.Label>
            <S.EmailRow>
              <S.Input
                id="apply-email"
                type="text"
                {...register("emailLocal", {
                  required: "이메일 아이디를 입력해 주세요.",
                })}
              />
              <S.AtSign>@</S.AtSign>
              <S.DomainControl>
                {isCustomEmailDomain ? (
                  <S.DomainInput
                    type="text"
                    aria-label="이메일 도메인 직접 입력"
                    placeholder="도메인을 입력해 주세요."
                    value={values.customEmailDomain}
                    onChange={(event) =>
                      setField("customEmailDomain", event.target.value)
                    }
                  />
                ) : (
                  <S.DomainSelectButton
                    type="button"
                    aria-label="이메일 도메인 선택"
                    onClick={() => setIsDomainMenuOpen((prev) => !prev)}
                  >
                    {domainDisplayText}
                  </S.DomainSelectButton>
                )}

                <S.DomainArrowButton
                  type="button"
                  aria-label="이메일 도메인 목록 열기"
                  onClick={() => setIsDomainMenuOpen((prev) => !prev)}
                >
                  <S.DomainArrow aria-hidden="true" />
                </S.DomainArrowButton>

                {isDomainMenuOpen ? (
                  <S.DomainMenu>
                    {EMAIL_DOMAINS.map((domain) => (
                      <S.DomainOption
                        key={domain}
                        type="button"
                        onClick={() => handleDomainSelect(domain)}
                      >
                        {domain}
                      </S.DomainOption>
                    ))}
                  </S.DomainMenu>
                ) : null}
              </S.DomainControl>
            </S.EmailRow>
            {errors.emailLocal ? (
              <S.ErrorMessage>
                {getErrorMessage(errors.emailLocal.message)}
              </S.ErrorMessage>
            ) : null}
            {errors.emailDomain ? (
              <S.ErrorMessage>
                {getErrorMessage(errors.emailDomain.message)}
              </S.ErrorMessage>
            ) : null}
            {errors.customEmailDomain ? (
              <S.ErrorMessage>
                {getErrorMessage(errors.customEmailDomain.message)}
              </S.ErrorMessage>
            ) : null}
          </S.Field>
        </S.EmailGroup>

        <S.InterviewScheduleRow>
          <RecruitInterviewCalendar
            selectedDate={values.interviewDate}
            onSelectDate={(date) => setField("interviewDate", date)}
            availableStartDate={activeRecruitment?.applyStartDate}
            availableEndDate={activeRecruitment?.applyEndDate}
            error={getErrorMessage(errors.interviewDate?.message) ?? undefined}
          />

          <S.InterviewTimeField>
            <S.InterviewTimeLabel>면접 시간</S.InterviewTimeLabel>
            <S.InterviewTimeControl>
              <S.InterviewTimeSelectButton
                type="button"
                aria-label="면접 시간 선택"
                onClick={() => setIsInterviewTimeMenuOpen((prev) => !prev)}
              >
                {interviewTimeDisplayText}
              </S.InterviewTimeSelectButton>
              <S.InterviewTimeArrowButton
                type="button"
                aria-label="면접 시간 목록 열기"
                onClick={() => setIsInterviewTimeMenuOpen((prev) => !prev)}
              >
                <S.InterviewTimeArrow aria-hidden="true" />
              </S.InterviewTimeArrowButton>

              {isInterviewTimeMenuOpen ? (
                <S.InterviewTimeMenu>
                  {INTERVIEW_TIMES.map((time) => (
                    <S.InterviewTimeOption
                      key={time}
                      type="button"
                      onClick={() => handleInterviewTimeSelect(time)}
                    >
                      {time}
                    </S.InterviewTimeOption>
                  ))}
                </S.InterviewTimeMenu>
              ) : null}
            </S.InterviewTimeControl>
            {errors.interviewTime ? (
              <S.ErrorMessage>
                {getErrorMessage(errors.interviewTime.message)}
              </S.ErrorMessage>
            ) : null}
          </S.InterviewTimeField>
        </S.InterviewScheduleRow>

        <S.AgreeLabel>
          <input
            type="checkbox"
            checked={values.isPrivacyAgreed}
            onChange={(event) =>
              setField("isPrivacyAgreed", event.target.checked)
            }
          />
          <span>개인정보 수집 및 이용 동의</span>
        </S.AgreeLabel>
        {errors.isPrivacyAgreed ? (
          <S.ErrorMessage>
            {getErrorMessage(errors.isPrivacyAgreed.message)}
          </S.ErrorMessage>
        ) : null}

        {isLoadingRecruitments ? (
          <S.ErrorMessage>모집 공고 정보를 불러오는 중입니다.</S.ErrorMessage>
        ) : null}

        {!isLoadingRecruitments && !activeRecruitment ? (
          <S.ErrorMessage>
            {recruitmentError ?? "현재 연결 가능한 모집 공고가 없습니다."}
          </S.ErrorMessage>
        ) : null}

        {applicationError ? (
          <S.ErrorMessage>{applicationError}</S.ErrorMessage>
        ) : null}

        {applyPeriodMessage ? (
          <S.ErrorMessage>{applyPeriodMessage}</S.ErrorMessage>
        ) : null}

        <S.SubmitButton
          type="button"
          onClick={handleSubmitClick}
          disabled={
            !activeRecruitment || isSubmittingApplication || !isWithinApplyPeriod
          }
        >
          {isSubmittingApplication ? "제출 중..." : "제출"}
        </S.SubmitButton>
      </S.FormPanel>

      {isSubmitConfirmOpen ? (
        <S.ModalOverlay role="presentation">
          <S.ModalCard
            role="dialog"
            aria-modal="true"
            aria-labelledby="submit-confirm-title"
          >
            <S.ModalCloseButton
              type="button"
              aria-label="닫기"
              onClick={() => setIsSubmitConfirmOpen(false)}
            >
              ×
            </S.ModalCloseButton>
            <S.ModalTitle id="submit-confirm-title">
              제출 후 해당 내용은 수정할 수 없습니다.
            </S.ModalTitle>
            <S.ModalText>
              위의 내용을 확인했습니다. 이대로 제출하시겠습니까?
            </S.ModalText>
            <S.ModalActions>
              <S.ModalSecondaryButton
                type="button"
                onClick={() => setIsSubmitConfirmOpen(false)}
              >
                취소
              </S.ModalSecondaryButton>
              <S.ModalPrimaryButton
                type="button"
                onClick={handleConfirmSubmit}
                disabled={isSubmittingApplication}
              >
                {isSubmittingApplication ? "제출 중..." : "확인"}
              </S.ModalPrimaryButton>
            </S.ModalActions>
          </S.ModalCard>
        </S.ModalOverlay>
      ) : null}
    </>
  );
}
