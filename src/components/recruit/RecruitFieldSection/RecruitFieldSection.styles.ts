import styled from "styled-components";
import { recruitColors } from "../recruitTheme";

const { pageBg, textMain, textSoft, accent } = recruitColors;

export const Section = styled.section`
  width: 100%;
  padding: 52px 24px 88px;
  background: ${pageBg};
  color: ${textMain};
  overflow: hidden;
`;

export const Header = styled.div`
  width: min(540px, 100%);
  margin: 0 auto 56px;
  text-align: center;
`;

export const Title = styled.h2`
  margin: 0;
  color: #d4d8e4;
  font-size: 54px;
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: 0;
  text-shadow: 0 0 10px rgba(230, 235, 250, 0.22);

  @media (max-width: 720px) {
    font-size: 36px;
  }
`;

export const TitleRule = styled.div`
  width: 100%;
  height: 2px;
  margin-top: 30px;
  background: ${accent};
`;

export const Content = styled.div`
  position: relative;
  width: min(1120px, 100%);
  margin: 0 auto;
`;

export const FieldTabs = styled.div<{ $visible?: boolean }>`
  position: absolute;
  right: calc(100% - 2px);
  top: 18px;
  z-index: 3;
  width: 138px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  pointer-events: ${({ $visible }) => ($visible ? "auto" : "none")};
  transition: opacity 0.18s ease;

  @media (max-width: 1180px) {
    right: auto;
    left: 50%;
    top: -48px;
    width: min(760px, 100vw - 48px);
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    transform: translateX(-50%);
  }
`;

export const FieldTab = styled.button<{ $visible?: boolean }>`
  height: 34px;
  width: 100%;
  border: none;
  border-radius: 0;
  background: #eef2fb;
  color: ${accent};
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transform: translateX(${({ $visible }) => ($visible ? "0" : "-34px")});
  transition: background-color 0.2s ease, color 0.2s ease, opacity 0.24s ease,
    transform 0.24s ease;

  &:hover {
    background: #ffffff;
    color: #5d73be;
  }

  @media (max-width: 1180px) {
    width: auto;
    min-width: 128px;
  }
`;

export const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 86px;
  justify-content: center;
  justify-items: center;

  @media (max-width: 1180px) {
    gap: 34px;
  }

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
    max-width: 420px;
    margin: 0 auto;
  }
`;

export const RecruitCard = styled.article`
  width: min(100%, 320px);
  min-width: 0;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

export const ImageStage = styled.div`
  position: relative;
  width: 100%;
`;

export const CardImage = styled.img`
  width: 100%;
  aspect-ratio: 1 / 1;
  display: block;
  object-fit: cover;
  border: 2px solid rgba(130, 151, 216, 0.85);
  border-radius: 8px;
`;

export const CardTitle = styled.h3`
  margin: 42px 0 8px;
  color: ${accent};
  font-size: 20px;
  font-weight: 700;
  line-height: 1.2;
`;

export const CardSubtitle = styled.p`
  margin: 0 0 34px;
  color: ${textSoft};
  font-size: 19px;
  font-weight: 500;
  line-height: 1.2;
`;

export const CardDescription = styled.p`
  margin: 0;
  color: #d8dbe5;
  font-size: 16px;
  font-weight: 500;
  line-height: 1.5;
  word-break: keep-all;
`;

export const BottomRule = styled.div`
  width: min(1380px, calc(100% - 48px));
  height: 2px;
  margin: 120px auto 0;
  background: ${accent};
`;
