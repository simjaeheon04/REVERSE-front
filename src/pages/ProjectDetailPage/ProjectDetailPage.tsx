import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../../components/common/footer/Footer";
import { PROJECT_POSTS, type ProjectPost } from "../ProjectPage/projectDummyData";
import * as S from "./ProjectDetailPage.styles";

function ProjectHero({ project }: { project: ProjectPost }) {
  return (
    <S.HeroSection>
      <S.ProjectTitle>{project.title}</S.ProjectTitle>
      <S.HeroImage src={project.imageUrl} alt="" />
      <S.ProjectInfoLabel>프로젝트 정보</S.ProjectInfoLabel>
    </S.HeroSection>
  );
}

function IntroductionPanel({ project }: { project: ProjectPost }) {
  const rows = [
    { label: "프로젝트 소개", value: project.introduction },
    { label: "활동 목표", value: project.goal },
    { label: "활동 인원", value: String(project.memberCount) },
    { label: "진행 요일 및 시간", value: project.schedule },
    { label: "진행 장소 및 방법", value: project.place },
    { label: "유의사항", value: project.notes },
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

function LeaderPanel({ project }: { project: ProjectPost }) {
  const navigate = useNavigate();

  return (
    <S.LeaderSection>
      <S.SectionTitle>leader</S.SectionTitle>
      <S.LeaderCard>
        <S.LeaderIcon>[아이콘]</S.LeaderIcon>
        <S.LeaderName>{project.leader}</S.LeaderName>
      </S.LeaderCard>
      <S.ApplyRow>
        <S.ApplyButton
          type="button"
          aria-label={`${project.title} 신청하기`}
          onClick={() => navigate(`/project/${project.id}/apply`)}
        />
        <S.ApplyText>신청하기</S.ApplyText>
      </S.ApplyRow>
    </S.LeaderSection>
  );
}

export default function ProjectDetailPage() {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const project = useMemo(
    () => PROJECT_POSTS.find((item) => String(item.id) === projectId),
    [projectId]
  );

  if (!project) {
    return (
      <>
        <S.Page>
          <S.Inner>
            <S.NotFoundBox>
              <p>프로젝트를 찾을 수 없습니다.</p>
              <S.BackButton type="button" onClick={() => navigate("/project")}>
                프로젝트 목록으로 돌아가기
              </S.BackButton>
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
