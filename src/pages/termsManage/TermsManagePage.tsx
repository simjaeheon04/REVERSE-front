import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import * as S from "../clubIntroManage/ClubIntroManagePage.styles";
import {
  createTerms,
  deleteTerms,
  getTermsList,
  updateTerms,
  type TermsPayload,
  type TermsResponse,
} from "../../services/termsApi";

const initialForm: TermsPayload = {
  title: "",
  contents: "",
  isCurrent: true,
  sortOrder: 1,
  version: "1.0",
  updatedBy: "admin01",
};

export default function TermsManagePage() {
  const [createForm, setCreateForm] = useState<TermsPayload>(initialForm);
  const [updateId, setUpdateId] = useState("");
  const [updateForm, setUpdateForm] = useState<TermsPayload>(initialForm);
  const [deleteId, setDeleteId] = useState("");
  const [termsList, setTermsList] = useState<TermsResponse[]>([]);
  const [createResponse, setCreateResponse] = useState<TermsResponse | null>(null);
  const [updateResponse, setUpdateResponse] = useState<TermsResponse | null>(null);
  const [deleteResponse, setDeleteResponse] = useState<unknown>(null);
  const [createMessage, setCreateMessage] = useState("");
  const [updateMessage, setUpdateMessage] = useState("");
  const [deleteMessage, setDeleteMessage] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLoadingList, setIsLoadingList] = useState(false);

  const loadTerms = async () => {
    try {
      setIsLoadingList(true);
      const result = await getTermsList();
      setTermsList(Array.isArray(result) ? result : []);
    } catch (error) {
      console.error("terms list fetch failed", error);
      setTermsList([]);
    } finally {
      setIsLoadingList(false);
    }
  };

  useEffect(() => {
    loadTerms();
  }, []);

  const handleChange =
    (
      key: keyof TermsPayload,
      target: "create" | "update"
    ) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { value } = event.target;
      const setter = target === "create" ? setCreateForm : setUpdateForm;

      setter((prev) => ({
        ...prev,
        [key]: key === "sortOrder" ? Number(value || 0) : value,
      }));
    };

  const handleCurrentChange =
    (target: "create" | "update") =>
    (event: ChangeEvent<HTMLSelectElement>) => {
      const setter = target === "create" ? setCreateForm : setUpdateForm;

      setter((prev) => ({
        ...prev,
        isCurrent: event.target.value === "true",
      }));
    };

  const handleCreate = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setIsCreating(true);
      setCreateMessage("");

      const result = await createTerms(createForm);
      setCreateResponse(result);
      setCreateMessage("약관 신규 등록이 완료되었습니다.");
      await loadTerms();
    } catch (error) {
      console.error("terms create failed", error);
      setCreateMessage("약관 신규 등록에 실패했습니다.");
    } finally {
      setIsCreating(false);
    }
  };

  const handleUpdate = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!updateId.trim()) {
      setUpdateMessage("수정할 약관 ID를 입력해주세요.");
      return;
    }

    try {
      setIsUpdating(true);
      setUpdateMessage("");

      const result = await updateTerms(updateId.trim(), updateForm);
      setUpdateResponse(result);
      setUpdateMessage("약관 수정이 완료되었습니다.");
      await loadTerms();
    } catch (error) {
      console.error("terms update failed", error);
      setUpdateMessage("약관 수정에 실패했습니다.");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId.trim()) {
      setDeleteMessage("삭제할 약관 ID를 입력해주세요.");
      return;
    }

    try {
      setIsDeleting(true);
      setDeleteMessage("");

      const result = await deleteTerms(deleteId.trim());
      setDeleteResponse(result);
      setDeleteMessage("약관 삭제가 완료되었습니다.");
      await loadTerms();
    } catch (error) {
      console.error("terms delete failed", error);
      setDeleteMessage("약관 삭제에 실패했습니다.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <S.Page>
      <S.Shell>
        <S.Header>
          <S.Eyebrow>Terms Admin</S.Eyebrow>
          <S.Title>약관 관리</S.Title>
          <S.Description>
            약관 전체 조회, 신규 등록, 내용 수정, 삭제를 한 화면에서 관리할 수
            있는 페이지입니다.
          </S.Description>
        </S.Header>

        <S.Grid>
          <S.Card>
            <S.CardTitle>약관 전체 조회</S.CardTitle>
            <S.CardText>
              <code>GET /api/terms</code> 응답을 그대로 확인할 수 있습니다.
            </S.CardText>

            <S.ButtonRow>
              <S.SecondaryButton type='button' onClick={loadTerms}>
                {isLoadingList ? "불러오는 중..." : "목록 새로고침"}
              </S.SecondaryButton>
            </S.ButtonRow>

            <S.CodeBlock>{JSON.stringify(termsList, null, 2)}</S.CodeBlock>
          </S.Card>

          <S.Card>
            <S.CardTitle>약관 신규 등록</S.CardTitle>
            <S.CardText>
              <code>POST /api/terms</code>로 새 약관을 등록합니다.
            </S.CardText>

            <S.Form onSubmit={handleCreate}>
              <S.Field>
                <S.FieldLabel>제목</S.FieldLabel>
                <S.Input
                  value={createForm.title}
                  onChange={handleChange("title", "create")}
                  placeholder='서비스 이용약관'
                />
              </S.Field>

              <S.Field>
                <S.FieldLabel>내용</S.FieldLabel>
                <S.TextArea
                  value={createForm.contents}
                  onChange={handleChange("contents", "create")}
                  placeholder='제 1조... 내용'
                />
              </S.Field>

              <S.InlineFields>
                <S.Field>
                  <S.FieldLabel>정렬 순서</S.FieldLabel>
                  <S.Input
                    type='number'
                    value={createForm.sortOrder}
                    onChange={handleChange("sortOrder", "create")}
                  />
                </S.Field>

                <S.Field>
                  <S.FieldLabel>버전</S.FieldLabel>
                  <S.Input
                    value={createForm.version}
                    onChange={handleChange("version", "create")}
                    placeholder='1.0'
                  />
                </S.Field>
              </S.InlineFields>

              <S.Field>
                <S.FieldLabel>현재 약관 여부</S.FieldLabel>
                <S.Select
                  value={String(createForm.isCurrent)}
                  onChange={handleCurrentChange("create")}
                >
                  <option value='true'>true</option>
                  <option value='false'>false</option>
                </S.Select>
              </S.Field>

              <S.ButtonRow>
                <S.PrimaryButton type='submit'>
                  {isCreating ? "등록 중..." : "약관 등록"}
                </S.PrimaryButton>
              </S.ButtonRow>
            </S.Form>

            {createMessage ? (
              <S.StatusText $error={!createResponse}>{createMessage}</S.StatusText>
            ) : null}

            <S.CodeBlock>{JSON.stringify(createForm, null, 2)}</S.CodeBlock>
          </S.Card>

          <S.Card>
            <S.CardTitle>약관 내용 수정</S.CardTitle>
            <S.CardText>
              <code>PUT /api/terms/{`{id}`}</code>로 약관을 수정합니다.
            </S.CardText>

            <S.Form onSubmit={handleUpdate}>
              <S.Field>
                <S.FieldLabel>수정할 약관 ID</S.FieldLabel>
                <S.Input
                  value={updateId}
                  onChange={(event) => setUpdateId(event.target.value)}
                  placeholder='수정할 약관 ID'
                />
              </S.Field>

              <S.Field>
                <S.FieldLabel>제목</S.FieldLabel>
                <S.Input
                  value={updateForm.title}
                  onChange={handleChange("title", "update")}
                  placeholder='수정된 약관 제목'
                />
              </S.Field>

              <S.Field>
                <S.FieldLabel>내용</S.FieldLabel>
                <S.TextArea
                  value={updateForm.contents}
                  onChange={handleChange("contents", "update")}
                  placeholder='내용 업데이트'
                />
              </S.Field>

              <S.InlineFields>
                <S.Field>
                  <S.FieldLabel>정렬 순서</S.FieldLabel>
                  <S.Input
                    type='number'
                    value={updateForm.sortOrder}
                    onChange={handleChange("sortOrder", "update")}
                  />
                </S.Field>

                <S.Field>
                  <S.FieldLabel>버전</S.FieldLabel>
                  <S.Input
                    value={updateForm.version}
                    onChange={handleChange("version", "update")}
                    placeholder='1.2'
                  />
                </S.Field>
              </S.InlineFields>

              <S.Field>
                <S.FieldLabel>현재 약관 여부</S.FieldLabel>
                <S.Select
                  value={String(updateForm.isCurrent)}
                  onChange={handleCurrentChange("update")}
                >
                  <option value='true'>true</option>
                  <option value='false'>false</option>
                </S.Select>
              </S.Field>

              <S.ButtonRow>
                <S.PrimaryButton type='submit'>
                  {isUpdating ? "수정 중..." : "약관 수정"}
                </S.PrimaryButton>
              </S.ButtonRow>
            </S.Form>

            {updateMessage ? (
              <S.StatusText $error={!updateResponse}>{updateMessage}</S.StatusText>
            ) : null}

            <S.CodeBlock>
              {JSON.stringify(
                {
                  id: updateId,
                  ...updateForm,
                },
                null,
                2
              )}
            </S.CodeBlock>
          </S.Card>

          <S.Card>
            <S.CardTitle>약관 데이터 삭제</S.CardTitle>
            <S.CardText>
              <code>DELETE /api/terms/{`{id}`}</code> 요청을 보냅니다.
            </S.CardText>

            <S.Field>
              <S.FieldLabel>삭제할 약관 ID</S.FieldLabel>
              <S.Input
                value={deleteId}
                onChange={(event) => setDeleteId(event.target.value)}
                placeholder='삭제할 약관 ID'
              />
            </S.Field>

            <S.ButtonRow>
              <S.DangerButton type='button' onClick={handleDelete}>
                {isDeleting ? "삭제 중..." : "약관 삭제"}
              </S.DangerButton>
            </S.ButtonRow>

            {deleteMessage ? (
              <S.StatusText $error={!deleteResponse}>{deleteMessage}</S.StatusText>
            ) : null}

            <S.CodeBlock>
              {deleteId.trim()
                ? `DELETE /api/terms/${deleteId.trim()}`
                : "삭제할 ID를 입력하면 요청 경로가 여기에 표시됩니다."}
            </S.CodeBlock>
          </S.Card>
        </S.Grid>
      </S.Shell>
    </S.Page>
  );
}
