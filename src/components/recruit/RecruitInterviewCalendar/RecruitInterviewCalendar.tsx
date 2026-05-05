import { useMemo, useState, type ChangeEvent } from "react";
import * as S from "./RecruitInterviewCalendar.styles";

type CalendarDay = {
  key: string;
  day: number;
  isCurrentMonth: boolean;
};

type DayVariant = "plain" | "dark" | "light";

type RecruitInterviewCalendarProps = {
  selectedDate: string;
  onSelectDate: (date: string) => void;
  availableStartDate?: string | null;
  availableEndDate?: string | null;
  error?: string;
};

const monthLabels = [
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

const weekLabels = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const today = new Date();

const toDateKey = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const addDays = (date: Date, amount: number) => {
  const nextDate = new Date(date);
  nextDate.setDate(nextDate.getDate() + amount);
  return nextDate;
};

const getDatePart = (value?: string | null) => {
  if (!value) {
    return null;
  }

  const [datePart] = value.split("T");
  return datePart || null;
};

const createDateFromKey = (key: string) => {
  const [year, month, day] = key.split("-").map(Number);
  return new Date(year, month - 1, day);
};

const isDateWithinRange = (
  dateKey: string,
  startDateKey?: string | null,
  endDateKey?: string | null
) => {
  if (!startDateKey || !endDateKey) {
    return false;
  }

  const startDate = createDateFromKey(startDateKey);
  const endDate = createDateFromKey(endDateKey);
  const currentDate = createDateFromKey(dateKey);

  return currentDate >= startDate && currentDate <= endDate;
};

export default function RecruitInterviewCalendar({
  selectedDate,
  onSelectDate,
  availableStartDate,
  availableEndDate,
  error,
}: RecruitInterviewCalendarProps) {
  const startDateKey = getDatePart(availableStartDate);
  const endDateKey = getDatePart(availableEndDate);
  const initialVisibleDate = startDateKey
    ? createDateFromKey(startDateKey)
    : today;

  const [currentYear, setCurrentYear] = useState(initialVisibleDate.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(initialVisibleDate.getMonth());

  const calendarDays = useMemo<CalendarDay[]>(() => {
    const firstDate = new Date(currentYear, currentMonth, 1);
    const firstGridDate = addDays(firstDate, -firstDate.getDay());

    return Array.from({ length: 35 }, (_, index) => {
      const date = addDays(firstGridDate, index);

      return {
        key: toDateKey(date),
        day: date.getDate(),
        isCurrentMonth: date.getMonth() === currentMonth,
      };
    });
  }, [currentMonth, currentYear]);

  const moveMonth = (amount: number) => {
    const nextDate = new Date(currentYear, currentMonth + amount, 1);
    setCurrentYear(nextDate.getFullYear());
    setCurrentMonth(nextDate.getMonth());
  };

  const handleMonthChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setCurrentMonth(Number(event.target.value));
  };

  const handleYearChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setCurrentYear(Number(event.target.value));
  };

  return (
    <S.CalendarField>
      <S.Label>면접 일정</S.Label>
      <S.CalendarBox>
        <S.CalendarHeader>
          <S.MoveButton
            type="button"
            aria-label="이전 달"
            onClick={() => moveMonth(-1)}
          >
            {"<"}
          </S.MoveButton>

          <S.SelectGroup>
            <S.Select aria-label="월 선택" value={currentMonth} onChange={handleMonthChange}>
              {monthLabels.map((month, index) => (
                <option key={month} value={index}>
                  {month}
                </option>
              ))}
            </S.Select>

            <S.Select aria-label="연도 선택" value={currentYear} onChange={handleYearChange}>
              {[today.getFullYear() - 1, today.getFullYear(), today.getFullYear() + 1].map(
                (year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                )
              )}
            </S.Select>
          </S.SelectGroup>

          <S.MoveButton
            type="button"
            aria-label="다음 달"
            onClick={() => moveMonth(1)}
          >
            {">"}
          </S.MoveButton>
        </S.CalendarHeader>

        <S.WeekGrid aria-hidden="true">
          {weekLabels.map((week) => (
            <S.WeekLabel key={week}>{week}</S.WeekLabel>
          ))}
        </S.WeekGrid>

        <S.DayGrid>
          {calendarDays.map((item) => {
            const isAvailableDate = isDateWithinRange(
              item.key,
              startDateKey,
              endDateKey
            );
            const isSelected = selectedDate === item.key;
            let variant: DayVariant = "plain";

            if (isSelected && isAvailableDate) {
              variant = "light";
            } else if (isAvailableDate) {
              variant = "dark";
            }

            return (
              <S.DayButton
                key={item.key}
                type="button"
                $variant={variant}
                $currentMonth={item.isCurrentMonth}
                disabled={!item.isCurrentMonth || !isAvailableDate}
                onClick={() => onSelectDate(item.key)}
              >
                {item.day}
              </S.DayButton>
            );
          })}
        </S.DayGrid>
      </S.CalendarBox>
      {error ? <S.ErrorMessage>{error}</S.ErrorMessage> : null}
    </S.CalendarField>
  );
}
