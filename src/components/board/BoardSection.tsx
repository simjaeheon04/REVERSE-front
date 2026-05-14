import { useEffect, useMemo, useState } from "react";
import {
  getBoardPosts,
  type BoardPostListItem,
  type BoardSearchType,
  type BoardType,
} from "../../services/boardAPI";
import * as S from "./BoardSection.styles";

type BoardCategory = "전체" | "자유" | "대외활동" | "족보" | "교재·교구 나눔" | "질의응답";
type SearchField = "제목" | "본문" | "작성자";

const CATEGORIES: BoardCategory[] = [
  "전체",
  "자유",
  "대외활동",
  "족보",
  "교재·교구 나눔",
  "질의응답",
];

const SEARCH_FIELDS: SearchField[] = ["제목", "본문", "작성자"];
const PAGE_SIZE = 6;

const CATEGORY_TO_BOARD_TYPE: Record<
  Exclude<BoardCategory, "전체">,
  BoardType
> = {
  자유: "FREE",
  대외활동: "ACTIVITY",
  족보: "INFO",
  "교재·교구 나눔": "TRADE",
  질의응답: "QNA",
};

const BOARD_TYPE_TO_CATEGORY: Record<BoardType, Exclude<BoardCategory, "전체">> = {
  FREE: "자유",
  ACTIVITY: "대외활동",
  INFO: "족보",
  TRADE: "교재·교구 나눔",
  QNA: "질의응답",
};

const SEARCH_FIELD_TO_TYPE: Record<SearchField, BoardSearchType> = {
  제목: "TITLE",
  본문: "CONTENT",
  작성자: "AUTHOR",
};

const AVATAR_COLORS = ["#8990a3", "#51a8ff", "#62c9e5", "#c8df3e", "#c69a58", "#ff6e57"];

const getPostId = (post: BoardPostListItem) => post.postId ?? post.id ?? 0;

const getBoardType = (post: BoardPostListItem): BoardType =>
  post.boardType ?? post.category ?? "FREE";

const getCategory = (post: BoardPostListItem) =>
  BOARD_TYPE_TO_CATEGORY[getBoardType(post)] ?? "자유";

const getAuthor = (post: BoardPostListItem) =>
  post.author ?? post.authorName ?? post.writerName ?? post.nickname ?? "익명 회원";

const formatDate = (date: string) => {
  if (!date) return "";

  return date.slice(0, 10).replaceAll("-", ".");
};

