import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import * as S from "../clubIntroManage/ClubIntroManagePage.styles";
import {
  createOfficer,
  deleteOfficer,
  getOfficerList,
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

export default function OfficerManagePage() {
  const userId = useAuthStore((state) => state.userId);
  const [form, setForm] = useState<OfficerPayload>(initialForm);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadedUrl, setUploadedUrl] = useState("");
  const [response, setResponse] = useState<OfficerResponse | null>(null);
  const [deleteResponse, setDeleteResponse] = useState<unknown>(null);
  const [officers, setOfficers] = useState<OfficerResponse[]>([]);
  const [uploadMessage, setUploadMessage] = useState("");
  const [submitMessage, setSubmitMessage] = useState("");
  const [deleteMessage, setDeleteMessage] = useState("");
  const [deleteId, setDeleteId] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLoadingList, setIsLoadingList] = useState(false);

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

  const handleTextChange =
    (key: keyof OfficerPayload) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { value } = event.target;

      setForm((prev) => ({
        ...prev,
        [key]:
          key === "generation" || key === "sortOrder"
            ? Number(value || 0)
            : value,
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

  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadMessage("업로드할 프로필 이미지를 먼저 선택해 주세요.");
      return;
    }

    try {
      setIsUploading(true);
      setUploadMessage("");

      const imageUrl = await uploadOfficerImage(selectedFile);
      setUploadedUrl(imageUrl);
      setForm((prev) => ({ ...prev, photoUrl: imageUrl }));
      setUploadMessage("프로필 이미지 업로드가 완료되었습니다.");
    } catch (error) {
      console.error("officer image upload failed", error);
      setUploadMessage("프로필 이미지 업로드에 실패했습니다.");
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

      const result = await createOfficer(payload);
      setResponse(result);
      setSubmitMessage("임원진 소개 등록 요청이 완료되었습니다.");
      await loadOfficers();
    } catch (error) {
      console.error("officer create failed", error);
      setSubmitMessage("임원진 소개 등록 요청에 실패했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId.trim()) {
      setDeleteMessage("삭제할 임원진 ID를 입력해 주세요.");
      return;
    }

    try {
      setIsDeleting(true);
      setDeleteMessage("");

      const result = await deleteOfficer(deleteId.trim());
      setDeleteResponse(result);
      setDeleteMessage("임원진 소개 삭제 요청이 완료되었습니다.");
      await loadOfficers();
    } catch (error) {
      console.error("officer delete failed", error);
      setDeleteMessage("임원진 소개 삭제 요청에 실패했습니다.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <S.Page>
      <S.Shell>
        <S.Header>
          <S.Eyebrow>Officer Admin</S.Eyebrow>
          <S.Title>임원진 소개 관리</S.Title>
          <S.Description>
            프로필 이미지를 업로드하고 임원진 정보를 등록, 조회, 삭제할 수 있는
            관리자 페이지입니다.
          </S.Description>
        </S.Header>

        <S.Grid>
          <S.Card>
            <S.CardTitle>프로필 이미지 업로드</S.CardTitle>
            <S.CardText>
              <code>/api/officer/image</code>로 프로필 이미지를 업로드하고 반환된
              URL이 등록 요청의 <code>photoUrl</code>에 자동 반영됩니다.
            </S.CardText>

            <S.Field>
              <S.FieldLabel>이미지 파일</S.FieldLabel>
              <S.Input type="file" accept="image/*" onChange={handleFileChange} />
            </S.Field>

            <S.ButtonRow>
              <S.PrimaryButton type="button" onClick={handleUpload}>
                {isUploading ? "업로드 중.." : "프로필 이미지 업로드"}
              </S.PrimaryButton>
            </S.ButtonRow>

            {uploadMessage ? (
              <S.StatusText $error={!uploadedUrl}>{uploadMessage}</S.StatusText>
            ) : null}

            <S.PreviewPanel>
              {activePhotoUrl ? (
                <S.PreviewImage src={activePhotoUrl} alt="officer preview" />
              ) : (
                <S.EmptyPreview>
                  업로드한 프로필 미리보기가 여기에 표시됩니다.
                </S.EmptyPreview>
              )}

              <S.MetaList>
                <S.MetaLabel>선택 파일</S.MetaLabel>
                <S.MetaValue>
                  {selectedFile ? selectedFile.name : "선택한 파일이 없습니다."}
                </S.MetaValue>

                <S.MetaLabel>업로드 URL</S.MetaLabel>
                <S.MetaValue>{activePhotoUrl || "아직 URL이 없습니다."}</S.MetaValue>
              </S.MetaList>
            </S.PreviewPanel>
          </S.Card>

          <S.Card>
            <S.CardTitle>임원진 정보 등록</S.CardTitle>
            <S.CardText>
              아래 형식으로 <code>/api/officer</code>에 등록합니다.
            </S.CardText>

            <S.Form onSubmit={handleSubmit}>
              <S.Field>
                <S.FieldLabel>이름</S.FieldLabel>
                <S.Input
                  value={form.name}
                  onChange={handleTextChange("name")}
                  placeholder="홍길동"
                />
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
                <S.Input
                  value={form.role}
                  onChange={handleTextChange("role")}
                  placeholder="회장"
                />
              </S.Field>

              <S.Field>
                <S.FieldLabel>부서</S.FieldLabel>
                <S.Input
                  value={form.department}
                  onChange={handleTextChange("department")}
                  placeholder="기획"
                />
              </S.Field>

              <S.Field>
                <S.FieldLabel>이메일</S.FieldLabel>
                <S.Input
                  value={form.email}
                  onChange={handleTextChange("email")}
                  placeholder="reverse@example.com"
                />
              </S.Field>

              <S.Field>
                <S.FieldLabel>photoUrl</S.FieldLabel>
                <S.Input
                  value={activePhotoUrl}
                  onChange={handleTextChange("photoUrl")}
                  placeholder="업로드 후 자동 반영되거나 직접 입력할 수 있습니다."
                />
              </S.Field>

              <S.InlineFields>
                <S.Field>
                  <S.FieldLabel>노출 여부</S.FieldLabel>
                  <S.Select
                    value={String(form.isVisible)}
                    onChange={handleVisibleChange}
                  >
                    <option value="true">true</option>
                    <option value="false">false</option>
                  </S.Select>
                </S.Field>

                <S.Field>
                  <S.FieldLabel>updatedBy</S.FieldLabel>
                  <S.Input
                    value={form.updatedBy}
                    onChange={handleTextChange("updatedBy")}
                    placeholder={userId ?? ""}
                  />
                </S.Field>
              </S.InlineFields>

              <S.ButtonRow>
                <S.PrimaryButton type="submit">
                  {isSubmitting ? "등록 중.." : "임원진 등록"}
                </S.PrimaryButton>
                <S.SecondaryButton
                  type="button"
                  onClick={() => {
                    setForm({
                      ...initialForm,
                      updatedBy: userId ?? "",
                    });
                    setUploadedUrl("");
                    setResponse(null);
                    setUploadMessage("");
                    setSubmitMessage("");
                    setSelectedFile(null);
                  }}
                >
                  폼 초기화
                </S.SecondaryButton>
              </S.ButtonRow>
            </S.Form>

            {submitMessage ? (
              <S.StatusText $error={!response}>{submitMessage}</S.StatusText>
            ) : null}

            <S.PreviewPanel>
              <div>
                <S.CardTitle as="h3">요청 미리보기</S.CardTitle>
              </div>
              <S.CodeBlock>
                {JSON.stringify(
                  {
                    ...form,
                    photoUrl: activePhotoUrl,
                  },
                  null,
                  2
                )}
              </S.CodeBlock>

              <div>
                <S.CardTitle as="h3">응답</S.CardTitle>
              </div>
              <S.CodeBlock>
                {response ? JSON.stringify(response, null, 2) : "아직 응답이 없습니다."}
              </S.CodeBlock>
            </S.PreviewPanel>
          </S.Card>

          <S.Card>
            <S.CardTitle>임원진 전체 조회</S.CardTitle>
            <S.CardText>
              <code>GET /api/officer</code> 응답을 그대로 확인할 수 있습니다.
            </S.CardText>

            <S.ButtonRow>
              <S.SecondaryButton type="button" onClick={loadOfficers}>
                {isLoadingList ? "불러오는 중.." : "목록 새로고침"}
              </S.SecondaryButton>
            </S.ButtonRow>

            <S.CodeBlock>{JSON.stringify(officers, null, 2)}</S.CodeBlock>
          </S.Card>

          <S.Card>
            <S.CardTitle>임원진 정보 삭제</S.CardTitle>
            <S.CardText>
              삭제할 임원진 ID를 입력하면
              <code>DELETE /api/officer/{`{id}`}</code> 요청을 보냅니다.
            </S.CardText>

            <S.Field>
              <S.FieldLabel>임원진 ID</S.FieldLabel>
              <S.Input
                value={deleteId}
                onChange={handleDeleteIdChange}
                placeholder="삭제할 임원진 ID"
              />
            </S.Field>

            <S.ButtonRow>
              <S.DangerButton type="button" onClick={handleDelete}>
                {isDeleting ? "삭제 중.." : "임원진 삭제"}
              </S.DangerButton>
            </S.ButtonRow>

            {deleteMessage ? (
              <S.StatusText $error={!deleteResponse}>{deleteMessage}</S.StatusText>
            ) : null}

            <S.PreviewPanel>
              <div>
                <S.CardTitle as="h3">삭제 요청</S.CardTitle>
              </div>
              <S.CodeBlock>
                {deleteId.trim()
                  ? `DELETE /api/officer/${deleteId.trim()}`
                  : "삭제할 ID를 입력하면 요청 경로가 여기에 표시됩니다."}
              </S.CodeBlock>

              <div>
                <S.CardTitle as="h3">응답</S.CardTitle>
              </div>
              <S.CodeBlock>
                {deleteResponse
                  ? JSON.stringify(deleteResponse, null, 2)
                  : "아직 삭제 응답이 없습니다."}
              </S.CodeBlock>
            </S.PreviewPanel>
          </S.Card>
        </S.Grid>
      </S.Shell>
    </S.Page>
  );
}
