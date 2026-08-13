import { AxiosError } from "axios";
import { useState, type ChangeEvent } from "react";
import * as S from "../clubIntroManage/ClubIntroManagePage.styles";
import {
  deleteVote,
  getVoteResult,
  getVotes,
  updateVote,
  type VoteCreatePayload,
} from "../../services/voteApi";

const DEFAULT_UPDATE_JSON = `{
  "title": "투표 제목",
  "content": "투표 설명",
  "deadline": "2026-06-10T23:59:00",
  "isMultiple": false,
  "isSecret": false,
  "participantRole": 3,
  "resultViewRole": 3,
  "options": ["항목 1", "항목 2"]
}`;

const stringifyError = (error: unknown, fallback: string) => {
  if (error instanceof AxiosError) {
    const data = error.response?.data;
    console.error("[vote/admin] request failed", {
      status: error.response?.status,
      data,
      message: error.message,
    });

    if (typeof data === "string" && data.trim()) {
      return `[${error.response?.status ?? "ERROR"}] ${data}`;
    }
    if (data && typeof data === "object" && "message" in data) {
      const message = (data as { message?: unknown }).message;
      if (typeof message === "string" && message.trim()) {
        return `[${error.response?.status ?? "ERROR"}] ${message}`;
      }
    }

    if (data) {
      return JSON.stringify(
        {
          status: error.response?.status,
          data,
        },
        null,
        2
      );
    }
  }

  if (error instanceof Error && error.message.trim()) {
    return error.message;
  }

  return fallback;
};

const parseVotePayload = (value: string): VoteCreatePayload => {
  const parsed = JSON.parse(value) as Partial<VoteCreatePayload>;
  if (!parsed.title?.trim()) {
    throw new Error("title은 필수입니다.");
  }
  if (!Array.isArray(parsed.options) || parsed.options.length < 2) {
    throw new Error("options는 최소 2개 이상 필요합니다.");
  }

  return {
    title: parsed.title.trim(),
    content: parsed.content?.trim() || undefined,
    deadline: parsed.deadline || undefined,
    isMultiple: Boolean(parsed.isMultiple),
    isSecret: Boolean(parsed.isSecret),
    participantRole: Number(parsed.participantRole ?? 3),
    resultViewRole: Number(parsed.resultViewRole ?? 3),
    options: parsed.options.map((option) => String(option).trim()).filter(Boolean),
  };
};

export default function VoteAdminPage() {
  const [page, setPage] = useState("0");
  const [size, setSize] = useState("10");
  const [voteId, setVoteId] = useState("");
  const [updateJson, setUpdateJson] = useState(DEFAULT_UPDATE_JSON);
  const [result, setResult] = useState("아직 실행한 요청이 없습니다.");
  const [isLoading, setIsLoading] = useState(false);

  const numericVoteId = Number(voteId);

  const handleText =
    (setter: (value: string) => void) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setter(event.target.value);
    };

  const assertVoteId = () => {
    if (!Number.isFinite(numericVoteId) || numericVoteId <= 0) {
      throw new Error("voteId를 숫자로 입력해 주세요.");
    }
  };

  const runRequest = async (request: () => Promise<unknown>, fallback: string) => {
    try {
      setIsLoading(true);
      setResult("요청 처리 중입니다...");
      const data = await request();
      setResult(JSON.stringify(data, null, 2));
    } catch (error) {
      setResult(stringifyError(error, fallback));
    } finally {
      setIsLoading(false);
    }
  };

  const loadVotes = () =>
    runRequest(
      () => getVotes({ page: Number(page) || 0, size: Number(size) || 10 }),
      "투표 목록 조회에 실패했습니다."
    );

  const loadVoteResult = () =>
    runRequest(async () => {
      assertVoteId();
      return getVoteResult(numericVoteId);
    }, "투표 결과 조회에 실패했습니다.");

  const saveVote = () =>
    runRequest(async () => {
      assertVoteId();
      const payload = parseVotePayload(updateJson);
      return updateVote(numericVoteId, payload);
    }, "투표 수정에 실패했습니다.");

  const removeVote = () =>
    runRequest(async () => {
      assertVoteId();
      return deleteVote(numericVoteId);
    }, "투표 삭제에 실패했습니다.");

  return (
    <S.Page>
      <S.Shell>
        <S.Header>
          <S.Eyebrow>관리자</S.Eyebrow>
          <S.Title>투표 관리</S.Title>
          <S.Description>
            투표 목록, 결과 조회, 수정, 삭제를 한 화면에서 처리합니다. 기존
            투표 API 호출 방식은 유지합니다.
          </S.Description>
        </S.Header>

        <S.Grid>
          <S.Card>
            <S.CardTitle>투표 목록 / 대상 선택</S.CardTitle>
            <S.CardText>
              페이지 조건을 입력하고 수정 또는 삭제할 투표 ID를 지정합니다.
            </S.CardText>
            <S.InlineFields>
              <S.Field>
                <S.FieldLabel>page</S.FieldLabel>
                <S.Input value={page} onChange={handleText(setPage)} />
              </S.Field>
              <S.Field>
                <S.FieldLabel>size</S.FieldLabel>
                <S.Input value={size} onChange={handleText(setSize)} />
              </S.Field>
            </S.InlineFields>
            <S.Field>
              <S.FieldLabel>voteId</S.FieldLabel>
              <S.Input
                value={voteId}
                onChange={handleText(setVoteId)}
                placeholder="1"
              />
            </S.Field>
            <S.ButtonRow>
              <S.PrimaryButton type="button" onClick={() => void loadVotes()}>
                목록 조회
              </S.PrimaryButton>
              <S.SecondaryButton
                type="button"
                onClick={() => void loadVoteResult()}
              >
                결과 조회
              </S.SecondaryButton>
              <S.DangerButton type="button" onClick={() => void removeVote()}>
                투표 삭제
              </S.DangerButton>
            </S.ButtonRow>
          </S.Card>

          <S.Card>
            <S.CardTitle>응답</S.CardTitle>
            <S.CardText>
              {isLoading ? "요청을 보내는 중입니다." : "마지막 요청 결과입니다."}
            </S.CardText>
            <S.CodeBlock>{result}</S.CodeBlock>
          </S.Card>

          <S.Card>
            <S.CardTitle>투표 수정</S.CardTitle>
            <S.CardText>
              <code>PATCH /api/votes/{"{voteId}"}</code>
            </S.CardText>
            <S.Field>
              <S.FieldLabel>수정 Body JSON</S.FieldLabel>
              <S.TextArea
                value={updateJson}
                onChange={handleText(setUpdateJson)}
              />
            </S.Field>
            <S.ButtonRow>
              <S.PrimaryButton type="button" onClick={() => void saveVote()}>
                투표 수정
              </S.PrimaryButton>
            </S.ButtonRow>
          </S.Card>
        </S.Grid>
      </S.Shell>
    </S.Page>
  );
}
