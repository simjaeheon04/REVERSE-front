import { useEffect, useMemo, useState } from "react";
import ruleBgImg from "../../../assets/images/rule-bg.png";
import { getTermsList, type TermsResponse } from "../../../services/termsApi";
import * as S from "./RuleSection.styles";

const INITIAL_VISIBLE_COUNT = 4;

const toSingleLine = (contents: string) => contents.replace(/\s+/g, " ").trim();

const isVisibleSummaryRule = (term: TermsResponse) =>
  !term.title.includes("개인정보 처리방침");

export default function RuleSection() {
  const [terms, setTerms] = useState<TermsResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchTerms = async () => {
      try {
        const data = await getTermsList();
        setTerms(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("failed to load terms", error);
        setTerms([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTerms();
  }, []);

  const sortedTerms = useMemo(
    () => [...terms].sort((a, b) => a.sortOrder - b.sortOrder),
    [terms]
  );

  const visibleTerms = sortedTerms
    .filter(isVisibleSummaryRule)
    .slice(0, INITIAL_VISIBLE_COUNT);

  return (
    <>
      <S.Section>
        <S.BgWrap>
          <S.BgImage src={ruleBgImg} alt='REVERSE rule background' />
        </S.BgWrap>

        <S.Inner>
          <S.Title>Regulations</S.Title>
          <S.Subtitle>REVERSE 동아리 규정</S.Subtitle>

          {isLoading ? (
            <S.StateMessage>규정 정보를 불러오는 중입니다.</S.StateMessage>
          ) : visibleTerms.length > 0 ? (
            <S.RuleList>
              {visibleTerms.map((term, index) => (
                <S.RuleItem key={term.id}>
                  {index + 1}. {toSingleLine(term.title || term.contents)}
                </S.RuleItem>
              ))}
            </S.RuleList>
          ) : null}

          {sortedTerms.length > 0 ? (
            <S.ButtonWrap>
              <S.Button type='button' onClick={() => setIsModalOpen(true)}>
                Learn More.
              </S.Button>
            </S.ButtonWrap>
          ) : null}
        </S.Inner>
      </S.Section>

      {isModalOpen ? (
        <S.ModalOverlay
          role='button'
          tabIndex={0}
          aria-label='Close regulations modal'
          onClick={() => setIsModalOpen(false)}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              setIsModalOpen(false);
            }
          }}
        >
          <S.ModalCard onClick={(event) => event.stopPropagation()}>
            <S.ModalHeader>
              <S.ModalTitle>Regulations</S.ModalTitle>
              <S.ModalCloseButton
                type='button'
                onClick={() => setIsModalOpen(false)}
              >
                Close
              </S.ModalCloseButton>
            </S.ModalHeader>

            <S.ModalList>
              {sortedTerms.map((term, index) => (
                <S.ModalItem key={term.id}>
                  <S.ModalItemTitle>
                    {index + 1}. {term.title}
                  </S.ModalItemTitle>
                  <S.ModalItemContent>{term.contents}</S.ModalItemContent>
                </S.ModalItem>
              ))}
            </S.ModalList>
          </S.ModalCard>
        </S.ModalOverlay>
      ) : null}
    </>
  );
}
