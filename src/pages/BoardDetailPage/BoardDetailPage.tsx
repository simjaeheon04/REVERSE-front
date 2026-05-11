import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../../components/common/footer/Footer";
import { getBoardPostById } from "../boardMockData";
import * as S from "./BoardDetailPage.styles";

export default function BoardDetailPage() {
  const navigate = useNavigate();
  const { postId } = useParams();

  const post = useMemo(() => {
    const parsed = Number(postId);
    if (!Number.isFinite(parsed)) {
      return null;
    }

    return getBoardPostById(parsed);
  }, [postId]);

  return (
    <>
      <S.Page>
        <S.Inner>
          {post ? (
            <>
              <S.ContentCard>
                <S.Title>{post.title}</S.Title>
                <S.MetaRow>
                  <S.AuthorBlock>
                    <S.AuthorAvatar />
                    <S.AuthorInfo>
                      <S.AuthorName>{post.author}</S.AuthorName>
                      <S.DateText>{post.createdAt}</S.DateText>
                    </S.AuthorInfo>
                  </S.AuthorBlock>
                  <S.MetaActions>댓글 {post.commentCount}</S.MetaActions>
                </S.MetaRow>

                <S.BodyBox>
                  <S.BodyText>{post.content}</S.BodyText>

                  {post.attachments?.length ? (
                    <S.AttachmentList>
                      {post.attachments.map((attachment) => (
                        <S.AttachmentItem key={attachment.id}>
                          (파일) {attachment.fileName}
                        </S.AttachmentItem>
                      ))}
                    </S.AttachmentList>
                  ) : null}
                </S.BodyBox>

                <S.ActionBar>
                  {post.attachments?.length ? (
                    <S.DownloadLink
                      href={post.attachments[0].downloadUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      ↓ 파일 다운로드
                    </S.DownloadLink>
                  ) : null}

                  <S.LikeButton type="button">♡ {post.likeCount}</S.LikeButton>
                </S.ActionBar>
              </S.ContentCard>

              <S.CommentSection>
                <S.CommentHeader>댓글 ({post.commentCount})</S.CommentHeader>

                <S.CommentComposer>
                  <S.ComposerTop>
                    <S.ComposerAvatar />
                    <span>soo840</span>
                  </S.ComposerTop>
                  <S.ComposerInput placeholder="댓글을 입력해 주세요." />
                  <S.ComposerActions>
                    <S.ComposerSubmitButton type="button">등록</S.ComposerSubmitButton>
                  </S.ComposerActions>
                </S.CommentComposer>

                <S.Divider />

                <S.CommentList>
                  {post.comments.map((comment) => (
                    <S.CommentItem key={comment.id} $depth={comment.depth ?? 0}>
                      <S.CommentRow>
                        <S.CommentAvatar $depth={comment.depth ?? 0} />
                        <S.CommentContent>
                          <S.CommentAuthor>{comment.author}</S.CommentAuthor>
                          <S.CommentDate>{comment.createdAt}</S.CommentDate>
                          <S.CommentText>{comment.content}</S.CommentText>
                        </S.CommentContent>
                      </S.CommentRow>
                    </S.CommentItem>
                  ))}
                </S.CommentList>
              </S.CommentSection>
            </>
          ) : (
            <S.EmptyState>
              <p>해당 게시물을 찾을 수 없습니다.</p>
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

