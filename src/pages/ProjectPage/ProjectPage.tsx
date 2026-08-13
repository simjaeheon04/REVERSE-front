import { useEffect, useMemo, useState } from "react";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import fallbackProjectImage from "../../assets/images/project-main.jpg";
import Footer from "../../components/common/footer/Footer";
import LoginRequiredModal from "../../components/common/LoginRequiredModal/LoginRequiredModal";
import { useLoginRequiredNavigation } from "../../hooks/useLoginRequiredNavigation";
import {
  getProjects,
  type ProjectListItem,
  type ProjectStatus,
} from "../../services/projectAPI";
import * as S from "./ProjectPage.styles";

const STATUS_OPTIONS: Array<{ label: string; value: ProjectStatus | "" }> = [
  { label: "전체", value: "" },
  { label: "진행중", value: "ACTIVE" },
];

const PAGE_SIZE = 6;

const getProjectImage = (project: ProjectListItem) =>
  project.photoUrl?.trim() || fallbackProjectImage;

export default function ProjectPage() {
  const navigate = useNavigate();
  const { isLoginRequiredOpen, moveToLogin, navigateWithAuth } =
    useLoginRequiredNavigation();
  const [status, setStatus] = useState<ProjectStatus | "">("");
  const [keyword, setKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [projects, setProjects] = useState<ProjectListItem[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true);
        setErrorMessage("");

        const result = await getProjects({
          keyword,
          status: status || undefined,
          page: currentPage - 1,
          size: PAGE_SIZE,
        });

        setProjects(result.content);
        setTotalPages(Math.max(1, result.totalPages || 1));
      } catch (error) {
        if (error instanceof AxiosError) {
          console.error("[project/list] failed", {
            status: error.response?.status,
            data: error.response?.data,
            url: error.config?.url,
            params: error.config?.params,
          });
        } else {
          console.error("[project/list] failed", error);
        }
        setProjects([]);
        setTotalPages(1);
        setErrorMessage("프로젝트 목록을 불러오지 못했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    void fetchProjects();
  }, [currentPage, keyword, status]);

  const visiblePages = useMemo(() => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    return [1, 2, 3, "dots" as const, totalPages - 1, totalPages];
  }, [totalPages]);

  const handleStatusChange = (value: ProjectStatus | "") => {
    setStatus(value);
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
              value={status}
              onChange={(event) => handleStatusChange(event.target.value as ProjectStatus | "")}
              aria-label="프로젝트 상태 선택"
            >
              {STATUS_OPTIONS.map((option) => (
                <option key={option.value || "all"} value={option.value}>
                  {option.label}
                </option>
              ))}
            </S.SemesterSelect>

            <S.SearchBox>
              <S.SearchInput
                value={keyword}
                onChange={(event) => handleKeywordChange(event.target.value)}
                placeholder="프로젝트 제목을 검색해 보세요"
                aria-label="프로젝트 검색어"
              />
              <S.SearchIconText aria-hidden="true">검색</S.SearchIconText>
            </S.SearchBox>
          </S.ControlRow>

          <S.Divider />

          {isLoading ? (
            <S.EmptyState>
              <S.EmptyText>프로젝트를 불러오는 중입니다.</S.EmptyText>
            </S.EmptyState>
          ) : errorMessage ? (
            <S.EmptyState>
              <S.EmptyText>{errorMessage}</S.EmptyText>
            </S.EmptyState>
          ) : projects.length > 0 ? (
            <>
              <S.ProjectGrid>
                {projects.map((project) => (
                  <S.ProjectCard
                    key={project.projectId}
                    type="button"
                    onClick={() => navigate(`/project/${project.projectId}`)}
                  >
                    <S.ProjectImage src={getProjectImage(project)} alt="" />
                    <S.ProjectInfo>
                      <S.ProjectTitle>{project.projectName}</S.ProjectTitle>
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
                </S.PageNavButton>
              </S.Pagination>
            </>
          ) : (
            <S.EmptyState>
              <S.EmptyText>검색 결과가 없습니다.</S.EmptyText>
            </S.EmptyState>
          )}

          <S.WriteButton
            type="button"
            aria-label="프로젝트 모집 게시글 작성"
            onClick={() => navigateWithAuth("/project/write")}
          >
            작성
          </S.WriteButton>
        </S.Inner>
      </S.Page>
      <LoginRequiredModal isOpen={isLoginRequiredOpen} onConfirm={moveToLogin} />
      <Footer />
    </>
  );
}
