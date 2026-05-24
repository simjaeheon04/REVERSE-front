import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import fallbackProjectImage from "../../assets/images/project-main.jpg";
import Footer from "../../components/common/footer/Footer";
import {
  getProjectDetail,
  type ProjectListItem,
} from "../../services/projectAPI";
import * as S from "./ProjectDetailPage.styles";

const getProjectImage = (project: ProjectListItem) =>
  project.photoUrl?.trim() || fallbackProjectImage;

const getScheduleText = (project: ProjectListItem) => {
  if (!project.schedules.length) {
    return "-";
  }

  return project.schedules
    .map((schedule) => `${schedule.dayOfWeek} ${schedule.meetTime}`)
    .join(", ");
};

function ProjectHero({ project }: { project: ProjectListItem }) {
  return (
    <S.HeroSection>
      <S.ProjectTitle>{project.projectName}</S.ProjectTitle>
      <S.HeroImage src={getProjectImage(project)} alt="" />
      <S.ProjectInfoLabel>프로젝트 정보</S.ProjectInfoLabel>
    </S.HeroSection>
  );
}

function IntroductionPanel({ project }: { project: ProjectListItem }) {
  const rows = [
    { label: "프로젝트 소개", value: project.description || "-" },
    { label: "활동 목표", value: project.goal || "-" },
    { label: "활동 인원", value: String(project.memberCount) },
    { label: "진행 요일 및 시간", value: getScheduleText(project) },
    { label: "진행 장소 및 방법", value: project.location || "-" },
    { label: "유의사항", value: project.notice || "-" },
  ];

  return (
    <S.IntroductionSection>
      <S.SectionTitle>Introduction</S.SectionTitle>
      <S.IntroductionBox>
        {rows.map((row) => (
          <S.InfoRow key={row.label}>
            <S.InfoLabel>{row.label}</S.InfoLabel>
            <S.InfoValue>{row.value}</S.InfoValue>
          </S.InfoRow>
        ))}
      </S.IntroductionBox>
    </S.IntroductionSection>
  );
}

function LeaderPanel({ project }: { project: ProjectListItem }) {
  const navigate = useNavigate();

  return (
    <S.LeaderSection>
      <S.SectionTitle>leader</S.SectionTitle>
      <S.LeaderCard>
        <S.LeaderIcon>[아이콘]</S.LeaderIcon>
        <S.LeaderName>{project.leaderName || project.leaderId || "-"}</S.LeaderName>
      </S.LeaderCard>
      <S.ApplyRow>
        <S.ApplyButton
          type="button"
          aria-label={`${project.projectName} 신청하기`}
          onClick={() => navigate(`/project/${project.projectId}/apply`)}
        />
        <S.ApplyText>신청하기</S.ApplyText>
      </S.ApplyRow>
    </S.LeaderSection>
  );
}

export default function ProjectDetailPage() {
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
        console.error("[project] detail fetch failed", error);
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
      <>
        <S.Page>
          <S.Inner>
            <S.NotFoundBox>
              <p>{isLoading ? "프로젝트를 불러오는 중입니다." : errorMessage}</p>
              {!isLoading ? (
                <S.BackButton type="button" onClick={() => navigate("/project")}>
                  프로젝트 목록으로 돌아가기
                </S.BackButton>
              ) : null}
            </S.NotFoundBox>
          </S.Inner>
        </S.Page>
        <Footer />
      </>
    );
  }

  return (
    <>
      <S.Page>
        <S.Inner>
          <ProjectHero project={project} />
          <S.ContentGrid>
            <IntroductionPanel project={project} />
            <LeaderPanel project={project} />
          </S.ContentGrid>
        </S.Inner>
      </S.Page>
      <Footer />
    </>
  );
}
