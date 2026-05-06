import styled from "styled-components";
import { recruitColors } from "../recruitTheme";

const { introBg, textMain, accent } = recruitColors;

export const Section = styled.section`
  width: 100%;
  padding: 22px 0 78px;
  background: ${introBg};
  color: ${textMain};
  overflow: hidden;
`;

export const Title = styled.h2`
  margin: 0 0 38px;
  color: #d8deeb;
  font-size: 96px;
  font-weight: 900;
  line-height: 1;
  letter-spacing: 0;

  @media (max-width: 900px) {
    padding-left: 24px;
    font-size: 58px;
  }
`;

export const Stage = styled.div`
  width: 100%;
  overflow: hidden;
  margin-bottom: 60px;
`;

export const Track = styled.div<{ $animate?: boolean }>`
  display: flex;
  align-items: center;
  width: max-content;
  height: 560px;
  transition: ${({ $animate }) =>
    $animate ? "transform 0.8s ease-in-out" : "none"};

  @media (max-width: 900px) {
    height: 360px;
  }
`;

export const Slide = styled.div`
  flex: 0 0 min(72vw, 1080px);
  height: 100%;
  margin: 0 38px;
  background: #f2f4f8;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  @media (max-width: 900px) {
    flex-basis: calc(100vw - 48px);
    margin: 0 12px;
  }
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
`;

export const CategoryList = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
  padding: 0 24px;
`;

export const CategoryChip = styled.button<{ $active?: boolean }>`
  min-height: 42px;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  border: none;
  border-radius: 8px;
  padding: 0 20px;
  background: ${({ $active }) => ($active ? "#dce4f4" : "#f5f6f8")};
  color: ${({ $active }) => ($active ? accent : "#7d8492")};
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
`;

export const CheckMark = styled.span`
  color: #ffffff;
  font-size: 15px;
  font-weight: 800;
`;

export const ChatButton = styled.button`
  width: 42px;
  height: 42px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 8px;
  background: transparent;
  color: #f2f4f8;
  cursor: pointer;
`;

export const ChatIcon = styled.svg`
  width: 34px;
  height: 34px;
`;
