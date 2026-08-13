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
