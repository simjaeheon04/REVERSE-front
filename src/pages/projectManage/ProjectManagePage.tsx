import { useEffect, useState, type ChangeEvent } from "react";
import * as S from "./ProjectManagePage.styles";
import {
  createProject,
  deleteProject,
  getProjectList,
  updateProject,
  updateProjectImage,
  uploadProjectImage,
  type ClubProject,
  type ClubProjectPayload,
} from "../../services/projectAPI";
import { useAuthStore } from "../../stores/authStore";

const initialForm: ClubProjectPayload = {
  projectName: "",
  projectUrl: "",
  thumbnailUrl: "",
  sortOrder: 0,
  updatedBy: "",
};

export default function ProjectManagePage() {
  const userId = useAuthStore((state) => state.userId);
  const [form, setForm] = useState<ClubProjectPayload>(initialForm);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadedUrl, setUploadedUrl] = useState("");
  const [response, setResponse] = useState<ClubProject | null>(null);
  const [selectedProject, setSelectedProject] = useState<ClubProject | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [projects, setProjects] = useState<ClubProject[]>([]);
  const [deleteResponse, setDeleteResponse] = useState<unknown>(null);
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
  const activeThumbnailUrl = uploadedUrl || form.thumbnailUrl;

  const loadProjects = async () => {
    try {
      setIsLoadingList(true);
      const result = await getProjectList();
      setProjects(Array.isArray(result) ? result : []);
    } catch (error) {
      console.error("project list fetch failed", error);
      setProjects([]);
    } finally {
      setIsLoadingList(false);
    }
  };

  useEffect(() => {
    void loadProjects();
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
    setSelectedProject(null);
    setEditingId(null);
    setUploadMessage("");
    setSubmitMessage("");
    setDetailMessage("");
  };

  const handleTextChange =
    (key: keyof ClubProjectPayload) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { value } = event.target;

      setForm((prev) => ({
        ...prev,
        [key]: key === "sortOrder" ? Number(value || 0) : value,
      }));
    };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    setSelectedFile(file);
    setUploadMessage("");
  };

  const handleSelectProject = (project: ClubProject) => {
    setSelectedProject(project);
    setEditingId(project.projectId);
    setUploadedUrl(project.thumbnailUrl ?? "");
    setSelectedFile(null);
    setUploadMessage("");
    setSubmitMessage("");
    setDetailMessage("선택한 프로젝트를 수정 모드로 불러왔습니다.");
    setForm({
      projectName: project.projectName ?? "",
      projectUrl: project.projectUrl ?? "",
      thumbnailUrl: project.thumbnailUrl ?? "",
      sortOrder: project.sortOrder ?? 0,
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
          ? await updateProjectImage(editingId, selectedFile)
          : await uploadProjectImage(selectedFile);

      setUploadedUrl(imageUrl);
      setForm((prev) => ({
        ...prev,
        thumbnailUrl: imageUrl,
      }));

      setUploadMessage(
        editingId !== null
          ? "썸네일 이미지가 수정되었습니다."
          : "썸네일 이미지가 업로드되었습니다."
      );
    } catch (error) {
      console.error("image upload failed", error);
      setUploadMessage("이미지 업로드에 실패했습니다.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      setSubmitMessage("");

      const payload: ClubProjectPayload = {
        ...form,
        thumbnailUrl: activeThumbnailUrl,
      };

      const result =
        editingId !== null
          ? await updateProject(editingId, payload)
          : await createProject(payload);

      setResponse(result);
      setSubmitMessage(
        editingId !== null
          ? "프로젝트가 수정되었습니다."
          : "프로젝트가 등록되었습니다."
      );
      await loadProjects();
      resetForm();
    } catch (error) {
      console.error("project submit failed", error);
      setSubmitMessage(
        editingId !== null ? "프로젝트 수정에 실패했습니다." : "프로젝트 등록에 실패했습니다."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId.trim()) {
      setDeleteMessage("삭제할 프로젝트 ID를 입력해 주세요.");
      return;
    }

    try {
      setIsDeleting(true);
      setDeleteMessage("");

      const result = await deleteProject(deleteId.trim());
      setDeleteResponse(result);
      setDeleteMessage("프로젝트가 삭제되었습니다.");

      if (editingId === Number(deleteId.trim())) {
        resetForm();
      }

      setDeleteId("");
      await loadProjects();
    } catch (error) {
      console.error("project delete failed", error);
      setDeleteMessage("프로젝트 삭제에 실패했습니다.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <S.Page>
      <S.Shell>
        <S.Header>
          <S.Eyebrow>프로젝트 관리자</S.Eyebrow>
          <S.Title>프로젝트 관리</S.Title>
          <S.Description>
            프로젝트 등록, 기존 항목 수정, 이미지 교체까지 한 화면에서 관리할 수 있습니다.
          </S.Description>
        </S.Header>

        <S.Grid>
          <S.Card>
            <S.CardTitle>썸네일 업로드</S.CardTitle>
            <S.CardText>
              먼저 썸네일 이미지를 업로드해 주세요. 수정 모드에서는 현재 썸네일을 교체합니다.
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
              <S.StatusText $error={!activeThumbnailUrl}>{uploadMessage}</S.StatusText>
            ) : null}

            <S.PreviewPanel>
              {activeThumbnailUrl ? (
                <S.PreviewImage src={activeThumbnailUrl} alt="썸네일 미리보기" />
              ) : (
                <S.EmptyPreview>썸네일 미리보기가 여기에 표시됩니다.</S.EmptyPreview>
              )}
              <S.MetaList>
                <S.MetaLabel>파일</S.MetaLabel>
                <S.MetaValue>{selectedFile ? selectedFile.name : "선택된 파일이 없습니다."}</S.MetaValue>
                <S.MetaLabel>URL</S.MetaLabel>
                <S.MetaValue>{activeThumbnailUrl || "업로드된 URL이 없습니다."}</S.MetaValue>
              </S.MetaList>
            </S.PreviewPanel>
          </S.Card>

          <S.Card>
            <S.CardTitle>{isEditMode ? "프로젝트 수정" : "프로젝트 등록"}</S.CardTitle>
            <S.CardText>
              {isEditMode
                ? "선택한 프로젝트 내용을 수정하고 저장합니다."
                : "새 프로젝트 항목을 등록합니다."}
            </S.CardText>

            <S.Field>
              <S.FieldLabel>프로젝트명</S.FieldLabel>
              <S.Input
                value={form.projectName}
                onChange={handleTextChange("projectName")}
                placeholder="프로젝트 이름"
              />
            </S.Field>

            <S.Field>
              <S.FieldLabel>프로젝트 URL</S.FieldLabel>
              <S.Input
                value={form.projectUrl}
                onChange={handleTextChange("projectUrl")}
                placeholder="https://..."
              />
            </S.Field>

            <S.Field>
              <S.FieldLabel>썸네일 URL</S.FieldLabel>
              <S.Input
                value={activeThumbnailUrl}
                onChange={handleTextChange("thumbnailUrl")}
                placeholder="썸네일 이미지 URL"
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

            <S.Field>
              <S.FieldLabel>수정자</S.FieldLabel>
              <S.Input value={form.updatedBy} onChange={handleTextChange("updatedBy")} />
            </S.Field>

            <S.ButtonRow>
              <S.PrimaryButton type="button" onClick={handleSubmit}>
                {isSubmitting ? "저장 중..." : isEditMode ? "수정 저장" : "프로젝트 등록"}
              </S.PrimaryButton>

              <S.SecondaryButton type="button" onClick={resetForm}>
                초기화
              </S.SecondaryButton>
            </S.ButtonRow>

            {detailMessage ? <S.StatusText>{detailMessage}</S.StatusText> : null}
            {submitMessage ? <S.StatusText $error={!response}>{submitMessage}</S.StatusText> : null}

            <S.PreviewPanel>
              <S.CardTitle as="h3">요청 미리보기</S.CardTitle>
              <S.CodeBlock>
                {JSON.stringify({ ...form, thumbnailUrl: activeThumbnailUrl }, null, 2)}
              </S.CodeBlock>

              <S.CardTitle as="h3">응답</S.CardTitle>
              <S.CodeBlock>
                {response ? JSON.stringify(response, null, 2) : "아직 응답이 없습니다."}
              </S.CodeBlock>
            </S.PreviewPanel>
          </S.Card>

          <S.Card>
            <S.CardTitle>프로젝트 목록</S.CardTitle>
            <S.CardText>목록을 새로고침하고 수정할 프로젝트를 선택해 주세요.</S.CardText>

            <S.ButtonRow>
              <S.SecondaryButton type="button" onClick={() => void loadProjects()}>
                {isLoadingList ? "불러오는 중..." : "목록 새로고침"}
              </S.SecondaryButton>
            </S.ButtonRow>

            <S.CardTitle as="h3">수정할 항목 선택</S.CardTitle>
            <S.ButtonRow>
              {projects.map((project) => (
                <S.SecondaryButton
                  key={project.projectId}
                  type="button"
                  onClick={() => handleSelectProject(project)}
                >
                  {project.projectId}. {project.projectName}
                </S.SecondaryButton>
              ))}
            </S.ButtonRow>

            <S.CodeBlock>{JSON.stringify(projects, null, 2)}</S.CodeBlock>

            <S.CardTitle as="h3">선택한 항목</S.CardTitle>
            <S.CodeBlock>
              {selectedProject
                ? JSON.stringify(selectedProject, null, 2)
                : "선택한 프로젝트가 없습니다."}
            </S.CodeBlock>
          </S.Card>

          <S.Card>
            <S.CardTitle>프로젝트 삭제</S.CardTitle>
            <S.CardText>프로젝트 ID를 입력해 항목을 삭제합니다.</S.CardText>

            <S.Field>
              <S.FieldLabel>프로젝트 ID</S.FieldLabel>
              <S.Input
                value={deleteId}
                onChange={(event) => {
                  setDeleteId(event.target.value);
                  setDeleteMessage("");
                }}
                placeholder="삭제할 ID"
              />
            </S.Field>

            <S.ButtonRow>
              <S.DangerButton type="button" onClick={handleDelete}>
                {isDeleting ? "삭제 중..." : "프로젝트 삭제"}
              </S.DangerButton>
            </S.ButtonRow>

            {deleteMessage ? (
              <S.StatusText $error={!deleteResponse}>{deleteMessage}</S.StatusText>
            ) : null}

            <S.PreviewPanel>
              <S.CardTitle as="h3">삭제 요청</S.CardTitle>
              <S.CodeBlock>
                {deleteId.trim()
                  ? `DELETE /api/club-project/${deleteId.trim()}`
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
