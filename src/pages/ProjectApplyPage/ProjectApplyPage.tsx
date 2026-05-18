import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../../components/common/footer/Footer";
import { PROJECT_POSTS } from "../ProjectPage/projectDummyData";
import * as S from "./ProjectApplyPage.styles";

const WEEKDAYS = ["MON", "TUE", "WED", "THU", "FRI"];
const AVAILABLE_TIMES = ["오후 5시", "오후 6시", "오후 7시", "오후 8시"];

function ProjectApplyInfo() {
  return (
    <S.InfoPanel>
      <S.Year>2026-1</S.Year>
      <S.Title>REVERSE 프로젝트 신청</S.Title>
      <S.Description>프로젝트에 지원해 주셔서 감사합니다!</S.Description>

      <S.ContactList aria-label="REVERSE 프로젝트 신청 안내">
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
            <circle
              cx="12"
              cy="9.5"
              r="2.2"
              stroke="currentColor"
              strokeWidth="1.7"
            />
          </S.ContactIcon>
          <span>123 Sample St, Sydney NSW 2000 AU</span>
        </S.ContactItem>
      </S.ContactList>
    </S.InfoPanel>
  );
}

function ProjectApplyForm({ projectId, projectName }: { projectId: number; projectName: string }) {
  const navigate = useNavigate();
  const [weekday, setWeekday] = useState(WEEKDAYS[0]);
  const [selectedTimes, setSelectedTimes] = useState<string[]>([]);
  const [isAgreed, setIsAgreed] = useState(false);

  const toggleTime = (time: string) => {
    setSelectedTimes((prev) =>
      prev.includes(time) ? prev.filter((item) => item !== time) : [...prev, time]
    );
  };

  const handleSubmit = () => {
    if (!isAgreed || selectedTimes.length === 0) {
      return;
    }

    navigate(`/project/${projectId}/apply/complete`);
  };

  return (
    <S.FormPanel aria-label="REVERSE 프로젝트 신청서">
      <S.FormTitle>{projectName}</S.FormTitle>

      <S.FieldGroup>
        <S.Label htmlFor="project-weekday">가능 요일</S.Label>
        <S.Select
          id="project-weekday"
          value={weekday}
          onChange={(event) => setWeekday(event.target.value)}
        >
          {WEEKDAYS.map((day) => (
            <option key={day} value={day}>
              {day}
            </option>
          ))}
        </S.Select>
      </S.FieldGroup>

      <S.FieldGroup>
        <S.Label>가능 시간</S.Label>
        <S.TimeBox>
          {AVAILABLE_TIMES.map((time) => (
            <S.TimeOption key={time}>
              <input
                type="checkbox"
                checked={selectedTimes.includes(time)}
                onChange={() => toggleTime(time)}
              />
              <span>{time}</span>
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
        <S.DetailButton type="button">자세히 보기 [아이콘]</S.DetailButton>
      </S.AgreementRow>

      <S.SubmitButton
        type="button"
        disabled={!isAgreed || selectedTimes.length === 0}
        onClick={handleSubmit}
      >
        제출
      </S.SubmitButton>
    </S.FormPanel>
  );
}

export default function ProjectApplyPage() {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const project = useMemo(
    () => PROJECT_POSTS.find((item) => String(item.id) === projectId),
    [projectId]
  );

  if (!project) {
    return (
      <S.Page>
        <S.ApplySection>
          <S.Content>
            <S.NotFoundBox>
              <p>프로젝트를 찾을 수 없습니다.</p>
              <S.BackButton type="button" onClick={() => navigate("/project")}>
                프로젝트 목록으로 돌아가기
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
          <ProjectApplyInfo />
          <S.FormColumn>
            <S.VerticalDivider />
            <ProjectApplyForm projectId={project.id} projectName={project.title} />
          </S.FormColumn>
        </S.Content>
        <S.DeviceImage alt="REVERSE iMac" />
      </S.ApplySection>
      <Footer />
    </S.Page>
  );
}
