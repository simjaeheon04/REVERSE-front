import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/common/footer/Footer";
import { getBoardPostList, type BoardPostListItem } from "../../services/boardApi";
import * as S from "./BoardPage.styles";

export default function BoardPage() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<BoardPostListItem[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const loadPosts = async () => {
      try {
        setIsLoading(true);
        setErrorMessage("");

        const result = await getBoardPostList(0);
        setPosts(Array.isArray(result.content) ? result.content : []);
        setCurrentPage(result.number ?? 0);
        setTotalPages(result.totalPages ?? 0);
      } catch (error) {
        setPosts([]);

        if (error instanceof AxiosError && error.response?.status === 401) {
          setErrorMessage("게시판은 로그인 후 이용할 수 있습니다.");
        } else {
          setErrorMessage("게시글 목록을 불러오지 못했습니다.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    void loadPosts();
  }, []);

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
            {isLoading ? <S.PostPreview>게시글 목록을 불러오는 중입니다.</S.PostPreview> : null}
            {!isLoading && errorMessage ? <S.PostPreview>{errorMessage}</S.PostPreview> : null}
            {!isLoading && !errorMessage && posts.length === 0 ? (
              <S.PostPreview>등록된 게시글이 없습니다.</S.PostPreview>
            ) : null}
            {!isLoading &&
              !errorMessage &&
              posts.map((post) => (
                <S.PostCard
                  key={post.id}
                  type="button"
                  onClick={() => navigate(`/board/${post.id}`)}
                >
                  <S.PostHeader>
                    <S.PostTitle>{post.title}</S.PostTitle>
                    <S.PostMeta>
                      {post.userId} · {post.createdAt}
                    </S.PostMeta>
                  </S.PostHeader>
                  <S.PostPreview>게시글 상세 페이지에서 본문과 이미지를 확인할 수 있습니다.</S.PostPreview>
                  <S.PostFooter>
                    <span>좋아요 {post.likeCount}</span>
                    <span>댓글 {post.commentCount}</span>
                  </S.PostFooter>
                </S.PostCard>
              ))}
          </S.List>

          {!isLoading && !errorMessage && posts.length > 0 ? (
            <S.PostFooter>
              <span>현재 페이지 {currentPage + 1}</span>
              <span>전체 페이지 {Math.max(totalPages, 1)}</span>
            </S.PostFooter>
          ) : null}
        </S.Inner>
      </S.Page>
      <Footer />
    </>
  );
}
