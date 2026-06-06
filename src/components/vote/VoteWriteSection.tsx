import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createVote } from "../../services/voteApi";
import * as S from "./VoteWriteSection.styles";

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const YEARS = [2026, 2027, 2028];
const KOREAN_WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];
const ROLE_OPTIONS = [
  { value: 1, label: "최고관리자 이상" },
  { value: 2, label: "관리자 이상" },
  { value: 3, label: "정회원 이상" },
  { value: 4, label: "준회원 이상" },
  { value: 5, label: "게스트 이상" },
];

const formatDate = (date: Date | null) => {
  if (!date) {
    return "마감일 없음";
  }

  return `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}. (${
    KOREAN_WEEKDAYS[date.getDay()]
  })`;
};

const toDeadlineDateTime = (date: Date | null, time: string) => {
  if (!date) {
    return undefined;
  }

  const [hour = "23", minute = "59"] = time.split(":");
  const deadline = new Date(date);
  deadline.setHours(Number(hour), Number(minute), 0, 0);

  const yyyy = deadline.getFullYear();
  const mm = String(deadline.getMonth() + 1).padStart(2, "0");
  const dd = String(deadline.getDate()).padStart(2, "0");
  const hh = String(deadline.getHours()).padStart(2, "0");
  const mi = String(deadline.getMinutes()).padStart(2, "0");

  return `${yyyy}-${mm}-${dd}T${hh}:${mi}:00`;
};

const getToday = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
};

