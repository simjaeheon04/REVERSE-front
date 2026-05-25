import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as S from "./VoteDetailSection.styles";

type VoteDetail = {
  id: number;
  title: string;
  authorName: string;
  daysLeft: number;
  participantCount: number;
  options: string[];
  isAuthor: boolean;
  hasVoted: boolean;
};

const VOTE_DETAILS: VoteDetail[] = [
  {
    id: 1,
    title: "투표 제목",
    authorName: "투표 글 작성자 이름",
    daysLeft: 3,
    participantCount: 3,
    options: ["항목1", "항목2", "항목3"],
    isAuthor: false,
    hasVoted: true,
  },
  {
    id: 2,
    title: "OT 최종 인원 조사",
    authorName: "투표 글 작성자 이름",
    daysLeft: 1,
    participantCount: 3,
    options: ["참여", "불참", "미정"],
    isAuthor: true,
    hasVoted: true,
  },
];

export default function VoteDetailSection() {
  const navigate = useNavigate();
  const { voteId } = useParams();
  const [selectedOption, setSelectedOption] = useState(0);

  const vote = useMemo(() => {
    const parsedVoteId = Number(voteId);
    return (
      VOTE_DETAILS.find((item) => item.id === parsedVoteId) ?? VOTE_DETAILS[0]
    );
  }, [voteId]);

  const handleSubmit = () => {
    console.log("[vote/detail] submit", {
      voteId: vote.id,
      selectedOption: vote.options[selectedOption],
      isAuthor: vote.isAuthor,
    });
  };

  const handleCompleteVote = () => {
    console.log("[vote/detail] complete", {
      voteId: vote.id,
    });
  };

  const handleCloseVote = () => {
    console.log("[vote/detail] close", {
      voteId: vote.id,
    });
  };

  return (
    <S.Page>
      <S.Inner>
        <S.Header>
          <S.Title>투표 글 상세보기</S.Title>
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

            <S.AlertBar>
              <S.BellIcon aria-hidden="true" />
              투표가 {vote.daysLeft}일 후에 종료됩니다.
            </S.AlertBar>

            <S.MetaRow>
              <S.VoteTitle>{vote.title}</S.VoteTitle>
              <S.Author>{vote.authorName}</S.Author>
            </S.MetaRow>
            <S.Underline />

            <S.OptionList>
              {vote.options.map((option, index) => (
                <S.OptionButton
                  key={option}
                  type="button"
                  $selected={selectedOption === index}
                  onClick={() => setSelectedOption(index)}
                >
                  <S.CheckCircle $selected={selectedOption === index} />
                  {option}
                </S.OptionButton>
              ))}
            </S.OptionList>

            <S.FooterActions>
              {vote.isAuthor ? (
                <S.AuthorActions>
                  <S.ActionButton type="button" onClick={handleCloseVote}>
                    투표 종료
                  </S.ActionButton>
                  <S.ActionButton type="button" onClick={handleCompleteVote}>
                    투표 완료
                  </S.ActionButton>
                </S.AuthorActions>
              ) : vote.hasVoted ? (
                <S.CompletedMessage>이미 완료된 투표입니다.</S.CompletedMessage>
              ) : (
                <S.SubmitButton type="button" onClick={handleSubmit}>
                  투표하기
                </S.SubmitButton>
              )}

              <S.ParticipantButton
                type="button"
                onClick={() => navigate(`/vote/${vote.id}/status`)}
              >
                {vote.participantCount}명 참여
                <S.ParticipantArrow aria-hidden="true" />
              </S.ParticipantButton>
            </S.FooterActions>
          </S.PanelInner>
        </S.Panel>
      </S.Inner>
    </S.Page>
  );
}
