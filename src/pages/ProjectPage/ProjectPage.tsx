import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/common/footer/Footer";
import { PROJECT_POSTS } from "./projectDummyData";
import * as S from "./ProjectPage.styles";

const SEMESTER_OPTIONS = ["2026-1학기", "2025-2학기", "2025-1학기"];
const PAGE_SIZE = 6;

export default function ProjectPage() {
  const navigate = useNavigate();
  const [semester, setSemester] = useState(SEMESTER_OPTIONS[0]);
  const [keyword, setKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredProjects = useMemo(() => {
    const normalizedKeyword = keyword.trim().toLowerCase();

    return PROJECT_POSTS.filter((project) => {
      const matchesSemester = project.semester === semester;
      const matchesKeyword =
        !normalizedKeyword ||
        project.title.toLowerCase().includes(normalizedKeyword) ||
        project.description.toLowerCase().includes(normalizedKeyword);

      return matchesSemester && matchesKeyword;
    });
  }, [keyword, semester]);

  const totalPages = Math.max(1, Math.ceil(filteredProjects.length / PAGE_SIZE));
  const pagedProjects = filteredProjects.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );
  const visiblePages = useMemo(() => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    return [1, 2, 3, "dots" as const, totalPages - 1, totalPages];
  }, [totalPages]);

  const handleSemesterChange = (value: string) => {
    setSemester(value);
    setCurrentPage(1);
  };

  const handleKeywordChange = (value: string) => {
    setKeyword(value);
    setCurrentPage(1);
  };

  return (
    <>
      <S.Page>
        <S.Inner>
          <S.Hero>
            <S.Eyebrow>REVERESSE</S.Eyebrow>
            <S.Title>PROJECT</S.Title>
          </S.Hero>

          <S.ControlRow>
            <S.SemesterSelect
              value={semester}
              onChange={(event) => handleSemesterChange(event.target.value)}
              aria-label="학기 선택"
            >
              {SEMESTER_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </S.SemesterSelect>

            <S.SearchBox>
              <S.SearchInput
                value={keyword}
                onChange={(event) => handleKeywordChange(event.target.value)}
                placeholder="프로젝트 제목을 검색해 보세요!"
                aria-label="프로젝트 검색어"
              />
              <S.SearchIconText aria-hidden="true">[아이콘]</S.SearchIconText>
            </S.SearchBox>
          </S.ControlRow>

          <S.Divider />

          {pagedProjects.length > 0 ? (
            <>
              <S.ProjectGrid>
                {pagedProjects.map((project) => (
                  <S.ProjectCard
                    key={project.id}
                    type="button"
                    onClick={() => navigate(`/project/${project.id}`)}
                  >
                    <S.ProjectImage src={project.imageUrl} alt="" />
                    <S.ProjectInfo>
                      <S.ProjectTitle>{project.title}</S.ProjectTitle>
                      <S.ProjectRule />
                      <S.ProjectDescription>{project.description}</S.ProjectDescription>
                    </S.ProjectInfo>
                  </S.ProjectCard>
                ))}
              </S.ProjectGrid>

              <S.Pagination aria-label="프로젝트 페이지">
                <S.PageNavButton
                  type="button"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                >
                  <span aria-hidden="true">←</span>
                  Previous
                </S.PageNavButton>

                {visiblePages.map((page) =>
                  page === "dots" ? (
                    <S.PageDots key="dots">...</S.PageDots>
                  ) : (
                    <S.PageNumberButton
                      key={page}
                      type="button"
                      $active={currentPage === page}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </S.PageNumberButton>
                  )
                )}

                <S.PageNavButton
                  type="button"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
                >
                  Next
                  <span aria-hidden="true">→</span>
                </S.PageNavButton>
              </S.Pagination>
            </>
          ) : (
            <S.EmptyState>
              <S.EmptyIcon aria-hidden="true">[아이콘]</S.EmptyIcon>
              <S.EmptyText>검색 결과가 없습니다.</S.EmptyText>
            </S.EmptyState>
          )}

          <S.WriteButton type="button" aria-label="프로젝트 작성">
            [아이콘]
          </S.WriteButton>
        </S.Inner>
      </S.Page>
      <Footer />
    </>
  );
}
