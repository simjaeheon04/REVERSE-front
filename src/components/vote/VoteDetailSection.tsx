import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  cancelVote,
  getVoteDetail,
  submitVote,
  type VoteDetail,
} from "../../services/voteApi";
import * as S from "./VoteDetailSection.styles";

const getDaysLeftText = (deadline: string | null) => {
  if (!deadline) {
    return "마감일이 설정되지 않은 투표입니다.";
  }

  const deadlineDate = new Date(deadline);
  if (Number.isNaN(deadlineDate.getTime())) {
    return `투표 마감일: ${deadline.replace("T", " ")}`;
  }

  const formattedDeadline = new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(deadlineDate);
  return `마감일: ${formattedDeadline}`;
};

const getTotalVoteCount = (vote: VoteDetail) =>
  vote.options.reduce((sum, option) => sum + (option.voteCount ?? 0), 0);

export default function VoteDetailSection() {
  const navigate = useNavigate();
  const { voteId } = useParams();
  const parsedVoteId = Number(voteId);
  const [vote, setVote] = useState<VoteDetail | null>(null);
  const [selectedOptionId, setSelectedOptionId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const totalVoteCount = useMemo(
    () => (vote ? getTotalVoteCount(vote) : 0),
    [vote]
  );

  const loadVoteDetail = async () => {
    if (!Number.isFinite(parsedVoteId)) {
      setErrorMessage("잘못된 투표 주소입니다.");
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    try {
      const result = await getVoteDetail(parsedVoteId);
      setVote(result);
      setSelectedOptionId(result.myVotedOptionId);
    } catch (error) {
      console.error("[vote/detail] failed", error);
      setErrorMessage("투표 상세 정보를 불러오지 못했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadVoteDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parsedVoteId]);

  const handleSubmit = async () => {
    if (!vote || selectedOptionId === null) {
      alert("투표 항목을 선택해 주세요.");
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await submitVote(vote.voteId, selectedOptionId);
      alert(result.message || "투표가 완료되었습니다.");
      await loadVoteDetail();
    } catch (error) {
      console.error("[vote/detail] submit failed", error);
      alert("투표 처리에 실패했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancelVote = async () => {
    if (!vote) {
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await cancelVote(vote.voteId);
      alert(result.message || "투표가 취소되었습니다.");
      await loadVoteDetail();
    } catch (error) {
      console.error("[vote/detail] cancel failed", error);
      alert("투표 취소에 실패했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <S.Page>
      <S.Inner>
        <S.Header>
          <S.Title>투표 상세보기</S.Title>
          <S.Rule />
        </S.Header>

        <S.Panel>
          <S.PanelInner>
            <S.CloseButton
              type="button"
              aria-label="닫기"
              onClick={() => navigate("/vote")}
            >
              x
            </S.CloseButton>

            {isLoading ? (
              <S.StateMessage>투표 정보를 불러오는 중입니다.</S.StateMessage>
            ) : errorMessage || !vote ? (
              <S.StateMessage>{errorMessage || "투표 정보가 없습니다."}</S.StateMessage>
            ) : (
              <>
                <S.AlertBar>
                  <S.BellIcon aria-hidden="true" />
                  {getDaysLeftText(vote.deadline)}
                </S.AlertBar>

                <S.MetaRow>
                  <S.VoteTitle>{vote.title}</S.VoteTitle>
                  <S.Author>{vote.userId}</S.Author>
                </S.MetaRow>
                {vote.content ? <S.Content>{vote.content}</S.Content> : null}
                <S.Underline />

                <S.OptionList>
                  {vote.options.map((option) => {
                    const isSelected = selectedOptionId === option.optionId;
                    const isMyVote = vote.myVotedOptionId === option.optionId;

                    return (
                      <S.OptionButton
                        key={option.optionId}
                        type="button"
                        $selected={isSelected}
                        disabled={vote.isClosed || vote.myVotedOptionId !== null}
                        onClick={() => setSelectedOptionId(option.optionId)}
                      >
                        <S.CheckCircle $selected={isSelected || isMyVote} />
                        <S.OptionText>{option.optionText}</S.OptionText>
                        <S.OptionCount>{option.voteCount ?? 0}표</S.OptionCount>
                      </S.OptionButton>
                    );
                  })}
                </S.OptionList>

                <S.FooterActions>
                  {vote.isClosed ? (
                    <S.CompletedMessage>마감된 투표입니다.</S.CompletedMessage>
                  ) : vote.myVotedOptionId !== null ? (
                    <S.ActionButton
                      type="button"
                      onClick={handleCancelVote}
                      disabled={isSubmitting}
                    >
                      투표 취소
                    </S.ActionButton>
                  ) : (
                    <S.SubmitButton
                      type="button"
                      onClick={handleSubmit}
                      disabled={isSubmitting || selectedOptionId === null}
                    >
                      투표하기
                    </S.SubmitButton>
                  )}

                  <S.ParticipantButton
                    type="button"
                    onClick={() => navigate(`/vote/${vote.voteId}/status`)}
                  >
                    {totalVoteCount}명 참여
                    <S.ParticipantArrow aria-hidden="true" />
                  </S.ParticipantButton>
                </S.FooterActions>
              </>
            )}
          </S.PanelInner>
        </S.Panel>
      </S.Inner>
    </S.Page>
  );
}
