import styled from "styled-components";
import { recruitColors } from "../recruitTheme";

const { pageBg, textMain } = recruitColors;

export const Section = styled.section`
  width: 100%;
  min-height: 790px;
  padding: 220px 24px 150px;
  background: radial-gradient(circle at 50% 40%, rgba(69, 76, 96, 0.22), transparent 26%),
    ${pageBg};
  color: ${textMain};
  font-family: "Noto Sans KR", "Apple SD Gothic Neo", "Malgun Gothic", "Segoe UI", sans-serif;
`;

export const Header = styled.div`
  text-align: center;
  margin-bottom: 88px;
`;

export const Title = styled.h2`
  margin: 0 0 26px;
  color: #d7dbe6;
  font-size: 48px;
  font-weight: 800;
  line-height: 1.15;
  letter-spacing: 0;
`;

export const Subtitle = styled.p`
  margin: 0;
  color: #d8dce6;
  font-size: 17px;
  font-weight: 700;
  line-height: 1.4;
`;

export const Grid = styled.div`
  width: min(1180px, 100%);
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 72px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 54px;
  }
`;

export const Item = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  min-width: 0;
`;

export const Icon = styled.svg`
  width: 44px;
  height: 44px;
  color: #d8dce6;
  margin-bottom: 34px;
`;

export const Label = styled.h3`
  margin: 0 0 24px;
  color: #d3d6df;
  font-size: 30px;
  font-weight: 800;
  line-height: 1.1;
`;

export const Description = styled.p`
  margin: 0 0 28px;
  color: #c9ced9;
  font-size: 16px;
  font-weight: 500;
  line-height: 1.55;
  word-break: keep-all;
`;

export const Strong = styled.strong`
  display: block;
  color: #e1e4ec;
  font-size: 16px;
  font-weight: 800;
  line-height: 1.8;
  word-break: keep-all;
`;

export const NotifyCard = styled.div`
  width: min(840px, 100%);
  margin: 96px auto 0;
  padding: 36px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 28px;
  background: rgba(20, 26, 39, 0.9);
  box-shadow: 0 28px 64px rgba(0, 0, 0, 0.24);
`;

export const NotifyTitle = styled.h3`
  margin: 0 0 12px;
  color: #eef2ff;
  font-size: 32px;
  font-weight: 800;
`;

export const NotifyDescription = styled.p`
  margin: 0 0 24px;
  color: #cad1de;
  font-size: 15px;
  line-height: 1.6;
`;

export const NotifyRow = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 14px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

export const NotifyInput = styled.input`
  width: 100%;
  padding: 16px 18px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 16px;
  background: #0f1522;
  color: #eef2ff;
  font-size: 15px;

  &::placeholder {
    color: rgba(238, 242, 255, 0.34);
  }
`;

export const NotifyButton = styled.button`
  min-width: 160px;
  padding: 16px 20px;
  border: none;
  border-radius: 16px;
  background: linear-gradient(135deg, #9eb3ff 0%, #7b90ec 100%);
  color: #0f1525;
  font-size: 15px;
  font-weight: 800;
  cursor: pointer;

  &:disabled {
    cursor: default;
    opacity: 0.7;
  }
`;

export const NotifyMessage = styled.p`
  margin: 16px 0 0;
  color: #d7e6ff;
  font-size: 14px;
  line-height: 1.5;
`;
