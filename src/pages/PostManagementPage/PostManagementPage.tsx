import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import editIcon from "../../assets/icons/Edit.png";
import fileTextIcon from "../../assets/icons/File_text.png";
import heartIcon from "../../assets/icons/Heart.png";
import Footer from "../../components/common/footer/Footer";
import {
  deleteBoardPost,
  getMyBoardPosts,
  getMyBoardStats,
  type BoardMyPostItem,
  type BoardMyStats,
} from "../../services/boardApi";
import { useAuthStore } from "../../stores/authStore";
import * as S from "./PostManagementPage.styles";

const getSafeText = (value: unknown, fallback: string) => {
  return typeof value === "string" && value.trim() ? value : fallback;
};

export default function PostManagementPage() {
  const navigate = useNavigate();
  const currentUserId = useAuthStore((state) => state.userId);
  const [posts, setPosts] = useState<BoardMyPostItem[]>([]);
  const [stats, setStats] = useState<BoardMyStats>({
    postCount: 0,
    totalLikes: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<BoardMyPostItem | null>(null);

  const loadPosts = async () => {
    try {
      setIsLoading(true);
      setErrorMessage("");

      const [statsResult, postsResult] = await Promise.all([
        getMyBoardStats(),
        getMyBoardPosts(0, 10),
      ]);

      setStats({
        postCount: statsResult.postCount ?? 0,
        totalLikes: statsResult.totalLikes ?? 0,
      });
      setPosts(Array.isArray(postsResult.content) ? postsResult.content : []);
    } catch (error) {
      setPosts([]);
      setStats({
        postCount: 0,
        totalLikes: 0,
      });

      if (error instanceof AxiosError && error.response?.status === 401) {
        setErrorMessage("로그인 후 내 게시글을 확인할 수 있습니다.");
      } else {
        setErrorMessage("내 게시글 목록을 불러오지 못했습니다.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadPosts();
  }, []);

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) {
      return;
    }

    try {
      setIsDeleting(true);
      setErrorMessage("");
      console.log("[board/manage] delete target", {
        currentUserId,
        deleteTarget,
      });
      await deleteBoardPost(deleteTarget.id);
      setDeleteTarget(null);
      await loadPosts();
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log("[board/manage] delete error", {
          status: error.response?.status,
          data: error.response?.data,
        });
      }

      if (error instanceof AxiosError && error.response?.status === 403) {
        setErrorMessage("작성자 본인만 게시글을 삭제할 수 있습니다.");
      } else if (error instanceof AxiosError && error.response?.status === 401) {
        setErrorMessage("로그인 후 게시글을 삭제할 수 있습니다.");
      } else {
        setErrorMessage("게시글 삭제에 실패했습니다.");
      }
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <S.Page>
        <S.Frame>
          <S.Hero>
            <S.HeroTitle>Post Management</S.HeroTitle>
            <S.HeroText>
              나의 게시물을 관리하는 페이지입니다. 자유롭게 나만의 게시글을 작성해 보세요.
            </S.HeroText>
          </S.Hero>

          <S.SummaryBar>
            <S.SummaryItem>
              <S.SummaryIcon src={fileTextIcon} alt="" aria-hidden="true" />
              <S.SummaryTextGroup>
                <S.SummaryValue>{stats.postCount}</S.SummaryValue>
                <S.SummaryLabel>내가 쓴 글</S.SummaryLabel>
              </S.SummaryTextGroup>
            </S.SummaryItem>

            <S.SummaryItem>
              <S.SummaryIcon src={heartIcon} alt="" aria-hidden="true" />
              <S.SummaryTextGroup>
                <S.SummaryValue>{stats.totalLikes}</S.SummaryValue>
                <S.SummaryLabel>총 좋아요 수</S.SummaryLabel>
              </S.SummaryTextGroup>
            </S.SummaryItem>

            <S.SummaryAction>
              <S.WriteActionButton type="button" onClick={() => navigate("/board/write")}>
                <S.WriteActionIcon src={editIcon} alt="" aria-hidden="true" />
                게시글 작성하기
              </S.WriteActionButton>
            </S.SummaryAction>
          </S.SummaryBar>

          <S.SectionHeader>
            <S.Caret>⌄</S.Caret>
            <span>내 게시글</span>
          </S.SectionHeader>

          {isLoading ? <S.EmptyPanel>내 게시글을 불러오는 중입니다.</S.EmptyPanel> : null}
          {!isLoading && errorMessage ? <S.EmptyPanel>{errorMessage}</S.EmptyPanel> : null}
          {!isLoading && !errorMessage && posts.length === 0 ? (
            <S.EmptyPanel>아직 작성한 게시글이 없습니다.</S.EmptyPanel>
          ) : null}

          {!isLoading && !errorMessage && posts.length > 0 ? (
            <S.List>
              {posts.map((post) => (
                <S.Card key={post.id}>
                  <S.CardTop>
                    <S.CardInfo>
                      <S.CardTitleRow>
                        <S.CardTitle>{getSafeText(post.title, "제목 없음")}</S.CardTitle>
                        <S.CategoryChip>{getSafeText(post.category, "자유")}</S.CategoryChip>
                      </S.CardTitleRow>
                      <S.AuthorRow>
                        <S.AuthorAvatar />
                        <S.AuthorTextGroup>
                          <S.AuthorName>{getSafeText(post.userId, "작성자 없음")}</S.AuthorName>
                          <S.DateText>{getSafeText(post.createdAt, "-")}</S.DateText>
                        </S.AuthorTextGroup>
                      </S.AuthorRow>
                    </S.CardInfo>

                    <S.CardActions>
                      <S.SecondaryButton
                        type="button"
                        onClick={() => navigate(`/board/write?mode=edit&postId=${post.id}`)}
                      >
                        수정
                      </S.SecondaryButton>
                      <S.SecondaryButton type="button" onClick={() => setDeleteTarget(post)}>
                        삭제
                      </S.SecondaryButton>
                    </S.CardActions>
                  </S.CardTop>
                </S.Card>
              ))}
            </S.List>
          ) : null}
        </S.Frame>
      </S.Page>
      <Footer />

      {deleteTarget ? (
        <S.ModalOverlay role="presentation">
          <S.ModalCard role="dialog" aria-modal="true" aria-labelledby="delete-post-modal-title">
            <S.ModalCloseButton
              type="button"
              aria-label="닫기"
              onClick={() => !isDeleting && setDeleteTarget(null)}
            >
              ×
            </S.ModalCloseButton>
            <S.ModalTitle id="delete-post-modal-title">정말로 삭제하시겠습니까?</S.ModalTitle>
            <S.ModalText>삭제된 게시물은 다시 복구할 수 없습니다.</S.ModalText>
            <S.ModalActions>
              <S.ModalSecondaryButton
                type="button"
                onClick={() => setDeleteTarget(null)}
                disabled={isDeleting}
              >
                취소
              </S.ModalSecondaryButton>
              <S.ModalPrimaryButton
                type="button"
                onClick={() => void handleDeleteConfirm()}
                disabled={isDeleting}
              >
                확인
              </S.ModalPrimaryButton>
            </S.ModalActions>
          </S.ModalCard>
        </S.ModalOverlay>
      ) : null}
    </>
  );
}
