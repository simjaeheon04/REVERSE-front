import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import studyImage from "../../assets/images/project-study.jpg";
import Footer from "../../components/common/footer/Footer";
import { getStudies, type StudyRecord } from "../../services/studyApi";
import { STUDY_SEMESTERS } from "./studyDummyData";
import * as S from "./StudyPage.styles";

export default function StudyPage() {
  const navigate = useNavigate();
  const [studies, setStudies] = useState<StudyRecord[]>([]);
  const [semester, setSemester] = useState(STUDY_SEMESTERS[0]);
  const [keyword, setKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isSemesterOpen, setIsSemesterOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const loadStudies = async () => {
      try {
        setIsLoading(true);
        setErrorMessage("");
        const result = await getStudies({
          keyword: keyword.trim() || undefined,
          page: currentPage - 1,
        });
        setStudies(result.content ?? []);
        setTotalPages(Math.max(1, result.totalPages || 1));
      } catch {
        setStudies([]);
        setTotalPages(1);
        setErrorMessage("스터디 목록을 불러오지 못했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    void loadStudies();
  }, [currentPage, keyword]);

  const handleSemesterChange = (value: string) => {
    setSemester(value);
    setCurrentPage(1);
    setIsSemesterOpen(false);
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
              <S.SemesterButton
                type="button"
                aria-label="분기 선택"
                aria-expanded={isSemesterOpen}
                onClick={() => setIsSemesterOpen((prev) => !prev)}
              >
                {semester}
              </S.SemesterButton>

              {isSemesterOpen ? (
                <S.SemesterMenu>
                  {STUDY_SEMESTERS.filter((option) => option !== semester).map((option) => (
                    <S.SemesterOption
                      key={option}
                      type="button"
                      onClick={() => handleSemesterChange(option)}
                    >
                      {option}
                    </S.SemesterOption>
                  ))}
                </S.SemesterMenu>
              ) : null}
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
            {studies.length > 0 ? (
              <>
                <S.StudyGrid>
                  {studies.map((study) => (
                    <S.StudyCard
                      key={study.studyId}
                      type="button"
                      onClick={() => navigate(`/study/${study.studyId}`)}
                    >
                      <S.StudyImage src={studyImage} alt="" />
                      <S.StudyInfo>
                        <S.StudyTitle>{study.studyName}</S.StudyTitle>
                        <S.StudySummary>
                          {study.description || study.goal || "스터디 소개가 없습니다."}
                        </S.StudySummary>
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
                <S.EmptyText>
                  {isLoading
                    ? "스터디 목록을 불러오는 중입니다."
                    : errorMessage || "검색 결과가 없습니다."}
                </S.EmptyText>
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
