import {
  useEffect,
  useMemo,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { AxiosError } from "axios";
import * as S from "../clubIntroManage/ClubIntroManagePage.styles";
import {
  deleteNotice,
  getNoticeDetail,
  getNoticeList,
  saveNotice,
  uploadNoticeImage,
  type NoticeDetail,
  type NoticeListItem,
  type NoticeUpsertPayload,
  type NoticeUpsertResult,
} from "../../services/noticeApi";

const initialForm: NoticeUpsertPayload = {
  title: "",
  content: "",
  isPinned: false,
  isExternal: false,
  category: "",
  imageUrls: [],
};

export default function NoticeManagePage() {
  const [form, setForm] = useState<NoticeUpsertPayload>(initialForm);
  const [notices, setNotices] = useState<NoticeListItem[]>([]);
  const [selectedNotice, setSelectedNotice] = useState<NoticeDetail | null>(
    null
  );
  const [saveResult, setSaveResult] = useState<NoticeUpsertResult | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [deleteId, setDeleteId] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [listMessage, setListMessage] = useState("");
  const [saveMessage, setSaveMessage] = useState("");
  const [detailMessage, setDetailMessage] = useState("");
  const [uploadMessage, setUploadMessage] = useState("");
  const [deleteMessage, setDeleteMessage] = useState("");
  const [isLoadingList, setIsLoadingList] = useState(false);
  const [isLoadingDetail, setIsLoadingDetail] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [totalPages, setTotalPages] = useState(0);

  const isEditMode = useMemo(() => Boolean(form.noticeId), [form.noticeId]);

  const loadNotices = async (page = currentPage) => {
    try {
      setIsLoadingList(true);
      setListMessage("");
      const result = await getNoticeList({ page });
      console.log(result);
      setNotices(Array.isArray(result.content) ? result.content : []);
      setTotalPages(result.totalPages);
      setCurrentPage(result.number);

      if (!result.content.length) {
        setListMessage("등록된 공지사항이 없습니다.");
      }
    } catch {
      setNotices([]);
      setTotalPages(0);
      setListMessage("공지사항 목록을 불러오지 못했습니다.");
    } finally {
      setIsLoadingList(false);
    }
  };

  useEffect(() => {
    void loadNotices(0);
  }, []);

  const handleFieldChange =
    (key: "title" | "content" | "category") =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { value } = event.target;

      setForm((prev) => ({
        ...prev,
        [key]: value,
      }));
    };

  const handleBooleanChange =
    (key: "isPinned" | "isExternal") =>
    (event: ChangeEvent<HTMLSelectElement>) => {
      setForm((prev) => ({
        ...prev,
        [key]: event.target.value === "true",
      }));
    };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    setSelectedFile(file);
    setUploadMessage("");
  };

  const handleUploadImage = async () => {
    if (!selectedFile) {
      setUploadMessage("먼저 이미지 파일을 선택해 주세요.");
      return;
    }

    try {
      setIsUploadingImage(true);
      setUploadMessage("");
      const imageUrl = await uploadNoticeImage(selectedFile);
      setUploadedImageUrl(imageUrl);
      setForm((prev) => ({
        ...prev,
        imageUrls: prev.imageUrls.includes(imageUrl)
          ? prev.imageUrls
          : [...prev.imageUrls, imageUrl],
      }));
      setUploadMessage("공지사항 이미지가 업로드되었습니다.");
      setSelectedFile(null);
    } catch {
      setUploadMessage("공지사항 이미지 업로드에 실패했습니다.");
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleRemoveImage = (imageUrl: string) => {
    setForm((prev) => ({
      ...prev,
      imageUrls: prev.imageUrls.filter((url) => url !== imageUrl),
    }));
  };

  const handleReset = () => {
    setForm(initialForm);
    setSelectedNotice(null);
    setSaveResult(null);
    setSaveMessage("");
    setDetailMessage("");
    setUploadMessage("");
    setUploadedImageUrl("");
    setSelectedFile(null);
  };

  const handleLoadDetail = async (noticeId: number) => {
    try {
      setIsLoadingDetail(true);
      setDetailMessage("");

      const detail = await getNoticeDetail(noticeId);

      setSelectedNotice(detail);
      setForm({
        noticeId: detail.id,
        title: detail.title,
        content: detail.content,
        isPinned: detail.isPinned ?? false,
        isExternal: detail.isExternal,
        category: detail.category ?? "",
        imageUrls: detail.imageUrls ?? [],
      });
      setUploadedImageUrl(detail.imageUrls?.[0] ?? "");
      setDetailMessage(
        detail.isPinned === undefined
          ? "상세 정보를 불러왔습니다. 응답에 isPinned가 없어 false로 처리했습니다."
          : "수정할 공지사항 상세 정보를 불러왔습니다."
      );
    } catch {
      setDetailMessage("공지사항 상세 정보를 불러오지 못했습니다.");
    } finally {
      setIsLoadingDetail(false);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setIsSaving(true);
      setSaveMessage("");
      console.log("[notice/manage] save payload", form);

      const result = await saveNotice(form);
      setSaveResult(result);
      setSaveMessage(
        form.noticeId
          ? "공지사항이 수정되었습니다."
          : "공지사항이 등록되었습니다."
      );
      await loadNotices(currentPage);
      handleReset();
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log("[notice/manage] save error", {
          status: error.response?.status,
          data: error.response?.data,
        });
      }

      setSaveResult(null);
      setSaveMessage("공지사항 저장에 실패했습니다.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId.trim()) {
      setDeleteMessage("삭제할 공지사항 ID를 입력해 주세요.");
      return;
    }

    try {
      setIsDeleting(true);
      setDeleteMessage("");
      await deleteNotice(deleteId.trim());
      setDeleteMessage("공지사항이 삭제되었습니다.");
      if (form.noticeId === Number(deleteId.trim())) {
        handleReset();
      }
      setDeleteId("");
      await loadNotices(currentPage);
    } catch {
      setDeleteMessage("공지사항 삭제에 실패했습니다.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <S.Page>
      <S.Shell>
        <S.Header>
          <S.Eyebrow>공지사항 관리자</S.Eyebrow>
          <S.Title>공지사항 관리</S.Title>
          <S.Description>
            공지사항 목록, 상세 조회, 이미지 업로드, 등록, 수정, 삭제를 한
            곳에서 관리합니다.
          </S.Description>
        </S.Header>

        <S.Grid>
          <S.Card>
            <S.CardTitle>공지사항 이미지 업로드</S.CardTitle>
            <S.CardText>
              먼저 이미지를 업로드한 뒤, 업로드된 URL을 공지사항 payload에
              포함합니다.
            </S.CardText>

            <S.Field>
              <S.FieldLabel>이미지 파일</S.FieldLabel>
              <S.Input
                type='file'
                accept='image/*'
                onChange={handleFileChange}
              />
            </S.Field>

            <S.ButtonRow>
              <S.PrimaryButton type='button' onClick={handleUploadImage}>
                {isUploadingImage ? "업로드 중..." : "공지 이미지 업로드"}
              </S.PrimaryButton>
            </S.ButtonRow>

            {uploadMessage ? (
              <S.StatusText $error={!uploadedImageUrl}>
                {uploadMessage}
              </S.StatusText>
            ) : null}

            <S.PreviewPanel>
              {uploadedImageUrl ? (
                <S.PreviewImage
                  src={uploadedImageUrl}
                  alt='공지 이미지 미리보기'
                />
              ) : (
                <S.EmptyPreview>
                  업로드한 이미지 미리보기가 여기에 표시됩니다.
                </S.EmptyPreview>
              )}

              <S.CodeBlock>
                {JSON.stringify(form.imageUrls, null, 2)}
              </S.CodeBlock>
            </S.PreviewPanel>
          </S.Card>

          <S.Card>
            <S.CardTitle>
              {isEditMode ? "공지사항 수정" : "공지사항 등록"}
            </S.CardTitle>
            <S.CardText>
              API.md 기준 payload에 맞춰 카테고리, 외부 공개 여부, 이미지 URL
              목록까지 함께 저장합니다.
            </S.CardText>

            <S.Form onSubmit={handleSubmit}>
              <S.Field>
                <S.FieldLabel>제목</S.FieldLabel>
                <S.Input
                  value={form.title}
                  onChange={handleFieldChange("title")}
                  placeholder='공지사항 제목'
                />
              </S.Field>

              <S.Field>
                <S.FieldLabel>내용</S.FieldLabel>
                <S.TextArea
                  value={form.content}
                  onChange={handleFieldChange("content")}
                  placeholder='공지사항 내용'
                />
              </S.Field>

              <S.Field>
                <S.FieldLabel>카테고리</S.FieldLabel>
                <S.Input
                  value={form.category}
                  onChange={handleFieldChange("category")}
                  placeholder='카테고리'
                />
              </S.Field>

              <S.InlineFields>
                <S.Field>
                  <S.FieldLabel>상단 고정 여부</S.FieldLabel>
                  <S.Select
                    value={String(form.isPinned)}
                    onChange={handleBooleanChange("isPinned")}
                  >
                    <option value='true'>true</option>
                    <option value='false'>false</option>
                  </S.Select>
                </S.Field>

                <S.Field>
                  <S.FieldLabel>외부 공개 여부</S.FieldLabel>
                  <S.Select
                    value={String(form.isExternal)}
                    onChange={handleBooleanChange("isExternal")}
                  >
                    <option value='true'>true</option>
                    <option value='false'>false</option>
                  </S.Select>
                </S.Field>
              </S.InlineFields>

              <S.Field>
                <S.FieldLabel>noticeId</S.FieldLabel>
                <S.Input
                  value={form.noticeId ?? ""}
                  readOnly
                  placeholder='수정 모드에서 자동 입력됩니다.'
                />
              </S.Field>

              <S.CardTitle as='h3'>첨부 이미지</S.CardTitle>
              <S.ButtonRow>
                {form.imageUrls.map((imageUrl) => (
                  <S.SecondaryButton
                    key={imageUrl}
                    type='button'
                    onClick={() => handleRemoveImage(imageUrl)}
                  >
                    이미지 제거
                  </S.SecondaryButton>
                ))}
              </S.ButtonRow>
              <S.CodeBlock>
                {JSON.stringify(form.imageUrls, null, 2)}
              </S.CodeBlock>

              <S.ButtonRow>
                <S.PrimaryButton type='submit'>
                  {isSaving
                    ? "저장 중..."
                    : isEditMode
                    ? "공지 수정"
                    : "공지 등록"}
                </S.PrimaryButton>
                <S.SecondaryButton type='button' onClick={handleReset}>
                  초기화
                </S.SecondaryButton>
              </S.ButtonRow>
            </S.Form>

            {detailMessage ? (
              <S.StatusText>{detailMessage}</S.StatusText>
            ) : null}
            {saveMessage ? (
              <S.StatusText $error={!saveResult}>{saveMessage}</S.StatusText>
            ) : null}

            <S.PreviewPanel>
              <S.CardTitle as='h3'>요청 미리보기</S.CardTitle>
              <S.CodeBlock>{JSON.stringify(form, null, 2)}</S.CodeBlock>
              <S.CardTitle as='h3'>응답</S.CardTitle>
              <S.CodeBlock>
                {saveResult
                  ? JSON.stringify(saveResult, null, 2)
                  : "아직 응답이 없습니다."}
              </S.CodeBlock>
            </S.PreviewPanel>
          </S.Card>

          <S.Card>
            <S.CardTitle>공지사항 목록</S.CardTitle>
            <S.CardText>
              <code>GET /api/notices</code>의 페이지 목록을 확인하고 수정할
              공지를 선택합니다.
            </S.CardText>

            <S.ButtonRow>
              <S.SecondaryButton
                type='button'
                onClick={() => void loadNotices(currentPage)}
              >
                {isLoadingList ? "불러오는 중..." : "목록 새로고침"}
              </S.SecondaryButton>
              <S.SecondaryButton
                type='button'
                onClick={() => void loadNotices(Math.max(currentPage - 1, 0))}
                disabled={currentPage === 0}
              >
                이전 페이지
              </S.SecondaryButton>
              <S.SecondaryButton
                type='button'
                onClick={() =>
                  void loadNotices(
                    Math.min(currentPage + 1, Math.max(totalPages - 1, 0))
                  )
                }
                disabled={currentPage >= totalPages - 1 || totalPages === 0}
              >
                다음 페이지
              </S.SecondaryButton>
            </S.ButtonRow>

            {listMessage ? (
              <S.StatusText $error={!notices.length}>
                {listMessage}
              </S.StatusText>
            ) : null}

            <S.CodeBlock>
              {JSON.stringify({ currentPage, totalPages, notices }, null, 2)}
            </S.CodeBlock>

            <S.CardTitle as='h3'>상세 조회</S.CardTitle>
            <S.ButtonRow>
              {notices.map((notice) => (
                <S.SecondaryButton
                  key={notice.id}
                  type='button'
                  onClick={() => void handleLoadDetail(notice.id)}
                >
                  {notice.id}. {notice.title}
                </S.SecondaryButton>
              ))}
            </S.ButtonRow>

            <S.CodeBlock>
              {isLoadingDetail
                ? "상세 정보를 불러오는 중입니다."
                : selectedNotice
                ? JSON.stringify(selectedNotice, null, 2)
                : "선택한 공지사항이 없습니다."}
            </S.CodeBlock>
          </S.Card>

          <S.Card>
            <S.CardTitle>공지사항 삭제</S.CardTitle>
            <S.CardText>공지사항 ID를 입력해 항목을 삭제합니다.</S.CardText>

            <S.Field>
              <S.FieldLabel>공지사항 ID</S.FieldLabel>
              <S.Input
                value={deleteId}
                onChange={(event) => setDeleteId(event.target.value)}
                placeholder='삭제할 ID'
              />
            </S.Field>

            <S.ButtonRow>
              <S.DangerButton type='button' onClick={handleDelete}>
                {isDeleting ? "삭제 중..." : "공지 삭제"}
              </S.DangerButton>
            </S.ButtonRow>

            {deleteMessage ? (
              <S.StatusText>{deleteMessage}</S.StatusText>
            ) : null}
          </S.Card>
        </S.Grid>
      </S.Shell>
    </S.Page>
  );
}
