import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProjectList, type ClubProject } from "../../../services/projectAPI";
import * as S from "./ProjectSection.styles";

const getProjectRoute = (projectName: string) => {
  const normalizedName = projectName.toLowerCase();

  if (normalizedName.includes("study") || projectName.includes("스터디")) {
    return "/study";
  }

  return "/project";
};

export default function ProjectSection() {
  const navigate = useNavigate();
  const [projectData, setProjectData] = useState<ClubProject[]>([]);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProjectList();
        setProjectData(data);
      } catch (error) {
        console.error("[home/project] load failed", error);
      }
    };

    void fetchData();
  }, []);

  return (
    <S.Section id="project-intro">
      <S.Inner>
        <S.Header>
          <S.Title>PROJECT</S.Title>
          <S.Subtitle>REVERSE 프로젝트를 소개합니다!</S.Subtitle>
        </S.Header>

        <S.CardGrid>
          {projectData.map((item, index) => {
            const isHovered = hoveredId === index;
            const route = getProjectRoute(item.projectName);

            return (
              <S.CardItem key={item.projectId ?? index}>
                <S.CardFrame
                  onMouseEnter={() => setHoveredId(index)}
                  onMouseLeave={() =>
                    setHoveredId((prev) => (prev === index ? null : prev))
                  }
                >
                  <S.ImageCard
                    type="button"
                    onClick={() => navigate(route)}
                    aria-label={`${item.projectName} 더보기`}
                  >
                    <S.Image src={item.thumbnailUrl} alt={item.projectName} />
                    <S.HoverOverlay $visible={isHovered}>
                      <S.MoreText>더보기 +</S.MoreText>
                    </S.HoverOverlay>
                  </S.ImageCard>
                </S.CardFrame>

                <S.CardTitle>{item.projectName}</S.CardTitle>
              </S.CardItem>
            );
          })}
        </S.CardGrid>
      </S.Inner>
    </S.Section>
  );
}
