import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../../components/common/footer/Footer";
import LoginRequiredModal from "../../components/common/LoginRequiredModal/LoginRequiredModal";
import { applyStudy, getStudyDetail, type StudyRecord } from "../../services/studyApi";
import { useAuthStore } from "../../stores/authStore";
import { canApplyAsMember } from "../../utils/memberPermission";
import * as S from "./StudyApplyPage.styles";

const WEEKDAYS = [
  { label: "MON", value: 1 },
  { label: "TUE", value: 2 },
  { label: "WED", value: 3 },
  { label: "THU", value: 4 },
  { label: "FRI", value: 5 },
  { label: "SAT", value: 6 },
  { label: "SUN", value: 0 },
] as const;

const AVAILABLE_TIMES = [
  { label: "오후 5시", value: "17:00" },
  { label: "오후 6시", value: "18:00" },
  { label: "오후 7시", value: "19:00" },
  { label: "오후 8시", value: "20:00" },
] as const;

const getApplyErrorMessage = (error: unknown) => {
  if (error instanceof AxiosError) {
    const data = error.response?.data;

    if (typeof data === "string" && data.trim()) {
      return data;
    }

    if (data && typeof data === "object") {
      const record = data as Record<string, unknown>;

      if (typeof record.message === "string" && record.message.trim()) {
        return record.message;
      }
    }
  }

  if (error instanceof Error && error.message.trim()) {
    return error.message;
  }

  return "스터디 참여 신청에 실패했습니다.";
};

function StudyApplyInfo() {
  return (
    <S.InfoPanel>
      <S.Year>2026-1</S.Year>
      <S.Title>REVERSE 스터디 신청</S.Title>
      <S.Description>스터디에 지원해 주셔서 감사합니다!</S.Description>

      <S.ContactList aria-label="REVERSE 스터디 신청 안내">
        <S.ContactItem>
          <S.ContactIcon viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M4 5.5H20V18.5H4V5.5Z"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinejoin="round"
            />
            <path
              d="M5 6.5L12 12L19 6.5"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinejoin="round"
            />
          </S.ContactIcon>
          <span>@nsu_reverse</span>
        </S.ContactItem>
        <S.ContactItem>
          <S.ContactIcon viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M8.1 4.5L10.4 8.9L8.5 10.8C9.7 13.2 11.5 15 13.9 16.2L15.8 14.3L20.2 16.6C19.7 18.4 18.3 19.5 16.6 19.5C10.1 19.4 5.1 14.4 4.9 7.9C4.9 6.2 6.2 4.9 8.1 4.5Z"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinejoin="round"
            />
          </S.ContactIcon>
          <span>
            회장 심재헌: 010-2264-3031
            <br />
            부회장 황정민: 010-5428-8562
          </span>
        </S.ContactItem>
        <S.ContactItem>
          <S.ContactIcon viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M12 21C12 21 19 14.5 19 9.4C19 5.8 16 3 12 3C8 3 5 5.8 5 9.4C5 14.5 12 21 12 21Z"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinejoin="round"
            />
            <circle cx="12" cy="9.5" r="2.2" stroke="currentColor" strokeWidth="1.7" />
          </S.ContactIcon>
          <span>123 Sample St, Sydney NSW 2000 AU</span>
        </S.ContactItem>
      </S.ContactList>
    </S.InfoPanel>
  );
}

