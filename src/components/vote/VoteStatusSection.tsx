import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getVoteDetail,
  getVoteResult,
  type VoteResultOption,
  type VoteResult,
} from "../../services/voteApi";
import defaultAvatar from "../../assets/logos/Logo_4.png";
import * as S from "./VoteStatusSection.styles";

type VisibleVoter = {
  name: string;
  imageUrl: string;
};

const getVisibleVoters = (option: VoteResultOption) => {
  if (Array.isArray(option.voters)) {
    return option.voters.map<VisibleVoter>((voter, index) => {
      if (typeof voter === "string") {
        return {
          name: voter,
          imageUrl: defaultAvatar,
        };
      }

      return {
        name:
          voter.userName?.trim() ||
          voter.name?.trim() ||
          voter.voterName?.trim() ||
          voter.userId?.trim() ||
          `알 수 없음 ${index + 1}`,
        imageUrl:
          voter.userPhotoUrl?.trim() ||
          voter.photoUrl?.trim() ||
          voter.profileImageUrl?.trim() ||
          defaultAvatar,
      };
    });
  }

  return [];
};

export default function VoteStatusSection() {
  const navigate = useNavigate();
  const { voteId } = useParams();
  const parsedVoteId = Number(voteId);
  const [vote, setVote] = useState<VoteResult | null>(null);
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
        const result = await getVoteResult(parsedVoteId).catch(async (error) => {
          console.error("[vote/result] failed, fallback to detail", error);
          const detail = await getVoteDetail(parsedVoteId);
          return {
            voteId: detail.voteId,
            creatorId: detail.userId,
            title: detail.title,
            content: detail.content,
            isSecret: detail.isSecret,
            participantRole: detail.participantRole,
            resultViewRole: detail.resultViewRole,
            deadline: detail.deadline,
            isClosed: detail.isClosed,
            totalVoteCount: detail.options.reduce(
              (sum, option) => sum + (option.voteCount ?? 0),
              0
            ),
            options: detail.options.map((option) => ({
              ...option,
              voters: null,
            })),
          };
        });
        if (!ignore) {
          console.log("[vote/status] loaded vote data", result);
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
                    const voteCount = option.voteCount ?? 0;
                    const visibleVoters = getVisibleVoters(option);
                    console.log("[vote/status] option raw data", option);
                    console.log("[vote/status] option parsed voters", {
                      optionId: option.optionId,
                      optionText: option.optionText,
                      voteCount,
                      rawVoters: option.voters,
                      visibleVoters,
                    });

                    return (
                      <S.ResultRow key={option.optionId}>
                        <S.OptionPill>{option.optionText}</S.OptionPill>
                        <S.Count>{voteCount}명</S.Count>
                        <S.Members>
                          {vote.isSecret ? (
                            voteCount > 0 ? (
                              <S.AnonymousText>익명</S.AnonymousText>
                            ) : (
                              <S.EmptyText>투표한 멤버가 없습니다.</S.EmptyText>
                            )
                          ) : visibleVoters.length === 0 ? (
                            <S.EmptyText>투표한 멤버가 없습니다.</S.EmptyText>
                          ) : (
                            visibleVoters.map((voter) => (
                              <S.Member key={`${option.optionId}-${voter.name}`}>
                                <S.AvatarImage src={voter.imageUrl} alt="" />
                                {voter.name}
                              </S.Member>
                            ))
                          )}
                        </S.Members>
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
