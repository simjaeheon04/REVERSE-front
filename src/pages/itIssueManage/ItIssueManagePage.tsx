import { AxiosError } from "axios";
import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import {
  createItIssue,
  deleteItIssue,
  getItIssues,
  updateItIssue,
  type ItIssue,
  type ItIssueUpdatePayload,
} from "../../services/itIssueApi";
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
  const [issueId, setIssueId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<ItIssueUpdatePayload["status"]>("open");
  const [assigneeId, setAssigneeId] = useState("");
  const [response, setResponse] = useState<unknown>(null);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadIssues = async () => {
    try {
      setIsLoading(true);
      setMessage("");
      const result = await getItIssues();
      setIssues(result);
      setResponse(result);
    } catch (error) {
      setIssues([]);
      setMessage(getApiErrorMessage(error, "IT 이슈 목록 조회에 실패했습니다."));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadIssues();
  }, []);

  const handleSelectIssue = (issue: ItIssue) => {
    setIssueId(issue.id);
    setTitle(issue.title);
    setDescription(issue.description ?? "");
    setStatus((issue.status as ItIssueUpdatePayload["status"]) ?? "open");
    setAssigneeId(issue.assigneeId ?? "");
  };

  const handleCreate = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title.trim()) {
      setMessage("IT 이슈 제목을 입력해 주세요.");
      return;
    }

    try {
      setIsSubmitting(true);
      setMessage("");
      const result = await createItIssue({
        title: title.trim(),
        description: description.trim() || undefined,
      });
      setResponse(result);
      setMessage("IT 이슈가 생성되었습니다.");
      await loadIssues();
    } catch (error) {
      setMessage(getApiErrorMessage(error, "IT 이슈 생성에 실패했습니다."));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdate = async () => {
    if (!issueId.trim()) {
      setMessage("수정할 IT 이슈 ID를 입력해 주세요.");
      return;
    }

    try {
      setIsSubmitting(true);
      setMessage("");
      const result = await updateItIssue(issueId.trim(), {
        status,
        assigneeId: assigneeId.trim() || undefined,
      });
      setResponse(result);
      setMessage("IT 이슈가 수정되었습니다.");
      await loadIssues();
    } catch (error) {
      setMessage(getApiErrorMessage(error, "IT 이슈 수정에 실패했습니다."));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!issueId.trim()) {
      setMessage("삭제할 IT 이슈 ID를 입력해 주세요.");
      return;
    }

    try {
      setIsSubmitting(true);
      setMessage("");
      const result = await deleteItIssue(issueId.trim());
      setResponse(result ?? { status: "success" });
      setMessage("IT 이슈가 삭제되었습니다.");
      setIssueId("");
      await loadIssues();
    } catch (error) {
      setMessage(getApiErrorMessage(error, "IT 이슈 삭제에 실패했습니다."));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTextChange =
    (setter: (value: string) => void) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setter(event.target.value);
    };

  return (
    <S.Page>
      <S.Shell>
        <S.Header>
          <S.Eyebrow>IT 이슈 관리자</S.Eyebrow>
          <S.Title>IT 이슈 관리</S.Title>
          <S.Description>
            IT 이슈 목록 조회, 생성, 수정, 삭제 API를 관리합니다.
          </S.Description>
        </S.Header>

        <S.Grid>
          <S.Card>
            <S.CardTitle>IT 이슈 생성</S.CardTitle>
            <S.CardText>
              <code>POST /api/issues</code>로 IT 이슈를 생성합니다.
            </S.CardText>

            <S.Form onSubmit={handleCreate}>
              <S.Field>
                <S.FieldLabel>title</S.FieldLabel>
                <S.Input
                  value={title}
                  onChange={handleTextChange(setTitle)}
                  placeholder="IT 이슈 제목"
                />
              </S.Field>
              <S.Field>
                <S.FieldLabel>description</S.FieldLabel>
                <S.TextArea
                  value={description}
                  onChange={handleTextChange(setDescription)}
                  placeholder="선택 입력"
                />
              </S.Field>
              <S.PrimaryButton type="submit" disabled={isSubmitting}>
                {isSubmitting ? "처리 중" : "IT 이슈 생성"}
              </S.PrimaryButton>
            </S.Form>
          </S.Card>

          <S.Card>
            <S.CardTitle>IT 이슈 조회</S.CardTitle>
            <S.CardText>
              <code>GET /api/issues</code>로 IT 이슈 목록을 조회합니다.
            </S.CardText>
            <S.ButtonRow>
              <S.SecondaryButton type="button" onClick={() => void loadIssues()}>
                {isLoading ? "조회 중" : "목록 새로고침"}
              </S.SecondaryButton>
            </S.ButtonRow>

            <S.ButtonRow>
              {issues.map((issue) => (
                <S.SecondaryButton
                  key={issue.id}
                  type="button"
                  onClick={() => handleSelectIssue(issue)}
                >
                  {issue.id}. {issue.title}
                </S.SecondaryButton>
              ))}
            </S.ButtonRow>
          </S.Card>

          <S.Card>
            <S.CardTitle>IT 이슈 수정 / 삭제</S.CardTitle>
            <S.CardText>
              <code>PATCH /api/issues/{`{issueId}`}</code> 또는{" "}
              <code>DELETE /api/issues/{`{issueId}`}</code> 요청을 보냅니다.
            </S.CardText>

            <S.Field>
              <S.FieldLabel>issueId</S.FieldLabel>
              <S.Input
                value={issueId}
                onChange={handleTextChange(setIssueId)}
                placeholder="예: iss_10"
              />
            </S.Field>
            <S.Field>
              <S.FieldLabel>status</S.FieldLabel>
              <S.Select
                value={status}
                onChange={(event) => setStatus(event.target.value as ItIssueUpdatePayload["status"])}
              >
                <option value="open">open</option>
                <option value="in_progress">in_progress</option>
                <option value="closed">closed</option>
              </S.Select>
            </S.Field>
            <S.Field>
              <S.FieldLabel>assigneeId</S.FieldLabel>
              <S.Input
                value={assigneeId}
                onChange={handleTextChange(setAssigneeId)}
                placeholder="선택 입력"
              />
            </S.Field>

            <S.ButtonRow>
              <S.PrimaryButton type="button" onClick={() => void handleUpdate()}>
                IT 이슈 수정
              </S.PrimaryButton>
              <S.DangerButton type="button" onClick={() => void handleDelete()}>
                IT 이슈 삭제
              </S.DangerButton>
            </S.ButtonRow>
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
