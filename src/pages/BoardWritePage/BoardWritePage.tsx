import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Footer from "../../components/common/footer/Footer";
import {
  createBoardPost,
  getBoardCategories,
  getBoardErrorMessage,
  getBoardPostDetail,
  updateBoardPost,
  type AdminBoard,
  type BoardPostDetail,
} from "../../services/boardApi";
import { uploadBoardFile } from "../../services/uploadApi";
import * as S from "./BoardWritePage.styles";

type CategoryOption = {
  boardId: number | null;
  label: string;
};

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

const isAttachmentUrl = (value: string) => {
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
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
  const submitLockRef = useRef(false);
  const postContextRef = useRef(0);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [attachmentDraft, setAttachmentDraft] = useState("");
  const [attachments, setAttachments] = useState<string[]>([]);
  const [categories, setCategories] = useState<CategoryOption[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<CategoryOption | null>(null);
  const [modalType, setModalType] = useState<ModalType>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [originalPost, setOriginalPost] = useState<BoardPostDetail | null>(null);

  const mode = searchParams.get("mode");
  const rawPostId = searchParams.get("postId");
  const isEditMode = mode === "edit";
  const parsedPostId = rawPostId ? Number(rawPostId) : NaN;
  const postId = Number.isSafeInteger(parsedPostId) && parsedPostId > 0 ? parsedPostId : null;
  const isEditReady = !isEditMode || (postId !== null && originalPost?.id === postId && !isLoading);
  const isSaveBlocked = !isEditReady || isLoading || isUploading || isSubmitting ||
    (!isEditMode && !selectedCategory?.boardId);

  useEffect(() => {
    if (isEditMode) {
      return;
    }

    let cancelled = false;
    const loadCategories = async () => {
      try {
        const boards = await getBoardCategories();
        const realCategories = boards.map((board: AdminBoard) => ({
          boardId: board.boardId,
          label: board.boardName,
        }));

        if (cancelled) return;
        setCategories(realCategories);
        setSelectedCategory((prev) => prev ?? realCategories[0] ?? null);
      } catch (error) {
        if (cancelled) return;
        setCategories([]);
        setSelectedCategory(null);
        setErrorMessage(getBoardErrorMessage(error, "게시판 목록을 불러오지 못했습니다."));
      }
    };

    void loadCategories();
    return () => { cancelled = true; };
  }, [isEditMode]);

  useEffect(() => {
    let cancelled = false;
    postContextRef.current += 1;
    setOriginalPost(null);
    setModalType(null);
    setIsLoading(false);
    const loadPost = async () => {
      if (!isEditMode) {
        setTitle("");
        setContent("");
        setAttachments([]);
        setAttachmentDraft("");
        setSelectedCategory(null);
        setCategories([]);
        setErrorMessage("");
        return;
      }
      if (postId === null) {
        setErrorMessage("유효하지 않은 게시글 경로입니다.");
        return;
      }

      try {
        setIsLoading(true);
        setErrorMessage("");
        const result = await getBoardPostDetail(postId);
        if (cancelled) return;
        setTitle(result.title ?? "");
        setContent(result.content ?? "");
        setAttachments(result.imageUrls ?? []);
        setAttachmentDraft("");
        const category = { boardId: result.boardId ?? null, label: result.category ?? "" };
        setCategories(category.label ? [category] : []);
        setSelectedCategory(category);
        setOriginalPost(result);
      } catch (error) {
        if (cancelled) return;
        setErrorMessage(getBoardErrorMessage(error, "게시글 정보를 불러오지 못했습니다."));
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    void loadPost();
    return () => {
      cancelled = true;
      postContextRef.current += 1;
    };
  }, [isEditMode, postId]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSaveBlocked || submitLockRef.current) return;
    if (!title.trim() || !content.trim()) {
      setErrorMessage("제목과 내용을 입력해 주세요.");
      return;
    }
    if (attachmentDraft.trim() && !isAttachmentUrl(attachmentDraft.trim())) {
      setErrorMessage("첨부파일을 업로드하거나 올바른 http/https URL을 입력해 주세요.");
      return;
    }
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

    if (isSaveBlocked || submitLockRef.current) return;
    if (!title.trim() || !content.trim()) {
      setErrorMessage("제목과 내용을 입력해 주세요.");
      setModalType(null);
      return;
    }
    const draft = attachmentDraft.trim();
    if (draft && !isAttachmentUrl(draft)) {
      setErrorMessage("첨부파일을 업로드하거나 올바른 http/https URL을 입력해 주세요.");
      setModalType(null);
      return;
    }
    const finalAttachments = draft ? [...attachments, draft] : attachments;
    submitLockRef.current = true;

    try {
      setIsSubmitting(true);
      setErrorMessage("");

      if (isEditMode && postId !== null && originalPost) {
        const attachmentsChanged = JSON.stringify(finalAttachments) !== JSON.stringify(originalPost.imageUrls);
        await updateBoardPost(postId, {
          title,
          content,
          ...(attachmentsChanged ? { imageUrls: finalAttachments } : {}),
        });
        setOriginalPost(null);
        try {
          const latest = await getBoardPostDetail(postId);
          navigate(`/board/${postId}${latest.boardId ? `?boardId=${latest.boardId}` : ""}`);
        } catch (error) {
          setErrorMessage(`수정은 완료됐지만 최신 게시글을 불러오지 못했습니다. 새로고침해 주세요. ${getBoardErrorMessage(error, "조회에 실패했습니다.")}`);
        }
      } else {
        if (isEditMode || !selectedCategory?.boardId) return;
        const targetBoardId = selectedCategory.boardId;
        const createPayload = {
          title: title.trim(),
          content: content.trim(),
          category: selectedCategory?.label ?? "",
          imageUrls: finalAttachments,
          isPinned: false,
          isExternal: false,
        };

        await createBoardPost(targetBoardId, createPayload);
        navigate("/board/manage");
      }
    } catch (error) {
      setErrorMessage(getBoardErrorMessage(error, isEditMode ? "게시글 수정에 실패했습니다." : "게시글 작성에 실패했습니다."));
    } finally {
      submitLockRef.current = false;
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
    if (!isAttachmentUrl(nextAttachment)) {
      setErrorMessage("첨부파일을 업로드하거나 올바른 http/https URL을 입력해 주세요.");
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
    const input = event.target;
    const postContext = postContextRef.current;

    if (!files.length || !isEditReady || isUploading || isSubmitting) {
      return;
    }

    try {
      setIsUploading(true);
      setErrorMessage("");
      const uploadedUrls = await Promise.all(
        files.map((file) => uploadBoardFile(file))
      );

      if (postContext === postContextRef.current) {
        setAttachments((prev) => [...prev, ...uploadedUrls]);
      }
    } catch (error) {
      if (postContext === postContextRef.current) {
        setErrorMessage(getBoardErrorMessage(error, "파일 업로드에 실패했습니다."));
      }
    } finally {
      setIsUploading(false);
      input.value = "";
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
                {categories.length > 0 ? (
                  categories.map((category) => (
                    <S.CategoryButton
                      key={`${category.boardId}-${category.label}`}
                      type="button"
                      $active={selectedCategory?.boardId === category.boardId}
                      onClick={() => setSelectedCategory(category)}
                      disabled={isEditMode || isLoading || isSubmitting}
                    >
                      {category.label}
                    </S.CategoryButton>
                  ))
                ) : (
                  <S.ErrorText>사용 가능한 카테고리가 없습니다.</S.ErrorText>
                )}
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
              <S.SubmitButton type="submit" disabled={isSaveBlocked}>
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
                disabled={isSaveBlocked}
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
