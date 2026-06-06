import { AxiosError } from "axios";
import { useEffect, useMemo, useState } from "react";
import * as S from "./ProjectMonitorPage.styles";
import {
  closeAdminProject,
  deleteAdminProject,
  getAdminProjects,
  type ProjectListItem,
  type ProjectListPage,
} from "../../services/projectAPI";

const PAGE_SIZE = 10;

const initialPage: ProjectListPage = {
  content: [],
  pageNumber: 0,
  pageSize: PAGE_SIZE,
  totalPages: 0,
  totalElements: 0,
  last: true,
};

const getApiErrorMessage = (error: unknown, fallback: string) => {
  if (error instanceof AxiosError) {
    const responseData = error.response?.data;

    if (responseData && typeof responseData === "object") {
      const message = (responseData as { message?: unknown }).message;
      if (typeof message === "string" && message.trim()) {
        return message;
      }
    }
  }

  return fallback;
};

const getSafeText = (value: unknown, fallback: string) =>
  typeof value === "string" && value.trim() ? value : fallback;

const formatSchedules = (project: ProjectListItem) => {
  if (!project.schedules.length) {
    return "일정 없음";
  }

  return project.schedules
    .map((schedule) => `${schedule.dayOfWeek} ${schedule.meetTime}`)
    .join(", ");
};

