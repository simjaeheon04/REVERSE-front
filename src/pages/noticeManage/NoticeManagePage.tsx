import { useEffect, useMemo, useState, type ChangeEvent, type FormEvent } from "react";
import * as S from "../clubIntroManage/ClubIntroManagePage.styles";
import {
  deleteNotice,
  getNoticeDetail,
  getNoticeList,
  saveNotice,
  type NoticeDetail,
  type NoticeListItem,
  type NoticeUpsertPayload,
  type NoticeUpsertResult,
} from "../../services/noticeApi";

const initialForm: NoticeUpsertPayload = {
  title: "",
  content: "",
  isPinned: false,
};

export default function NoticeManagePage() {
  const [form, setForm] = useState<NoticeUpsertPayload>(initialForm);
  const [notices, setNotices] = useState<NoticeListItem[]>([]);
  const [selectedNotice, setSelectedNotice] = useState<NoticeDetail | null>(null);
  const [saveResult, setSaveResult] = useState<NoticeUpsertResult | null>(null);
  const [deleteId, setDeleteId] = useState("");
  const [listMessage, setListMessage] = useState("");
  const [saveMessage, setSaveMessage] = useState("");
  const [detailMessage, setDetailMessage] = useState("");
  const [deleteMessage, setDeleteMessage] = useState("");
  const [isLoadingList, setIsLoadingList] = useState(false);
  const [isLoadingDetail, setIsLoadingDetail] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const isEditMode = useMemo(() => Boolean(form.noticeId), [form.noticeId]);

  const loadNotices = async () => {
    try {
      setIsLoadingList(true);
      setListMessage("");
      const result = await getNoticeList();
      setNotices(Array.isArray(result) ? result : []);
      if (!result.length) {
        setListMessage("등록된 공지사항이 없습니다.");
      }
    } catch {
      setNotices([]);
      setListMessage("공지사항 목록을 불러오지 못했습니다.");
    } finally {
      setIsLoadingList(false);
    }
  };

  useEffect(() => {
    void loadNotices();
  }, []);

  const handleFieldChange =
    (key: "title" | "content") =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { value } = event.target;

      setForm((prev) => ({
        ...prev,
        [key]: value,
      }));
    };

  const handlePinnedChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setForm((prev) => ({
      ...prev,
      isPinned: event.target.value === "true",
    }));
  };

  const handleReset = () => {
    setForm(initialForm);
    setSelectedNotice(null);
    setSaveResult(null);
    setSaveMessage("");
    setDetailMessage("");
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
        isPinned: false,
      });
      setDetailMessage(
        "공지사항 내용을 불러왔습니다. 고정 여부는 조회 응답에 없어 다시 선택해 주세요."
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

      const result = await saveNotice(form);
      setSaveResult(result);
      setSaveMessage(
        form.noticeId
          ? "공지사항이 수정되었습니다."
          : "공지사항이 등록되었습니다."
      );
      await loadNotices();
      setForm(initialForm);
    } catch {
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
      await loadNotices();
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
          <S.Eyebrow>Notice Admin</S.Eyebrow>
          <S.Title>공지사항 관리</S.Title>
          <S.Description>
            외부 공지사항 목록을 조회하고 등록, 수정, 삭제를 한 화면에서 테스트할 수 있는 관리자 페이지입니다.
          </S.Description>
        </S.Header>

        <S.Grid>
          <S.Card>
            <S.CardTitle>{isEditMode ? "공지사항 수정" : "공지사항 등록"}</S.CardTitle>
            <S.CardText>
              <code>POST /api/posts/notices</code>로 등록과 수정을 함께 처리합니다.
            </S.CardText>

            <S.Form onSubmit={handleSubmit}>
              <S.Field>
                <S.FieldLabel>제목</S.FieldLabel>
                <S.Input
                  value={form.title}
                  onChange={handleFieldChange("title")}
                  placeholder="공지사항 제목"
                />
              </S.Field>

              <S.Field>
                <S.FieldLabel>내용</S.FieldLabel>
                <S.TextArea
                  value={form.content}
                  onChange={handleFieldChange("content")}
                  placeholder="공지사항 내용을 입력해 주세요."
                />
              </S.Field>

              <S.InlineFields>
                <S.Field>
                  <S.FieldLabel>상단 고정 여부</S.FieldLabel>
                  <S.Select value={String(form.isPinned)} onChange={handlePinnedChange}>
                    <option value="true">true</option>
                    <option value="false">false</option>
                  </S.Select>
                </S.Field>

                <S.Field>
                  <S.FieldLabel>수정 대상 ID</S.FieldLabel>
                  <S.Input
                    value={form.noticeId ?? ""}
                    readOnly
                    placeholder="목록에서 불러오면 자동 입력됩니다."
                  />
                </S.Field>
              </S.InlineFields>

              <S.ButtonRow>
                <S.PrimaryButton type="submit">
                  {isSaving ? "저장 중..." : isEditMode ? "공지사항 수정" : "공지사항 등록"}
                </S.PrimaryButton>
                <S.SecondaryButton type="button" onClick={handleReset}>
                  폼 초기화
                </S.SecondaryButton>
              </S.ButtonRow>
            </S.Form>

            {detailMessage ? <S.StatusText>{detailMessage}</S.StatusText> : null}
            {saveMessage ? (
              <S.StatusText $error={!saveResult}>{saveMessage}</S.StatusText>
            ) : null}

            <S.PreviewPanel>
              <S.CardTitle as="h3">요청 미리보기</S.CardTitle>
              <S.CodeBlock>{JSON.stringify(form, null, 2)}</S.CodeBlock>
              <S.CardTitle as="h3">응답</S.CardTitle>
              <S.CodeBlock>
                {saveResult ? JSON.stringify(saveResult, null, 2) : "아직 응답이 없습니다."}
              </S.CodeBlock>
            </S.PreviewPanel>
          </S.Card>

          <S.Card>
            <S.CardTitle>공지사항 목록 조회</S.CardTitle>
            <S.CardText>
              <code>GET /api/notices</code>와 <code>GET /api/notices/{`{id}`}</code>로 현재 공지사항을 확인합니다.
            </S.CardText>

            <S.ButtonRow>
              <S.SecondaryButton type="button" onClick={() => void loadNotices()}>
                {isLoadingList ? "불러오는 중..." : "목록 새로고침"}
              </S.SecondaryButton>
            </S.ButtonRow>

            {listMessage ? (
              <S.StatusText $error={!notices.length}>{listMessage}</S.StatusText>
            ) : null}

            <S.CodeBlock>{JSON.stringify(notices, null, 2)}</S.CodeBlock>

            <S.CardTitle as="h3">선택 공지 상세</S.CardTitle>
            <S.ButtonRow>
              {notices.map((notice) => (
                <S.SecondaryButton
                  key={notice.id}
                  type="button"
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
            <S.CardText>
              <code>DELETE /api/posts/notices/{`{id}`}</code>로 공지사항을 삭제합니다.
            </S.CardText>

            <S.Field>
              <S.FieldLabel>삭제할 공지사항 ID</S.FieldLabel>
              <S.Input
                value={deleteId}
                onChange={(event) => setDeleteId(event.target.value)}
                placeholder="예: 1"
              />
            </S.Field>

            <S.ButtonRow>
              <S.DangerButton type="button" onClick={handleDelete}>
                {isDeleting ? "삭제 중..." : "공지사항 삭제"}
              </S.DangerButton>
            </S.ButtonRow>

            {deleteMessage ? (
              <S.StatusText $error={!deleteMessage.includes("삭제되었습니다")}>
                {deleteMessage}
              </S.StatusText>
            ) : null}
          </S.Card>
        </S.Grid>
      </S.Shell>
    </S.Page>
  );
}
