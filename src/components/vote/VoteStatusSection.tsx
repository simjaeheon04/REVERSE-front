import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getVoteDetail, type VoteDetail } from "../../services/voteApi";
import * as S from "./VoteStatusSection.styles";

export default function VoteStatusSection() {
  const navigate = useNavigate();
  const { voteId } = useParams();
  const parsedVoteId = Number(voteId);
  const [vote, setVote] = useState<VoteDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let ignore = false;

    const loadVoteStatus = async () => {
      if (!Number.isFinite(parsedVoteId)) {
        setErrorMessage("잘못된 투표 주소입니다.");
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setErrorMessage("");

      try {
        const result = await getVoteDetail(parsedVoteId);
        if (!ignore) {
          setVote(result);
        }
      } catch (error) {
        console.error("[vote/status] failed", error);
        if (!ignore) {
          setErrorMessage("투표 현황을 불러오지 못했습니다.");
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    };

    void loadVoteStatus();

    return () => {
      ignore = true;
    };
  }, [parsedVoteId]);

  const totalVoteCount = useMemo(
    () => vote?.options.reduce((sum, option) => sum + option.voteCount, 0) ?? 0,
    [vote]
  );

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
              onClick={() => navigate(`/vote/${parsedVoteId}`)}
            >
              x
            </S.CloseButton>

            {isLoading ? (
              <S.StateMessage>투표 현황을 불러오는 중입니다.</S.StateMessage>
            ) : errorMessage || !vote ? (
              <S.StateMessage>{errorMessage || "투표 현황이 없습니다."}</S.StateMessage>
            ) : (
              <>
                <S.VoteTitle>{vote.title}</S.VoteTitle>
                <S.Underline />

                <S.ResultList>
                  {vote.options.map((option) => {
                    const percent =
                      totalVoteCount > 0
                        ? Math.round((option.voteCount / totalVoteCount) * 100)
                        : 0;

                    return (
                      <S.ResultRow key={option.optionId}>
                        <S.OptionPill>{option.optionText}</S.OptionPill>
                        <S.Count>{option.voteCount}표</S.Count>
                        <S.ResultBarTrack>
                          <S.ResultBar $percent={percent} />
                          <S.PercentText>{percent}%</S.PercentText>
                        </S.ResultBarTrack>
                      </S.ResultRow>
                    );
                  })}
                </S.ResultList>
              </>
            )}
          </S.PanelInner>
        </S.Panel>
      </S.Inner>
    </S.Page>
  );
}
