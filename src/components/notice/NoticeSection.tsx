import { useEffect, useMemo, useState } from "react";
import * as S from "./NoticeSection.styles";
import {
  getNoticeDetail,
  getNoticeList,
  type NoticeDetail,
  type NoticeListItem,
} from "../../services/noticeApi";

export default function NoticeSection() {
  const [notices, setNotices] = useState<NoticeListItem[]>([]);
  const [selectedNotice, setSelectedNotice] = useState<NoticeDetail | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoadingList, setIsLoadingList] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const ITEMS_PER_PAGE = 5;

  useEffect(() => {
    const loadNotices = async () => {
      try {
        setIsLoadingList(true);
        setErrorMessage("");
        const result = await getNoticeList();
        setNotices(Array.isArray(result) ? result : []);
      } catch {
        setNotices([]);
        setErrorMessage("공지사항 목록을 불러오지 못했습니다.");
      } finally {
        setIsLoadingList(false);
      }
    };

    void loadNotices();
  }, []);

  useEffect(() => {
    if (!selectedNotice) {
      document.body.style.overflow = "unset";
      return;
    }

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedNotice]);

  const totalPages = Math.max(1, Math.ceil(notices.length / ITEMS_PER_PAGE));

  const pagedList = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return notices.slice(start, start + ITEMS_PER_PAGE);
  }, [notices, currentPage]);

  const handleOpenModal = async (noticeId: number) => {
    try {
      const detail = await getNoticeDetail(noticeId);
      setSelectedNotice(detail);
    } catch {
      setErrorMessage("공지사항 상세 정보를 불러오지 못했습니다.");
    }
  };

  const handleCloseModal = () => {
    setSelectedNotice(null);
  };

  return (
    <>
      <S.HeroSection>
        <S.HeroTextWrap>
          <S.HeroTitle>공지사항</S.HeroTitle>
          <S.HeroDesc>REVERSE의 최신 공지사항을 확인할 수 있는 페이지입니다.</S.HeroDesc>
        </S.HeroTextWrap>
      </S.HeroSection>

      <S.Section>
        <S.Inner>
          <S.TopLine />

          <S.CardList>
            {isLoadingList ? <S.EmptyState>공지사항 목록을 불러오는 중입니다.</S.EmptyState> : null}

            {!isLoadingList && errorMessage ? (
              <S.EmptyState>{errorMessage}</S.EmptyState>
            ) : null}

            {!isLoadingList && !errorMessage && pagedList.length === 0 ? (
              <S.EmptyState>등록된 공지사항이 없습니다.</S.EmptyState>
            ) : null}

            {!isLoadingList &&
              !errorMessage &&
              pagedList.map((notice) => (
                <S.Card
                  key={notice.id}
                  type="button"
                  onClick={() => void handleOpenModal(notice.id)}
                >
                  <S.CardRow>
                    <S.Left>
                      <S.Title>{notice.title}</S.Title>
                    </S.Left>

                    <S.Right>
                      <S.MetaText>{notice.createdAt}</S.MetaText>
                      <S.More>&gt;</S.More>
                    </S.Right>
                  </S.CardRow>
                </S.Card>
              ))}
          </S.CardList>

          {!isLoadingList && !errorMessage && notices.length > 0 ? (
            <S.Pagination>
              <S.PageNavButton
                type="button"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              >
                이전
              </S.PageNavButton>

              {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                <S.PageNumberButton
                  key={page}
                  type="button"
                  $active={currentPage === page}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </S.PageNumberButton>
              ))}

              <S.PageNavButton
                type="button"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              >
                다음
              </S.PageNavButton>
            </S.Pagination>
          ) : null}
        </S.Inner>
      </S.Section>

      {selectedNotice && (
        <S.ModalOverlay onClick={handleCloseModal}>
          <S.ModalContainer onClick={(event) => event.stopPropagation()}>
            <S.Close type="button" onClick={handleCloseModal}>
              ×
            </S.Close>

            <S.ModalTopBar>
              <S.ModalTopTitle>{selectedNotice.title}</S.ModalTopTitle>
            </S.ModalTopBar>

            <S.ModalDivider />

            <S.ModalHeaderRow>
              <S.ModalHeaderLeft>
                <S.ModalTitle>{selectedNotice.title}</S.ModalTitle>
                <S.ModalSub>REVERSE 공지사항 상세</S.ModalSub>
              </S.ModalHeaderLeft>

              <S.Meta>
                <S.DateText>작성일: {selectedNotice.createdAt}</S.DateText>
              </S.Meta>
            </S.ModalHeaderRow>

            <S.ContentBox>{selectedNotice.content}</S.ContentBox>
          </S.ModalContainer>
        </S.ModalOverlay>
      )}
    </>
  );
}
