import styled from "styled-components";

export const Frame = styled.section`
  position: relative;
  width: 100%;
  max-width: 680px;
  min-height: 600px;
  border-radius: 24px;
  padding: 18px;
  border: none;
  background: rgba(93, 114, 185, 0.5);
  overflow: hidden;
  isolation: isolate;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    padding: 1.5px; 
    border-radius: 24px;

    background: linear-gradient(
      135deg,
      rgba(214, 217, 255, 0.8) 0%,
      rgba(184, 192, 255, 0.7) 25%,
      rgba(216, 192, 255, 0.7) 50%,
      rgba(176, 184, 255, 0.7) 75%,
      rgba(255, 255, 255, 0.9) 100%
    );

    -webkit-mask:
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;

    pointer-events: none;
    z-index: 1;
  }

  @media (max-width: 768px) {
    min-height: auto;
    padding: 14px;
    border-radius: 18px;

    &::before {
      border-radius: 18px;
    }
  }
`;

export const Inner = styled.div`
  width: 100%;
  min-height: 564px;
  border-radius: 18px;
  padding: 46px 44px 32px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: rgba(255, 255, 255, 0.5);

  @media (max-width: 768px) {
    min-height: auto;
    padding: 36px 22px 28px;
    border-radius: 16px;
  }
`;

export const TopArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 56px;
`;

export const Title = styled.h1`
  margin-top: 12px;
  font-size: 19px;
  font-weight: 400;
  color: #ffffff;
`;
