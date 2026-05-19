import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/common/footer/Footer";
import { STUDY_POSTS, STUDY_SEMESTERS } from "./studyDummyData";
import * as S from "./StudyPage.styles";

const PAGE_SIZE = 6;

export default function StudyPage() {
  const navigate = useNavigate();
  const [semester, setSemester] = useState(STUDY_SEMESTERS[0]);
  const [keyword, setKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredStudies = useMemo(() => {
    const normalizedKeyword = keyword.trim().toLowerCase();

    return STUDY_POSTS.filter((study) => {
      const matchesSemester = study.semester === semester;
      const matchesKeyword =
        !normalizedKeyword ||
        study.title.toLowerCase().includes(normalizedKeyword) ||
        study.summary.toLowerCase().includes(normalizedKeyword);

      return matchesSemester && matchesKeyword;
    });
  }, [keyword, semester]);

  const totalPages = Math.max(1, Math.ceil(filteredStudies.length / PAGE_SIZE));
  const pagedStudies = filteredStudies.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const handleSemesterChange = (value: string) => {
    setSemester(value);
    setCurrentPage(1);
  };

  const handleKeywordChange = (value: string) => {
    setKeyword(value);
    setCurrentPage(1);
  };

  return (
    <>
      <S.Page>
        <S.Inner>
          <S.Hero>
            <S.Eyebrow>REVERSE</S.Eyebrow>
            <S.Title>STUDY</S.Title>
          </S.Hero>

          <S.ControlRow>
            <S.SelectWrap>
              <S.SemesterSelect
                value={semester}
                onChange={(event) => handleSemesterChange(event.target.value)}
                aria-label="분기 선택"
              >
                {STUDY_SEMESTERS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </S.SemesterSelect>
            </S.SelectWrap>

            <S.SearchBox>
              <S.SearchInput
                value={keyword}
                onChange={(event) => handleKeywordChange(event.target.value)}
                placeholder="스터디 제목을 검색해 보세요!"
                aria-label="스터디 검색어"
              />
              <S.SearchIcon aria-hidden="true">⌕</S.SearchIcon>
            </S.SearchBox>
          </S.ControlRow>

          <S.Divider />

          <S.ContentArea>
            {pagedStudies.length > 0 ? (
              <>
                <S.StudyGrid>
                  {pagedStudies.map((study) => (
                    <S.StudyCard
                      key={study.id}
                      type="button"
                      onClick={() => navigate(`/study/${study.id}`)}
                    >
                      <S.StudyImage src={study.imageUrl} alt="" />
                      <S.StudyInfo>
                        <S.StudyTitle>{study.title}</S.StudyTitle>
                        <S.StudySummary>{study.summary}</S.StudySummary>
                      </S.StudyInfo>
                    </S.StudyCard>
                  ))}
                </S.StudyGrid>

                <S.Pagination aria-label="스터디 페이지">
                  <span>Previous</span>
                  {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                    <S.PageButton
                      key={page}
                      type="button"
                      $active={currentPage === page}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </S.PageButton>
                  ))}
                  <span>Next</span>
                </S.Pagination>
              </>
            ) : (
              <S.EmptyState>
                <S.EmptyIcon aria-hidden="true">!</S.EmptyIcon>
                <S.EmptyText>검색 결과가 없습니다.</S.EmptyText>
              </S.EmptyState>
            )}

            <S.WriteButton
              type="button"
              aria-label="스터디 작성"
              onClick={() => navigate("/study/write")}
            >
              ✎
            </S.WriteButton>
          </S.ContentArea>
        </S.Inner>
      </S.Page>
      <Footer />
    </>
  );
}
