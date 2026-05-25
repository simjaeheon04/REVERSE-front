import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as S from "./VoteStatusSection.styles";

type VoteMember = {
  id: number;
  name: string;
  tone: string;
};

type VoteStatusOption = {
  id: number;
  label: string;
  members: VoteMember[];
};

type VoteStatus = {
  id: number;
  title: string;
  isAnonymous: boolean;
  options: VoteStatusOption[];
};

const VOTE_STATUS_LIST: VoteStatus[] = [
  {
    id: 1,
    title: "투표 제목",
    isAnonymous: true,
    options: [
      { id: 1, label: "항목1", members: [] },
      { id: 2, label: "항목2", members: [] },
      {
        id: 3,
        label: "항목3",
        members: [
          { id: 1, name: "최우석", tone: "#4da2e8" },
          { id: 2, name: "마시연", tone: "#73c6c8" },
          { id: 3, name: "박수야", tone: "#c8a46a" },
        ],
      },
    ],
  },
  {
    id: 2,
    title: "OT 최종 인원 조사",
    isAnonymous: false,
    options: [
      {
        id: 1,
        label: "참여",
        members: [
          { id: 1, name: "최우석", tone: "#4da2e8" },
          { id: 2, name: "마시연", tone: "#73c6c8" },
        ],
      },
      { id: 2, label: "불참", members: [] },
      {
        id: 3,
        label: "미정",
        members: [{ id: 3, name: "박수야", tone: "#c8a46a" }],
      },
    ],
  },
];

const getInitial = (name: string) => name.trim().charAt(0) || "?";

export default function VoteStatusSection() {
  const navigate = useNavigate();
  const { voteId } = useParams();

  const voteStatus = useMemo(() => {
    const parsedVoteId = Number(voteId);
    return (
      VOTE_STATUS_LIST.find((item) => item.id === parsedVoteId) ??
      VOTE_STATUS_LIST[0]
    );
  }, [voteId]);

  return (
    <S.Page>
      <S.Inner>
        <S.Header>
          <S.Title>투표 현황</S.Title>
          <S.Rule />
        </S.Header>

        <S.Panel>
          <S.PanelInner>
            <S.CloseButton
              type="button"
              aria-label="닫기"
              onClick={() => navigate(`/vote/${voteStatus.id}`)}
            >
              x
            </S.CloseButton>

            <S.VoteTitle>{voteStatus.title}</S.VoteTitle>
            <S.Underline />

            <S.ResultList>
              {voteStatus.options.map((option) => (
                <S.ResultRow key={option.id}>
                  <S.OptionPill>{option.label}</S.OptionPill>
                  <S.Count>{option.members.length}명</S.Count>
                  <S.Members>
                    {option.members.length === 0 ? (
                      <S.EmptyText>투표한 멤버가 없습니다.</S.EmptyText>
                    ) : voteStatus.isAnonymous ? (
                      <S.AnonymousText>익명</S.AnonymousText>
                    ) : (
                      option.members.map((member) => (
                        <S.Member key={member.id}>
                          <S.Avatar $tone={member.tone}>
                            {getInitial(member.name)}
                          </S.Avatar>
                          {member.name}
                        </S.Member>
                      ))
                    )}
                  </S.Members>
                </S.ResultRow>
              ))}
            </S.ResultList>
          </S.PanelInner>
        </S.Panel>
      </S.Inner>
    </S.Page>
  );
}
