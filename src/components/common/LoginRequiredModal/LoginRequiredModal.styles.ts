import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: rgba(18, 21, 28, 0.66);
  backdrop-filter: blur(4px);
`;

export const Dialog = styled.div`
  width: min(100%, 360px);
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.16);
  background: #ffffff;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.28);
  padding: 32px 28px 26px;
  text-align: center;
`;

export const Title = styled.h2`
  margin: 0;
  color: #20242d;
  font-size: 22px;
  font-weight: 800;
  line-height: 1.35;
`;

export const Description = styled.p`
  margin: 14px 0 0;
  color: #555c6c;
  font-size: 15px;
  font-weight: 500;
  line-height: 1.55;
`;

export const ConfirmButton = styled.button`
  width: 100%;
  height: 46px;
  margin-top: 28px;
  border: none;
  border-radius: 6px;
  background: #2d303a;
  color: #ffffff;
  font-size: 15px;
  font-weight: 800;
  cursor: pointer;
  transition:
    background 0.16s ease,
    transform 0.16s ease;

  &:hover {
    background: #1f222b;
    transform: translateY(-1px);
  }

  &:focus-visible {
    outline: 3px solid rgba(85, 128, 239, 0.35);
    outline-offset: 3px;
  }
`;