function StudyApplyForm({ studyId, studyName }: { studyId: string; studyName: string }) {
  const navigate = useNavigate();
  const [dayOfWeek, setDayOfWeek] = useState<number>(WEEKDAYS[0].value);
  const [isWeekdayOpen, setIsWeekdayOpen] = useState(false);
  const [selectedTimes, setSelectedTimes] = useState<string[]>([]);
  const [isAgreed, setIsAgreed] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedWeekday = WEEKDAYS.find((day) => day.value === dayOfWeek) ?? WEEKDAYS[0];
  const canSubmit = selectedTimes.length > 0 && isAgreed;

  const toggleTime = (time: string) => {
    setSelectedTimes((prev) =>
      prev.includes(time) ? prev.filter((item) => item !== time) : [...prev, time]
    );
  };

  const handleSubmit = async () => {
    if (selectedTimes.length === 0) {
      setErrorMessage("요일과 시간은 필수 입력해야 합니다.");
      return;
    }

    if (!isAgreed) {
      setErrorMessage("개인정보 수집 및 이용에 동의해 주세요.");
      return;
    }

    try {
      setIsSubmitting(true);
      setErrorMessage("");
      await applyStudy(studyId, {
        availabilities: selectedTimes.map((availableTime) => ({
          dayOfWeek,
          availableTime,
        })),
      });
      navigate(`/study/${studyId}/apply/complete`);
    } catch (error) {
      setErrorMessage(getApplyErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <S.FormPanel aria-label="REVERSE 스터디 신청서">
      <S.FormTitle>{studyName}</S.FormTitle>

      <S.WeekdayField>
        <S.Label htmlFor="study-weekday">가능 요일</S.Label>
        <S.WeekdayButton
          id="study-weekday"
          type="button"
          aria-expanded={isWeekdayOpen}
          onClick={() => setIsWeekdayOpen((prev) => !prev)}
        >
          {selectedWeekday.label}
        </S.WeekdayButton>

        {isWeekdayOpen ? (
          <S.WeekdayMenuWrap>
            <S.WeekdayMenuLabel>요일 선택</S.WeekdayMenuLabel>
            <S.WeekdayMenu>
              {WEEKDAYS.map((day) => (
                <S.WeekdayOption
                  key={day.value}
                  type="button"
                  onClick={() => {
                    setDayOfWeek(day.value);
                    setIsWeekdayOpen(false);
                  }}
                >
                  {day.label}
                </S.WeekdayOption>
              ))}
            </S.WeekdayMenu>
          </S.WeekdayMenuWrap>
        ) : null}
      </S.WeekdayField>

      <S.FieldGroup>
        <S.Label>가능 시간</S.Label>
        <S.TimeBox>
          <S.TimeHeader type="button" aria-hidden="true">
            ⌄
          </S.TimeHeader>
          {AVAILABLE_TIMES.map((time) => (
            <S.TimeOption key={time.value} $active={selectedTimes.includes(time.value)}>
              <input
                type="checkbox"
                checked={selectedTimes.includes(time.value)}
                onChange={() => toggleTime(time.value)}
              />
              <span>{time.label}</span>
            </S.TimeOption>
          ))}
        </S.TimeBox>
      </S.FieldGroup>

      <S.AgreementRow>
        <input
          type="checkbox"
          checked={isAgreed}
          onChange={(event) => setIsAgreed(event.target.checked)}
        />
        <span>개인정보 수집 및 이용 동의</span>
        <S.DetailButton type="button">자세히 보기</S.DetailButton>
      </S.AgreementRow>

      {errorMessage ? <S.ErrorText>{errorMessage}</S.ErrorText> : null}

      <S.SubmitButton
        type="button"
        disabled={!canSubmit || isSubmitting}
        onClick={() => void handleSubmit()}
      >
        {isSubmitting ? "제출 중" : "제출"}
      </S.SubmitButton>
    </S.FormPanel>
  );
}

export default function StudyApplyPage() {
  const navigate = useNavigate();
  const { studyId } = useParams();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const roleId = useAuthStore((state) => state.roleId);
  const roleName = useAuthStore((state) => state.roleName);
  const isProfileLoading = useAuthStore((state) => state.isProfileLoading);
  const [study, setStudy] = useState<StudyRecord | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const hasApplyPermission = canApplyAsMember({ isAuthenticated, roleId, roleName });
  const permissionModal =
    !isAuthenticated ? "login" : !isProfileLoading && !hasApplyPermission ? "member" : null;

  useEffect(() => {
    if (!studyId) {
      return;
    }

    const loadStudy = async () => {
      try {
        setIsLoading(true);
        const result = await getStudyDetail(studyId);
        setStudy(result);
      } catch {
        setStudy(null);
      } finally {
        setIsLoading(false);
      }
    };

    void loadStudy();
  }, [studyId]);

  if (isProfileLoading || permissionModal) {
    return (
      <S.Page>
        <S.ApplySection>
          <S.Content>
            <S.NotFoundBox>
              <p>
                {isProfileLoading
                  ? "신청 권한을 확인하는 중입니다."
                  : "스터디 신청 권한이 없습니다."}
              </p>
              {!isProfileLoading ? (
                <S.BackButton type="button" onClick={() => navigate("/study")}>
                  스터디 목록으로 돌아가기
                </S.BackButton>
              ) : null}
            </S.NotFoundBox>
          </S.Content>
        </S.ApplySection>
        <LoginRequiredModal
          isOpen={permissionModal === "login"}
          onConfirm={() => navigate("/login")}
        />
        <LoginRequiredModal
          isOpen={permissionModal === "member"}
          title="현부원 이상 신청할 수 있습니다."
          description="스터디 신청은 멤버 권한부터 이용할 수 있습니다."
          onConfirm={() => navigate("/study")}
        />
        <Footer />
      </S.Page>
    );
  }

  if (!study) {
    return (
      <S.Page>
        <S.ApplySection>
          <S.Content>
            <S.NotFoundBox>
              <p>{isLoading ? "스터디 정보를 불러오는 중입니다." : "스터디를 찾을 수 없습니다."}</p>
              <S.BackButton type="button" onClick={() => navigate("/study")}>
                스터디 목록으로 돌아가기
              </S.BackButton>
            </S.NotFoundBox>
          </S.Content>
        </S.ApplySection>
        <Footer />
      </S.Page>
    );
  }

  return (
    <S.Page>
      <S.ApplySection>
        <S.BackgroundOverlay />
        <S.Content>
          <StudyApplyInfo />
          <S.FormColumn>
            <S.VerticalDivider />
            <StudyApplyForm studyId={String(study.studyId)} studyName={study.studyName} />
          </S.FormColumn>
        </S.Content>
        <S.DeviceImage alt="REVERSE iMac" />
      </S.ApplySection>
      <Footer />
    </S.Page>
  );
}
