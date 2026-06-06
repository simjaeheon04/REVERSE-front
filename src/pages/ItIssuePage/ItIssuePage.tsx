import { useEffect, useState } from "react";
import Footer from "../../components/common/footer/Footer";
import { getItIssues, type ItIssue } from "../../services/itIssueApi";
import { FALLBACK_IT_ISSUES } from "./itIssueFallbackData";
import * as S from "./ItIssuePage.styles";

const getDisplayIssues = (issues: ItIssue[]) =>
  issues.length ? issues.slice(0, 6) : FALLBACK_IT_ISSUES;

export default function ItIssuePage() {
  const [issues, setIssues] = useState<ItIssue[]>(FALLBACK_IT_ISSUES);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadIssues = async () => {
      try {
        setIsLoading(true);
        const result = await getItIssues();
        setIssues(getDisplayIssues(result));
      } catch {
        setIssues(FALLBACK_IT_ISSUES);
      } finally {
        setIsLoading(false);
      }
    };

    void loadIssues();
  }, []);

  const handleOpenSource = (sourceUrl: string) => {
    if (!sourceUrl) {
      return;
    }

    window.open(sourceUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <S.Page>
        <S.Inner>
          <S.Hero>
            <S.Eyebrow>REVERSE</S.Eyebrow>
            <S.Title>IT ISSUE</S.Title>
            <S.Subtitle>Today IT이슈</S.Subtitle>
          </S.Hero>

          <S.Divider />

          <S.IssueGrid>
            {issues.length ? (
              issues.map((issue) => (
                <S.IssueCard key={issue.id}>
                  <S.CardImage src={issue.imageUrl} alt="" />
                  <S.CardBody>
                    <S.CardTitle>{issue.title}</S.CardTitle>
                    <S.TitleRule />
                    <S.CardFooter>
                      <S.LinkButton
                        type="button"
                        onClick={() => handleOpenSource(issue.sourceUrl)}
                      >
                        Apply Now
                        <span aria-hidden="true">›</span>
                      </S.LinkButton>
                    </S.CardFooter>
                  </S.CardBody>
                </S.IssueCard>
              ))
            ) : (
              <S.EmptyState>
                {isLoading ? "현재 이슈를 불러오는 중입니다." : "현재 이슈를 불러올 수 없습니다."}
              </S.EmptyState>
            )}
          </S.IssueGrid>
        </S.Inner>
      </S.Page>
      <Footer />
    </>
  );
}
