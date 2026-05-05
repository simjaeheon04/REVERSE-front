import styled from "styled-components";
import loginBg from "../../../assets/images/rule-bg.png";

export const Page = styled.main`
  min-height: calc(100vh - 74px);
  position: relative;
  overflow: hidden;
  background: url(${loginBg}) center center / cover no-repeat;
`;

export const Content = styled.section`
  min-height: calc(100vh - 74px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px 20px 80px;
  position: relative;
  z-index: 2;

  @media (max-width: 768px) {
    padding: 32px 16px 48px;
  }
`;
