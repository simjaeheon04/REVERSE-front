import { AxiosError } from "axios";
import { Fragment, useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { useNavigate, useParams } from "react-router-dom";
import uploadIcon from "../../assets/icons/upload.png";
import Footer from "../../components/common/footer/Footer";
import {
  createBoardComment,
  createBoardReply,
  getBoardComments,
  getBoardPostDetail,
  toggleBoardLike,
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
  const [replyDrafts, setReplyDrafts] = useState<Record<number, string>>({});
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

  const renderCommentList = (items: BoardComment[], depth = 0): ReactNode => {
    return items.map((comment) => {
      const replyDraft = replyDrafts[comment.commentId] ?? "";

      return (
        <Fragment key={comment.commentId}>
          <S.CommentItem $depth={depth}>
            <S.CommentRow>
              {depth > 0 ? <S.ReplyMark>↳</S.ReplyMark> : null}
              <S.CommentAvatar $depth={depth} />
              <S.CommentContent>
                <S.CommentAuthor>{comment.userId}</S.CommentAuthor>
                <S.CommentDate>{comment.modifiedAt ?? comment.createdAt}</S.CommentDate>
                <S.CommentText>{comment.commentDetail}</S.CommentText>
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
                    <S.ImageList>
                      {post.imageUrls.map((imageUrl) => (
                        <S.ImageItem key={imageUrl} src={imageUrl} alt="게시글 이미지" />
                      ))}
                    </S.ImageList>
                  ) : null}
                </S.BodyBox>

                <S.ActionBar>
                  <S.LikeButton
                    type="button"
                    onClick={() => void handleToggleLike()}
                    disabled={isLikeSubmitting}
                  >
                    {isLikeSubmitting ? "처리 중..." : `좋아요 ${post.likeCount}`}
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
