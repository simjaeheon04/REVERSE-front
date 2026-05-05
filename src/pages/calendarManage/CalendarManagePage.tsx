import { useEffect, useMemo, useState, type ChangeEvent, type FormEvent } from "react";
import * as S from "../clubIntroManage/ClubIntroManagePage.styles";
import {
  createSchedule,
  createScheduleCategory,
  deleteSchedule,
  deleteScheduleCategory,
  getAdminScheduleCategories,
  getAdminSchedules,
  type ScheduleCategory,
  type ScheduleCategoryPayload,
  type ScheduleItem,
  type SchedulePayload,
} from "../../services/scheduleApi";
import { useAuthStore } from "../../stores/authStore";

const today = new Date();

const initialCategoryForm: ScheduleCategoryPayload = {
  categoryName: "",
  colorCode: "#7C8BFF",
  sortOrder: 0,
  isVisible: true,
  updatedBy: "",
};

const initialScheduleForm: SchedulePayload = {
  categoryId: 0,
  title: "",
  description: "",
  startDate: "",
  endDate: "",
  startTime: "",
  endTime: "",
  isAllDay: false,
  isVisible: true,
  updatedBy: "",
};

export default function CalendarManagePage() {
  const userId = useAuthStore((state) => state.userId);
  const [categoryForm, setCategoryForm] =
    useState<ScheduleCategoryPayload>(initialCategoryForm);
  const [scheduleForm, setScheduleForm] =
    useState<SchedulePayload>(initialScheduleForm);
  const [categories, setCategories] = useState<ScheduleCategory[]>([]);
  const [schedules, setSchedules] = useState<ScheduleItem[]>([]);
  const [queryYear, setQueryYear] = useState(String(today.getFullYear()));
  const [queryMonth, setQueryMonth] = useState(String(today.getMonth() + 1));
  const [categoryDeleteId, setCategoryDeleteId] = useState("");
  const [scheduleDeleteId, setScheduleDeleteId] = useState("");
  const [isLoadingCategories, setIsLoadingCategories] = useState(false);
  const [isLoadingSchedules, setIsLoadingSchedules] = useState(false);
  const [isCreatingCategory, setIsCreatingCategory] = useState(false);
  const [isCreatingSchedule, setIsCreatingSchedule] = useState(false);
  const [isDeletingCategory, setIsDeletingCategory] = useState(false);
  const [isDeletingSchedule, setIsDeletingSchedule] = useState(false);
  const [categoryMessage, setCategoryMessage] = useState("");
  const [scheduleMessage, setScheduleMessage] = useState("");
  const [categoryDeleteMessage, setCategoryDeleteMessage] = useState("");
  const [scheduleDeleteMessage, setScheduleDeleteMessage] = useState("");

  const normalizedYear = useMemo(() => Number(queryYear || today.getFullYear()), [queryYear]);
  const normalizedMonth = useMemo(
    () => Number(queryMonth || today.getMonth() + 1),
    [queryMonth]
  );

  const loadCategories = async () => {
    try {
      setIsLoadingCategories(true);
      const result = await getAdminScheduleCategories();
      setCategories(Array.isArray(result) ? result : []);
    } catch (error) {
      console.error("schedule categories fetch failed", error);
      setCategories([]);
    } finally {
      setIsLoadingCategories(false);
    }
  };

  const loadSchedules = async (year = normalizedYear, month = normalizedMonth) => {
    try {
      setIsLoadingSchedules(true);
      const result = await getAdminSchedules(year, month);
      setSchedules(Array.isArray(result) ? result : []);
    } catch (error) {
      console.error("admin schedules fetch failed", error);
      setSchedules([]);
    } finally {
      setIsLoadingSchedules(false);
    }
  };

  useEffect(() => {
    void loadCategories();
    void loadSchedules();
  }, []);

  useEffect(() => {
    setCategoryForm((prev) => ({
      ...prev,
      updatedBy: userId ?? "",
    }));
    setScheduleForm((prev) => ({
      ...prev,
      updatedBy: userId ?? "",
    }));
  }, [userId]);

  useEffect(() => {
    if (!scheduleForm.categoryId && categories.length > 0) {
      setScheduleForm((prev) => ({
        ...prev,
        categoryId: categories[0].id,
      }));
    }
  }, [categories, scheduleForm.categoryId]);

  const handleCategoryChange =
    (key: keyof ScheduleCategoryPayload) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { value } = event.target;

      setCategoryForm((prev) => ({
        ...prev,
        [key]: key === "sortOrder" ? Number(value || 0) : value,
      }));
    };

  const handleCategoryVisibleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setCategoryForm((prev) => ({
      ...prev,
      isVisible: event.target.value === "true",
    }));
  };

  const handleScheduleChange =
    (key: keyof SchedulePayload) =>
    (
      event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
      const { value } = event.target;

      setScheduleForm((prev) => ({
        ...prev,
        [key]: key === "categoryId" ? Number(value || 0) : value,
      }));
    };

  const handleScheduleBooleanChange =
    (key: "isAllDay" | "isVisible") =>
    (event: ChangeEvent<HTMLSelectElement>) => {
      setScheduleForm((prev) => ({
        ...prev,
        [key]: event.target.value === "true",
      }));
    };

  const handleCreateCategory = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setIsCreatingCategory(true);
      setCategoryMessage("");

      await createScheduleCategory(categoryForm);
      setCategoryMessage("일정 카테고리가 등록되었습니다.");
      setCategoryForm({
        ...initialCategoryForm,
        updatedBy: userId ?? "",
      });
      await loadCategories();
    } catch (error) {
      console.error("schedule category create failed", error);
      setCategoryMessage("일정 카테고리 등록에 실패했습니다.");
    } finally {
      setIsCreatingCategory(false);
    }
  };

  const handleCreateSchedule = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setIsCreatingSchedule(true);
      setScheduleMessage("");

      await createSchedule(scheduleForm);
      setScheduleMessage("일정이 등록되었습니다.");
      setScheduleForm((prev) => ({
        ...initialScheduleForm,
        categoryId: prev.categoryId,
        updatedBy: userId ?? "",
      }));
      await loadSchedules();
    } catch (error) {
      console.error("schedule create failed", error);
      setScheduleMessage("일정 등록에 실패했습니다.");
    } finally {
      setIsCreatingSchedule(false);
    }
  };

  const handleDeleteCategory = async () => {
    if (!categoryDeleteId.trim()) {
      setCategoryDeleteMessage("삭제할 카테고리 ID를 입력해 주세요.");
      return;
    }

    try {
      setIsDeletingCategory(true);
      setCategoryDeleteMessage("");
      await deleteScheduleCategory(categoryDeleteId.trim());
      setCategoryDeleteMessage("카테고리 삭제가 완료되었습니다.");
      await loadCategories();
    } catch (error) {
      console.error("schedule category delete failed", error);
      setCategoryDeleteMessage("카테고리 삭제에 실패했습니다.");
    } finally {
      setIsDeletingCategory(false);
    }
  };

  const handleDeleteSchedule = async () => {
    if (!scheduleDeleteId.trim()) {
      setScheduleDeleteMessage("삭제할 일정 ID를 입력해 주세요.");
      return;
    }

    try {
      setIsDeletingSchedule(true);
      setScheduleDeleteMessage("");
      await deleteSchedule(scheduleDeleteId.trim());
      setScheduleDeleteMessage("일정 삭제가 완료되었습니다.");
      await loadSchedules();
    } catch (error) {
      console.error("schedule delete failed", error);
      setScheduleDeleteMessage("일정 삭제에 실패했습니다.");
    } finally {
      setIsDeletingSchedule(false);
    }
  };

  return (
    <S.Page>
      <S.Shell>
        <S.Header>
          <S.Eyebrow>Calendar Admin</S.Eyebrow>
          <S.Title>캘린더 관리</S.Title>
          <S.Description>
            일정 카테고리와 월별 일정을 등록, 조회, 삭제할 수 있는 관리자 페이지입니다.
          </S.Description>
        </S.Header>

        <S.Grid>
          <S.Card>
            <S.CardTitle>카테고리 등록</S.CardTitle>
            <S.CardText>
              <code>/api/schedule/admin/category</code>로 일정 카테고리를 등록합니다.
            </S.CardText>

            <S.Form onSubmit={handleCreateCategory}>
              <S.Field>
                <S.FieldLabel>카테고리 이름</S.FieldLabel>
                <S.Input
                  value={categoryForm.categoryName}
                  onChange={handleCategoryChange("categoryName")}
                  placeholder="예: 동아리 일정"
                />
              </S.Field>

              <S.InlineFields>
                <S.Field>
                  <S.FieldLabel>색상 코드</S.FieldLabel>
                  <S.Input
                    value={categoryForm.colorCode ?? ""}
                    onChange={handleCategoryChange("colorCode")}
                    placeholder="#7C8BFF"
                  />
                </S.Field>

                <S.Field>
                  <S.FieldLabel>정렬 순서</S.FieldLabel>
                  <S.Input
                    type="number"
                    value={categoryForm.sortOrder ?? 0}
                    onChange={handleCategoryChange("sortOrder")}
                  />
                </S.Field>
              </S.InlineFields>

              <S.InlineFields>
                <S.Field>
                  <S.FieldLabel>노출 여부</S.FieldLabel>
                  <S.Select
                    value={String(categoryForm.isVisible)}
                    onChange={handleCategoryVisibleChange}
                  >
                    <option value="true">true</option>
                    <option value="false">false</option>
                  </S.Select>
                </S.Field>

                <S.Field>
                  <S.FieldLabel>updatedBy</S.FieldLabel>
                  <S.Input
                    value={categoryForm.updatedBy}
                    onChange={handleCategoryChange("updatedBy")}
                    placeholder={userId ?? ""}
                  />
                </S.Field>
              </S.InlineFields>

              <S.ButtonRow>
                <S.PrimaryButton type="submit">
                  {isCreatingCategory ? "등록 중.." : "카테고리 등록"}
                </S.PrimaryButton>
              </S.ButtonRow>
            </S.Form>

            {categoryMessage ? (
              <S.StatusText $error={!categoryMessage.includes("등록되었습니다")}>
                {categoryMessage}
              </S.StatusText>
            ) : null}

            <S.CodeBlock>{JSON.stringify(categoryForm, null, 2)}</S.CodeBlock>
          </S.Card>

          <S.Card>
            <S.CardTitle>일정 등록</S.CardTitle>
            <S.CardText>
              <code>/api/schedule/admin</code>로 일정을 등록합니다.
            </S.CardText>

            <S.Form onSubmit={handleCreateSchedule}>
              <S.Field>
                <S.FieldLabel>카테고리</S.FieldLabel>
                <S.Select
                  value={String(scheduleForm.categoryId)}
                  onChange={handleScheduleChange("categoryId")}
                >
                  {categories.length === 0 ? (
                    <option value="0">카테고리를 먼저 등록해 주세요</option>
                  ) : (
                    categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.categoryName} ({category.id})
                      </option>
                    ))
                  )}
                </S.Select>
              </S.Field>

              <S.Field>
                <S.FieldLabel>일정 제목</S.FieldLabel>
                <S.Input
                  value={scheduleForm.title}
                  onChange={handleScheduleChange("title")}
                  placeholder="예: 5월 정기 회의"
                />
              </S.Field>

              <S.Field>
                <S.FieldLabel>설명</S.FieldLabel>
                <S.TextArea
                  value={scheduleForm.description ?? ""}
                  onChange={handleScheduleChange("description")}
                  placeholder="일정 설명"
                />
              </S.Field>

              <S.InlineFields>
                <S.Field>
                  <S.FieldLabel>시작일</S.FieldLabel>
                  <S.Input
                    type="date"
                    value={scheduleForm.startDate}
                    onChange={handleScheduleChange("startDate")}
                  />
                </S.Field>

                <S.Field>
                  <S.FieldLabel>종료일</S.FieldLabel>
                  <S.Input
                    type="date"
                    value={scheduleForm.endDate}
                    onChange={handleScheduleChange("endDate")}
                  />
                </S.Field>
              </S.InlineFields>

              <S.InlineFields>
                <S.Field>
                  <S.FieldLabel>시작 시간</S.FieldLabel>
                  <S.Input
                    type="time"
                    value={scheduleForm.startTime ?? ""}
                    onChange={handleScheduleChange("startTime")}
                  />
                </S.Field>

                <S.Field>
                  <S.FieldLabel>종료 시간</S.FieldLabel>
                  <S.Input
                    type="time"
                    value={scheduleForm.endTime ?? ""}
                    onChange={handleScheduleChange("endTime")}
                  />
                </S.Field>
              </S.InlineFields>

              <S.InlineFields>
                <S.Field>
                  <S.FieldLabel>종일 여부</S.FieldLabel>
                  <S.Select
                    value={String(scheduleForm.isAllDay)}
                    onChange={handleScheduleBooleanChange("isAllDay")}
                  >
                    <option value="false">false</option>
                    <option value="true">true</option>
                  </S.Select>
                </S.Field>

                <S.Field>
                  <S.FieldLabel>노출 여부</S.FieldLabel>
                  <S.Select
                    value={String(scheduleForm.isVisible)}
                    onChange={handleScheduleBooleanChange("isVisible")}
                  >
                    <option value="true">true</option>
                    <option value="false">false</option>
                  </S.Select>
                </S.Field>
              </S.InlineFields>

              <S.Field>
                <S.FieldLabel>updatedBy</S.FieldLabel>
                <S.Input
                  value={scheduleForm.updatedBy}
                  onChange={handleScheduleChange("updatedBy")}
                  placeholder={userId ?? ""}
                />
              </S.Field>

              <S.ButtonRow>
                <S.PrimaryButton type="submit">
                  {isCreatingSchedule ? "등록 중.." : "일정 등록"}
                </S.PrimaryButton>
              </S.ButtonRow>
            </S.Form>

            {scheduleMessage ? (
              <S.StatusText $error={!scheduleMessage.includes("등록되었습니다")}>
                {scheduleMessage}
              </S.StatusText>
            ) : null}

            <S.CodeBlock>{JSON.stringify(scheduleForm, null, 2)}</S.CodeBlock>
          </S.Card>

          <S.Card>
            <S.CardTitle>월별 일정 조회</S.CardTitle>
            <S.CardText>
              <code>GET /api/schedule/admin</code> 응답을 그대로 확인할 수 있습니다.
            </S.CardText>

            <S.InlineFields>
              <S.Field>
                <S.FieldLabel>연도</S.FieldLabel>
                <S.Input
                  type="number"
                  value={queryYear}
                  onChange={(event) => setQueryYear(event.target.value)}
                />
              </S.Field>

              <S.Field>
                <S.FieldLabel>월</S.FieldLabel>
                <S.Input
                  type="number"
                  min="1"
                  max="12"
                  value={queryMonth}
                  onChange={(event) => setQueryMonth(event.target.value)}
                />
              </S.Field>
            </S.InlineFields>

            <S.ButtonRow>
              <S.SecondaryButton type="button" onClick={() => void loadSchedules()}>
                {isLoadingSchedules ? "불러오는 중.." : "일정 새로고침"}
              </S.SecondaryButton>

              <S.SecondaryButton type="button" onClick={() => void loadCategories()}>
                {isLoadingCategories ? "불러오는 중.." : "카테고리 새로고침"}
              </S.SecondaryButton>
            </S.ButtonRow>

            <S.CodeBlock>{JSON.stringify(schedules, null, 2)}</S.CodeBlock>
          </S.Card>

          <S.Card>
            <S.CardTitle>카테고리 / 일정 삭제</S.CardTitle>
            <S.CardText>
              카테고리와 일정은 각각 ID 기준으로 삭제합니다.
            </S.CardText>

            <S.Field>
              <S.FieldLabel>삭제할 카테고리 ID</S.FieldLabel>
              <S.Input
                value={categoryDeleteId}
                onChange={(event) => {
                  setCategoryDeleteId(event.target.value);
                  setCategoryDeleteMessage("");
                }}
                placeholder="카테고리 ID"
              />
            </S.Field>

            <S.ButtonRow>
              <S.DangerButton type="button" onClick={handleDeleteCategory}>
                {isDeletingCategory ? "삭제 중.." : "카테고리 삭제"}
              </S.DangerButton>
            </S.ButtonRow>

            {categoryDeleteMessage ? (
              <S.StatusText $error={!categoryDeleteMessage.includes("완료")}>
                {categoryDeleteMessage}
              </S.StatusText>
            ) : null}

            <S.Field>
              <S.FieldLabel>삭제할 일정 ID</S.FieldLabel>
              <S.Input
                value={scheduleDeleteId}
                onChange={(event) => {
                  setScheduleDeleteId(event.target.value);
                  setScheduleDeleteMessage("");
                }}
                placeholder="일정 ID"
              />
            </S.Field>

            <S.ButtonRow>
              <S.DangerButton type="button" onClick={handleDeleteSchedule}>
                {isDeletingSchedule ? "삭제 중.." : "일정 삭제"}
              </S.DangerButton>
            </S.ButtonRow>

            {scheduleDeleteMessage ? (
              <S.StatusText $error={!scheduleDeleteMessage.includes("완료")}>
                {scheduleDeleteMessage}
              </S.StatusText>
            ) : null}

            <S.CodeBlock>{JSON.stringify(categories, null, 2)}</S.CodeBlock>
          </S.Card>
        </S.Grid>
      </S.Shell>
    </S.Page>
  );
}
