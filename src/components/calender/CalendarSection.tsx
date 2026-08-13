import { useEffect, useMemo } from "react";
import heroImage from "../../assets/images/calendar-bg.jpg";
import { useCalendarStore } from "../../stores/calendarStore";
import * as S from "./CalendarSection.styles";

type CalendarDay = {
  day: number | null;
  holiday?: string;
  clubEvent?: string;
  holidayColor?: "blue" | "white";
  clubEventColor?: string;
};

const monthLabelFormatter = new Intl.DateTimeFormat("ko-KR", {
  month: "numeric",
});

const buildCalendarWeeks = (
  year: number,
  month: number,
  holidays: ReturnType<typeof useCalendarStore.getState>["holidays"],
  schedules: ReturnType<typeof useCalendarStore.getState>["schedules"]
) => {
  const firstDay = new Date(year, month - 1, 1);
  const lastDate = new Date(year, month, 0).getDate();
  const firstWeekday = firstDay.getDay();
  const holidayMap = new Map(
    holidays.map((holiday) => [holiday.holidayDate, holiday.holidayName])
  );
  const scheduleMap = new Map<string, { title: string; colorCode: string }>();

  schedules.forEach((schedule) => {
    if (!scheduleMap.has(schedule.startDate)) {
      scheduleMap.set(schedule.startDate, {
        title: schedule.title,
        colorCode: schedule.colorCode,
      });
    }
  });

  const cells: CalendarDay[] = Array.from({ length: firstWeekday }, () => ({
    day: null,
  }));

  for (let day = 1; day <= lastDate; day += 1) {
    const dateKey = `${year}-${String(month).padStart(2, "0")}-${String(
      day
    ).padStart(2, "0")}`;
    const holiday = holidayMap.get(dateKey);
    const clubEvent = scheduleMap.get(dateKey);

    cells.push({
      day,
      holiday,
      clubEvent: clubEvent?.title,
      holidayColor: holiday ? "blue" : undefined,
      clubEventColor: clubEvent?.colorCode,
    });
  }

  while (cells.length % 7 !== 0) {
    cells.push({ day: null });
  }

  return Array.from({ length: cells.length / 7 }, (_, index) =>
    cells.slice(index * 7, index * 7 + 7)
  );
};

const moveMonth = (year: number, month: number, amount: number) => {
  const nextDate = new Date(year, month - 1 + amount, 1);
  return {
    year: nextDate.getFullYear(),
    month: nextDate.getMonth() + 1,
  };
};

export default function CalendarSection() {
  const year = useCalendarStore((state) => state.year);
  const month = useCalendarStore((state) => state.month);
  const schedules = useCalendarStore((state) => state.schedules);
  const holidays = useCalendarStore((state) => state.holidays);
  const isLoading = useCalendarStore((state) => state.isLoading);
  const error = useCalendarStore((state) => state.error);
  const fetchMonth = useCalendarStore((state) => state.fetchMonth);

  useEffect(() => {
    void fetchMonth();
  }, [fetchMonth]);

  const calendarWeeks = useMemo(
    () => buildCalendarWeeks(year, month, holidays, schedules),
    [year, month, holidays, schedules]
  );

  const eventSummary = useMemo(() => {
    const holidaySummary = holidays.map(
      (holiday) => `${holiday.holidayDate} ${holiday.holidayName}`
    );
    const scheduleSummary = schedules.map(
      (schedule) => `${schedule.startDate} ${schedule.title}`
    );

    return [...holidaySummary, ...scheduleSummary];
  }, [holidays, schedules]);

  const handleMoveMonth = (amount: number) => {
    const next = moveMonth(year, month, amount);
    void fetchMonth(next.year, next.month);
  };

  return (
    <S.Wrapper>
      <S.Hero $image={heroImage}>
        <S.HeroOverlay />
        <S.HeroContent>
          <S.HeroTitle>REVERSE 일정</S.HeroTitle>
          <S.HeroDesc>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            varius enim in eros elementum tristique.
            {"\n"}
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            varius enim in eros elementum tristique.
          </S.HeroDesc>
        </S.HeroContent>
        <S.HeroLine />
      </S.Hero>

      <S.Section>
        <S.Content>
          <S.YearText>{year}</S.YearText>

          <S.MonthHeader>
            <S.MonthNavButton type='button' onClick={() => handleMoveMonth(-1)}>
              ‹
            </S.MonthNavButton>
            <S.MonthText>
              {monthLabelFormatter.format(new Date(year, month - 1, 1))}
            </S.MonthText>
            <S.MonthNavButton type='button' onClick={() => handleMoveMonth(1)}>
              ›
            </S.MonthNavButton>
          </S.MonthHeader>

          {isLoading ? (
            <S.StateMessage>일정 정보를 불러오는 중입니다.</S.StateMessage>
          ) : null}

          {error ? <S.StateMessage>{error}</S.StateMessage> : null}

          <S.CalendarBox>
            <S.Grid>
              {calendarWeeks.flat().map((item, index) => (
                <S.Cell key={`${item.day}-${index}`}>
                  {item.day !== null ? (
                    <S.DayNumber
                      $variant={item.holidayColor}
                      $color={!item.holidayColor ? item.clubEventColor : undefined}
                    >
                      {item.day}
                    </S.DayNumber>
                  ) : null}

                  {item.holiday ? (
                    <S.HolidayText $variant={item.holidayColor ?? "blue"}>
                      {item.holiday}
                    </S.HolidayText>
                  ) : null}

                  {item.clubEvent ? (
                    <S.EventText $color={item.clubEventColor}>
                      {item.clubEvent}
                    </S.EventText>
                  ) : null}
                </S.Cell>
              ))}
            </S.Grid>
          </S.CalendarBox>

          <S.EventSummaryBox>
            {eventSummary.length > 0 ? (
              eventSummary.map((event) => (
                <S.EventSummaryItem key={event}>• {event}</S.EventSummaryItem>
              ))
            ) : (
              <S.EventSummaryItem>등록된 일정이 없습니다.</S.EventSummaryItem>
            )}
          </S.EventSummaryBox>
        </S.Content>
      </S.Section>
    </S.Wrapper>
  );
}
