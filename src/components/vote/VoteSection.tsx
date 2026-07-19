import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getVotes, type VoteListItem, type VoteListPage } from "../../services/voteApi";
import { useLoginRequiredNavigation } from "../../hooks/useLoginRequiredNavigation";
import LoginRequiredModal from "../common/LoginRequiredModal/LoginRequiredModal";
import { useAuthStore } from "../../stores/authStore";
import { canApplyAsMember } from "../../utils/memberPermission";
import * as S from "./VoteSection.styles";

const PAGE_SIZE = 10;

const formatDateTime = (value: string | null) => {
  if (!value) {
    return "마감 없음";
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

const getStatusLabel = (vote: VoteListItem) =>
  vote.isClosed ? "종료" : "진행 중";

const getPageNumbers = (currentPage: number, totalPages: number) => {
  if (totalPages <= 1) {
    return [0];
  }

  const pages = new Set([0, currentPage - 1, currentPage, currentPage + 1, totalPages - 1]);
  return Array.from(pages)
    .filter((page) => page >= 0 && page < totalPages)
    .sort((a, b) => a - b);
};

export default function VoteSection() {
  const navigate = useNavigate();
  const { isLoginRequiredOpen, moveToLogin, navigateWithAuth } =
    useLoginRequiredNavigation();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const roleId = useAuthStore((state) => state.roleId);
  const roleName = useAuthStore((state) => state.roleName);
  const isProfileLoading = useAuthStore((state) => state.isProfileLoading);
  const [isMemberRequiredOpen, setIsMemberRequiredOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [votePage, setVotePage] = useState<VoteListPage>({
    content: [],
    totalPages: 0,
    totalElements: 0,
    number: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let ignore = false;

    const loadVotes = async () => {
      setIsLoading(true);
      setErrorMessage("");

      try {
        const result = await getVotes({ page, size: PAGE_SIZE });
        if (!ignore) {
          setVotePage(result);
        }
      } catch (error) {
        console.error("[vote/list] failed", error);
        if (!ignore) {
          setVotePage({
            content: [],
            totalPages: 0,
            totalElements: 0,
            number: page,
          });
          setErrorMessage("투표 목록을 불러오지 못했습니다.");
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    };

    void loadVotes();

    return () => {
      ignore = true;
    };
  }, [page]);

  const pageNumbers = useMemo(
    () => getPageNumbers(votePage.number, votePage.totalPages),
    [votePage.number, votePage.totalPages]
  );

  const canMovePrevious = votePage.number > 0;
  const canMoveNext =
    votePage.totalPages > 0 && votePage.number < votePage.totalPages - 1;

  const handleOpenVoteDetail = (voteId: number) => {
    if (!isAuthenticated) {
      navigateWithAuth(`/vote/${voteId}`);
      return;
    }

    if (isProfileLoading) {
      return;
    }

    if (!canApplyAsMember({ isAuthenticated, roleId, roleName })) {
      setIsMemberRequiredOpen(true);
      return;
    }

    navigate(`/vote/${voteId}`);
  };

  return (
    <>
      <S.HeroSection>
        <S.HeroTextWrap>
          <S.HeroTitle>투표</S.HeroTitle>
          <S.HeroDesc>REVERSE의 투표 목록을 확인해 보세요.</S.HeroDesc>
          <S.HeroRule />
        </S.HeroTextWrap>
      </S.HeroSection>

      <S.Section>
        <S.Inner>
          <S.VoteList>
            {isLoading ? (
              <S.EmptyState>투표 목록을 불러오는 중입니다.</S.EmptyState>
            ) : errorMessage ? (
              <S.EmptyState>{errorMessage}</S.EmptyState>
            ) : votePage.content.length === 0 ? (
              <S.EmptyState>등록된 투표가 없습니다.</S.EmptyState>
            ) : (
              votePage.content.map((vote) => (
                <S.VoteCard
                  key={vote.voteId}
                  type="button"
                  onClick={() => handleOpenVoteDetail(vote.voteId)}
                >
                  <S.VoteInfo>
                    <S.VoteIcon aria-hidden="true" />
                    <S.VoteTextGroup>
                      <S.VoteTitle>{vote.title}</S.VoteTitle>
                      <S.VoteMeta>
                        {vote.optionCount}개 항목 · {vote.totalVoteCount}명 참여 ·{" "}
                        {formatDateTime(vote.deadline)}
                      </S.VoteMeta>
                    </S.VoteTextGroup>
                    <S.StatusBadge $status={vote.isClosed ? "closed" : "active"}>
                      {getStatusLabel(vote)}
                    </S.StatusBadge>
                  </S.VoteInfo>
                  <S.Arrow aria-hidden="true" />
                </S.VoteCard>
              ))
            )}
          </S.VoteList>

          {votePage.totalPages > 1 ? (
            <S.Pagination aria-label="투표 페이지">
              <S.PageNavButton
                type="button"
                disabled={!canMovePrevious}
                onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
              >
                Previous
              </S.PageNavButton>

              {pageNumbers.map((pageNumber, index) => {
                const previousPage = pageNumbers[index - 1];
                const shouldRenderDots =
                  previousPage !== undefined && pageNumber - previousPage > 1;

                return (
                  <S.PageGroup key={pageNumber}>
                    {shouldRenderDots ? <S.PageDots>...</S.PageDots> : null}
                    <S.PageNumberButton
                      type="button"
                      $active={votePage.number === pageNumber}
                      onClick={() => setPage(pageNumber)}
                    >
                      {pageNumber + 1}
                    </S.PageNumberButton>
                  </S.PageGroup>
                );
              })}

              <S.PageNavButton
                type="button"
                disabled={!canMoveNext}
                onClick={() =>
                  setPage((prev) => Math.min(prev + 1, votePage.totalPages - 1))
                }
              >
                Next
              </S.PageNavButton>
            </S.Pagination>
          ) : null}

          <S.WriteButton
            type="button"
            aria-label="투표 작성"
            onClick={() => navigateWithAuth("/vote/write")}
          >
            <S.WriteIcon aria-hidden="true" />
          </S.WriteButton>
        </S.Inner>
      </S.Section>
      <LoginRequiredModal isOpen={isLoginRequiredOpen} onConfirm={moveToLogin} />
      <LoginRequiredModal
        isOpen={isMemberRequiredOpen}
        title="현부원 이상 조회할 수 있습니다."
        description="투표 상세 조회는 멤버 권한부터 이용할 수 있습니다."
        onConfirm={() => setIsMemberRequiredOpen(false)}
      />
    </>
  );
}
