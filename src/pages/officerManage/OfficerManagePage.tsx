import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import * as S from "../clubIntroManage/ClubIntroManagePage.styles";
import {
  createOfficer,
  deleteOfficer,
  getOfficerList,
  updateOfficer,
  updateOfficerImage,
  uploadOfficerImage,
  type OfficerPayload,
  type OfficerResponse,
} from "../../services/officerApi";
import { useAuthStore } from "../../stores/authStore";

const initialForm: OfficerPayload = {
  name: "",
  generation: 1,
  role: "",
  department: "",
  email: "",
  photoUrl: "",
  sortOrder: 0,
  isVisible: true,
  updatedBy: "",
};

const getOfficerId = (officer: OfficerResponse) => officer.officerId ?? officer.id ?? null;

export default function OfficerManagePage() {
  const userId = useAuthStore((state) => state.userId);
  const [form, setForm] = useState<OfficerPayload>(initialForm);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadedUrl, setUploadedUrl] = useState("");
  const [response, setResponse] = useState<OfficerResponse | null>(null);
  const [selectedOfficer, setSelectedOfficer] = useState<OfficerResponse | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [deleteResponse, setDeleteResponse] = useState<unknown>(null);
  const [officers, setOfficers] = useState<OfficerResponse[]>([]);
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
  const activePhotoUrl = uploadedUrl || form.photoUrl;

  const loadOfficers = async () => {
    try {
      setIsLoadingList(true);
      const result = await getOfficerList();
      setOfficers(Array.isArray(result) ? result : []);
    } catch (error) {
      console.error("officer list fetch failed", error);
      setOfficers([]);
    } finally {
      setIsLoadingList(false);
    }
  };

  useEffect(() => {
    void loadOfficers();
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
    setSelectedOfficer(null);
    setEditingId(null);
    setUploadMessage("");
    setSubmitMessage("");
    setDetailMessage("");
  };

  const handleTextChange =
    (key: keyof OfficerPayload) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { value } = event.target;

      setForm((prev) => ({
        ...prev,
        [key]: key === "generation" || key === "sortOrder" ? Number(value || 0) : value,
      }));
    };

  const handleVisibleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setForm((prev) => ({
      ...prev,
      isVisible: event.target.value === "true",
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

  const handleSelectOfficer = (officer: OfficerResponse) => {
    const officerId = getOfficerId(officer);

    setSelectedOfficer(officer);
    setEditingId(officerId);
    setUploadedUrl(officer.photoUrl ?? "");
    setSelectedFile(null);
    setUploadMessage("");
    setSubmitMessage("");
    setDetailMessage("선택한 임원 정보를 수정 모드로 불러왔습니다.");
    setForm({
      name: officer.name ?? "",
      generation: officer.generation ?? 1,
      role: officer.role ?? "",
      department: officer.department ?? "",
      email: officer.email ?? "",
      photoUrl: officer.photoUrl ?? "",
      sortOrder: officer.sortOrder ?? 0,
      isVisible: officer.isVisible ?? true,
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
          ? await updateOfficerImage(editingId, selectedFile)
          : await uploadOfficerImage(selectedFile);

      setUploadedUrl(imageUrl);
      setForm((prev) => ({ ...prev, photoUrl: imageUrl }));
      setUploadMessage(
        editingId !== null
          ? "임원 이미지가 수정되었습니다."
          : "임원 이미지가 업로드되었습니다."
      );
    } catch (error) {
      console.error("officer image upload failed", error);
      setUploadMessage("임원 이미지 업로드에 실패했습니다.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setIsSubmitting(true);
      setSubmitMessage("");

      const payload: OfficerPayload = {
        ...form,
        photoUrl: activePhotoUrl,
      };

      const result =
        editingId !== null
          ? await updateOfficer(editingId, payload)
          : await createOfficer(payload);

      setResponse(result);
      setSubmitMessage(
        editingId !== null
          ? "임원 정보가 수정되었습니다."
          : "임원 정보가 등록되었습니다."
      );
      await loadOfficers();
      resetForm();
    } catch (error) {
      console.error("officer submit failed", error);
      setSubmitMessage(
        editingId !== null ? "임원 정보 수정에 실패했습니다." : "임원 정보 등록에 실패했습니다."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId.trim()) {
      setDeleteMessage("삭제할 임원 ID를 입력해 주세요.");
      return;
    }

    try {
      setIsDeleting(true);
      setDeleteMessage("");

      const result = await deleteOfficer(deleteId.trim());
      setDeleteResponse(result);
      setDeleteMessage("임원 정보가 삭제되었습니다.");

      if (editingId === Number(deleteId.trim())) {
        resetForm();
      }

      setDeleteId("");
      await loadOfficers();
    } catch (error) {
      console.error("officer delete failed", error);
      setDeleteMessage("임원 정보 삭제에 실패했습니다.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <S.Page>
      <S.Shell>
        <S.Header>
          <S.Eyebrow>임원진 관리자</S.Eyebrow>
          <S.Title>임원진 관리</S.Title>
          <S.Description>
            임원 등록, 기존 정보 수정, 이미지 교체까지 한 화면에서 관리할 수 있습니다.
          </S.Description>
        </S.Header>

        <S.Grid>
          <S.Card>
            <S.CardTitle>임원 이미지 업로드</S.CardTitle>
            <S.CardText>
              먼저 이미지를 업로드해 주세요. 수정 모드에서는 현재 임원 이미지를 교체합니다.
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
              <S.StatusText $error={!activePhotoUrl}>{uploadMessage}</S.StatusText>
            ) : null}

            <S.PreviewPanel>
              {activePhotoUrl ? (
                <S.PreviewImage src={activePhotoUrl} alt="임원 이미지 미리보기" />
              ) : (
                <S.EmptyPreview>임원 이미지 미리보기가 여기에 표시됩니다.</S.EmptyPreview>
              )}

              <S.MetaList>
                <S.MetaLabel>파일</S.MetaLabel>
                <S.MetaValue>{selectedFile ? selectedFile.name : "선택된 파일이 없습니다."}</S.MetaValue>

                <S.MetaLabel>URL</S.MetaLabel>
                <S.MetaValue>{activePhotoUrl || "업로드된 URL이 없습니다."}</S.MetaValue>
              </S.MetaList>
            </S.PreviewPanel>
          </S.Card>

          <S.Card>
            <S.CardTitle>{isEditMode ? "임원 정보 수정" : "임원 정보 등록"}</S.CardTitle>
            <S.CardText>
              {isEditMode
                ? "선택한 임원 정보를 수정하고 저장합니다."
                : "새 임원 정보를 등록합니다."}
            </S.CardText>

            <S.Form onSubmit={handleSubmit}>
              <S.Field>
                <S.FieldLabel>이름</S.FieldLabel>
                <S.Input value={form.name} onChange={handleTextChange("name")} placeholder="이름" />
              </S.Field>

              <S.InlineFields>
                <S.Field>
                  <S.FieldLabel>기수</S.FieldLabel>
                  <S.Input
                    type="number"
                    value={form.generation}
                    onChange={handleTextChange("generation")}
                  />
                </S.Field>

                <S.Field>
                  <S.FieldLabel>정렬 순서</S.FieldLabel>
                  <S.Input
                    type="number"
                    value={form.sortOrder}
                    onChange={handleTextChange("sortOrder")}
                  />
                </S.Field>
              </S.InlineFields>

              <S.Field>
                <S.FieldLabel>역할</S.FieldLabel>
                <S.Input value={form.role} onChange={handleTextChange("role")} placeholder="역할" />
              </S.Field>

              <S.Field>
                <S.FieldLabel>학과</S.FieldLabel>
                <S.Input
                  value={form.department}
                  onChange={handleTextChange("department")}
                  placeholder="학과"
                />
              </S.Field>

              <S.Field>
                <S.FieldLabel>이메일</S.FieldLabel>
                <S.Input value={form.email} onChange={handleTextChange("email")} placeholder="email@example.com" />
              </S.Field>

              <S.Field>
                <S.FieldLabel>사진 URL</S.FieldLabel>
                <S.Input value={activePhotoUrl} onChange={handleTextChange("photoUrl")} placeholder="사진 이미지 URL" />
              </S.Field>

              <S.InlineFields>
                <S.Field>
                  <S.FieldLabel>isVisible</S.FieldLabel>
                  <S.Select value={String(form.isVisible)} onChange={handleVisibleChange}>
                    <option value="true">true</option>
                    <option value="false">false</option>
                  </S.Select>
                </S.Field>

                <S.Field>
                  <S.FieldLabel>수정자</S.FieldLabel>
                  <S.Input value={form.updatedBy} onChange={handleTextChange("updatedBy")} />
                </S.Field>
              </S.InlineFields>

              <S.ButtonRow>
                <S.PrimaryButton type="submit">
                  {isSubmitting ? "저장 중..." : isEditMode ? "수정 저장" : "임원 등록"}
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
              <S.CodeBlock>{JSON.stringify({ ...form, photoUrl: activePhotoUrl }, null, 2)}</S.CodeBlock>

              <S.CardTitle as="h3">응답</S.CardTitle>
              <S.CodeBlock>
                {response ? JSON.stringify(response, null, 2) : "아직 응답이 없습니다."}
              </S.CodeBlock>
            </S.PreviewPanel>
          </S.Card>

          <S.Card>
            <S.CardTitle>임원진 목록</S.CardTitle>
            <S.CardText>목록을 새로고침하고 수정할 임원을 선택해 주세요.</S.CardText>

            <S.ButtonRow>
              <S.SecondaryButton type="button" onClick={() => void loadOfficers()}>
                {isLoadingList ? "불러오는 중..." : "목록 새로고침"}
              </S.SecondaryButton>
            </S.ButtonRow>

            <S.CardTitle as="h3">수정할 항목 선택</S.CardTitle>
            <S.ButtonRow>
              {officers.map((officer) => {
                const officerId = getOfficerId(officer);
                return (
                  <S.SecondaryButton
                    key={officerId ?? officer.name}
                    type="button"
                    onClick={() => handleSelectOfficer(officer)}
                  >
                    {officerId ?? "-"}. {officer.name}
                  </S.SecondaryButton>
                );
              })}
            </S.ButtonRow>

            <S.CodeBlock>{JSON.stringify(officers, null, 2)}</S.CodeBlock>

            <S.CardTitle as="h3">선택한 항목</S.CardTitle>
            <S.CodeBlock>
              {selectedOfficer
                ? JSON.stringify(selectedOfficer, null, 2)
                : "선택한 임원이 없습니다."}
            </S.CodeBlock>
          </S.Card>

          <S.Card>
            <S.CardTitle>임원 정보 삭제</S.CardTitle>
            <S.CardText>임원 ID를 입력해 항목을 삭제합니다.</S.CardText>

            <S.Field>
              <S.FieldLabel>임원 ID</S.FieldLabel>
              <S.Input value={deleteId} onChange={handleDeleteIdChange} placeholder="삭제할 ID" />
            </S.Field>

            <S.ButtonRow>
              <S.DangerButton type="button" onClick={handleDelete}>
                {isDeleting ? "삭제 중..." : "임원 삭제"}
              </S.DangerButton>
            </S.ButtonRow>

            {deleteMessage ? (
              <S.StatusText $error={!deleteResponse}>{deleteMessage}</S.StatusText>
            ) : null}

            <S.PreviewPanel>
              <S.CardTitle as="h3">삭제 요청</S.CardTitle>
              <S.CodeBlock>
                {deleteId.trim()
                  ? `DELETE /api/officer/${deleteId.trim()}`
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
