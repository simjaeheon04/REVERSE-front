import { useEffect, useMemo, useState, type ChangeEvent, type FormEvent } from "react";
import * as S from "../clubIntroManage/ClubIntroManagePage.styles";
import {
  createRecruitment,
  deleteRecruitment,
  getRecruitmentDetail,
  getRecruitmentList,
  getRecruitmentRequestPreview,
  updateRecruitment,
  updateRecruitmentStatus,
  type RecruitmentItem,
  type RecruitmentPayload,
} from "../../services/recruitApi";
import { useAuthStore } from "../../stores/authStore";
import { useRecruitStore } from "../../stores/recruitStore";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

const initialForm: RecruitmentPayload = {
  title: "",
  description: "",
  applyStartDate: "",
  applyEndDate: "",
  updatedBy: "",
};

const getApiErrorMessage = (error: unknown, fallback: string) => {
  if (error instanceof AxiosError) {
    const message = error.response?.data;

    if (typeof message === "string" && message.trim()) {
      return message;
    }

    if (message && typeof message === "object") {
      const record = message as Record<string, unknown>;

      if (typeof record.message === "string" && record.message.trim()) {
        return record.message;
      }
    }
  }

  if (error instanceof Error && error.message.trim()) {
    return error.message;
  }

  return fallback;
};

