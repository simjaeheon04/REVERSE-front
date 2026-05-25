import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../../components/common/footer/Footer";
import {
  applyProject,
  getProjectDetail,
  type ProjectListItem,
} from "../../services/projectAPI";
import * as S from "./ProjectApplyPage.styles";

const getErrorMessage = (error: unknown) => {
  if (error instanceof AxiosError) {
    const responseData = error.response?.data;

    if (responseData && typeof responseData === "object") {
      const message = (responseData as { message?: unknown }).message;
      if (typeof message === "string" && message.trim()) {
        return message;
      }
    }
  }

  return "지원서 제출에 실패했습니다. 입력값을 확인해 주세요.";
};

function ProjectApplyInfo() {
  return (
    <S.InfoPanel>
      <S.Year>2026-1</S.Year>
      <S.Title>REVERSE 프로젝트 신청</S.Title>
      <S.Description>프로젝트에 지원해 주셔서 감사합니다.</S.Description>

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
            회장 010-000-0000
            <br />
            부회장 010-000-0000
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

function ProjectApplyForm({ project }: { project: ProjectListItem }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isAgreed, setIsAgreed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleSubmit = async () => {
    if (!email.trim()) {
      setSubmitMessage("이메일을 입력해 주세요.");
      return;
    }

    if (!isAgreed) {
      setSubmitMessage("개인정보 수집 및 이용에 동의해야 지원이 가능합니다.");
      return;
    }

    try {
      setIsSubmitting(true);
      setSubmitMessage("");
      await applyProject(project.projectId, {
        email: email.trim(),
        privacyAgreement: isAgreed,
      });
      navigate(`/project/${project.projectId}/apply/complete`);
    } catch (error) {
      console.error("[project] apply submit failed", error);
      setSubmitMessage(getErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <S.FormPanel aria-label="REVERSE 프로젝트 신청서">
      <S.FormTitle>{project.projectName}</S.FormTitle>

      <S.FieldGroup>
        <S.Label htmlFor="project-email">이메일</S.Label>
        <S.Input
          id="project-email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="email@example.com"
        />
      </S.FieldGroup>

      <S.AgreementRow>
        <S.AgreementCheck>
          <input
            type="checkbox"
            checked={isAgreed}
            onChange={(event) => setIsAgreed(event.target.checked)}
          />
          <span>개인정보 수집 및 이용 동의</span>
        </S.AgreementCheck>
        <S.DetailButton type="button">자세히 보기</S.DetailButton>
      </S.AgreementRow>

      {submitMessage ? <S.FormMessage>{submitMessage}</S.FormMessage> : null}

      <S.SubmitButton
        type="button"
        disabled={isSubmitting || !email.trim() || !isAgreed}
        onClick={() => void handleSubmit()}
      >
        {isSubmitting ? "제출 중..." : "제출"}
      </S.SubmitButton>
    </S.FormPanel>
  );
}

export default function ProjectApplyPage() {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const [project, setProject] = useState<ProjectListItem | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!projectId) {
      setProject(null);
      setErrorMessage("프로젝트를 찾을 수 없습니다.");
      return;
    }

    const fetchProject = async () => {
      try {
        setIsLoading(true);
        setErrorMessage("");
        const result = await getProjectDetail(projectId);
        setProject(result);
      } catch (error) {
        console.error("[project] apply detail fetch failed", error);
        setProject(null);
        setErrorMessage("프로젝트 정보를 불러오지 못했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    void fetchProject();
  }, [projectId]);

  if (isLoading || !project) {
    return (
      <S.Page>
        <S.ApplySection>
          <S.Content>
            <S.NotFoundBox>
              <p>{isLoading ? "프로젝트를 불러오는 중입니다." : errorMessage}</p>
              {!isLoading ? (
                <S.BackButton type="button" onClick={() => navigate("/project")}>
                  프로젝트 목록으로 돌아가기
                </S.BackButton>
              ) : null}
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
            <ProjectApplyForm project={project} />
          </S.FormColumn>
        </S.Content>
        <S.DeviceImage alt="REVERSE iMac" />
      </S.ApplySection>
      <Footer />
    </S.Page>
  );
}
