import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import editIcon from "../../assets/icons/Edit.png";
import fileTextIcon from "../../assets/icons/File_text.png";
import Footer from "../../components/common/footer/Footer";
import LoginRequiredModal from "../../components/common/LoginRequiredModal/LoginRequiredModal";
import { useLoginRequiredNavigation } from "../../hooks/useLoginRequiredNavigation";
import {
  deleteVote,
  getMyVotes,
  type VoteListItem,
} from "../../services/voteApi";
import { useAuthStore } from "../../stores/authStore";
import * as S from "./VoteManagementPage.styles";

const formatDateTime = (value: string | null) => {
  if (!value) {
    return "마감일 없음";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value.replace("T", " ");
  }

  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

const getApiErrorMessage = (error: unknown, fallback: string) => {
  if (error instanceof AxiosError) {
    const data = error.response?.data;
    if (data && typeof data === "object" && "message" in data) {
      const message = (data as { message?: unknown }).message;
      if (typeof message === "string" && message.trim()) {
        return message;
      }
    }
    if (typeof data === "string" && data.trim()) {
      return data;
    }
  }

  return fallback;
};

export default function VoteManagementPage() {
  const navigate = useNavigate();
  const { isLoginRequiredOpen, moveToLogin, navigateWithAuth } =
    useLoginRequiredNavigation();
  const currentUserId = useAuthStore((state) => state.userId);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const [votes, setVotes] = useState<VoteListItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<VoteListItem | null>(null);

  const loadVotes = async () => {
    if (!isAuthenticated || !currentUserId) {
      setVotes([]);
      setErrorMessage("로그인 후 내가 올린 투표 글을 확인할 수 있습니다.");
      return;
    }

    try {
      setIsLoading(true);
      setErrorMessage("");
      const result = await getMyVotes(currentUserId);
      setVotes(result);
    } catch (error) {
      console.error("[vote/manage] load failed", error);
      setVotes([]);
      setErrorMessage(
        getApiErrorMessage(error, "내 투표 글 목록을 불러오지 못했습니다.")
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadVotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUserId, isAuthenticated]);

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) {
      return;
    }

    try {
      setIsDeleting(true);
      setErrorMessage("");
      await deleteVote(deleteTarget.voteId);
      setDeleteTarget(null);
      await loadVotes();
    } catch (error) {
      console.error("[vote/manage] delete failed", error);
      setErrorMessage(getApiErrorMessage(error, "투표 삭제에 실패했습니다."));
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <S.Page>
        <S.Frame>
          <S.Hero>
            <S.HeroTitle>Vote Management</S.HeroTitle>
            <S.HeroText>나의 투표 글을 관리하는 페이지입니다.</S.HeroText>
          </S.Hero>

          <S.SummaryBar>
            <S.SummaryItem>
              <S.SummaryIcon src={fileTextIcon} alt="" aria-hidden="true" />
              <S.SummaryTextGroup>
                <S.SummaryValue>{votes.length}</S.SummaryValue>
                <S.SummaryLabel>내가 올린 투표 글</S.SummaryLabel>
              </S.SummaryTextGroup>
            </S.SummaryItem>

            <S.SummaryAction>
              <S.WriteActionButton
                type="button"
                onClick={() => navigateWithAuth("/vote/write")}
              >
                <S.WriteActionIcon src={editIcon} alt="" aria-hidden="true" />
                투표 생성
              </S.WriteActionButton>
            </S.SummaryAction>
          </S.SummaryBar>

          <S.SectionHeader>
            <S.Caret>▾</S.Caret>
            <span>내 투표 글</span>
          </S.SectionHeader>

          {isLoading ? <S.EmptyPanel>내 투표 글을 불러오는 중입니다.</S.EmptyPanel> : null}
          {!isLoading && errorMessage ? <S.EmptyPanel>{errorMessage}</S.EmptyPanel> : null}
          {!isLoading && !errorMessage && votes.length === 0 ? (
            <S.EmptyPanel>아직 생성한 투표 글이 없습니다.</S.EmptyPanel>
          ) : null}

          {!isLoading && !errorMessage && votes.length > 0 ? (
            <S.List>
              {votes.map((vote) => (
                <S.Card key={vote.voteId}>
                  <div>
                    <S.CardTitleRow>
                      <S.CardTitle>{vote.title || "제목 없음"}</S.CardTitle>
                      <S.StatusChip $closed={vote.isClosed}>
                        {vote.isClosed ? "종료" : "진행 중"}
                      </S.StatusChip>
                    </S.CardTitleRow>
                    <S.CardMeta>
                      {vote.optionCount}개 항목 · {vote.totalVoteCount}명 참여 ·{" "}
                      {formatDateTime(vote.deadline)}
                    </S.CardMeta>
                  </div>

                  <S.CardActions>
                    <S.SecondaryButton
                      type="button"
                      onClick={() => navigate(`/vote/${vote.voteId}`)}
                    >
                      보기
                    </S.SecondaryButton>
                    <S.SecondaryButton
                      type="button"
                      onClick={() => setDeleteTarget(vote)}
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
            aria-labelledby="delete-vote-modal-title"
          >
            <S.ModalCloseButton
              type="button"
              aria-label="닫기"
              onClick={() => !isDeleting && setDeleteTarget(null)}
            >
              ×
            </S.ModalCloseButton>
            <S.ModalTitle id="delete-vote-modal-title">
              정말로 삭제하시겠습니까?
            </S.ModalTitle>
            <S.ModalText>삭제한 투표 글은 다시 복구할 수 없습니다.</S.ModalText>
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
