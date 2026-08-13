import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { getItIssues, type ItIssue } from "../../services/itIssueApi";
import * as S from "../clubIntroManage/ClubIntroManagePage.styles";

const getApiErrorMessage = (error: unknown, fallback: string) => {
  if (error instanceof AxiosError) {
    const data = error.response?.data;

    if (typeof data === "string" && data.trim()) {
      return data;
    }

    if (data && typeof data === "object") {
      const record = data as Record<string, unknown>;

      if (typeof record.message === "string" && record.message.trim()) {
        return record.message;
      }
    }
  }

  if (error instanceof Error && error.message.trim()) {
    return error.message;
  }

  return fallback;
};

export default function ItIssueManagePage() {
  const [issues, setIssues] = useState<ItIssue[]>([]);
  const [response, setResponse] = useState<unknown>(null);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const loadIssues = async () => {
    try {
      setIsLoading(true);
      setMessage("");
      const result = await getItIssues();
      setIssues(result);
      setResponse(result);
      setMessage("AI Times 최신 IT 이슈 6개를 불러왔습니다.");
    } catch (error) {
      setIssues([]);
      setResponse(null);
      setMessage(getApiErrorMessage(error, "IT 이슈 목록 조회에 실패했습니다."));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadIssues();
  }, []);

  const handleOpenArticle = (sourceUrl: string) => {
    if (!sourceUrl) {
      setMessage("연결된 원문 링크가 없습니다.");
      return;
    }

    window.open(sourceUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <S.Page>
      <S.Shell>
        <S.Header>
          <S.Eyebrow>IT 이슈 관리자</S.Eyebrow>
          <S.Title>IT 이슈 조회</S.Title>
          <S.Description>
            최신 명세 기준 <code>GET /api/it-issues</code>로 AI Times 최신 IT 이슈 6개를
            조회합니다. 서버가 시작 시 수집하고 매일 05:00 자동 갱신합니다.
          </S.Description>
        </S.Header>

        <S.Grid>
          <S.Card>
            <S.CardTitle>IT 이슈 목록</S.CardTitle>
            <S.CardText>
              생성, 수정, 삭제 API는 최신 명세에 없어서 조회와 원문 확인만 제공합니다.
            </S.CardText>
            <S.ButtonRow>
              <S.SecondaryButton type="button" onClick={() => void loadIssues()}>
                {isLoading ? "조회 중" : "목록 새로고침"}
              </S.SecondaryButton>
            </S.ButtonRow>

            {issues.length ? (
              <S.ButtonRow>
                {issues.map((issue) => (
                  <S.SecondaryButton
                    key={issue.id}
                    type="button"
                    onClick={() => handleOpenArticle(issue.sourceUrl)}
                  >
                    {issue.title}
                  </S.SecondaryButton>
                ))}
              </S.ButtonRow>
            ) : (
              <S.StatusText>조회된 IT 이슈가 없습니다.</S.StatusText>
            )}
          </S.Card>

          <S.Card>
            <S.CardTitle>요청 결과</S.CardTitle>
            {message ? <S.StatusText>{message}</S.StatusText> : null}
            <S.CodeBlock>{JSON.stringify(response, null, 2)}</S.CodeBlock>
          </S.Card>
        </S.Grid>
      </S.Shell>
    </S.Page>
  );
}
