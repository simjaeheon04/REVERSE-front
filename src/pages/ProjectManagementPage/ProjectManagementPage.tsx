import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import editIcon from "../../assets/icons/Edit.png";
import fileTextIcon from "../../assets/icons/File_text.png";
import Footer from "../../components/common/footer/Footer";
import LoginRequiredModal from "../../components/common/LoginRequiredModal/LoginRequiredModal";
import { useLoginRequiredNavigation } from "../../hooks/useLoginRequiredNavigation";
import {
  deleteProjectPost,
  getMyProjects,
  type ProjectListItem,
} from "../../services/projectAPI";
import * as S from "./ProjectManagementPage.styles";

const getSafeText = (value: unknown, fallback: string) =>
  typeof value === "string" && value.trim() ? value : fallback;

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

export default function ProjectManagementPage() {
  const navigate = useNavigate();
  const { isLoginRequiredOpen, moveToLogin, navigateWithAuth } =
    useLoginRequiredNavigation();
  const [projects, setProjects] = useState<ProjectListItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<ProjectListItem | null>(null);

  const loadProjects = async () => {
    try {
      setIsLoading(true);
      setErrorMessage("");
      const result = await getMyProjects({ page: 0, size: 50 });
      setProjects(result.content);
    } catch (error) {
      console.error("[project/manage] load failed", error);
      setProjects([]);
      setErrorMessage(
        getApiErrorMessage(error, "프로젝트 목록을 불러오지 못했습니다.")
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadProjects();
  }, []);

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) {
      return;
    }

    try {
      setIsDeleting(true);
      setErrorMessage("");
      await deleteProjectPost(deleteTarget.projectId);
      setDeleteTarget(null);
      await loadProjects();
    } catch (error) {
      console.error("[project/manage] delete failed", error);
      setErrorMessage(
        getApiErrorMessage(error, "프로젝트 모집글 삭제에 실패했습니다.")
      );
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <S.Page>
        <S.Frame>
          <S.Hero>
            <S.HeroTitle>Project Management</S.HeroTitle>
            <S.HeroText>나의 프로젝트를 관리하는 페이지입니다.</S.HeroText>
          </S.Hero>

          <S.SummaryBar>
            <S.SummaryItem>
              <S.SummaryIcon src={fileTextIcon} alt="" aria-hidden="true" />
              <S.SummaryTextGroup>
                <S.SummaryValue>{projects.length}</S.SummaryValue>
                <S.SummaryLabel>나의 프로젝트</S.SummaryLabel>
              </S.SummaryTextGroup>
            </S.SummaryItem>

            <S.SummaryAction>
              <S.WriteActionButton
                type="button"
                onClick={() => navigateWithAuth("/project/write")}
              >
                <S.WriteActionIcon src={editIcon} alt="" aria-hidden="true" />
                프로젝트 글 작성하기
              </S.WriteActionButton>
            </S.SummaryAction>
          </S.SummaryBar>

          <S.SectionHeader>
            <S.Caret>▾</S.Caret>
            <span>내 프로젝트</span>
          </S.SectionHeader>

          {isLoading ? (
            <S.EmptyPanel>내 프로젝트를 불러오는 중입니다.</S.EmptyPanel>
          ) : null}
          {!isLoading && errorMessage ? (
            <S.EmptyPanel>{errorMessage}</S.EmptyPanel>
          ) : null}
          {!isLoading && !errorMessage && projects.length === 0 ? (
            <S.EmptyPanel>아직 작성한 프로젝트 모집글이 없습니다.</S.EmptyPanel>
          ) : null}

          {!isLoading && !errorMessage && projects.length > 0 ? (
            <S.List>
              {projects.map((project) => (
                <S.Card key={project.projectId}>
                  <S.CardTitle>
                    {getSafeText(project.projectName, "제목 없음")}
                  </S.CardTitle>

                  <S.CardActions>
                    <S.SecondaryButton
                      type="button"
                      onClick={() =>
                        navigate(
                          `/project/write?mode=edit&projectId=${project.projectId}`
                        )
                      }
                    >
                      수정
                    </S.SecondaryButton>
                    <S.SecondaryButton
                      type="button"
                      onClick={() => setDeleteTarget(project)}
                    >
                      삭제
                    </S.SecondaryButton>
                  </S.CardActions>
                </S.Card>
              ))}
            </S.List>
          ) : null}
        </S.Frame>
      </S.Page>
      <Footer />
      <LoginRequiredModal isOpen={isLoginRequiredOpen} onConfirm={moveToLogin} />

      {deleteTarget ? (
        <S.ModalOverlay role="presentation">
          <S.ModalCard
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-project-modal-title"
          >
            <S.ModalCloseButton
              type="button"
              aria-label="닫기"
              onClick={() => !isDeleting && setDeleteTarget(null)}
            >
              ×
            </S.ModalCloseButton>
            <S.ModalTitle id="delete-project-modal-title">
              정말로 삭제하시겠습니까?
            </S.ModalTitle>
            <S.ModalText>
              삭제한 프로젝트 모집글은 다시 복구할 수 없습니다.
            </S.ModalText>
            <S.ModalActions>
              <S.ModalSecondaryButton
                type="button"
                onClick={() => setDeleteTarget(null)}
                disabled={isDeleting}
              >
                취소
              </S.ModalSecondaryButton>
              <S.ModalPrimaryButton
                type="button"
                onClick={() => void handleDeleteConfirm()}
                disabled={isDeleting}
              >
                확인
              </S.ModalPrimaryButton>
            </S.ModalActions>
          </S.ModalCard>
        </S.ModalOverlay>
      ) : null}
    </>
  );
}
