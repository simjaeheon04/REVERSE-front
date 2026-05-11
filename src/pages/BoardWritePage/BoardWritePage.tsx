import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/common/footer/Footer";
import * as S from "./BoardWritePage.styles";

const BOARD_CATEGORIES = [
  "전체",
  "자유",
  "대외활동",
  "교구/교재 나눔",
  "질의응답",
];

type ModalType = "submit" | "cancel" | null;

const MODAL_CONTENT = {
  cancel: {
    title: "게시글 작성을 취소하시겠습니까?",
    description: "작성 내용은 저장되지 않습니다. 정말로 취소하시겠습니까?",
  },
  submit: {
    title: "글을 게시하시겠습니까?",
    description: "작성한 글은 게시글 관리 페이지에서 수정 및 삭제할 수 있습니다.",
  },
} as const;

export default function BoardWritePage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [attachment, setAttachment] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [modalType, setModalType] = useState<ModalType>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setModalType("submit");
  };

  const handleConfirm = () => {
    if (!modalType) {
      return;
    }

    navigate("/board");
  };

  const closeModal = () => setModalType(null);

  const modalContent = modalType ? MODAL_CONTENT[modalType] : null;

  return (
    <>
      <S.Page>
        <S.Frame>
          <S.Hero>
            <S.HeroTitle>New Post</S.HeroTitle>
            <S.HeroText>
              카테고리를 선택하고 자유롭게 게시글을 작성해 보세요.
            </S.HeroText>
          </S.Hero>

          <S.FormCard onSubmit={handleSubmit}>
            <S.Field>
              <S.Label htmlFor="board-title">제목*</S.Label>
              <S.Input
                id="board-title"
                type="text"
                value={title}
                placeholder="게시글 제목입니다."
                onChange={(event) => setTitle(event.target.value)}
              />
            </S.Field>

            <S.Field>
              <S.Label>카테고리 선택*</S.Label>
              <S.CategoryRow>
                {BOARD_CATEGORIES.map((category) => (
                  <S.CategoryButton
                    key={category}
                    type="button"
                    $active={selectedCategory === category}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </S.CategoryButton>
                ))}
              </S.CategoryRow>
            </S.Field>

            <S.Field>
              <S.Label htmlFor="board-content">내용*</S.Label>
              <S.TextArea
                id="board-content"
                value={content}
                placeholder="게시글에 대한 내용을 작성해 주세요."
                onChange={(event) => setContent(event.target.value)}
              />
            </S.Field>

            <S.Field>
              <S.Label htmlFor="board-attachment">파일 (이미지 및 영상 / Url)</S.Label>
              <S.AttachmentRow>
                <S.AttachmentInput
                  id="board-attachment"
                  type="text"
                  value={attachment}
                  placeholder="첨부 파일 경로 또는 URL을 입력해 주세요."
                  onChange={(event) => setAttachment(event.target.value)}
                />
                <S.AttachmentButton type="button" aria-label="파일 첨부">
                  +
                </S.AttachmentButton>
              </S.AttachmentRow>
            </S.Field>

            <S.Divider />

            <S.ActionRow>
              <S.SubmitButton type="submit">게시하기</S.SubmitButton>
              <S.CancelButton type="button" onClick={() => setModalType("cancel")}>
                작성 취소
              </S.CancelButton>
            </S.ActionRow>
          </S.FormCard>
        </S.Frame>
      </S.Page>
      <Footer />

      {modalContent ? (
        <S.ModalOverlay role="presentation">
          <S.ModalCard role="dialog" aria-modal="true" aria-labelledby="board-write-modal-title">
            <S.ModalCloseButton type="button" aria-label="닫기" onClick={closeModal}>
              ×
            </S.ModalCloseButton>
            <S.ModalTitle id="board-write-modal-title">{modalContent.title}</S.ModalTitle>
            <S.ModalText>{modalContent.description}</S.ModalText>
            <S.ModalActions>
              <S.ModalSecondaryButton type="button" onClick={closeModal}>
                취소
              </S.ModalSecondaryButton>
              <S.ModalPrimaryButton type="button" onClick={handleConfirm}>
                확인
              </S.ModalPrimaryButton>
            </S.ModalActions>
          </S.ModalCard>
        </S.ModalOverlay>
      ) : null}
    </>
  );
}
