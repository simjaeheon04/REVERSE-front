import { useEffect, useState, type ChangeEvent } from "react";
import {
  createBoardPost,
  getBoardPosts,
  type BoardPostListItem,
  type BoardPostPayload,
  type BoardType,
} from "../../services/boardAPI";
import * as S from "../NoticeManagePage/NoticeManagePage.styles";

type BoardForm = {
  title: string;
  content: string;
  boardType: BoardType;
};

const initialForm: BoardForm = {
  title: "",
  content: "",
  boardType: "FREE",
};

const boardTypeOptions: { label: string; value: BoardType }[] = [
  { label: "자유", value: "FREE" },
  { label: "대외활동", value: "ACTIVITY" },
  { label: "족보", value: "INFO" },
  { label: "교재·교구 나눔", value: "TRADE" },
  { label: "질의응답", value: "QNA" },
];

export default function BoardManagePage() {
  const [form, setForm] = useState<BoardForm>(initialForm);
  const [listResponse, setListResponse] = useState<BoardPostListItem[]>([]);
  const [submitResponse, setSubmitResponse] = useState<unknown>(null);

  const [submitMessage, setSubmitMessage] = useState("");
  const [listMessage, setListMessage] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFetchingList, setIsFetchingList] = useState(false);

  useEffect(() => {
    handleFetchList();
  }, []);

  const handleTextChange =
    (key: keyof Pick<BoardForm, "title" | "content">) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({
        ...prev,
        [key]: event.target.value,
      }));
    };

  const handleBoardTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setForm((prev) => ({
      ...prev,
      boardType: event.target.value as BoardType,
    }));
  };

  const resetForm = () => {
    setForm(initialForm);
    setSubmitMessage("");
    setSubmitResponse(null);
  };

  const handleSubmit = async () => {
    if (!form.title.trim() || !form.content.trim()) {
      setSubmitMessage("제목과 내용을 모두 입력해주세요.");
      return;
    }

    try {
      setIsSubmitting(true);
      setSubmitMessage("");

      const payload: BoardPostPayload = {
        title: form.title.trim(),
        content: form.content.trim(),
        boardType: form.boardType,
      };

      const result = await createBoardPost(payload);
      setSubmitResponse(result);
      setSubmitMessage("게시글 등록이 완료되었습니다.");
      setForm(initialForm);

      await handleFetchList();
    } catch (error) {
      console.error("board submit failed", error);
      setSubmitMessage("게시글 등록에 실패했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFetchList = async () => {
    try {
      setIsFetchingList(true);
      setListMessage("");

      const result = await getBoardPosts({
        page: 1,
        size: 20,
      });

      setListResponse(result.posts);
      setListMessage("게시글 목록을 불러왔습니다.");
    } catch (error) {
      console.error("board list failed", error);
      setListResponse([]);
      setListMessage("게시글 목록 조회에 실패했습니다.");
    } finally {
      setIsFetchingList(false);
    }
  };

  return (
    <S.Page>
      <S.Shell>
        <S.Header>
          <S.Eyebrow>Board Admin</S.Eyebrow>
          <S.Title>게시판 관리</S.Title>
          <S.Description>
            메인 게시판 게시글 목록 조회와 게시글 등록 API를 확인하는 관리
            페이지입니다.
          </S.Description>
        </S.Header>

        <S.Grid>
          <S.Card>
            <S.CardTitle>게시글 목록 조회</S.CardTitle>
            <S.CardText>
              <code>GET /api/posts</code> 요청으로 메인 게시판 게시글 목록을
              조회합니다.
            </S.CardText>

            <S.PrimaryButton type="button" onClick={handleFetchList}>
              {isFetchingList ? "로딩..." : "새로고침"}
            </S.PrimaryButton>

            {listMessage ? <S.StatusText>{listMessage}</S.StatusText> : null}

            <S.CodeBlock>
              {listResponse.length
                ? JSON.stringify(listResponse, null, 2)
                : "목록 데이터가 없습니다."}
            </S.CodeBlock>
          </S.Card>

          <S.Card>
            <S.CardTitle>게시글 등록</S.CardTitle>
            <S.CardText>
              <code>POST /api/posts</code> 요청으로 게시글을 등록합니다.
            </S.CardText>

            <S.Input
              value={form.title}
              onChange={handleTextChange("title")}
              placeholder="제목"
            />

            <S.Input as="select" value={form.boardType} onChange={handleBoardTypeChange}>
              {boardTypeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </S.Input>

            <S.TextArea
              value={form.content}
              onChange={handleTextChange("content")}
              placeholder="내용"
            />

            <S.ButtonRow>
              <S.PrimaryButton type="button" onClick={handleSubmit}>
                {isSubmitting ? "처리 중..." : "등록"}
              </S.PrimaryButton>

              <S.SecondaryButton type="button" onClick={resetForm}>
                폼 초기화
              </S.SecondaryButton>
            </S.ButtonRow>

            {submitMessage ? <S.StatusText>{submitMessage}</S.StatusText> : null}

            <S.CodeBlock>{JSON.stringify(form, null, 2)}</S.CodeBlock>
            <S.CodeBlock>
              {submitResponse
                ? JSON.stringify(submitResponse, null, 2)
                : "등록 응답이 없습니다."}
            </S.CodeBlock>
          </S.Card>
        </S.Grid>
      </S.Shell>
    </S.Page>
  );
}
