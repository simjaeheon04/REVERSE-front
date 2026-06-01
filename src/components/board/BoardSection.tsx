import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMultiBoardPosts, type BoardPostListItem } from "../../services/boardApi";
import * as S from "./BoardSection.styles";

const BOARD_ID = 2;
type BoardCategory = "전체" | "자유" | "대외활동" | "정보" | "교구/교재 나눔" | "질의응답";
type SearchField = "제목" | "본문" | "작성자";

const CATEGORIES: BoardCategory[] = [
  "전체",
  "자유",
  "대외활동",
  "정보",
  "교구/교재 나눔",
  "질의응답",
];

const SEARCH_FIELDS: SearchField[] = ["제목", "본문", "작성자"];

const CATEGORY_LABELS: Record<string, Exclude<BoardCategory, "전체">> = {
  FREE: "자유",
  ACTIVITY: "대외활동",
  INFO: "정보",
  TRADE: "교구/교재 나눔",
  QNA: "질의응답",
  자유: "자유",
  대외활동: "대외활동",
  정보: "정보",
  "교구/교재 나눔": "교구/교재 나눔",
  질의응답: "질의응답",
};

const AVATAR_COLORS = ["#8990a3", "#51a8ff", "#62c9e5", "#c8df3e", "#c69a58", "#ff6e57"];

const getPostId = (post: BoardPostListItem) => post.postId || post.id;

const normalizeCategory = (value?: string | null) => {
  if (!value) {
    return "";
  }

  const trimmed = value.trim();
  return CATEGORY_LABELS[trimmed] ?? trimmed;
};

const getPostCategory = (post: BoardPostListItem) => {
  return normalizeCategory(typeof post.category === "string" ? post.category : post.boardType);
};

const getAuthor = (post: BoardPostListItem) =>
  post.author ?? post.authorName ?? post.writerName ?? post.nickname ?? post.userId ?? "익명 회원";

const formatDate = (date: string) => {
  if (!date) return "";

  return date.slice(0, 10).replaceAll("-", ".");
};

const matchesSearch = (post: BoardPostListItem, searchField: SearchField, keyword: string) => {
  const normalizedKeyword = keyword.trim().toLowerCase();

  if (!normalizedKeyword) {
    return true;
  }

  if (searchField === "제목") {
    return post.title.toLowerCase().includes(normalizedKeyword);
  }

  if (searchField === "본문") {
    return (post.content ?? "").toLowerCase().includes(normalizedKeyword);
  }

  return getAuthor(post).toLowerCase().includes(normalizedKeyword);
};

export default function BoardSection() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<BoardCategory>("전체");
  const [searchField, setSearchField] = useState<SearchField>("제목");
  const [keyword, setKeyword] = useState("");
  const [submittedKeyword, setSubmittedKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [posts, setPosts] = useState<BoardPostListItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const category = getPostCategory(post);
      const categoryMatched = activeCategory === "전체" || category === activeCategory;

      return categoryMatched && matchesSearch(post, searchField, submittedKeyword);
    });
  }, [activeCategory, posts, searchField, submittedKeyword]);

  const pages = useMemo(() => {
    const visiblePages = Math.min(totalPages, 3);
    return Array.from({ length: visiblePages }, (_, index) => index + 1);
  }, [totalPages]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        setStatusMessage("");

        const result = await getMultiBoardPosts(BOARD_ID, {
          page: currentPage - 1,
        });

        setPosts(result.content);
        setTotalPages(Math.max(1, result.totalPages || 1));
        setStatusMessage(result.content.length ? "" : "게시글이 없습니다.");
      } catch (error) {
        console.error("board posts fetch failed", error);
        setPosts([]);
        setTotalPages(1);
        setStatusMessage("게시글 목록을 불러오지 못했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    void fetchPosts();
  }, [currentPage]);

  const handleCategoryChange = (category: BoardCategory) => {
    setActiveCategory(category);
  };

  const handleSearch = () => {
    setSubmittedKeyword(keyword);
  };

  return (
    <>
      <S.HeroSection>
        <S.HeroOverlay />
        <S.HeroTextWrap>
          <S.HeroTitle>게시판</S.HeroTitle>
          <S.HeroDesc>
            리버스 게시판 페이지입니다. 자유롭게 소통하고 필요한 게시물을 확인할 수 있습니다.
            <br />
            자유롭게 글을 남겨 주세요.
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
            {!isLoading && statusMessage ? <S.StatusText>{statusMessage}</S.StatusText> : null}
            {!isLoading && !statusMessage && filteredPosts.length === 0 ? (
              <S.StatusText>조건에 맞는 게시글이 없습니다.</S.StatusText>
            ) : null}

            {!isLoading &&
              !statusMessage &&
              filteredPosts.map((post, index) => {
                const category = getPostCategory(post);

                return (
                  <S.PostCard
                    key={getPostId(post)}
                    type="button"
                    onClick={() => navigate(`/board/${getPostId(post)}`)}
                  >
                    <S.PostInfo>
                      <S.PostTitleRow>
                        <S.PostTitle>{post.title}</S.PostTitle>
                        {category ? <S.PostCategory>{category}</S.PostCategory> : null}
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
                      자세히 보기
                      <S.Arrow aria-hidden="true" />
                    </S.ApplyText>
                  </S.PostCard>
                );
              })}
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

          <S.WriteButton type="button" aria-label="게시글 작성" onClick={() => navigate("/board/write")}>
            <S.WriteIcon />
          </S.WriteButton>
        </S.Inner>
      </S.Section>
    </>
  );
}