export default function RecruitManagePage() {
  const navigate = useNavigate();
  const userId = useAuthStore((state) => state.userId);
  const setCreatedRecruitmentId = useRecruitStore((state) => state.setCreatedRecruitmentId);
  const [form, setForm] = useState<RecruitmentPayload>(initialForm);
  const [recruitments, setRecruitments] = useState<RecruitmentItem[]>([]);
  const [selectedRecruitment, setSelectedRecruitment] =
    useState<RecruitmentItem | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [statusRoleId, setStatusRoleId] = useState("");
  const [deleteId, setDeleteId] = useState("");
  const [listMessage, setListMessage] = useState("");
  const [detailMessage, setDetailMessage] = useState("");
  const [saveMessage, setSaveMessage] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [deleteMessage, setDeleteMessage] = useState("");
  const [isLoadingList, setIsLoadingList] = useState(false);
  const [isLoadingDetail, setIsLoadingDetail] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const isEditMode = useMemo(() => editingId !== null, [editingId]);

  const loadRecruitments = async () => {
    try {
      setIsLoadingList(true);
      setListMessage("");

      const result = await getRecruitmentList();
      const normalized = Array.isArray(result) ? result : [];

      setRecruitments(normalized);

      if (!normalized.length) {
        setListMessage("등록된 모집공고가 없습니다.");
      }
    } catch {
      setRecruitments([]);
      setListMessage("모집공고 목록을 불러오지 못했습니다.");
    } finally {
      setIsLoadingList(false);
    }
  };

  useEffect(() => {
    void loadRecruitments();
  }, []);

  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      updatedBy: userId ?? "",
    }));
  }, [userId]);

  const handleFieldChange =
    (key: keyof RecruitmentPayload) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { value } = event.target;

      setForm((prev) => ({
        ...prev,
        [key]: value,
      }));
    };

  const handleReset = () => {
    setForm({
      ...initialForm,
      updatedBy: userId ?? "",
    });
    setEditingId(null);
    setSelectedRecruitment(null);
    setDetailMessage("");
    setSaveMessage("");
    setStatusMessage("");
  };

  const handleLoadDetail = async (recruitmentId: number) => {
    try {
      setIsLoadingDetail(true);
      setDetailMessage("");

      const detail = await getRecruitmentDetail(recruitmentId);

      setSelectedRecruitment(detail);
      setEditingId(detail.id);
      setForm({
        title: detail.title,
        description: detail.description ?? "",
        applyStartDate: detail.applyStartDate?.slice(0, 10) ?? "",
        applyEndDate: detail.applyEndDate?.slice(0, 10) ?? "",
        updatedBy: userId ?? "",
      });
      setStatusMessage("");
      setDetailMessage("모집공고 상세 정보를 불러왔습니다.");
    } catch (error) {
      setDetailMessage(
        getApiErrorMessage(error, "모집공고 상세 정보를 불러오지 못했습니다.")
      );
    } finally {
      setIsLoadingDetail(false);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setIsSaving(true);
      setSaveMessage("");

      if (!form.title.trim()) {
        throw new Error("모집공고 제목을 입력해 주세요.");
      }
      if (!form.applyStartDate || !form.applyEndDate) {
        throw new Error("모집 시작일과 종료일을 입력해 주세요.");
      }
      if (form.applyStartDate > form.applyEndDate) {
        throw new Error("모집 시작일은 종료일보다 늦을 수 없습니다.");
      }
      let successMessage: string;
      if (editingId !== null) {
        if (!selectedRecruitment || selectedRecruitment.id !== editingId ||
            selectedRecruitment.description === undefined) {
          throw new Error("기존 설명 원본을 조회할 수 없어 안전하게 수정할 수 없습니다. 백엔드 상세 응답에 description이 필요합니다.");
        }
        const preserveTime = (date: string, original?: string) => {
          if (!original || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2}(\.\d+)?)?$/.test(original) ||
              !Number.isFinite(Date.parse(original))) {
            throw new Error("기존 모집 기간의 날짜·시간 원본을 확인할 수 없어 안전하게 수정할 수 없습니다.");
          }
          return date === original.slice(0, 10) ? original : `${date}${original.slice(10)}`;
        };
        const applyStartDate = preserveTime(form.applyStartDate, selectedRecruitment.applyStartDate);
        const applyEndDate = preserveTime(form.applyEndDate, selectedRecruitment.applyEndDate);
        if (applyStartDate > applyEndDate) {
          throw new Error("모집 시작일은 종료일보다 늦을 수 없습니다.");
        }
        await updateRecruitment(editingId, {
          ...form,
          description: form.description === (selectedRecruitment.description ?? "")
            ? selectedRecruitment.description
            : form.description,
          applyStartDate,
          applyEndDate,
          isActive: selectedRecruitment.isActive,
          roleId: statusRoleId.trim() ? Number(statusRoleId) : form.roleId,
        });
        successMessage = "모집공고가 수정되었습니다.";
      } else {
        const created = await createRecruitment({
          ...form,
          roleId: statusRoleId.trim() ? Number(statusRoleId) : form.roleId,
        });
        if (!Number.isSafeInteger(created.id) || created.id <= 0) {
          throw new Error("공고 생성 응답에서 모집공고 ID를 확인하지 못했습니다. 목록을 확인한 뒤 슬롯 화면에 ID를 입력해 주세요.");
        }
        setCreatedRecruitmentId(created.id);
        successMessage = "모집공고가 등록되었습니다.";
      }

      await loadRecruitments();
      handleReset();
      setSaveMessage(successMessage);
    } catch (error) {
      setSaveMessage(getApiErrorMessage(error, "모집공고 저장에 실패했습니다."));
    } finally {
      setIsSaving(false);
    }
  };

  const handleStatusChange = async () => {
    try {
      setIsUpdatingStatus(true);
      setStatusMessage("");

      await updateRecruitmentStatus();
    } catch (error) {
      setStatusMessage(getApiErrorMessage(error, "모집공고 상태 변경에 실패했습니다."));
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId.trim()) {
      setDeleteMessage("삭제할 모집공고 ID를 입력해 주세요.");
      return;
    }

    try {
      setIsDeleting(true);
      setDeleteMessage("");

      await deleteRecruitment(
        deleteId.trim(),
        statusRoleId.trim() ? Number(statusRoleId) : undefined
      );

      setDeleteMessage("모집공고가 삭제되었습니다.");

      if (editingId === Number(deleteId.trim())) {
        handleReset();
      }

      setDeleteId("");
      await loadRecruitments();
    } catch (error) {
      setDeleteMessage(getApiErrorMessage(error, "모집공고 삭제에 실패했습니다."));
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <S.Page>
      <S.Shell>
        <S.Header>
          <S.Eyebrow>모집 관리자</S.Eyebrow>
          <S.Title>모집 관리</S.Title>
          <S.Description>
            모집공고 등록, 수정, 상태 변경, 삭제를 한 화면에서 관리할 수 있습니다.
          </S.Description>
        </S.Header>

        <S.Grid>
          <S.Card>
            <S.CardTitle>{isEditMode ? "모집공고 수정" : "모집공고 등록"}</S.CardTitle>
            <S.CardText>
              <code>/api/recruit</code> 기준으로 모집공고를 등록하거나 수정합니다.
            </S.CardText>

            <S.Form onSubmit={handleSubmit}>
              <S.Field>
                <S.FieldLabel>제목</S.FieldLabel>
                <S.Input
                  value={form.title}
                  onChange={handleFieldChange("title")}
                  placeholder="모집공고 제목"
                />
              </S.Field>

              <S.Field>
                <S.FieldLabel>설명</S.FieldLabel>
                <S.TextArea
                  value={form.description ?? ""}
                  onChange={handleFieldChange("description")}
                  placeholder="모집공고 설명"
                />
              </S.Field>

              <S.InlineFields>
                <S.Field>
                  <S.FieldLabel>지원 시작일</S.FieldLabel>
                  <S.Input
                    type="date"
                    value={form.applyStartDate}
                    onChange={handleFieldChange("applyStartDate")}
                  />
                </S.Field>

                <S.Field>
                  <S.FieldLabel>지원 마감일</S.FieldLabel>
                  <S.Input
                    type="date"
                    value={form.applyEndDate}
                    onChange={handleFieldChange("applyEndDate")}
                  />
                </S.Field>
              </S.InlineFields>

              <S.Field>
                <S.FieldLabel>수정자</S.FieldLabel>
                <S.Input
                  value={form.updatedBy}
                  onChange={handleFieldChange("updatedBy")}
                  placeholder={userId ?? ""}
                />
              </S.Field>

              <S.ButtonRow>
                <S.PrimaryButton type="submit">
                  {isSaving ? "저장 중..." : isEditMode ? "공고 수정" : "공고 등록"}
                </S.PrimaryButton>
                <S.SecondaryButton type="button" onClick={handleReset}>
                  초기화
                </S.SecondaryButton>
              </S.ButtonRow>
            </S.Form>

            {detailMessage ? <S.StatusText>{detailMessage}</S.StatusText> : null}
            {saveMessage ? <S.StatusText>{saveMessage}</S.StatusText> : null}

            <S.PreviewPanel>
              <S.CardTitle as="h3">요청 미리보기</S.CardTitle>
              <S.CodeBlock>
                {JSON.stringify(getRecruitmentRequestPreview(form), null, 2)}
              </S.CodeBlock>
            </S.PreviewPanel>
          </S.Card>

          <S.Card>
            <S.CardTitle>모집공고 목록</S.CardTitle>
            <S.CardText>
              목록 확인, 상세 불러오기, 활성 상태 변경을 여기서 처리합니다.
            </S.CardText>

            <S.Field>
              <S.FieldLabel>roleId</S.FieldLabel>
              <S.Input
                value={statusRoleId}
                onChange={(event) => setStatusRoleId(event.target.value)}
                placeholder="상태 변경에 필요한 roleId"
              />
            </S.Field>

            <S.ButtonRow>
              <S.SecondaryButton type="button" onClick={() => void loadRecruitments()}>
                {isLoadingList ? "불러오는 중..." : "목록 새로고침"}
              </S.SecondaryButton>
            </S.ButtonRow>

            {listMessage ? (
              <S.StatusText $error={!recruitments.length}>{listMessage}</S.StatusText>
            ) : null}
            {statusMessage ? <S.StatusText>{statusMessage}</S.StatusText> : null}

            <S.CodeBlock>{JSON.stringify(recruitments, null, 2)}</S.CodeBlock>

            <S.CardTitle as="h3">상세 조회 / 상태 변경</S.CardTitle>
            <S.ButtonRow>
              {recruitments.map((recruitment) => (
                <S.SecondaryButton
                  key={recruitment.id}
                  type="button"
                  onClick={() => void handleLoadDetail(recruitment.id)}
                >
                  {recruitment.id}. {recruitment.title}
                </S.SecondaryButton>
              ))}
            </S.ButtonRow>

            <S.ButtonRow>
              {recruitments.map((recruitment) => (
                <S.SecondaryButton
                  key={`status-${recruitment.id}`}
                  type="button"
                  onClick={() => void handleStatusChange()}
                  disabled={isUpdatingStatus}
                >
                  {recruitment.id}. {recruitment.isActive ? "비활성화" : "활성화"}
                </S.SecondaryButton>
              ))}
            </S.ButtonRow>

            <S.CardTitle as="h3">면접 일정 관리</S.CardTitle>
            <S.ButtonRow>
              {recruitments.map((recruitment) => (
                <S.SecondaryButton
                  key={`slots-${recruitment.id}`}
                  type="button"
                  onClick={() => navigate(`/admin/recruit-applications?recruitmentId=${recruitment.id}`)}
                >
                  {recruitment.id}. {recruitment.title} 면접 일정 관리
                </S.SecondaryButton>
              ))}
            </S.ButtonRow>

            <S.CodeBlock>
              {isLoadingDetail
                ? "상세 정보를 불러오는 중입니다."
                : selectedRecruitment
                  ? JSON.stringify(selectedRecruitment, null, 2)
                  : "선택한 모집공고가 없습니다."}
            </S.CodeBlock>
          </S.Card>

          <S.Card>
            <S.CardTitle>모집공고 삭제</S.CardTitle>
            <S.CardText>
              <code>DELETE /api/recruit/{`{id}`}</code>로 모집공고를 삭제합니다.
            </S.CardText>

            <S.Field>
              <S.FieldLabel>모집공고 ID</S.FieldLabel>
              <S.Input
                value={deleteId}
                onChange={(event) => setDeleteId(event.target.value)}
                placeholder="예: 1"
              />
            </S.Field>

            <S.ButtonRow>
              <S.DangerButton type="button" onClick={handleDelete}>
                {isDeleting ? "삭제 중..." : "공고 삭제"}
              </S.DangerButton>
            </S.ButtonRow>

            {deleteMessage ? <S.StatusText>{deleteMessage}</S.StatusText> : null}
          </S.Card>
        </S.Grid>
      </S.Shell>
    </S.Page>
  );
}
