import { AxiosError } from "axios";
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Footer from "../../components/common/footer/Footer";
import {
  createBoardPost,
  getBoardPostDetail,
  updateBoardPost,
} from "../../services/boardApi";
import { uploadBoardFile } from "../../services/uploadApi";
import * as S from "./BoardWritePage.styles";

const BOARD_ID = 2;

const BOARD_CATEGORIES = ["전체", "자유", "대외활동", "교구/교재 나눔", "질의응답"];

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
  edit: {
    title: "글을 수정하시겠습니까?",
    description: "수정한 글은 게시글 관리 페이지에서 다시 확인할 수 있습니다.",
  },
} as const;

const normalizeAttachments = (attachments: string[]) => {
  return attachments.map((attachment) => attachment.trim()).filter(Boolean);
};

const getAttachmentName = (attachment: string) => {
  try {
    const url = new URL(attachment);
    const pathname = decodeURIComponent(url.pathname);
    return pathname.split("/").filter(Boolean).pop() ?? attachment;
  } catch {
    return attachment.split(/[\\/]/).filter(Boolean).pop() ?? attachment;
  }
};

export default function BoardWritePage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [attachmentDraft, setAttachmentDraft] = useState("");
  const [attachments, setAttachments] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [modalType, setModalType] = useState<ModalType>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const mode = searchParams.get("mode");
  const rawPostId = searchParams.get("postId");
  const isEditMode = mode === "edit";
  const parsedPostId = rawPostId ? Number(rawPostId) : NaN;
  const postId = Number.isFinite(parsedPostId) ? parsedPostId : null;

  useEffect(() => {
    const loadPost = async () => {
      if (!isEditMode || postId === null) {
        return;
      }

      try {
        setIsLoading(true);
        setErrorMessage("");
        const result = await getBoardPostDetail(postId);
        setTitle(result.title ?? "");
        setContent(result.content ?? "");
        setAttachments(result.imageUrls ?? []);
      } catch (error) {
        if (error instanceof AxiosError && error.response?.status === 404) {
          setErrorMessage("수정할 게시글을 찾을 수 없습니다.");
        } else {
          setErrorMessage("게시글 정보를 불러오지 못했습니다.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    void loadPost();
  }, [isEditMode, postId]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage("");
    setModalType("submit");
  };

  const handleConfirm = async () => {
    if (!modalType) {
      return;
    }

    if (modalType === "cancel") {
      navigate("/board");
      return;
    }

    try {
      setIsSubmitting(true);
      setErrorMessage("");

      if (isEditMode && postId !== null) {
        console.log("[board/write] update payload", {
          postId,
          title: title.trim(),
          content: content.trim(),
        });
        await updateBoardPost(postId, {
          title: title.trim(),
          content: content.trim(),
        });
      } else {
        const attachmentList = normalizeAttachments([...attachments, attachmentDraft]);
        const createPayload = {
          title: title.trim(),
          content: content.trim(),
          category: selectedCategory,
          imageUrls: attachmentList,
          isPinned: false,
          isExternal: false,
        };

        console.log("[board/write] create payload", {
          boardId: BOARD_ID,
          payload: createPayload,
        });

        await createBoardPost(BOARD_ID, createPayload);
      }

      navigate("/board/manage");
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log("[board/write] submit error", {
          mode: isEditMode ? "edit" : "create",
          status: error.response?.status,
          data: error.response?.data,
        });
      }

      if (error instanceof AxiosError && error.response?.status === 403) {
        setErrorMessage(
          isEditMode
            ? "작성자 본인만 게시글을 수정할 수 있습니다."
            : "게시글 작성 권한이 없습니다."
        );
      } else if (error instanceof AxiosError && error.response?.status === 401) {
        setErrorMessage("로그인 후 게시글을 작성하거나 수정할 수 있습니다.");
      } else {
        setErrorMessage(
          isEditMode ? "게시글 수정에 실패했습니다." : "게시글 작성에 실패했습니다."
        );
      }
    } finally {
      setIsSubmitting(false);
      setModalType(null);
    }
  };

  const closeModal = () => {
    if (isSubmitting) {
      return;
    }

    setModalType(null);
  };

  const handleAddAttachmentUrl = () => {
    const nextAttachment = attachmentDraft.trim();

    if (!nextAttachment) {
      return;
    }

    setAttachments((prev) => [...prev, nextAttachment]);
    setAttachmentDraft("");
  };

  const handleRemoveAttachment = (index: number) => {
    setAttachments((prev) => prev.filter((_, attachmentIndex) => attachmentIndex !== index));
  };

  const handleOpenFilePicker = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);

    if (!files.length) {
      return;
    }

    try {
      setIsUploading(true);
      setErrorMessage("");
      const uploadedUrls = await Promise.all(
        files.map((file) => uploadBoardFile(file))
      );

      console.log("[board/write] uploaded file urls", uploadedUrls);

      setAttachments((prev) => [...normalizeAttachments(prev), ...uploadedUrls]);
    } catch {
      setErrorMessage("파일 업로드에 실패했습니다.");
    } finally {
      setIsUploading(false);
      event.target.value = "";
    }
  };

  const modalContent = useMemo(() => {
    if (!modalType) {
      return null;
    }

    if (modalType === "submit" && isEditMode) {
      return MODAL_CONTENT.edit;
    }

    return MODAL_CONTENT[modalType];
  }, [isEditMode, modalType]);

  return (
    <>
      <S.Page>
        <S.Frame>
          <S.Hero>
            <S.HeroTitle>{isEditMode ? "Edit Post" : "New Post"}</S.HeroTitle>
            <S.HeroText>
              {isEditMode
                ? "기존 게시글 내용을 수정하고 저장할 수 있습니다."
                : "카테고리를 선택하고 자유롭게 게시글을 작성해 보세요."}
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
                disabled={isLoading || isSubmitting}
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
                    disabled={isLoading || isSubmitting}
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
                disabled={isLoading || isSubmitting}
              />
            </S.Field>

            <S.Field>
              <S.Label htmlFor="board-attachment">파일 / Url</S.Label>
              <S.AttachmentRow>
                <S.AttachmentInput
                  id="board-attachment"
                  type="text"
                  value={attachmentDraft}
                  placeholder="첨부 파일 경로 또는 URL을 입력해 주세요."
                  onChange={(event) => setAttachmentDraft(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      event.preventDefault();
                      handleAddAttachmentUrl();
                    }
                  }}
                  onBlur={handleAddAttachmentUrl}
                  disabled={isLoading || isUploading || isSubmitting}
                />
                <S.AttachmentPickerButton
                  type="button"
                  aria-label="파일 선택"
                  onClick={handleOpenFilePicker}
                  disabled={isLoading || isUploading || isSubmitting}
                >
                  {isUploading ? "..." : "+"}
                </S.AttachmentPickerButton>
              </S.AttachmentRow>

              {attachments.length > 0 ? (
                <S.AttachmentList>
                  {attachments.map((attachment, index) => (
                    <S.AttachmentItem key={`${attachment}-${index}`}>
                      <S.AttachmentName title={attachment}>
                        {getAttachmentName(attachment)}
                      </S.AttachmentName>
                      <S.AttachmentRemoveButton
                        type="button"
                        aria-label="첨부 파일 제거"
                        onClick={() => handleRemoveAttachment(index)}
                        disabled={isLoading || isUploading || isSubmitting}
                      >
                        삭제
                      </S.AttachmentRemoveButton>
                    </S.AttachmentItem>
                  ))}
                </S.AttachmentList>
              ) : null}

              <S.FileInput
                ref={fileInputRef}
                type="file"
                multiple
                onChange={(event) => void handleFileChange(event)}
              />
            </S.Field>

            {errorMessage ? <S.ErrorText>{errorMessage}</S.ErrorText> : null}

            <S.Divider />

            <S.ActionRow>
              <S.SubmitButton type="submit" disabled={isLoading || isUploading || isSubmitting}>
                {isSubmitting
                  ? isEditMode
                    ? "수정 중..."
                    : "게시 중..."
                  : isEditMode
                    ? "수정하기"
                    : "게시하기"}
              </S.SubmitButton>
              <S.CancelButton
                type="button"
                onClick={() => setModalType("cancel")}
                disabled={isLoading || isUploading || isSubmitting}
              >
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
              <S.ModalSecondaryButton type="button" onClick={closeModal} disabled={isSubmitting}>
                취소
              </S.ModalSecondaryButton>
              <S.ModalPrimaryButton
                type="button"
                onClick={() => void handleConfirm()}
                disabled={isSubmitting}
              >
                확인
              </S.ModalPrimaryButton>
            </S.ModalActions>
          </S.ModalCard>
        </S.ModalOverlay>
      ) : null}
    </>
  );
}
