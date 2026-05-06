import { useEffect, useMemo, useState, type ChangeEvent, type FormEvent } from "react";
import * as S from "../clubIntroManage/ClubIntroManagePage.styles";
import { syncHolidayList } from "../../services/holidayApi";
import {
  createSchedule,
  createScheduleCategory,
  deleteSchedule,
  deleteScheduleCategory,
  getAdminScheduleCategories,
  getAdminSchedules,
  updateSchedule,
  updateScheduleCategory,
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

const toTimeInputValue = (value?: string | null) => {
  if (!value) {
    return "";
  }

  return value.slice(0, 5);
};

export default function CalendarManagePage() {
  const userId = useAuthStore((state) => state.userId);
  const [categoryForm, setCategoryForm] =
    useState<ScheduleCategoryPayload>(initialCategoryForm);
  const [scheduleForm, setScheduleForm] =
    useState<SchedulePayload>(initialScheduleForm);
  const [selectedCategory, setSelectedCategory] = useState<ScheduleCategory | null>(null);
  const [selectedSchedule, setSelectedSchedule] = useState<ScheduleItem | null>(null);
  const [editingCategoryId, setEditingCategoryId] = useState<number | null>(null);
  const [editingScheduleId, setEditingScheduleId] = useState<number | null>(null);
  const [categories, setCategories] = useState<ScheduleCategory[]>([]);
  const [schedules, setSchedules] = useState<ScheduleItem[]>([]);
  const [queryYear, setQueryYear] = useState(String(today.getFullYear()));
  const [queryMonth, setQueryMonth] = useState(String(today.getMonth() + 1));
  const [categoryDeleteId, setCategoryDeleteId] = useState("");
  const [scheduleDeleteId, setScheduleDeleteId] = useState("");
  const [isLoadingCategories, setIsLoadingCategories] = useState(false);
  const [isLoadingSchedules, setIsLoadingSchedules] = useState(false);
  const [isSavingCategory, setIsSavingCategory] = useState(false);
  const [isSavingSchedule, setIsSavingSchedule] = useState(false);
  const [isDeletingCategory, setIsDeletingCategory] = useState(false);
  const [isDeletingSchedule, setIsDeletingSchedule] = useState(false);
  const [isSyncingHoliday, setIsSyncingHoliday] = useState(false);
  const [categoryMessage, setCategoryMessage] = useState("");
  const [scheduleMessage, setScheduleMessage] = useState("");
  const [categoryDetailMessage, setCategoryDetailMessage] = useState("");
  const [scheduleDetailMessage, setScheduleDetailMessage] = useState("");
  const [categoryDeleteMessage, setCategoryDeleteMessage] = useState("");
  const [scheduleDeleteMessage, setScheduleDeleteMessage] = useState("");
  const [holidaySyncMessage, setHolidaySyncMessage] = useState("");

  const normalizedYear = useMemo(() => Number(queryYear || today.getFullYear()), [queryYear]);
  const normalizedMonth = useMemo(
    () => Number(queryMonth || today.getMonth() + 1),
    [queryMonth]
  );
  const isCategoryEditMode = editingCategoryId !== null;
  const isScheduleEditMode = editingScheduleId !== null;

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

  const resetCategoryForm = () => {
    setCategoryForm({
      ...initialCategoryForm,
      updatedBy: userId ?? "",
    });
    setSelectedCategory(null);
    setEditingCategoryId(null);
    setCategoryMessage("");
    setCategoryDetailMessage("");
  };

  const resetScheduleForm = () => {
    setScheduleForm({
      ...initialScheduleForm,
      categoryId: categories[0]?.id ?? 0,
      updatedBy: userId ?? "",
    });
    setSelectedSchedule(null);
    setEditingScheduleId(null);
    setScheduleMessage("");
    setScheduleDetailMessage("");
  };

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

  const handleSelectCategory = (category: ScheduleCategory) => {
    setSelectedCategory(category);
    setEditingCategoryId(category.id);
    setCategoryMessage("");
    setCategoryDetailMessage("선택한 카테고리를 수정 모드로 불러왔습니다.");
    setCategoryForm({
      categoryName: category.categoryName,
      colorCode: category.colorCode,
      sortOrder: category.sortOrder,
      isVisible: category.isVisible,
      updatedBy: userId ?? "",
    });
  };

  const handleSelectSchedule = (schedule: ScheduleItem) => {
    setSelectedSchedule(schedule);
    setEditingScheduleId(schedule.id);
    setScheduleMessage("");
    setScheduleDetailMessage("선택한 일정을 수정 모드로 불러왔습니다.");
    setScheduleForm({
      categoryId: schedule.categoryId,
      title: schedule.title,
      description: schedule.description ?? "",
      startDate: schedule.startDate,
      endDate: schedule.endDate,
      startTime: toTimeInputValue(schedule.startTime),
      endTime: toTimeInputValue(schedule.endTime),
      isAllDay: schedule.isAllDay,
      isVisible: schedule.isVisible,
      updatedBy: userId ?? "",
    });
  };

  const handleSaveCategory = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setIsSavingCategory(true);
      setCategoryMessage("");

      if (editingCategoryId !== null) {
        await updateScheduleCategory(editingCategoryId, categoryForm);
        setCategoryMessage("카테고리가 수정되었습니다.");
      } else {
        await createScheduleCategory(categoryForm);
        setCategoryMessage("카테고리가 등록되었습니다.");
      }

      await loadCategories();
      resetCategoryForm();
    } catch (error) {
      console.error("schedule category save failed", error);
      setCategoryMessage(
        editingCategoryId !== null
          ? "카테고리 수정에 실패했습니다."
          : "카테고리 등록에 실패했습니다."
      );
    } finally {
      setIsSavingCategory(false);
    }
  };

  const handleSaveSchedule = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setIsSavingSchedule(true);
      setScheduleMessage("");

      if (editingScheduleId !== null) {
        await updateSchedule(editingScheduleId, scheduleForm);
        setScheduleMessage("일정이 수정되었습니다.");
      } else {
        await createSchedule(scheduleForm);
        setScheduleMessage("일정이 등록되었습니다.");
      }

      await loadSchedules();
      resetScheduleForm();
    } catch (error) {
      console.error("schedule save failed", error);
      setScheduleMessage(
        editingScheduleId !== null
          ? "일정 수정에 실패했습니다."
          : "일정 등록에 실패했습니다."
      );
    } finally {
      setIsSavingSchedule(false);
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
      setCategoryDeleteMessage("카테고리가 삭제되었습니다.");

      if (editingCategoryId === Number(categoryDeleteId.trim())) {
        resetCategoryForm();
      }

      setCategoryDeleteId("");
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
      setScheduleDeleteMessage("일정이 삭제되었습니다.");

      if (editingScheduleId === Number(scheduleDeleteId.trim())) {
        resetScheduleForm();
      }

      setScheduleDeleteId("");
      await loadSchedules();
    } catch (error) {
      console.error("schedule delete failed", error);
      setScheduleDeleteMessage("일정 삭제에 실패했습니다.");
    } finally {
      setIsDeletingSchedule(false);
    }
  };

  const handleHolidaySync = async () => {
    try {
      setIsSyncingHoliday(true);
      setHolidaySyncMessage("");
      const result = await syncHolidayList(normalizedYear);
      setHolidaySyncMessage(result.message || "공휴일 동기화가 완료되었습니다.");
      await loadSchedules(normalizedYear, normalizedMonth);
    } catch (error) {
      console.error("holiday sync failed", error);
      setHolidaySyncMessage("공휴일 동기화에 실패했습니다.");
    } finally {
      setIsSyncingHoliday(false);
    }
  };

  return (
    <S.Page>
      <S.Shell>
        <S.Header>
          <S.Eyebrow>캘린더 관리자</S.Eyebrow>
          <S.Title>캘린더 관리</S.Title>
          <S.Description>
            일정 카테고리, 일정, 공휴일 동기화를 한 화면에서 관리할 수 있습니다.
          </S.Description>
        </S.Header>

        <S.Grid>
          <S.Card>
            <S.CardTitle>{isCategoryEditMode ? "카테고리 수정" : "카테고리 등록"}</S.CardTitle>
            <S.CardText>
              <code>/api/schedule/admin/category</code> 기준으로 일정 카테고리를 등록하거나 수정합니다.
            </S.CardText>

            <S.Form onSubmit={handleSaveCategory}>
              <S.Field>
                <S.FieldLabel>카테고리명</S.FieldLabel>
                <S.Input
                  value={categoryForm.categoryName}
                  onChange={handleCategoryChange("categoryName")}
                  placeholder="카테고리 이름"
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
                  <S.FieldLabel>isVisible</S.FieldLabel>
                  <S.Select
                    value={String(categoryForm.isVisible)}
                    onChange={handleCategoryVisibleChange}
                  >
                    <option value="true">true</option>
                    <option value="false">false</option>
                  </S.Select>
                </S.Field>

                <S.Field>
                  <S.FieldLabel>수정자</S.FieldLabel>
                  <S.Input
                    value={categoryForm.updatedBy}
                    onChange={handleCategoryChange("updatedBy")}
                    placeholder={userId ?? ""}
                  />
                </S.Field>
              </S.InlineFields>

              <S.ButtonRow>
                <S.PrimaryButton type="submit">
                  {isSavingCategory ? "저장 중..." : isCategoryEditMode ? "카테고리 저장" : "카테고리 등록"}
                </S.PrimaryButton>
                <S.SecondaryButton type="button" onClick={resetCategoryForm}>
                  초기화
                </S.SecondaryButton>
              </S.ButtonRow>
            </S.Form>

            {categoryDetailMessage ? <S.StatusText>{categoryDetailMessage}</S.StatusText> : null}
            {categoryMessage ? <S.StatusText>{categoryMessage}</S.StatusText> : null}

            <S.CodeBlock>{JSON.stringify(categoryForm, null, 2)}</S.CodeBlock>
          </S.Card>

          <S.Card>
            <S.CardTitle>{isScheduleEditMode ? "일정 수정" : "일정 등록"}</S.CardTitle>
            <S.CardText>
              <code>/api/schedule/admin</code> 기준으로 일정을 등록하거나 수정합니다.
            </S.CardText>

            <S.Form onSubmit={handleSaveSchedule}>
              <S.Field>
                <S.FieldLabel>카테고리</S.FieldLabel>
                <S.Select
                  value={String(scheduleForm.categoryId)}
                  onChange={handleScheduleChange("categoryId")}
                >
                  {categories.length === 0 ? (
                    <option value="0">먼저 카테고리를 등록해 주세요.</option>
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
                  placeholder="일정 제목"
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
                  <S.FieldLabel>isAllDay</S.FieldLabel>
                  <S.Select
                    value={String(scheduleForm.isAllDay)}
                    onChange={handleScheduleBooleanChange("isAllDay")}
                  >
                    <option value="false">false</option>
                    <option value="true">true</option>
                  </S.Select>
                </S.Field>

                <S.Field>
                  <S.FieldLabel>isVisible</S.FieldLabel>
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
                  <S.FieldLabel>수정자</S.FieldLabel>
                <S.Input
                  value={scheduleForm.updatedBy}
                  onChange={handleScheduleChange("updatedBy")}
                  placeholder={userId ?? ""}
                />
              </S.Field>

              <S.ButtonRow>
                <S.PrimaryButton type="submit">
                  {isSavingSchedule ? "저장 중..." : isScheduleEditMode ? "일정 저장" : "일정 등록"}
                </S.PrimaryButton>
                <S.SecondaryButton type="button" onClick={resetScheduleForm}>
                  초기화
                </S.SecondaryButton>
              </S.ButtonRow>
            </S.Form>

            {scheduleDetailMessage ? <S.StatusText>{scheduleDetailMessage}</S.StatusText> : null}
            {scheduleMessage ? <S.StatusText>{scheduleMessage}</S.StatusText> : null}

            <S.CodeBlock>{JSON.stringify(scheduleForm, null, 2)}</S.CodeBlock>
          </S.Card>

          <S.Card>
            <S.CardTitle>관리자 일정 목록</S.CardTitle>
            <S.CardText>
              <code>GET /api/schedule/admin</code> 응답을 확인하고 수정할 일정이나 카테고리를 선택합니다.
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
                {isLoadingSchedules ? "불러오는 중..." : "일정 새로고침"}
              </S.SecondaryButton>

              <S.SecondaryButton type="button" onClick={() => void loadCategories()}>
                {isLoadingCategories ? "불러오는 중..." : "카테고리 새로고침"}
              </S.SecondaryButton>
            </S.ButtonRow>

            <S.CardTitle as="h3">수정할 카테고리 선택</S.CardTitle>
            <S.ButtonRow>
              {categories.map((category) => (
                <S.SecondaryButton
                  key={category.id}
                  type="button"
                  onClick={() => handleSelectCategory(category)}
                >
                  {category.id}. {category.categoryName}
                </S.SecondaryButton>
              ))}
            </S.ButtonRow>

            <S.CardTitle as="h3">수정할 일정 선택</S.CardTitle>
            <S.ButtonRow>
              {schedules.map((schedule) => (
                <S.SecondaryButton
                  key={schedule.id}
                  type="button"
                  onClick={() => handleSelectSchedule(schedule)}
                >
                  {schedule.id}. {schedule.title}
                </S.SecondaryButton>
              ))}
            </S.ButtonRow>

            <S.CodeBlock>
              {JSON.stringify(
                {
                  categories,
                  schedules,
                },
                null,
                2
              )}
            </S.CodeBlock>

            <S.CardTitle as="h3">선택한 카테고리</S.CardTitle>
            <S.CodeBlock>
              {selectedCategory
                ? JSON.stringify(selectedCategory, null, 2)
                : "선택한 카테고리가 없습니다."}
            </S.CodeBlock>

            <S.CardTitle as="h3">선택한 일정</S.CardTitle>
            <S.CodeBlock>
              {selectedSchedule
                ? JSON.stringify(selectedSchedule, null, 2)
                : "선택한 일정이 없습니다."}
            </S.CodeBlock>
          </S.Card>

          <S.Card>
            <S.CardTitle>카테고리 / 일정 삭제</S.CardTitle>
            <S.CardText>
              ID를 입력해 카테고리나 일정을 삭제합니다.
            </S.CardText>

            <S.Field>
              <S.FieldLabel>카테고리 ID</S.FieldLabel>
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
                {isDeletingCategory ? "삭제 중..." : "카테고리 삭제"}
              </S.DangerButton>
            </S.ButtonRow>

            {categoryDeleteMessage ? <S.StatusText>{categoryDeleteMessage}</S.StatusText> : null}

            <S.Field>
              <S.FieldLabel>일정 ID</S.FieldLabel>
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
                {isDeletingSchedule ? "삭제 중..." : "일정 삭제"}
              </S.DangerButton>
            </S.ButtonRow>

            {scheduleDeleteMessage ? <S.StatusText>{scheduleDeleteMessage}</S.StatusText> : null}

            <S.CodeBlock>{JSON.stringify(categories, null, 2)}</S.CodeBlock>
          </S.Card>

          <S.Card>
            <S.CardTitle>공휴일 동기화</S.CardTitle>
            <S.CardText>
              <code>POST /api/holiday/admin/sync</code>로 선택한 연도의 공휴일 데이터를 동기화합니다.
            </S.CardText>

            <S.Field>
              <S.FieldLabel>동기화 연도</S.FieldLabel>
              <S.Input
                type="number"
                value={queryYear}
                onChange={(event) => setQueryYear(event.target.value)}
              />
            </S.Field>

            <S.ButtonRow>
              <S.PrimaryButton type="button" onClick={handleHolidaySync}>
                {isSyncingHoliday ? "동기화 중..." : "공휴일 동기화"}
              </S.PrimaryButton>
            </S.ButtonRow>

            {holidaySyncMessage ? <S.StatusText>{holidaySyncMessage}</S.StatusText> : null}

            <S.CodeBlock>{JSON.stringify({ year: normalizedYear }, null, 2)}</S.CodeBlock>
          </S.Card>
        </S.Grid>
      </S.Shell>
    </S.Page>
  );
}
