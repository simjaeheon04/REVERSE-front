import { useEffect, useState } from "react";
import Footer from "../../components/common/footer/Footer";
import { getItIssues, type ItIssue } from "../../services/itIssueApi";
import { FALLBACK_IT_ISSUES } from "./itIssueFallbackData";
import * as S from "./ItIssuePage.styles";

const defaultIssueImage = FALLBACK_IT_ISSUES[0]?.imageUrl ?? "";

export default function ItIssuePage() {
  const [issues, setIssues] = useState<ItIssue[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const loadIssues = async () => {
      try {
        setIsLoading(true);
        setErrorMessage("");
        const result = await getItIssues();
        setIssues(result);
      } catch {
        setIssues([]);
        setErrorMessage("이슈를 불러오는 데 실패했습니다. 다시 시도해주세요.");
      } finally {
        setIsLoading(false);
      }
    };

    void loadIssues();

    const refreshTimer = window.setInterval(() => {
      void loadIssues();
    }, 24 * 60 * 60 * 1000);

    return () => window.clearInterval(refreshTimer);
  }, []);

  const handleOpenSource = (sourceUrl: string) => {
    if (!sourceUrl) {
      window.alert("연결된 원문 링크가 없습니다.");
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
                  <S.CardImage src={issue.imageUrl || defaultIssueImage} alt="" />
                  <S.CardBody>
                    <S.CardTitle>{issue.title}</S.CardTitle>
                    <S.TitleRule />
                    <S.CardFooter>
                      <S.LinkButton
                        type="button"
                        onClick={() => handleOpenSource(issue.sourceUrl)}
                      >
                        {issue.sourceUrl ? "Apply Now" : issue.status ?? "open"}
                        <span aria-hidden="true">›</span>
                      </S.LinkButton>
                    </S.CardFooter>
                  </S.CardBody>
                </S.IssueCard>
              ))
            ) : (
              <S.EmptyState>
                {isLoading
                  ? "현재 이슈를 불러오는 중입니다."
                  : errorMessage || "현재 이슈를 불러올 수 없습니다."}
              </S.EmptyState>
            )}
          </S.IssueGrid>
        </S.Inner>
      </S.Page>
      <Footer />
    </>
  );
}