export default function BoardSection() {
  const [activeCategory, setActiveCategory] = useState<BoardCategory>("전체");
  const [searchField, setSearchField] = useState<SearchField>("제목");
  const [keyword, setKeyword] = useState("");
  const [submittedKeyword, setSubmittedKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [posts, setPosts] = useState<BoardPostListItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const pages = useMemo(() => {
    const visiblePages = Math.min(totalPages, 3);
    return Array.from({ length: visiblePages }, (_, index) => index + 1);
  }, [totalPages]);

  useEffect(() => {
    const fetchPosts = async () => {
      const trimmedKeyword = submittedKeyword.trim();

      if (trimmedKeyword && trimmedKeyword.length < 2) {
        setPosts([]);
        setTotalPages(1);
        setStatusMessage("검색어는 2글자 이상 입력해주세요.");
        return;
      }

      try {
        setIsLoading(true);
        setStatusMessage("");

        const result = await getBoardPosts({
          boardType:
            activeCategory === "전체"
              ? undefined
              : CATEGORY_TO_BOARD_TYPE[activeCategory],
          searchType: trimmedKeyword ? SEARCH_FIELD_TO_TYPE[searchField] : undefined,
          keyword: trimmedKeyword || undefined,
          page: currentPage,
          size: PAGE_SIZE,
        });

        setPosts(result.posts);
        setTotalPages(Math.max(1, result.totalPages));
        setStatusMessage(result.posts.length ? "" : "게시글이 없습니다.");
      } catch (error) {
        console.error("board posts fetch failed", error);
        setPosts([]);
        setStatusMessage("게시글 목록을 불러오지 못했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [activeCategory, currentPage, searchField, submittedKeyword]);

  const handleCategoryChange = (category: BoardCategory) => {
    setActiveCategory(category);
    setCurrentPage(1);
  };

  const handleSearch = () => {
    setSubmittedKeyword(keyword);
    setCurrentPage(1);
  };

  return (
    <>
      <S.HeroSection>
        <S.HeroOverlay />
        <S.HeroTextWrap>
          <S.HeroTitle>게시판</S.HeroTitle>
          <S.HeroDesc>
            리버스 게시판 페이지입니다. 자유롭게 소통하고 기타 게시물을 확인할 수 있습니다.
            <br />
            자유롭게 글을 남겨주세요.
          </S.HeroDesc>
        </S.HeroTextWrap>
      </S.HeroSection>

      <S.Section>
        <S.Inner>
          <S.Toolbar>
            <S.CategoryList aria-label="게시판 카테고리">
              {CATEGORIES.map((category) => (
                <S.CategoryButton
                  key={category}
                  type="button"
                  $active={activeCategory === category}
                  onClick={() => handleCategoryChange(category)}
                >
                  {category}
                </S.CategoryButton>
              ))}
            </S.CategoryList>

            <S.SearchArea>
              <S.Select
                value={searchField}
                onChange={(event) => setSearchField(event.target.value as SearchField)}
                aria-label="검색 조건"
              >
                {SEARCH_FIELDS.map((field) => (
                  <option key={field} value={field}>
                    {field}
                  </option>
                ))}
              </S.Select>

              <S.SearchBox>
                <S.SearchInput
                  value={keyword}
                  onChange={(event) => setKeyword(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      handleSearch();
                    }
                  }}
                  placeholder="search"
                  aria-label="게시판 검색어"
                />
                <S.SearchButton type="button" onClick={handleSearch} aria-label="검색">
                  <S.SearchIcon />
                </S.SearchButton>
              </S.SearchBox>
            </S.SearchArea>
          </S.Toolbar>

          <S.PostList>
            {isLoading ? <S.StatusText>게시글을 불러오는 중입니다.</S.StatusText> : null}
            {!isLoading && statusMessage ? (
              <S.StatusText>{statusMessage}</S.StatusText>
            ) : null}

            {!isLoading && posts.map((post, index) => (
              <S.PostCard key={getPostId(post)} type="button">
                <S.PostInfo>
                  <S.PostTitleRow>
                    <S.PostTitle>{post.title}</S.PostTitle>
                    <S.PostCategory>{getCategory(post)}</S.PostCategory>
                  </S.PostTitleRow>

                  <S.MetaRow>
                    <S.Avatar $color={AVATAR_COLORS[index % AVATAR_COLORS.length]}>
                      {getAuthor(post).slice(0, 1)}
                    </S.Avatar>
                    <S.MetaText>
                      <span>{getAuthor(post)}</span>
                      <span>{formatDate(post.createdAt)}</span>
                    </S.MetaText>
                  </S.MetaRow>
                </S.PostInfo>

                <S.ApplyText>
                  Apply Now
                  <S.Arrow aria-hidden="true" />
                </S.ApplyText>
              </S.PostCard>
            ))}
          </S.PostList>

          <S.Pagination aria-label="게시판 페이지">
            <S.PageNavButton
              type="button"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((page) => Math.max(page - 1, 1))}
            >
              Previous
            </S.PageNavButton>
            {pages.map((page) => (
              <S.PageNumberButton
                key={page}
                type="button"
                $active={currentPage === page}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </S.PageNumberButton>
            ))}
            {totalPages > 3 ? (
              <>
                <S.PageDots>...</S.PageDots>
                <S.PageStaticNumber>{totalPages - 1}</S.PageStaticNumber>
                <S.PageStaticNumber>{totalPages}</S.PageStaticNumber>
              </>
            ) : null}
            <S.PageNavButton
              type="button"
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage((page) => Math.min(page + 1, totalPages))}
            >
              Next
            </S.PageNavButton>
          </S.Pagination>

          <S.WriteButton type="button" aria-label="게시글 작성">
            <S.WriteIcon />
          </S.WriteButton>
        </S.Inner>
      </S.Section>
    </>
  );
}
