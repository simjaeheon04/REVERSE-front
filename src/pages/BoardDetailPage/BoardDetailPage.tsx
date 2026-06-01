import { AxiosError } from "axios";
import { Fragment, useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { useNavigate, useParams } from "react-router-dom";
import downloadIcon from "../../assets/icons/download.png";
import heartIcon from "../../assets/icons/Heart.png";
import uploadIcon from "../../assets/icons/upload.png";
import Footer from "../../components/common/footer/Footer";
import {
  createBoardComment,
  createBoardReply,
  deleteBoardComment,
  getBoardComments,
  getBoardPostDetail,
  toggleBoardLike,
  updateBoardComment,
  type BoardComment,
  type BoardPostDetail,
} from "../../services/boardApi";
import { useAuthStore } from "../../stores/authStore";
import * as S from "./BoardDetailPage.styles";

export default function BoardDetailPage() {
  const navigate = useNavigate();
  const { postId } = useParams();
  const currentUserId = useAuthStore((state) => state.userId);
  const [post, setPost] = useState<BoardPostDetail | null>(null);
  const [comments, setComments] = useState<BoardComment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isCommentsLoading, setIsCommentsLoading] = useState(false);
  const [isLikeSubmitting, setIsLikeSubmitting] = useState(false);
  const [isCommentSubmitting, setIsCommentSubmitting] = useState(false);
  const [activeReplyCommentId, setActiveReplyCommentId] = useState<number | null>(null);
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [replyDrafts, setReplyDrafts] = useState<Record<number, string>>({});
  const [editDrafts, setEditDrafts] = useState<Record<number, string>>({});
  const [commentDraft, setCommentDraft] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [commentMessage, setCommentMessage] = useState("");

  const parsedPostId = useMemo(() => {
    const parsed = Number(postId);
    if (!Number.isFinite(parsed)) {
      return null;
    }

    return parsed;
  }, [postId]);

  const loadPost = useCallback(async () => {
    if (parsedPostId === null) {
      setPost(null);
      setErrorMessage("유효하지 않은 게시글 경로입니다.");
      return;
    }

    try {
      setIsLoading(true);
      setErrorMessage("");
      const result = await getBoardPostDetail(parsedPostId);
      setPost(result);
    } catch (error) {
      setPost(null);

      if (error instanceof AxiosError && error.response?.status === 404) {
        setErrorMessage("해당 게시글을 찾을 수 없습니다.");
      } else {
        setErrorMessage("게시글 상세 정보를 불러오지 못했습니다.");
      }
    } finally {
      setIsLoading(false);
    }
  }, [parsedPostId]);

  const loadComments = useCallback(async () => {
    if (parsedPostId === null) {
      setComments([]);
      return;
    }

    try {
      setIsCommentsLoading(true);
      const result = await getBoardComments(parsedPostId);
      setComments(result);
    } catch {
      setComments([]);
      setCommentMessage("댓글 목록을 불러오지 못했습니다.");
    } finally {
      setIsCommentsLoading(false);
    }
  }, [parsedPostId]);

  useEffect(() => {
    void loadPost();
  }, [loadPost]);

  useEffect(() => {
    void loadComments();
  }, [loadComments]);

  const refreshBoardDetail = async () => {
    await Promise.all([loadPost(), loadComments()]);
  };

  const getFileName = (fileUrl: string) => {
    const cleanUrl = fileUrl.split("?")[0] ?? fileUrl;
    const fileName = cleanUrl.split("/").pop();

    return fileName ? decodeURIComponent(fileName) : "첨부 파일";
  };

  const downloadFile = async (fileUrl: string) => {
    const fileName = getFileName(fileUrl);

    try {
      const response = await fetch(fileUrl);

      if (!response.ok) {
        throw new Error(`download failed: ${response.status}`);
      }

      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = objectUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(objectUrl);
    } catch (error) {
      console.log("[board/detail] file download fallback", {
        fileUrl,
        error,
      });

      const link = document.createElement("a");
      link.href = fileUrl;
      link.download = fileName;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      document.body.appendChild(link);
      link.click();
      link.remove();
    }
  };

  const handleDownloadFiles = () => {
    post?.imageUrls.forEach((fileUrl) => {
      void downloadFile(fileUrl);
    });
  };

  const handleToggleLike = async () => {
    if (parsedPostId === null || !post) {
      return;
    }

    try {
      setIsLikeSubmitting(true);
      setCommentMessage("");
      const isLiked = await toggleBoardLike(parsedPostId);
      setPost((prev) =>
        prev
          ? {
              ...prev,
              likeCount: Math.max(0, prev.likeCount + (isLiked ? 1 : -1)),
            }
          : prev
      );
    } catch {
      setCommentMessage("좋아요 처리에 실패했습니다.");
    } finally {
      setIsLikeSubmitting(false);
    }
  };

  const handleSubmitComment = async () => {
    if (parsedPostId === null || !commentDraft.trim()) {
      setCommentMessage("댓글 내용을 입력해 주세요.");
      return;
    }

    try {
      setIsCommentSubmitting(true);
      setCommentMessage("");
      await createBoardComment(parsedPostId, {
        commentDetail: commentDraft.trim(),
      });
      setCommentDraft("");
      await refreshBoardDetail();
    } catch {
      setCommentMessage("댓글 등록에 실패했습니다.");
    } finally {
      setIsCommentSubmitting(false);
    }
  };

  const handleSubmitReply = async (commentId: number) => {
    if (parsedPostId === null) {
      return;
    }

    const replyDraft = replyDrafts[commentId] ?? "";

    if (!replyDraft.trim()) {
      setCommentMessage("답글 내용을 입력해 주세요.");
      return;
    }

    try {
      setIsCommentSubmitting(true);
      setCommentMessage("");
      await createBoardReply(parsedPostId, commentId, {
        commentDetail: replyDraft.trim(),
      });
      setReplyDrafts((prev) => ({
        ...prev,
        [commentId]: "",
      }));
      setActiveReplyCommentId(null);
      await refreshBoardDetail();
    } catch {
      setCommentMessage("답글 등록에 실패했습니다.");
    } finally {
      setIsCommentSubmitting(false);
    }
  };

  const handleStartEditComment = (comment: BoardComment) => {
    setEditingCommentId(comment.commentId);
    setActiveReplyCommentId(null);
    setEditDrafts((prev) => ({
      ...prev,
      [comment.commentId]: comment.commentDetail,
    }));
  };

  const handleUpdateComment = async (commentId: number) => {
    const editDraft = editDrafts[commentId] ?? "";

    if (!editDraft.trim()) {
      setCommentMessage("수정할 댓글 내용을 입력해 주세요.");
      return;
    }

    try {
      setIsCommentSubmitting(true);
      setCommentMessage("");
      await updateBoardComment(commentId, {
        commentDetail: editDraft.trim(),
      });
      setEditingCommentId(null);
      await refreshBoardDetail();
    } catch {
      setCommentMessage("댓글 수정에 실패했습니다.");
    } finally {
      setIsCommentSubmitting(false);
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    try {
      setIsCommentSubmitting(true);
      setCommentMessage("");
      await deleteBoardComment(commentId);
      await refreshBoardDetail();
    } catch {
      setCommentMessage("댓글 삭제에 실패했습니다.");
    } finally {
      setIsCommentSubmitting(false);
    }
  };

  const renderCommentList = (items: BoardComment[], depth = 0): ReactNode => {
    return items.map((comment) => {
      const replyDraft = replyDrafts[comment.commentId] ?? "";
      const editDraft = editDrafts[comment.commentId] ?? comment.commentDetail;
      const canManageComment = currentUserId && comment.userId === currentUserId;

      return (
        <Fragment key={comment.commentId}>
          <S.CommentItem $depth={depth}>
            <S.CommentRow>
              {depth > 0 ? <S.ReplyMark>↳</S.ReplyMark> : null}
              <S.CommentAvatar $depth={depth} />
              <S.CommentContent>
                <S.CommentAuthor>{comment.userId}</S.CommentAuthor>
                <S.CommentDate>{comment.modifiedAt ?? comment.createdAt}</S.CommentDate>
                {editingCommentId === comment.commentId ? (
                  <S.ReplyComposer>
                    <S.ComposerInput
                      value={editDraft}
                      onChange={(event) =>
                        setEditDrafts((prev) => ({
                          ...prev,
                          [comment.commentId]: event.target.value,
                        }))
                      }
                      placeholder="댓글을 수정해 주세요."
                    />
                    <S.ComposerActions>
                      <S.ComposerCancelButton
                        type="button"
                        onClick={() => setEditingCommentId(null)}
                        disabled={isCommentSubmitting}
                      >
                        취소
                      </S.ComposerCancelButton>
                      <S.ComposerSubmitButton
                        type="button"
                        onClick={() => void handleUpdateComment(comment.commentId)}
                        disabled={isCommentSubmitting}
                      >
                        수정
                      </S.ComposerSubmitButton>
                    </S.ComposerActions>
                  </S.ReplyComposer>
                ) : (
                  <S.CommentText>{comment.commentDetail}</S.CommentText>
                )}
                <S.CommentActions>
                  <S.CommentActionButton
                    type="button"
                    onClick={() =>
                      setActiveReplyCommentId((prev) =>
                        prev === comment.commentId ? null : comment.commentId
                      )
                    }
                    disabled={isCommentSubmitting}
                  >
                    답글
                  </S.CommentActionButton>
                  {canManageComment ? (
                    <>
                      <S.CommentActionButton
                        type="button"
                        onClick={() => handleStartEditComment(comment)}
                        disabled={isCommentSubmitting}
                      >
                        수정
                      </S.CommentActionButton>
                      <S.CommentActionButton
                        type="button"
                        onClick={() => void handleDeleteComment(comment.commentId)}
                        disabled={isCommentSubmitting}
                      >
                        삭제
                      </S.CommentActionButton>
                    </>
                  ) : null}
                </S.CommentActions>

                {activeReplyCommentId === comment.commentId ? (
                  <S.ReplyComposer>
                    <S.ComposerTop>
                      <S.ComposerAvatar />
                    </S.ComposerTop>
                    <S.ComposerInput
                      value={replyDraft}
                      onChange={(event) =>
                        setReplyDrafts((prev) => ({
                          ...prev,
                          [comment.commentId]: event.target.value,
                        }))
                      }
                      placeholder="답글을 입력해 주세요."
                    />
                    <S.ComposerActions>
                      <S.ComposerCancelButton
                        type="button"
                        onClick={() => setActiveReplyCommentId(null)}
                        disabled={isCommentSubmitting}
                      >
                        취소
                      </S.ComposerCancelButton>
                      <S.ComposerSubmitButton
                        type="button"
                        onClick={() => void handleSubmitReply(comment.commentId)}
                        disabled={isCommentSubmitting}
                      >
                        <S.ButtonIcon src={uploadIcon} alt="" aria-hidden="true" />
                        {isCommentSubmitting ? "등록 중..." : "등록"}
                      </S.ComposerSubmitButton>
                    </S.ComposerActions>
                  </S.ReplyComposer>
                ) : null}
              </S.CommentContent>
            </S.CommentRow>
          </S.CommentItem>

          {comment.replies?.length ? renderCommentList(comment.replies, depth + 1) : null}
        </Fragment>
      );
    });
  };

  return (
    <>
      <S.Page>
        <S.Inner>
          {isLoading ? (
            <S.EmptyState>
              <p>게시글을 불러오는 중입니다.</p>
            </S.EmptyState>
          ) : post ? (
            <>
              <S.ContentCard>
                <S.Title>{post.title}</S.Title>
                <S.MetaRow>
                  <S.AuthorBlock>
                    <S.AuthorAvatar />
                    <S.AuthorInfo>
                      <S.AuthorName>{post.userId}</S.AuthorName>
                      <S.DateText>{post.createdAt}</S.DateText>
                    </S.AuthorInfo>
                  </S.AuthorBlock>
                  <S.MetaActions>댓글 {post.commentCount}</S.MetaActions>
                </S.MetaRow>

                <S.BodyBox>
                  <S.BodyText>{post.content}</S.BodyText>

                  {post.imageUrls?.length ? (
                    <S.FileList>
                      {post.imageUrls.map((fileUrl) => (
                        <S.FileItem
                          key={fileUrl}
                          href={fileUrl}
                          download={getFileName(fileUrl)}
                          target="_blank"
                          rel="noreferrer"
                        >
                          (파일) {getFileName(fileUrl)}
                        </S.FileItem>
                      ))}
                    </S.FileList>
                  ) : null}
                </S.BodyBox>

                <S.ActionBar>
                  {post.imageUrls?.length ? (
                    <S.DownloadButton type="button" onClick={handleDownloadFiles}>
                      <S.ActionIcon src={downloadIcon} alt="" aria-hidden="true" />
                      파일 다운로드
                    </S.DownloadButton>
                  ) : null}
                  <S.LikeButton
                    type="button"
                    onClick={() => void handleToggleLike()}
                    disabled={isLikeSubmitting}
                  >
                    <S.ActionIcon src={heartIcon} alt="" aria-hidden="true" />
                    {isLikeSubmitting ? "..." : post.likeCount}
                  </S.LikeButton>
                </S.ActionBar>
              </S.ContentCard>

              <S.CommentSection>
                <S.CommentHeader>댓글 ({post.commentCount})</S.CommentHeader>

                <S.CommentComposer>
                  <S.ComposerTop>
                    <S.ComposerAvatar />
                    <S.ComposerName>{currentUserId ?? "사용자"}</S.ComposerName>
                  </S.ComposerTop>
                  <S.ComposerInput
                    $isMainComposer
                    value={commentDraft}
                    onChange={(event) => setCommentDraft(event.target.value)}
                    placeholder="댓글을 입력해 주세요."
                  />
                  <S.ComposerActions>
                    <S.ComposerCancelButton
                      type="button"
                      onClick={() => setCommentDraft("")}
                      disabled={isCommentSubmitting}
                    >
                      취소
                    </S.ComposerCancelButton>
                    <S.ComposerSubmitButton
                      type="button"
                      onClick={() => void handleSubmitComment()}
                      disabled={isCommentSubmitting}
                    >
                      <S.ButtonIcon src={uploadIcon} alt="" aria-hidden="true" />
                      {isCommentSubmitting ? "등록 중..." : "등록"}
                    </S.ComposerSubmitButton>
                  </S.ComposerActions>
                </S.CommentComposer>

                {commentMessage ? <S.CommentEmptyText>{commentMessage}</S.CommentEmptyText> : null}

                <S.Divider />

                <S.CommentList>
                  {isCommentsLoading ? (
                    <S.CommentEmptyText>댓글을 불러오는 중입니다.</S.CommentEmptyText>
                  ) : comments.length > 0 ? (
                    renderCommentList(comments)
                  ) : (
                    <S.CommentEmptyText>아직 등록된 댓글이 없습니다.</S.CommentEmptyText>
                  )}
                </S.CommentList>
              </S.CommentSection>
            </>
          ) : (
            <S.EmptyState>
              <p>{errorMessage || "해당 게시글을 찾을 수 없습니다."}</p>
              <S.BackButton type="button" onClick={() => navigate("/board")}>
                게시판으로 돌아가기
              </S.BackButton>
            </S.EmptyState>
          )}
        </S.Inner>
      </S.Page>
      <Footer />
    </>
  );
}
