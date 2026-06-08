import { AxiosError } from "axios";
import { useEffect, useMemo, useState } from "react";
import * as S from "./NoticeSection.styles";
import {
  getNoticeDetail,
  getNoticeList,
  type NoticeDetail,
  type NoticeListItem,
} from "../../services/noticeApi";

const getCategoryColor = (category: string) => {
  const key = category.trim().toLowerCase();

  if (key.includes("external") || key.includes("대외")) {
    return "#4b78ff";
  }

  if (key.includes("club") || key.includes("동아리")) {
    return "#7d5cff";
  }

  return "#5b647a";
};

const getNoticeErrorMessage = (error: unknown, notice?: NoticeListItem) => {
  if (error instanceof AxiosError) {
    if (error.response?.status === 401) {
      return "로그인이 필요합니다. 다시 로그인해 주세요.";
    }

    if (error.response?.status === 403) {
      return notice?.isExternal
        ? "공지사항 접근 권한이 없습니다."
        : "내부 공지는 로그인 후 확인할 수 있습니다.";
    }
  }

  return "공지사항 상세를 불러오지 못했습니다.";
};

export default function NoticeSection() {
  const [noticePage, setNoticePage] = useState<{
    content: NoticeListItem[];
    totalPages: number;
    totalElements: number;
    number: number;
    size: number;
  }>({
    content: [],
    totalPages: 0,
    totalElements: 0,
    number: 0,
    size: 6,
  });
  const [selectedNotice, setSelectedNotice] = useState<NoticeDetail | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [knownCategories, setKnownCategories] = useState<string[]>([]);
  const [isLoadingList, setIsLoadingList] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const loadNotices = async () => {
      try {
        setIsLoadingList(true);
        setErrorMessage("");
        const result = await getNoticeList({
          category: selectedCategory || undefined,
          page: currentPage,
        });

        const categories = Array.from(
          new Set(result.content.map((notice) => notice.category).filter(Boolean))
        );

        setNoticePage(result);
        setKnownCategories((prev) => Array.from(new Set([...prev, ...categories])));
      } catch (error) {
        console.error("[notice/list] failed", error);
        setNoticePage({
          content: [],
          totalPages: 0,
          totalElements: 0,
          number: currentPage,
          size: 6,
        });
        setErrorMessage("공지사항 목록을 불러오지 못했습니다.");
      } finally {
        setIsLoadingList(false);
      }
    };

    void loadNotices();
  }, [currentPage, selectedCategory]);

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

  const categories = useMemo(() => ["", ...knownCategories], [knownCategories]);

  const handleOpenModal = async (notice: NoticeListItem) => {
    try {
      setErrorMessage("");
      const detail = await getNoticeDetail(notice.id, {
        requiresAuth: !notice.isExternal,
      });
      setSelectedNotice(detail);
    } catch (error) {
      console.error("[notice/detail] failed", {
        notice,
        error,
      });
      setErrorMessage(getNoticeErrorMessage(error, notice));
    }
  };

  const handleCloseModal = () => {
    setSelectedNotice(null);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(0);
  };

  const totalPages = Math.max(noticePage.totalPages, 1);

  return (
    <>
      <S.HeroSection>
        <S.HeroTextWrap>
          <S.HeroTitle>NOTICE</S.HeroTitle>
          <S.HeroDesc>Browse the latest REVERSE announcements.</S.HeroDesc>
        </S.HeroTextWrap>
      </S.HeroSection>

      <S.Section>
        <S.Inner>
          <S.TopLine />

          <S.TabList>
            {categories.map((category) => {
              const label = category || "ALL";
              return (
                <S.TabButton
                  key={label}
                  type="button"
                  $active={selectedCategory === category}
                  onClick={() => handleCategoryChange(category)}
                >
                  {label}
                </S.TabButton>
              );
            })}
          </S.TabList>

          <S.CardList>
            {isLoadingList ? <S.EmptyState>공지사항을 불러오는 중입니다.</S.EmptyState> : null}

            {!isLoadingList && errorMessage ? <S.EmptyState>{errorMessage}</S.EmptyState> : null}

            {!isLoadingList && !errorMessage && noticePage.content.length === 0 ? (
              <S.EmptyState>공지사항이 없습니다.</S.EmptyState>
            ) : null}

            {!isLoadingList &&
              !errorMessage &&
              noticePage.content.map((notice) => (
                <S.Card key={notice.id} type="button" onClick={() => void handleOpenModal(notice)}>
                  <S.CardRow>
                    <S.Left>
                      <S.Category $bgColor={getCategoryColor(notice.category)}>
                        {notice.category}
                      </S.Category>
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

          {!isLoadingList && !errorMessage && noticePage.totalPages > 0 ? (
            <S.Pagination>
              <S.PageNavButton
                type="button"
                disabled={currentPage === 0}
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
              >
                Prev
              </S.PageNavButton>

              {Array.from({ length: totalPages }, (_, index) => index).map((page) => (
                <S.PageNumberButton
                  key={page}
                  type="button"
                  $active={currentPage === page}
                  onClick={() => setCurrentPage(page)}
                >
                  {page + 1}
                </S.PageNumberButton>
              ))}

              <S.PageNavButton
                type="button"
                disabled={currentPage >= totalPages - 1}
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))}
              >
                Next
              </S.PageNavButton>
            </S.Pagination>
          ) : null}
        </S.Inner>
      </S.Section>

      {selectedNotice ? (
        <S.ModalOverlay onClick={handleCloseModal}>
          <S.ModalContainer onClick={(event) => event.stopPropagation()}>
            <S.Close type="button" onClick={handleCloseModal}>
              X
            </S.Close>

            <S.ModalTopBar>
              <S.ModalCategoryChip $bgColor={getCategoryColor(selectedNotice.category)}>
                {selectedNotice.category}
              </S.ModalCategoryChip>
              <S.ModalTopTitle>{selectedNotice.title}</S.ModalTopTitle>
            </S.ModalTopBar>

            <S.ModalDivider />

            <S.ModalHeaderRow>
              <S.ModalHeaderLeft>
                <S.ModalTitle>{selectedNotice.title}</S.ModalTitle>
                <S.ModalSub>REVERSE Notice Detail</S.ModalSub>
              </S.ModalHeaderLeft>

              <S.Meta>
                <S.AuthorText>{selectedNotice.userId}</S.AuthorText>
                <S.DateText>{selectedNotice.createdAt}</S.DateText>
              </S.Meta>
            </S.ModalHeaderRow>

            <S.ContentBox>{selectedNotice.content}</S.ContentBox>

            {selectedNotice.imageUrls.length > 0 ? (
              <S.ImageBox>
                {selectedNotice.imageUrls.map((imageUrl) => (
                  <img key={imageUrl} src={imageUrl} alt="notice" />
                ))}
              </S.ImageBox>
            ) : null}
          </S.ModalContainer>
        </S.ModalOverlay>
      ) : null}
    </>
  );
}
