import { useNavigate } from "react-router-dom";
import Footer from "../../components/common/footer/Footer";
import { BOARD_POSTS } from "../boardMockData";
import * as S from "./BoardPage.styles";

export default function BoardPage() {
  const navigate = useNavigate();

  return (
    <>
      <S.Page>
        <S.Inner>
          <S.Header>
            <S.Title>게시판</S.Title>
            <S.WriteButton type="button" onClick={() => navigate("/board/write")}>
              게시글 작성
            </S.WriteButton>
          </S.Header>

          <S.List>
            {BOARD_POSTS.map((post) => (
              <S.PostCard
                key={post.id}
                type="button"
                onClick={() => navigate(`/board/${post.id}`)}
              >
                <S.PostHeader>
                  <S.PostTitle>{post.title}</S.PostTitle>
                  <S.PostMeta>
                    {post.author} · {post.createdAt}
                  </S.PostMeta>
                </S.PostHeader>
                <S.PostPreview>{post.content}</S.PostPreview>
                <S.PostFooter>
                  <span>좋아요 {post.likeCount}</span>
                  <span>댓글 {post.commentCount}</span>
                </S.PostFooter>
              </S.PostCard>
            ))}
          </S.List>
        </S.Inner>
      </S.Page>
      <Footer />
    </>
  );
}

