import { useNavigate } from "react-router-dom";
import * as S from "./VoteSection.styles";

type VoteItem = {
  id: number;
  title: string;
  status: "active" | "closed";
};

const VOTE_ITEMS: VoteItem[] = [
  { id: 1, title: "MT 최종 인원 조사", status: "active" },
  { id: 2, title: "OT 최종 인원 조사", status: "closed" },
  { id: 3, title: "종강 파티 인원 조사", status: "closed" },
  { id: 4, title: "AI 박람회 참여", status: "closed" },
  { id: 5, title: "안주 투표", status: "closed" },
  { id: 6, title: "동방 간식 선호도 조사", status: "closed" },
  { id: 7, title: "개강 파티 장소 정하기", status: "closed" },
];

const getStatusLabel = (status: VoteItem["status"]) =>
  status === "active" ? "진행 중" : "종료";

export default function VoteSection() {
  const navigate = useNavigate();

  return (
    <>
      <S.HeroSection>
        <S.HeroTextWrap>
          <S.HeroTitle>투표</S.HeroTitle>
          <S.HeroDesc>리버스 투표 페이지입니다.</S.HeroDesc>
          <S.HeroRule />
        </S.HeroTextWrap>
      </S.HeroSection>

      <S.Section>
        <S.Inner>
          <S.VoteList>
            {VOTE_ITEMS.map((vote) => (
              <S.VoteCard
                key={vote.id}
                type="button"
                onClick={() => navigate(`/vote/${vote.id}`)}
              >
                <S.VoteInfo>
                  <S.VoteIcon aria-hidden="true" />
                  <S.VoteTitle>{vote.title}</S.VoteTitle>
                  <S.StatusBadge $status={vote.status}>
                    {getStatusLabel(vote.status)}
                  </S.StatusBadge>
                </S.VoteInfo>
                <S.Arrow aria-hidden="true" />
              </S.VoteCard>
            ))}
          </S.VoteList>

          <S.Pagination aria-label="투표 페이지">
            <S.PageNavButton type="button">Previous</S.PageNavButton>
            <S.PageNumberButton type="button" $active>
              1
            </S.PageNumberButton>
            <S.PageNumberButton type="button" $active={false}>
              2
            </S.PageNumberButton>
            <S.PageNumberButton type="button" $active={false}>
              3
            </S.PageNumberButton>
            <S.PageDots>...</S.PageDots>
            <S.PageNumberButton type="button" $active={false}>
              67
            </S.PageNumberButton>
            <S.PageNumberButton type="button" $active={false}>
              68
            </S.PageNumberButton>
            <S.PageNavButton type="button">Next</S.PageNavButton>
          </S.Pagination>

          <S.WriteButton
            type="button"
            aria-label="투표 작성"
            onClick={() => navigate("/vote/write")}
          >
            <S.WriteIcon aria-hidden="true" />
          </S.WriteButton>
        </S.Inner>
      </S.Section>
    </>
  );
}
