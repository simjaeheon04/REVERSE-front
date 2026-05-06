import styled from "styled-components";

type DayVariant = "plain" | "dark" | "light";

const calendarWidth = 260;
const calendarScale = calendarWidth / 360;

const scaled = (value: number) => `${Math.round(value * calendarScale)}px`;

export const CalendarField = styled.div`
  margin-top: 24px;
`;

export const Label = styled.p`
  margin: 0 0 8px;
  color: rgba(255, 255, 255, 0.78);
  font-size: 12px;
  font-weight: 700;
  line-height: 1;
`;

export const CalendarBox = styled.div`
  width: 100%;
  max-width: ${calendarWidth}px;
  padding: ${scaled(18)} ${scaled(18)} ${scaled(24)};
  border: 1px solid rgba(230, 235, 245, 0.8);
  border-radius: ${scaled(14)};
  background: rgba(64, 68, 80, 0.42);
  color: #101217;
`;

export const CalendarHeader = styled.div`
  height: ${scaled(38)};
  display: grid;
  grid-template-columns: ${scaled(36)} 1fr ${scaled(36)};
  align-items: center;
  border: 1px solid rgba(230, 235, 245, 0.26);
`;

export const MoveButton = styled.button`
  width: 100%;
  height: 100%;
  border: none;
  background: transparent;
  color: #ffffff;
  font-size: ${scaled(34)};
  font-weight: 300;
  line-height: 1;
  cursor: pointer;
`;

export const SelectGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${scaled(10)};
`;

export const Select = styled.select`
  height: ${scaled(32)};
  min-width: ${scaled(96)};
  padding: 0 ${scaled(12)};
  border: 1px solid rgba(255, 255, 255, 0.26);
  border-radius: ${scaled(7)};
  background: #e9e9eb;
  color: #22242a;
  font-size: ${scaled(18)};
  line-height: 1;
  outline: none;
`;

export const WeekGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: ${scaled(6)};
  margin-top: ${scaled(24)};
`;

export const WeekLabel = styled.span`
  color: rgba(20, 22, 28, 0.34);
  font-size: ${scaled(14)};
  font-weight: 500;
  line-height: 1;
  text-align: center;
`;

export const DayGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: ${scaled(6)};
  margin-top: ${scaled(14)};
`;

export const DayButton = styled.button<{
  $variant: DayVariant;
  $currentMonth: boolean;
}>`
  width: 100%;
  aspect-ratio: 1;
  border: none;
  border-radius: ${scaled(7)};
  background: ${({ $variant }) => {
    if ($variant === "dark") {
      return "#26282f";
    }

    if ($variant === "light") {
      return "#f2f2f3";
    }

    return "transparent";
  }};
  color: ${({ $variant, $currentMonth }) => {
    if ($variant === "dark") {
      return "#ffffff";
    }

    if ($variant === "light") {
      return "#181a20";
    }

    return $currentMonth ? "#181a20" : "rgba(24, 26, 32, 0.46)";
  }};
  font-size: ${scaled(18)};
  font-weight: 500;
  line-height: 1;
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};

  &:disabled {
    pointer-events: none;
  }
`;

export const ErrorMessage = styled.p`
  margin: 8px 0 0;
  color: #ffb5b5;
  font-size: 12px;
  font-weight: 700;
  line-height: 1.4;
`;
