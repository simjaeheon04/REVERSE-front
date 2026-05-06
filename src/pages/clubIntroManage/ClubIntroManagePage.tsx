import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import * as S from "./ClubIntroManagePage.styles";
import {
  createClubIntro,
  deleteClubIntro,
  getClubIntroList,
  updateClubIntro,
  updateClubIntroImage,
  uploadClubIntroImage,
  type ClubIntroPayload,
  type ClubIntroResponse,
} from "../../services/clubIntroApi";
import { useAuthStore } from "../../stores/authStore";

const initialForm: ClubIntroPayload = {
  title: "",
  subTitle: "",
  bannerUrl: "",
  isActive: true,
  updatedBy: "",
};

const getClubIntroId = (clubIntro: ClubIntroResponse) =>
  clubIntro.clubIntroId ?? clubIntro.id ?? null;

export default function ClubIntroManagePage() {
  const userId = useAuthStore((state) => state.userId);
  const [form, setForm] = useState<ClubIntroPayload>(initialForm);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadedUrl, setUploadedUrl] = useState("");
  const [response, setResponse] = useState<ClubIntroResponse | null>(null);
  const [selectedClubIntro, setSelectedClubIntro] = useState<ClubIntroResponse | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [deleteResponse, setDeleteResponse] = useState<unknown>(null);
  const [clubIntros, setClubIntros] = useState<ClubIntroResponse[]>([]);
  const [uploadMessage, setUploadMessage] = useState("");
  const [submitMessage, setSubmitMessage] = useState("");
  const [detailMessage, setDetailMessage] = useState("");
  const [deleteMessage, setDeleteMessage] = useState("");
  const [deleteId, setDeleteId] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLoadingList, setIsLoadingList] = useState(false);

  const isEditMode = editingId !== null;
  const activeBannerUrl = uploadedUrl || form.bannerUrl;

  const loadClubIntros = async () => {
    try {
      setIsLoadingList(true);
      const result = await getClubIntroList();
      setClubIntros(Array.isArray(result) ? result : []);
    } catch (error) {
      console.error("club intro list fetch failed", error);
      setClubIntros([]);
    } finally {
      setIsLoadingList(false);
    }
  };

  useEffect(() => {
    void loadClubIntros();
  }, []);

  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      updatedBy: userId ?? "",
    }));
  }, [userId]);

  const resetForm = () => {
    setForm({
      ...initialForm,
      updatedBy: userId ?? "",
    });
    setSelectedFile(null);
    setUploadedUrl("");
    setResponse(null);
    setSelectedClubIntro(null);
    setEditingId(null);
    setUploadMessage("");
    setSubmitMessage("");
    setDetailMessage("");
  };

  const handleTextChange =
    (key: keyof ClubIntroPayload) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { value } = event.target;

      setForm((prev) => ({
        ...prev,
        [key]: key === "isActive" ? value === "true" || value === "1" : value,
      }));
    };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    setSelectedFile(file);
    setUploadMessage("");
  };

  const handleDeleteIdChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDeleteId(event.target.value);
    setDeleteMessage("");
  };

  const handleSelectClubIntro = (clubIntro: ClubIntroResponse) => {
    const clubIntroId = getClubIntroId(clubIntro);

    setSelectedClubIntro(clubIntro);
    setEditingId(clubIntroId);
    setUploadedUrl(clubIntro.bannerUrl ?? "");
    setSelectedFile(null);
    setUploadMessage("");
    setSubmitMessage("");
    setDetailMessage("선택한 동아리 소개를 수정 모드로 불러왔습니다.");
    setForm({
      title: clubIntro.title ?? "",
      subTitle: clubIntro.subTitle ?? "",
      bannerUrl: clubIntro.bannerUrl ?? "",
      isActive: clubIntro.isActive ?? true,
      updatedBy: userId ?? "",
    });
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadMessage("먼저 이미지 파일을 선택해 주세요.");
      return;
    }

    try {
      setIsUploading(true);
      setUploadMessage("");

      const imageUrl =
        editingId !== null
          ? await updateClubIntroImage(editingId, selectedFile)
          : await uploadClubIntroImage(selectedFile);

      setUploadedUrl(imageUrl);
      setForm((prev) => ({ ...prev, bannerUrl: imageUrl }));
      setUploadMessage(
        editingId !== null
          ? "배너 이미지가 수정되었습니다."
          : "배너 이미지가 업로드되었습니다."
      );
    } catch (error) {
      console.error("image upload failed", error);
      setUploadMessage("이미지 업로드에 실패했습니다.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setIsSubmitting(true);
      setSubmitMessage("");

      const payload = {
        ...form,
        bannerUrl: activeBannerUrl,
      };

      const result =
        editingId !== null
          ? await updateClubIntro(editingId, payload)
          : await createClubIntro(payload);

      setResponse(result);
      setSubmitMessage(
        editingId !== null
          ? "동아리 소개가 수정되었습니다."
          : "동아리 소개가 등록되었습니다."
      );
      await loadClubIntros();
      resetForm();
    } catch (error) {
      console.error("club intro submit failed", error);
      setSubmitMessage(
        editingId !== null
          ? "동아리 소개 수정에 실패했습니다."
          : "동아리 소개 등록에 실패했습니다."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId.trim()) {
      setDeleteMessage("삭제할 동아리 소개 ID를 입력해 주세요.");
      return;
    }

    try {
      setIsDeleting(true);
      setDeleteMessage("");

      const result = await deleteClubIntro(deleteId.trim());
      setDeleteResponse(result);
      setDeleteMessage("동아리 소개가 삭제되었습니다.");

      if (editingId === Number(deleteId.trim())) {
        resetForm();
      }

      setDeleteId("");
      await loadClubIntros();
    } catch (error) {
      console.error("club intro delete failed", error);
      setDeleteMessage("동아리 소개 삭제에 실패했습니다.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <S.Page>
      <S.Shell>
        <S.Header>
          <S.Eyebrow>동아리 소개 관리자</S.Eyebrow>
          <S.Title>동아리 소개 관리</S.Title>
          <S.Description>
            배너 업로드, 동아리 소개 등록, 기존 항목 수정까지 한 화면에서 관리할 수 있습니다.
          </S.Description>
        </S.Header>

        <S.Grid>
          <S.Card>
            <S.CardTitle>배너 업로드</S.CardTitle>
            <S.CardText>
              먼저 배너 이미지를 업로드해 주세요. 수정 모드에서는 현재 배너 이미지를 교체합니다.
            </S.CardText>

            <S.Field>
              <S.FieldLabel>이미지 파일</S.FieldLabel>
              <S.Input type="file" accept="image/*" onChange={handleFileChange} />
            </S.Field>

            <S.ButtonRow>
              <S.PrimaryButton type="button" onClick={handleUpload}>
                {isUploading ? "업로드 중..." : isEditMode ? "이미지 수정" : "이미지 업로드"}
              </S.PrimaryButton>
            </S.ButtonRow>

            {uploadMessage ? (
              <S.StatusText $error={!activeBannerUrl}>{uploadMessage}</S.StatusText>
            ) : null}

            <S.PreviewPanel>
              {activeBannerUrl ? (
                <S.PreviewImage src={activeBannerUrl} alt="배너 미리보기" />
              ) : (
                <S.EmptyPreview>배너 미리보기가 여기에 표시됩니다.</S.EmptyPreview>
              )}

              <S.MetaList>
                <S.MetaLabel>파일</S.MetaLabel>
                <S.MetaValue>{selectedFile ? selectedFile.name : "선택된 파일이 없습니다."}</S.MetaValue>

                <S.MetaLabel>URL</S.MetaLabel>
                <S.MetaValue>{activeBannerUrl || "업로드된 URL이 없습니다."}</S.MetaValue>
              </S.MetaList>
            </S.PreviewPanel>
          </S.Card>

          <S.Card>
            <S.CardTitle>{isEditMode ? "동아리 소개 수정" : "동아리 소개 등록"}</S.CardTitle>
            <S.CardText>
              {isEditMode
                ? "선택한 동아리 소개를 수정하고 저장합니다."
                : "새 동아리 소개 항목을 등록합니다."}
            </S.CardText>

            <S.Form onSubmit={handleSubmit}>
              <S.Field>
                <S.FieldLabel>제목</S.FieldLabel>
                <S.Input value={form.title} onChange={handleTextChange("title")} placeholder="REVERSE" />
              </S.Field>

              <S.Field>
                <S.FieldLabel>부제목</S.FieldLabel>
                <S.TextArea
                  value={form.subTitle}
                  onChange={handleTextChange("subTitle")}
                  placeholder="동아리 소개 부제목"
                />
              </S.Field>

              <S.Field>
                <S.FieldLabel>배너 URL</S.FieldLabel>
                <S.Input
                  value={activeBannerUrl}
                  onChange={handleTextChange("bannerUrl")}
                  placeholder="배너 이미지 URL"
                />
              </S.Field>

              <S.InlineFields>
                <S.Field>
                  <S.FieldLabel>isActive</S.FieldLabel>
                  <S.Input value={String(form.isActive)} onChange={handleTextChange("isActive")} />
                </S.Field>

                <S.Field>
                  <S.FieldLabel>수정자</S.FieldLabel>
                  <S.Input value={form.updatedBy} onChange={handleTextChange("updatedBy")} />
                </S.Field>
              </S.InlineFields>

              <S.ButtonRow>
                <S.PrimaryButton type="submit">
                  {isSubmitting ? "저장 중..." : isEditMode ? "수정 저장" : "소개 등록"}
                </S.PrimaryButton>
                <S.SecondaryButton type="button" onClick={resetForm}>
                  초기화
                </S.SecondaryButton>
              </S.ButtonRow>
            </S.Form>

            {detailMessage ? <S.StatusText>{detailMessage}</S.StatusText> : null}
            {submitMessage ? <S.StatusText $error={!response}>{submitMessage}</S.StatusText> : null}

            <S.PreviewPanel>
              <S.CardTitle as="h3">요청 미리보기</S.CardTitle>
              <S.CodeBlock>{JSON.stringify({ ...form, bannerUrl: activeBannerUrl }, null, 2)}</S.CodeBlock>

              <S.CardTitle as="h3">응답</S.CardTitle>
              <S.CodeBlock>
                {response ? JSON.stringify(response, null, 2) : "아직 응답이 없습니다."}
              </S.CodeBlock>
            </S.PreviewPanel>
          </S.Card>

          <S.Card>
            <S.CardTitle>동아리 소개 목록</S.CardTitle>
            <S.CardText>목록을 새로고침하고 수정할 항목을 선택해 주세요.</S.CardText>

            <S.ButtonRow>
              <S.SecondaryButton type="button" onClick={() => void loadClubIntros()}>
                {isLoadingList ? "불러오는 중..." : "목록 새로고침"}
              </S.SecondaryButton>
            </S.ButtonRow>

            <S.CardTitle as="h3">수정할 항목 선택</S.CardTitle>
            <S.ButtonRow>
              {clubIntros.map((clubIntro) => {
                const clubIntroId = getClubIntroId(clubIntro);
                return (
                  <S.SecondaryButton
                    key={clubIntroId ?? clubIntro.title}
                    type="button"
                    onClick={() => handleSelectClubIntro(clubIntro)}
                  >
                    {clubIntroId ?? "-"}. {clubIntro.title}
                  </S.SecondaryButton>
                );
              })}
            </S.ButtonRow>

            <S.CodeBlock>{JSON.stringify(clubIntros, null, 2)}</S.CodeBlock>

            <S.CardTitle as="h3">선택한 항목</S.CardTitle>
            <S.CodeBlock>
              {selectedClubIntro
                ? JSON.stringify(selectedClubIntro, null, 2)
                : "선택한 동아리 소개가 없습니다."}
            </S.CodeBlock>
          </S.Card>

          <S.Card>
            <S.CardTitle>동아리 소개 삭제</S.CardTitle>
            <S.CardText>ID를 입력해 항목을 삭제합니다.</S.CardText>

            <S.Field>
              <S.FieldLabel>동아리 소개 ID</S.FieldLabel>
              <S.Input value={deleteId} onChange={handleDeleteIdChange} placeholder="삭제할 ID" />
            </S.Field>

            <S.ButtonRow>
              <S.DangerButton type="button" onClick={handleDelete}>
                {isDeleting ? "삭제 중..." : "소개 삭제"}
              </S.DangerButton>
            </S.ButtonRow>

            {deleteMessage ? (
              <S.StatusText $error={!deleteResponse}>{deleteMessage}</S.StatusText>
            ) : null}

            <S.PreviewPanel>
              <S.CardTitle as="h3">삭제 요청</S.CardTitle>
              <S.CodeBlock>
                {deleteId.trim()
                  ? `DELETE /api/club-intro/${deleteId.trim()}`
                  : "ID를 입력하면 삭제 경로가 표시됩니다."}
              </S.CodeBlock>

              <S.CardTitle as="h3">응답</S.CardTitle>
              <S.CodeBlock>
                {deleteResponse ? JSON.stringify(deleteResponse, null, 2) : "아직 삭제 응답이 없습니다."}
              </S.CodeBlock>
            </S.PreviewPanel>
          </S.Card>
        </S.Grid>
      </S.Shell>
    </S.Page>
  );
}