export default function ProjectMonitorPage() {
  const [projectPage, setProjectPage] = useState<ProjectListPage>(initialPage);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [processingId, setProcessingId] = useState<number | null>(null);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  const canMovePrevious = page > 0;
  const canMoveNext = projectPage.totalPages > 0 && page < projectPage.totalPages - 1;

  const pageNumbers = useMemo(() => {
    if (projectPage.totalPages <= 1) {
      return [0];
    }

    const pages = new Set([0, page - 1, page, page + 1, projectPage.totalPages - 1]);
    return Array.from(pages)
      .filter((pageNumber) => pageNumber >= 0 && pageNumber < projectPage.totalPages)
      .sort((a, b) => a - b);
  }, [page, projectPage.totalPages]);

  const loadProjects = async () => {
    try {
      setIsLoading(true);
      setMessage(null);
      const result = await getAdminProjects({ page, size: PAGE_SIZE });
      setProjectPage(result);
    } catch (error) {
      console.error("[admin/project] list failed", error);
      setProjectPage({ ...initialPage, pageNumber: page });
      setMessage({
        text: getApiErrorMessage(error, "프로젝트 목록을 불러오지 못했습니다."),
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadProjects();
  }, [page]);

  const handleCloseProject = async (project: ProjectListItem) => {
    if (!window.confirm(`'${project.projectName}' 프로젝트를 강제 종료할까요?`)) {
      return;
    }

    try {
      setProcessingId(project.projectId);
      setMessage(null);
      const result = await closeAdminProject(project.projectId);
      setMessage({
        text: result.message || "프로젝트가 종료 처리되었습니다.",
        type: "success",
      });
      await loadProjects();
    } catch (error) {
      console.error("[admin/project] close failed", error);
      setMessage({
        text: getApiErrorMessage(error, "프로젝트 종료 처리에 실패했습니다."),
        type: "error",
      });
    } finally {
      setProcessingId(null);
    }
  };

  const handleDeleteProject = async (project: ProjectListItem) => {
    if (!window.confirm(`'${project.projectName}' 프로젝트를 강제 삭제할까요?`)) {
      return;
    }

    try {
      setProcessingId(project.projectId);
      setMessage(null);
      const result = await deleteAdminProject(project.projectId);
      setMessage({
        text: result.message || "프로젝트가 삭제 처리되었습니다.",
        type: "success",
      });
      await loadProjects();
    } catch (error) {
      console.error("[admin/project] delete failed", error);
      setMessage({
        text: getApiErrorMessage(error, "프로젝트 삭제 처리에 실패했습니다."),
        type: "error",
      });
    } finally {
      setProcessingId(null);
    }
  };

  return (
    <S.Page>
      <S.Shell>
        <S.Header>
          <S.Eyebrow>PROJECT ADMIN</S.Eyebrow>
          <S.Title>프로젝트 운영 관리</S.Title>
          <S.Description>
            전체 프로젝트 모집글을 모니터링하고, 필요 시 관리자가 강제 종료 또는 삭제할 수 있습니다.
          </S.Description>
        </S.Header>

        <S.Card>
          <S.Toolbar>
            <div>
              <S.CardTitle>전체 프로젝트 목록</S.CardTitle>
              <S.CardText>
                총 {projectPage.totalElements}개 · {projectPage.pageNumber + 1} / {Math.max(projectPage.totalPages, 1)} 페이지
              </S.CardText>
            </div>
            <S.SecondaryButton type="button" onClick={() => void loadProjects()} disabled={isLoading}>
              {isLoading ? "불러오는 중..." : "새로고침"}
            </S.SecondaryButton>
          </S.Toolbar>

          {message ? <S.StatusText $error={message.type === "error"}>{message.text}</S.StatusText> : null}

          <S.ProjectTable>
            <thead>
              <tr>
                <th>ID</th>
                <th>프로젝트명</th>
                <th>팀장</th>
                <th>상태</th>
                <th>인원</th>
                <th>일정</th>
                <th>관리</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={7}>프로젝트 목록을 불러오는 중입니다.</td>
                </tr>
              ) : projectPage.content.length === 0 ? (
                <tr>
                  <td colSpan={7}>등록된 프로젝트가 없습니다.</td>
                </tr>
              ) : (
                projectPage.content.map((project) => {
                  const isProcessing = processingId === project.projectId;
                  const isClosed = project.status === "CLOSED" || project.status === "INACTIVE";

                  return (
                    <tr key={project.projectId}>
                      <td>{project.projectId}</td>
                      <td>
                        <S.ProjectName>{getSafeText(project.projectName, "제목 없음")}</S.ProjectName>
                        <S.ProjectDescription>{getSafeText(project.description, "설명 없음")}</S.ProjectDescription>
                      </td>
                      <td>{getSafeText(project.leaderName || project.leaderId, "정보 없음")}</td>
                      <td><S.StatusBadge>{project.status || "ACTIVE"}</S.StatusBadge></td>
                      <td>{project.memberCount}</td>
                      <td>{formatSchedules(project)}</td>
                      <td>
                        <S.ActionGroup>
                          <S.SecondaryButton
                            type="button"
                            onClick={() => void handleCloseProject(project)}
                            disabled={isProcessing || isClosed}
                          >
                            종료
                          </S.SecondaryButton>
                          <S.DangerButton
                            type="button"
                            onClick={() => void handleDeleteProject(project)}
                            disabled={isProcessing}
                          >
                            삭제
                          </S.DangerButton>
                        </S.ActionGroup>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </S.ProjectTable>

          {projectPage.totalPages > 1 ? (
            <S.Pagination>
              <S.SecondaryButton
                type="button"
                disabled={!canMovePrevious || isLoading}
                onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
              >
                이전
              </S.SecondaryButton>
              {pageNumbers.map((pageNumber, index) => {
                const previousPage = pageNumbers[index - 1];
                const shouldRenderDots = previousPage !== undefined && pageNumber - previousPage > 1;

                return (
                  <S.PageGroup key={pageNumber}>
                    {shouldRenderDots ? <S.PageDots>...</S.PageDots> : null}
                    <S.PageButton
                      type="button"
                      $active={pageNumber === page}
                      onClick={() => setPage(pageNumber)}
                      disabled={isLoading}
                    >
                      {pageNumber + 1}
                    </S.PageButton>
                  </S.PageGroup>
                );
              })}
              <S.SecondaryButton
                type="button"
                disabled={!canMoveNext || isLoading}
                onClick={() => setPage((prev) => Math.min(prev + 1, projectPage.totalPages - 1))}
              >
                다음
              </S.SecondaryButton>
            </S.Pagination>
          ) : null}
        </S.Card>
      </S.Shell>
    </S.Page>
  );
}