export default function VoteWriteSection() {
  const navigate = useNavigate();
  const today = useMemo(() => getToday(), []);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [allowMultiple, setAllowMultiple] = useState(false);
  const [isSecret, setIsSecret] = useState(false);
  const [participantRole, setParticipantRole] = useState(3);
  const [resultViewRole, setResultViewRole] = useState(3);
  const [selectedDate, setSelectedDate] = useState<Date | null>(today);
  const [deadlineTime, setDeadlineTime] = useState("23:59");
  const [calendarMonth, setCalendarMonth] = useState(today.getMonth());
  const [calendarYear, setCalendarYear] = useState(today.getFullYear());
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const calendarDays = useMemo(() => {
    const firstDay = new Date(calendarYear, calendarMonth, 1).getDay();
    const daysInMonth = new Date(calendarYear, calendarMonth + 1, 0).getDate();
    const previousMonthDays = new Date(calendarYear, calendarMonth, 0).getDate();
    const cells: Array<{ day: number; muted: boolean; date: Date }> = [];

    for (let index = firstDay - 1; index >= 0; index -= 1) {
      const day = previousMonthDays - index;
      cells.push({
        day,
        muted: true,
        date: new Date(calendarYear, calendarMonth - 1, day),
      });
    }

    for (let day = 1; day <= daysInMonth; day += 1) {
      cells.push({
        day,
        muted: false,
        date: new Date(calendarYear, calendarMonth, day),
      });
    }

    while (cells.length < 42) {
      const day = cells.length - firstDay - daysInMonth + 1;
      cells.push({
        day,
        muted: true,
        date: new Date(calendarYear, calendarMonth + 1, day),
      });
    }

    return cells;
  }, [calendarMonth, calendarYear]);

  const handleOptionChange = (index: number, value: string) => {
    setOptions((prev) =>
      prev.map((option, optionIndex) => (optionIndex === index ? value : option))
    );
  };

  const handleRemoveOption = (index: number) => {
    if (options.length <= 2) {
      return;
    }

    setOptions((prev) => prev.filter((_, optionIndex) => optionIndex !== index));
  };

  const handleAddOption = () => {
    setOptions((prev) => [...prev, ""]);
  };

  const handleToggleCalendar = () => {
    if (selectedDate) {
      setCalendarYear(selectedDate.getFullYear());
      setCalendarMonth(selectedDate.getMonth());
    }

    setIsCalendarOpen((prev) => !prev);
  };

  const moveMonth = (amount: number) => {
    const next = new Date(calendarYear, calendarMonth + amount, 1);
    setCalendarYear(next.getFullYear());
    setCalendarMonth(next.getMonth());
  };

  const handleSubmit = async () => {
    const cleanOptions = options.map((option) => option.trim()).filter(Boolean);

    if (!title.trim()) {
      alert("투표 제목을 입력해 주세요.");
      return;
    }

    if (cleanOptions.length < 2) {
      alert("투표 항목은 최소 2개 이상 입력해 주세요.");
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await createVote({
        title: title.trim(),
        content: content.trim() || undefined,
        deadline: toDeadlineDateTime(selectedDate, deadlineTime),
        isMultiple: allowMultiple,
        isSecret,
        participantRole,
        resultViewRole,
        options: cleanOptions,
      });

      alert(result.message || "투표가 등록되었습니다.");
      navigate(result.voteId ? `/vote/${result.voteId}` : "/vote");
    } catch (error) {
      console.error("[vote/write] submit failed", error);
      alert("투표 등록에 실패했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <S.Page>
      <S.Inner>
        <S.Header>
          <S.Title>투표 작성하기</S.Title>
          <S.Rule />
        </S.Header>

        <S.Panel>
          <S.PanelInner>
            <S.SectionTitle>
              <S.VoteIcon aria-hidden="true" />
              투표 내용 입력
            </S.SectionTitle>
            <S.TitleUnderline />

            <S.FieldGroup>
              <S.TitleInput
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                maxLength={100}
                placeholder="투표 제목을 입력해 주세요."
              />
              <S.ContentInput
                value={content}
                onChange={(event) => setContent(event.target.value)}
                placeholder="투표 설명을 입력해 주세요. (선택)"
              />
            </S.FieldGroup>

            <S.OptionList>
              {options.map((option, index) => (
                <S.OptionRow key={index}>
                  <S.OptionInput
                    value={option}
                    onChange={(event) => handleOptionChange(index, event.target.value)}
                    placeholder={`항목 ${index + 1}`}
                  />
                  <S.RemoveButton
                    type="button"
                    aria-label="항목 삭제"
                    onClick={() => handleRemoveOption(index)}
                    disabled={options.length <= 2}
                  >
                    x
                  </S.RemoveButton>
                </S.OptionRow>
              ))}

              <S.AddButton type="button" onClick={handleAddOption}>
                + 항목 추가
              </S.AddButton>
            </S.OptionList>

            <S.CheckGroup>
              <S.CheckLabel>
                <input
                  type="checkbox"
                  checked={allowMultiple}
                  onChange={(event) => setAllowMultiple(event.target.checked)}
                />
                복수 선택 허용
              </S.CheckLabel>
              <S.CheckLabel>
                <input
                  type="checkbox"
                  checked={isSecret}
                  onChange={(event) => setIsSecret(event.target.checked)}
                />
                비밀투표
              </S.CheckLabel>
              <S.RoleGrid>
                <S.SelectLabel>
                  참가 가능 권한
                  <S.RoleSelect
                    value={participantRole}
                    onChange={(event) => setParticipantRole(Number(event.target.value))}
                  >
                    {ROLE_OPTIONS.map((role) => (
                      <option key={role.value} value={role.value}>
                        {role.label}
                      </option>
                    ))}
                  </S.RoleSelect>
                </S.SelectLabel>
                <S.SelectLabel>
                  결과 조회 권한
                  <S.RoleSelect
                    value={resultViewRole}
                    onChange={(event) => setResultViewRole(Number(event.target.value))}
                    disabled={isSecret}
                  >
                    {ROLE_OPTIONS.map((role) => (
                      <option key={role.value} value={role.value}>
                        {role.label}
                      </option>
                    ))}
                  </S.RoleSelect>
                </S.SelectLabel>
              </S.RoleGrid>
            </S.CheckGroup>
          </S.PanelInner>
        </S.Panel>

        <S.DatePanel>
          <S.DateLabel>투표 종료 시간 설정</S.DateLabel>
          <S.DateControls>
            <S.DateTrigger type="button" onClick={handleToggleCalendar}>
              <S.ClockIcon aria-hidden="true" />
              {formatDate(selectedDate)}
            </S.DateTrigger>
            <S.TimeInput
              type="time"
              value={deadlineTime}
              onChange={(event) => setDeadlineTime(event.target.value)}
            />
          </S.DateControls>

          {isCalendarOpen ? (
            <S.CalendarPopup>
              <S.CalendarToolbar>
                <S.CalendarNavButton
                  type="button"
                  aria-label="이전 달"
                  onClick={() => moveMonth(-1)}
                >
                  ‹
                </S.CalendarNavButton>
                <S.CalendarSelect
                  value={calendarMonth}
                  onChange={(event) => setCalendarMonth(Number(event.target.value))}
                  aria-label="월 선택"
                >
                  {MONTHS.map((month, index) => (
                    <option key={month} value={index}>
                      {month}
                    </option>
                  ))}
                </S.CalendarSelect>
                <S.CalendarSelect
                  value={calendarYear}
                  onChange={(event) => setCalendarYear(Number(event.target.value))}
                  aria-label="연도 선택"
                >
                  {YEARS.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </S.CalendarSelect>
                <S.CalendarNavButton
                  type="button"
                  aria-label="다음 달"
                  onClick={() => moveMonth(1)}
                >
                  ›
                </S.CalendarNavButton>
              </S.CalendarToolbar>

              <S.CalendarGrid>
                {WEEKDAYS.map((weekday) => (
                  <S.CalendarWeekday key={weekday}>{weekday}</S.CalendarWeekday>
                ))}
                {calendarDays.map((cell) => {
                  const cellDate = new Date(cell.date);
                  cellDate.setHours(0, 0, 0, 0);
                  const isPast = cellDate < today;
                  const isSelected =
                    selectedDate?.getFullYear() === cell.date.getFullYear() &&
                    selectedDate?.getMonth() === cell.date.getMonth() &&
                    selectedDate?.getDate() === cell.date.getDate();

                  return (
                    <S.CalendarDay
                      key={`${cell.date.getFullYear()}-${cell.date.getMonth()}-${cell.day}`}
                      type="button"
                      $selected={isSelected}
                      $muted={cell.muted}
                      disabled={isPast}
                      onClick={() => {
                        if (isPast) {
                          return;
                        }
                        setSelectedDate(cell.date);
                        setIsCalendarOpen(false);
                      }}
                    >
                      {cell.day}
                    </S.CalendarDay>
                  );
                })}
              </S.CalendarGrid>

              <S.CalendarUnsetButton
                type="button"
                onClick={() => {
                  setSelectedDate(null);
                  setIsCalendarOpen(false);
                }}
              >
                마감일 없음
              </S.CalendarUnsetButton>
            </S.CalendarPopup>
          ) : null}
        </S.DatePanel>

        <S.Actions>
          <S.ActionButton type="button" onClick={handleSubmit} disabled={isSubmitting}>
            완료
          </S.ActionButton>
          <S.ActionButton type="button" onClick={() => navigate("/vote")}>
            취소
          </S.ActionButton>
        </S.Actions>
      </S.Inner>
    </S.Page>
  );
}
