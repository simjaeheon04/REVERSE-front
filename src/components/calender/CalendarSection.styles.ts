import styled from "styled-components";

export const Wrapper = styled.section`
  width: 100%;
`;

export const Hero = styled.section<{ $image: string }>`
  position: relative;
  width: 100%;
  height: 300px;
  overflow: hidden;

  background-image: url(${(props) => props.$image});
  background-size: cover;
  background-position: center 50%;
`;

export const HeroOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(45, 48, 58, 0.9);
`;

export const HeroContent = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  transform: translateY(-8px);
  text-align: center;
`;

export const HeroTitle = styled.h1`
  margin: 20px 0 45px;
  color: #e6e7ff;
  font-size: 40px;
  font-weight: 600;
  line-height: 1.05;
  letter-spacing: -0.02em;
  font-family: "Roboto", sans-serif;
`;

export const HeroDesc = styled.p`
  margin: 0;
  color: rgba(230, 231, 255, 0.92);
  font-size: 12px;
  line-height: 1.65;
  white-space: pre-line;
`;

export const HeroLine = styled.div`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);

  width: 50%;
  min-width: 800px;
  height: 1px;
  background: #b7c2d4;
`;

export const Section = styled.div`
  position: relative;
  width: 100%;
  padding: 45px 20px 60px;
  overflow: hidden;
`;

export const Content = styled.div`
  position: relative;
  z-index: 1;
  max-width: 720px;
  margin: 0 auto;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const MonthHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin: 8px 0 50px;
`;

export const YearText = styled.p`
  margin: 0;
  color: #eef2ff;
  font-size: 18px;
`;

export const MonthText = styled.h2`
  margin: 0;
  color: #eef2ff;
  font-size: 48px;
  font-weight: 400;
`;

export const MonthNavButton = styled.button`
  min-width: 36px;
  height: 36px;
  border: 1px solid #8088a7;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.08);
  color: #eef2ff;
  font-size: 18px;
  line-height: 1;
  cursor: pointer;
`;

export const CalendarBox = styled.div`
  width: 100%;
  border: 1px solid #8088a7;
  border-bottom: none;
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(4px);
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`;

export const Cell = styled.div`
  position: relative;
  height: 95px;
  padding: 10px;
  border-right: 1px solid #8088a7;
  border-bottom: 1px solid #8088a7;

  &:nth-child(7n) {
    border-right: none;
  }
`;

export const HolidayText = styled.span<{ $variant?: "blue" | "white" }>`
  position: absolute;
  top: 32px;
  left: 10px;
  right: 10px;

  color: ${({ $variant }) => ($variant === "blue" ? "#70e0ff" : "#8088a7")};
  font-size: 8px;
  font-weight: 400;
  line-height: 1.25;
  white-space: normal;
  word-break: keep-all;
`;

export const DayNumber = styled.span<{ $variant?: "blue" | "white"; $color?: string }>`
  position: absolute;
  top: 10px;
  left: 10px;

  color: ${({ $variant, $color }) =>
    $variant === "blue" ? "#70e0ff" : $color || "#8088a7"};
  font-size: 18px;
  font-weight: 400;
  line-height: 1;
`;

export const EventText = styled.p<{ $color?: string }>`
  position: absolute;
  top: 34px;
  left: 10px;
  right: 10px;

  margin: 0;
  color: ${({ $color }) => $color || "#8088a7"};
  font-size: 10px;
  font-weight: 500;
  line-height: 1.2;
  white-space: normal;
  word-break: keep-all;
  text-align: left;
`;

export const EventSummaryBox = styled.div`
  width: 100%;
  margin-top: 15px;
  padding: 18px 24px;

  background: rgba(217, 217, 217, 0.2);
  border: 1px solid #aeb2ba;
`;

export const EventSummaryItem = styled.p`
  margin: 0;
  color: #b2b2b2;
  font-size: 14px;
  line-height: 1.8;
`;

export const StateMessage = styled.p`
  margin: 0 0 24px;
  color: #d9dcec;
  font-size: 14px;
  line-height: 1.6;
`;
