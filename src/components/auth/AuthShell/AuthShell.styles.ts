import styled from "styled-components";

export const Frame = styled.section`
  position: relative;
  width: 100%;
  max-width: 624px;
  min-height: 560px;
  border-radius: 8px;
  padding: 20px;
  border: none;
  background: #455179;
  overflow: hidden;
  isolation: isolate;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    padding: 1px;
    border-radius: 8px;
    background: radial-gradient(
      89% 142% at 50% 50%,
      #d6d9ff 9%,
      #d8c0ff 28%,
      #efb9ff 47%,
      #8a84dd 75%,
      #ffffff 100%
    );
    -webkit-mask: linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
    z-index: 0;
  }

  @media (max-width: 768px) {
    min-height: auto;
    padding: 14px;

    &::before {
      border-radius: 8px;
    }
  }
`;

export const Inner = styled.div`
  width: 100%;
  min-height: 520px;
  border-radius: 8px;
  padding: 20px 26px 30px;
  border: 1px solid rgba(255, 255, 255, 0.42);
  background: rgba(206, 206, 206, 0.5);
  box-shadow: inset 0 3px 8px rgba(255, 255, 255, 0.5),
    inset 0 -3px 8px rgba(113, 126, 170, 0.2);

  @media (max-width: 768px) {
    min-height: auto;
    padding: 18px 18px 24px;
  }
`;

export const TopArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 40px;

  img {
    filter: drop-shadow(0 10px 18px rgba(85, 95, 132, 0.34));
  }
`;

export const Title = styled.svg`
  margin-top: 8px;

  text {
    fill: #ffffff;
    filter: url(#auth-title-inner-shadow);
    font-family: "Barlow", sans-serif;
    font-size: 24px;
    font-weight: 700;
    letter-spacing: 0.015em;
  }
`;
