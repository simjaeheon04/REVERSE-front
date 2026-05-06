import styled from "styled-components";

export const BackgroundLayer = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  overflow: visible;
`;

export const ContentLayer = styled.div`
  position: relative;
  z-index: 1;
`;

export const Page = styled.main`
  background: #2d303a;
  position: relative;
  overflow: hidden;
`;
