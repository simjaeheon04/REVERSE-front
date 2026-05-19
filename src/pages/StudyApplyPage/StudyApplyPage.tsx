import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../../components/common/footer/Footer";
import { STUDY_POSTS } from "../StudyPage/studyDummyData";
import * as S from "./StudyApplyPage.styles";

const AVAILABLE_TIMES = ["오후 5시", "오후 6시", "오후 7시", "오후 8시"];

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
            회장 박시연: 010-000-0000
            <br />
            부회장 홍정민: 010-000-0000
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

function StudyApplyForm({ studyId, studyName }: { studyId: number; studyName: string }) {
  const navigate = useNavigate();
  const [availableDate, setAvailableDate] = useState("");
  const [availableTime, setAvailableTime] = useState("");
  const [email, setEmail] = useState("");
  const [isAgreed, setIsAgreed] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const canSubmit = Boolean(availableDate && availableTime && email.trim() && isAgreed);

  const handleSubmit = () => {
    if (!availableDate || !availableTime) {
      setErrorMessage("요일과 시간은 필수 입력해야 합니다.");
      return;
    }

    if (!email.trim()) {
      setErrorMessage("이메일 입력은 필수 입니다.");
      return;
    }

    if (!isAgreed) {
      setErrorMessage("개인정보 수집 및 이용에 동의해 주세요.");
      return;
    }

    setErrorMessage("");
    navigate(`/study/${studyId}/apply/complete`);
  };

  return (
    <S.FormPanel aria-label="REVERSE 스터디 신청서">
      <S.FormTitle>{studyName}</S.FormTitle>

      <S.FieldGroup>
        <S.Label htmlFor="study-available-date">가능 일자</S.Label>
        <S.DateInput
          id="study-available-date"
          type="date"
          value={availableDate}
          onChange={(event) => setAvailableDate(event.target.value)}
        />
      </S.FieldGroup>

      <S.FieldGroup>
        <S.Label htmlFor="study-available-time">가능 시간</S.Label>
        <S.Select
          id="study-available-time"
          value={availableTime}
          onChange={(event) => setAvailableTime(event.target.value)}
        >
          <option value="">선택</option>
          {AVAILABLE_TIMES.map((time) => (
            <option key={time} value={time}>
              {time}
            </option>
          ))}
        </S.Select>
      </S.FieldGroup>

      <S.FieldGroup>
        <S.Label htmlFor="study-email">이메일</S.Label>
        <S.EmailInput
          id="study-email"
          type="email"
          value={email}
          placeholder="example@reverse.com"
          onChange={(event) => setEmail(event.target.value)}
        />
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

      <S.SubmitButton type="button" disabled={!canSubmit} onClick={handleSubmit}>
        제출
      </S.SubmitButton>
    </S.FormPanel>
  );
}

export default function StudyApplyPage() {
  const navigate = useNavigate();
  const { studyId } = useParams();
  const study = useMemo(
    () => STUDY_POSTS.find((item) => String(item.id) === studyId),
    [studyId]
  );

  if (!study) {
    return (
      <S.Page>
        <S.ApplySection>
          <S.Content>
            <S.NotFoundBox>
              <p>스터디를 찾을 수 없습니다.</p>
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
            <StudyApplyForm studyId={study.id} studyName={study.title} />
          </S.FormColumn>
        </S.Content>
        <S.DeviceImage alt="REVERSE iMac" />
      </S.ApplySection>
      <Footer />
    </S.Page>
  );
}
