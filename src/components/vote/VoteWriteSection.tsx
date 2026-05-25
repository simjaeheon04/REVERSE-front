import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./VoteWriteSection.styles";

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const YEARS = [2025, 2026, 2027];
const KOREAN_WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];

const formatDate = (date: Date | null) => {
  if (!date) {
    return "선택 안함";
  }

  return `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}. (${KOREAN_WEEKDAYS[date.getDay()]})`;
};

export default function VoteWriteSection() {
  const navigate = useNavigate();
  const [options, setOptions] = useState(["", "", ""]);
  const [allowMultiple, setAllowMultiple] = useState(true);
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    new Date(2026, 4, 22)
  );
  const [calendarMonth, setCalendarMonth] = useState(4);
  const [calendarYear, setCalendarYear] = useState(2026);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

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
    if (options.length <= 1) {
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

  return (
    <S.Page>
      <S.Inner>
        <S.Header>
          <S.Title>투표 글 작성하기</S.Title>
          <S.Rule />
        </S.Header>

        <S.Panel>
          <S.PanelInner>
            <S.SectionTitle>
              <S.VoteIcon aria-hidden="true" />
              투표 제목 입력
            </S.SectionTitle>
            <S.TitleUnderline />

            <S.OptionList>
              {options.map((option, index) => (
                <S.OptionRow key={index}>
                  <S.OptionInput
                    value={option}
                    onChange={(event) => handleOptionChange(index, event.target.value)}
                    placeholder="항목 입력"
                  />
                  <S.RemoveButton
                    type="button"
                    aria-label="항목 삭제"
                    onClick={() => handleRemoveOption(index)}
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
                복수선택
              </S.CheckLabel>
              <S.CheckLabel>
                <input
                  type="checkbox"
                  checked={isAnonymous}
                  onChange={(event) => setIsAnonymous(event.target.checked)}
                />
                익명투표
              </S.CheckLabel>
            </S.CheckGroup>
          </S.PanelInner>
        </S.Panel>

        <S.DatePanel>
          <S.DateLabel>투표 종료 시간 설정</S.DateLabel>
          <S.DateTrigger type="button" onClick={handleToggleCalendar}>
            <S.ClockIcon aria-hidden="true" />
            {formatDate(selectedDate)}
          </S.DateTrigger>

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
                      onClick={() => {
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
                선택 안함
              </S.CalendarUnsetButton>
            </S.CalendarPopup>
          ) : null}
        </S.DatePanel>

        <S.Actions>
          <S.ActionButton type="button">완료</S.ActionButton>
          <S.ActionButton type="button" onClick={() => navigate("/vote")}>
            취소
          </S.ActionButton>
        </S.Actions>
      </S.Inner>
    </S.Page>
  );
}
