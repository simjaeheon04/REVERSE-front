import styled from "styled-components";
import { recruitColors } from "../recruitTheme";

const { introBg, textMain } = recruitColors;

export const Section = styled.section`
  width: 100%;
  min-height: 310px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 28px;
  padding: 80px 24px;
  background: ${introBg};
  color: ${textMain};
  text-align: center;
`;

export const Text = styled.p`
  margin: 0;
  font-size: 20px;
  font-weight: 500;
  line-height: 1.55;
  word-break: keep-all;

  @media (max-width: 720px) {
    font-size: 16px;

    br {
      display: none;
    }
  }
`;
