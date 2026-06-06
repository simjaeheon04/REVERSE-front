import { AxiosError } from "axios";
import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import {
  createAdminBoard,
  deleteAdminBoard,
  deleteAdminPost,
  getAdminBoards,
  getAllBoardPosts,
  type AdminBoard,
  type AdminBoardPayload,
  type BoardPostListItem,
  type BoardPostListPage,
} from "../../services/boardApi";
import * as S from "./BoardAdminPage.styles";

const initialForm: AdminBoardPayload = {
  boardName: "",
  boardDescription: "",
};

const initialPostPage: BoardPostListPage = {
  content: [],
  totalPages: 0,
  totalElements: 0,
  number: 0,
};

const getApiErrorMessage = (error: unknown, fallback: string) => {
  if (error instanceof AxiosError) {
    const responseData = error.response?.data;

    if (responseData && typeof responseData === "object") {
      const message = (responseData as { message?: unknown }).message;
      if (typeof message === "string" && message.trim()) {
        return message;
      }
    }
  }

  return fallback;
};

export default function BoardAdminPage() {
  const [boards, setBoards] = useState<AdminBoard[]>([]);
  const [postPage, setPostPage] = useState<BoardPostListPage>(initialPostPage);
  const [form, setForm] = useState<AdminBoardPayload>(initialForm);
  const [postId, setPostId] = useState("");
  const [postPageNumber, setPostPageNumber] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingPosts, setIsLoadingPosts] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [processingBoardId, setProcessingBoardId] = useState<number | null>(null);
  const [deletingPostId, setDeletingPostId] = useState<number | string | null>(null);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  const loadBoards = async () => {
    try {
      setIsLoading(true);
      setMessage(null);
      const result = await getAdminBoards();
      setBoards(result);
    } catch (error) {
      console.error("[admin/boards] list failed", error);
      setBoards([]);
      setMessage({
        text: getApiErrorMessage(error, "게시판 목록을 불러오지 못했습니다."),
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadBoards();
  }, []);

  const loadPosts = async () => {
    try {
      setIsLoadingPosts(true);
      const result = await getAllBoardPosts(postPageNumber);
      setPostPage(result);
    } catch (error) {
      console.error("[admin/boards] post list failed", error);
      setPostPage({ ...initialPostPage, number: postPageNumber });
      setMessage({
        text: getApiErrorMessage(error, "게시글 목록을 불러오지 못했습니다."),
        type: "error",
      });
    } finally {
      setIsLoadingPosts(false);
    }
  };

  useEffect(() => {
    void loadPosts();
  }, [postPageNumber]);

  const handleFormChange =
    (key: keyof AdminBoardPayload) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({
        ...prev,
        [key]: event.target.value,
      }));
    };

  const handleCreateBoard = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const boardName = form.boardName.trim();
    const boardDescription = form.boardDescription.trim() || `${boardName} 게시판`;

    if (!boardName) {
      setMessage({ text: "게시판 이름을 입력해 주세요.", type: "error" });
      return;
    }

    try {
      setIsSubmitting(true);
      setMessage(null);
      const created = await createAdminBoard({
        boardName,
        boardDescription,
      });
      setMessage({
        text: `${created.boardName || boardName} 게시판이 추가되었습니다.`,
        type: "success",
      });
      setForm(initialForm);
      await loadBoards();
    } catch (error) {
      console.error("[admin/boards] create failed", error);
      setMessage({
        text: getApiErrorMessage(error, "게시판 추가에 실패했습니다."),
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteBoard = async (board: AdminBoard) => {
    if (!window.confirm(`'${board.boardName}' 게시판을 삭제할까요?`)) {
      return;
    }

    try {
      setProcessingBoardId(board.boardId);
      setMessage(null);
      const result = await deleteAdminBoard(board.boardId);
      setMessage({ text: result.message || "게시판이 삭제되었습니다.", type: "success" });
      await loadBoards();
    } catch (error) {
      console.error("[admin/boards] delete board failed", error);
      setMessage({
        text: getApiErrorMessage(error, "게시판 삭제에 실패했습니다."),
        type: "error",
      });
    } finally {
      setProcessingBoardId(null);
    }
  };

  const handleDeletePost = async (targetPostId?: number | string) => {
    const cleanPostId = String(targetPostId ?? postId).trim();
    if (!cleanPostId) {
      setMessage({ text: "강제 삭제할 게시글 ID를 입력해 주세요.", type: "error" });
      return;
    }

    if (!window.confirm(`게시글 ID ${cleanPostId}번을 강제 삭제할까요?`)) {
      return;
    }

    try {
      setDeletingPostId(cleanPostId);
      setMessage(null);
      const result = await deleteAdminPost(cleanPostId);
      setMessage({ text: result.message || "게시글이 삭제되었습니다.", type: "success" });
      setPostId("");
      await loadPosts();
    } catch (error) {
      console.error("[admin/boards] delete post failed", error);
      setMessage({
        text: getApiErrorMessage(error, "게시글 강제 삭제에 실패했습니다."),
        type: "error",
      });
    } finally {
      setDeletingPostId(null);
    }
  };

  const getPostId = (post: BoardPostListItem) => post.postId || post.id;

  const getBoardName = (boardId: number | null) => {
    if (!boardId) {
      return "-";
    }

    return boards.find((board) => board.boardId === boardId)?.boardName ?? `게시판 ${boardId}`;
  };

  return (
    <S.Page>
      <S.Shell>
        <S.Header>
          <S.Eyebrow>BOARD ADMIN</S.Eyebrow>
          <S.Title>게시판 관리자</S.Title>
          <S.Description>
            게시판을 생성/삭제하고, 문제가 있는 게시글을 관리자 권한으로 강제 삭제합니다.
          </S.Description>
        </S.Header>

        {message ? <S.StatusText $error={message.type === "error"}>{message.text}</S.StatusText> : null}

        <S.Grid>
          <S.Card as="form" onSubmit={handleCreateBoard}>
            <S.CardTitle>게시판 추가</S.CardTitle>
            <S.CardText>새 게시판 이름과 설명을 입력해 추가합니다.</S.CardText>

            <S.Field>
              <S.FieldLabel>게시판 이름</S.FieldLabel>
              <S.Input
                value={form.boardName}
                onChange={handleFormChange("boardName")}
                placeholder="예: 자유게시판"
              />
            </S.Field>

            <S.Field>
              <S.FieldLabel>게시판 설명</S.FieldLabel>
              <S.TextArea
                value={form.boardDescription}
                onChange={handleFormChange("boardDescription")}
                placeholder="예: 자유롭게 작성하는 게시판"
              />
            </S.Field>

            <S.ButtonRow>
              <S.PrimaryButton type="submit" disabled={isSubmitting}>
                {isSubmitting ? "추가 중..." : "게시판 추가"}
              </S.PrimaryButton>
              <S.SecondaryButton type="button" onClick={() => setForm(initialForm)}>
                초기화
              </S.SecondaryButton>
            </S.ButtonRow>
          </S.Card>

          <S.Card>
            <S.CardTitle>게시글 강제 삭제</S.CardTitle>
            <S.CardText>작성자와 관계없이 게시글 ID 기준으로 강제 삭제합니다.</S.CardText>

            <S.Field>
              <S.FieldLabel>게시글 ID</S.FieldLabel>
              <S.Input
                value={postId}
                onChange={(event) => setPostId(event.target.value)}
                placeholder="삭제할 게시글 ID"
              />
            </S.Field>

            <S.ButtonRow>
              <S.DangerButton
                type="button"
                onClick={() => void handleDeletePost()}
                disabled={deletingPostId !== null}
              >
                {deletingPostId !== null ? "삭제 중..." : "게시글 강제 삭제"}
              </S.DangerButton>
            </S.ButtonRow>
          </S.Card>
        </S.Grid>

        <S.Card>
          <S.Toolbar>
            <div>
              <S.CardTitle>게시판 목록</S.CardTitle>
              <S.CardText>총 {boards.length}개의 게시판이 등록되어 있습니다.</S.CardText>
            </div>
            <S.SecondaryButton type="button" onClick={() => void loadBoards()} disabled={isLoading}>
              {isLoading ? "불러오는 중..." : "새로고침"}
            </S.SecondaryButton>
          </S.Toolbar>

          <S.BoardTable>
            <thead>
              <tr>
                <th>ID</th>
                <th>게시판 이름</th>
                <th>설명</th>
                <th>관리</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={4}>게시판 목록을 불러오는 중입니다.</td>
                </tr>
              ) : boards.length === 0 ? (
                <tr>
                  <td colSpan={4}>등록된 게시판이 없습니다.</td>
                </tr>
              ) : (
                boards.map((board) => (
                  <tr key={board.boardId}>
                    <td>{board.boardId}</td>
                    <td>{board.boardName}</td>
                    <td>{board.boardDescription}</td>
                    <td>
                      <S.DangerButton
                        type="button"
                        onClick={() => void handleDeleteBoard(board)}
                        disabled={processingBoardId === board.boardId}
                      >
                        삭제
                      </S.DangerButton>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </S.BoardTable>
        </S.Card>

        <S.Card>
          <S.Toolbar>
            <div>
              <S.CardTitle>게시글 전체 목록</S.CardTitle>
              <S.CardText>
                총 {postPage.totalElements}개 · {postPage.number + 1} /{" "}
                {Math.max(postPage.totalPages, 1)} 페이지
              </S.CardText>
            </div>
            <S.SecondaryButton
              type="button"
              onClick={() => void loadPosts()}
              disabled={isLoadingPosts}
            >
              {isLoadingPosts ? "불러오는 중..." : "새로고침"}
            </S.SecondaryButton>
          </S.Toolbar>

          <S.BoardTable>
            <thead>
              <tr>
                <th>ID</th>
                <th>게시판</th>
                <th>제목</th>
                <th>작성자</th>
                <th>작성일</th>
                <th>댓글</th>
                <th>좋아요</th>
                <th>관리</th>
              </tr>
            </thead>
            <tbody>
              {isLoadingPosts ? (
                <tr>
                  <td colSpan={8}>게시글 목록을 불러오는 중입니다.</td>
                </tr>
              ) : postPage.content.length === 0 ? (
                <tr>
                  <td colSpan={8}>등록된 게시글이 없습니다.</td>
                </tr>
              ) : (
                postPage.content.map((post) => {
                  const currentPostId = getPostId(post);

                  return (
                    <tr key={currentPostId}>
                      <td>{currentPostId}</td>
                      <td>{getBoardName(post.boardId)}</td>
                      <td>
                        <S.StrongText>{post.title || "제목 없음"}</S.StrongText>
                      </td>
                      <td>{post.userId || post.authorName || "-"}</td>
                      <td>{post.createdAt || "-"}</td>
                      <td>{post.commentCount}</td>
                      <td>{post.likeCount}</td>
                      <td>
                        <S.DangerButton
                          type="button"
                          onClick={() => void handleDeletePost(currentPostId)}
                          disabled={deletingPostId === String(currentPostId)}
                        >
                          삭제
                        </S.DangerButton>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </S.BoardTable>

          {postPage.totalPages > 1 ? (
            <S.Pagination>
              <S.SecondaryButton
                type="button"
                disabled={postPageNumber <= 0 || isLoadingPosts}
                onClick={() => setPostPageNumber((prev) => Math.max(prev - 1, 0))}
              >
                이전
              </S.SecondaryButton>
              <S.PageText>
                {postPage.number + 1} / {postPage.totalPages}
              </S.PageText>
              <S.SecondaryButton
                type="button"
                disabled={postPageNumber >= postPage.totalPages - 1 || isLoadingPosts}
                onClick={() =>
                  setPostPageNumber((prev) =>
                    Math.min(prev + 1, postPage.totalPages - 1)
                  )
                }
              >
                다음
              </S.SecondaryButton>
            </S.Pagination>
          ) : null}
        </S.Card>
      </S.Shell>
    </S.Page>
  );
}
