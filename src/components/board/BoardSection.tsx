import { useMemo, useState } from "react";
import * as S from "./BoardSection.styles";

type BoardCategory = "전체" | "자유" | "대외활동" | "족보" | "교재·교구 나눔" | "질의응답";
type SearchField = "제목" | "본문" | "작성자";

type BoardPost = {
  id: number;
  title: string;
  category: Exclude<BoardCategory, "전체">;
  author: string;
  createdAt: string;
  content: string;
  avatarColor: string;
};

const CATEGORIES: BoardCategory[] = [
  "전체",
  "자유",
  "대외활동",
  "족보",
  "교재·교구 나눔",
  "질의응답",
];

const SEARCH_FIELDS: SearchField[] = ["제목", "본문", "작성자"];

const BOARD_POSTS: BoardPost[] = [
  {
    id: 1,
    title: "게시글2",
    category: "질의응답",
    author: "익명 회원",
    createdAt: "2026.04.04",
    content: "자유로운 질문과 답변을 나누는 게시글입니다.",
    avatarColor: "#8990a3",
  },
  {
    id: 2,
    title: "게시글3",
    category: "자유",
    author: "익명 회원",
    createdAt: "2026.03.26",
    content: "동아리 생활과 일상 이야기를 공유합니다.",
    avatarColor: "#51a8ff",
  },
  {
    id: 3,
    title: "게시글4",
    category: "자유",
    author: "익명 회원",
    createdAt: "2026.03.10",
    content: "자유게시판에 등록된 게시글입니다.",
    avatarColor: "#62c9e5",
  },
  {
    id: 4,
    title: "게시글5",
    category: "자유",
    author: "익명 회원",
    createdAt: "2026.03.06",
    content: "서로의 정보를 편하게 나누는 공간입니다.",
    avatarColor: "#c8df3e",
  },
  {
    id: 5,
    title: "게시글6",
    category: "교재·교구 나눔",
    author: "익명 회원",
    createdAt: "2026.02.14",
    content: "필요한 교재와 교구를 나누는 게시글입니다.",
    avatarColor: "#c69a58",
  },
  {
    id: 6,
    title: "게시글7",
    category: "대외활동",
    author: "익명 회원",
    createdAt: "2025.10.15",
    content: "대외활동 정보를 공유하는 게시글입니다.",
    avatarColor: "#ff6e57",
  },
];

export default function BoardSection() {
  const [activeCategory, setActiveCategory] = useState<BoardCategory>("전체");
  const [searchField, setSearchField] = useState<SearchField>("제목");
  const [keyword, setKeyword] = useState("");
  const [submittedKeyword, setSubmittedKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredPosts = useMemo(() => {
    const normalizedKeyword = submittedKeyword.trim().toLowerCase();

    return BOARD_POSTS.filter((post) => {
      const matchesCategory =
        activeCategory === "전체" || post.category === activeCategory;

      if (!matchesCategory) {
        return false;
      }

      if (normalizedKeyword.length < 2) {
        return true;
      }

      const target =
        searchField === "제목"
          ? post.title
          : searchField === "본문"
            ? post.content
            : post.author;

      return target.toLowerCase().includes(normalizedKeyword);
    });
  }, [activeCategory, searchField, submittedKeyword]);

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
            {filteredPosts.map((post) => (
              <S.PostCard key={post.id} type="button">
                <S.PostInfo>
                  <S.PostTitleRow>
                    <S.PostTitle>{post.title}</S.PostTitle>
                    <S.PostCategory>{post.category}</S.PostCategory>
                  </S.PostTitleRow>

                  <S.MetaRow>
                    <S.Avatar $color={post.avatarColor}>{post.author.slice(0, 1)}</S.Avatar>
                    <S.MetaText>
                      <span>{post.author}</span>
                      <span>{post.createdAt}</span>
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
            {[1, 2, 3].map((page) => (
              <S.PageNumberButton
                key={page}
                type="button"
                $active={currentPage === page}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </S.PageNumberButton>
            ))}
            <S.PageDots>...</S.PageDots>
            <S.PageStaticNumber>67</S.PageStaticNumber>
            <S.PageStaticNumber>68</S.PageStaticNumber>
            <S.PageNavButton type="button" onClick={() => setCurrentPage((page) => page + 1)}>
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
