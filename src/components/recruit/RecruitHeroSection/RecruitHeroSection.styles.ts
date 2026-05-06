import styled from "styled-components";
import { recruitColors } from "../recruitTheme";

const { pageBg, textMain, accent } = recruitColors;

export const Section = styled.section`
  min-height: 760px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 88px 24px 110px;
  background: radial-gradient(circle at 50% 44%, rgba(65, 72, 92, 0.38), transparent 28%),
    ${pageBg};

  @media (max-width: 720px) {
    min-height: 620px;
    padding: 72px 20px 88px;
  }
`;

export const Inner = styled.div`
  width: min(760px, 100%);
  text-align: center;
  color: ${textMain};
`;

export const Year = styled.p`
  margin: 0 0 18px;
  color: #d2d7e4;
  font-size: 56px;
  font-weight: 800;
  line-height: 1;
  text-shadow: 0 0 10px rgba(236, 240, 255, 0.35);

  @media (max-width: 720px) {
    font-size: 42px;
  }
`;

export const Title = styled.h1`
  margin: 0 0 32px;
  color: ${accent};
  font-size: 54px;
  font-weight: 800;
  line-height: 1.12;
  letter-spacing: 0;
  text-shadow: 0 0 10px rgba(131, 151, 216, 0.32);

  @media (max-width: 720px) {
    font-size: 34px;
  }
`;

export const Text = styled.p`
  margin: 0 auto 38px;
  color: #d6d9e4;
  font-size: 18px;
  font-weight: 700;
  line-height: 1.7;
  word-break: keep-all;

  @media (max-width: 720px) {
    font-size: 15px;
  }
`;

export const ApplyButton = styled.button`
  width: min(470px, 100%);
  height: 54px;
  border: 2px solid rgba(184, 167, 239, 0.9);
  border-radius: 28px;
  background: rgba(255, 255, 255, 0.02);
  color: #d9dce6;
  font-size: 18px;
  font-weight: 800;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.2s ease, border-color 0.2s ease;

  &:hover {
    background: rgba(184, 167, 239, 0.12);
    border-color: #d1c6ff;
    transform: translateY(-2px);
  }
`;
