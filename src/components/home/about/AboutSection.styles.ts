import styled, { css } from "styled-components";

export const Section = styled.section`
  position: relative;
  width: 100%;
  min-height: 880px;
  overflow: hidden;
  background: #2d303a;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const BackgroundMark = styled.img`
  position: absolute;
  left: -4%;
  bottom: -4%;
  width: min(960px, 50vw);
  height: auto;
  object-fit: contain;

  pointer-events: none;
  user-select: none;

  @media (max-width: 768px) {
    width: 72vw;
    left: -14%;
    bottom: -2%;
  }
`;

export const Content = styled.div`
  position: relative;
  z-index: 1;
  width: min(920px, calc(100% - 40px));
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 64px 20px 72px;
`;

export const Title = styled.h2`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 0 0 28px;
  color: rgba(255, 255, 255, 0.92);
  font-size: clamp(46px, 6vw, 76px);
  font-weight: 900;
  line-height: 0.95;
  letter-spacing: 0.04em;
  text-shadow:
    0 3px 0 rgba(195, 200, 219, 0.9),
    0 10px 18px rgba(112, 118, 150, 0.18);
`;

export const Description = styled.p`
  margin: 0;
  color: rgba(255, 255, 255, 0.98);
  font-size: 24px;
  font-weight: 400;
  line-height: 1.45;
  text-shadow: 0 3px 8px rgba(108, 114, 141, 0.24);
`;

export const ButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 16px;
  margin-top: 64px;
`;

export const LinkButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  min-width: 200px;
  padding: 14px 24px;
  border: 1px solid rgba(176, 181, 203, 0.9);
  background: rgba(255, 255, 255, 0.92);
  color: #292d3c;
  font-size: 14px;
  font-weight: 700;
  border-radius: 2px;
  box-shadow: 0 3px 8px rgba(127, 133, 165, 0.18);
  cursor: pointer;
  transition:
    transform 0.18s ease,
    box-shadow 0.18s ease,
    background-color 0.18s ease;

  &:hover {
    transform: translateY(-2px);
    background: #ffffff;
    box-shadow: 0 8px 18px rgba(127, 133, 165, 0.2);
  }
`;

export const ButtonArrow = styled.span`
  font-size: 12px;
  line-height: 1;
`;

export const ButtonIcon = styled.span`
  font-size: 14px;
  line-height: 1;
  margin-left: auto;
`;

const visibleStyle = css`
  opacity: 1;
  transform: translateY(0);
`;

export const Reveal = styled.span<{ $visible: boolean }>`
  display: block;
  opacity: 0;
  transform: translateY(40px);
  transition:
    opacity 0.6s ease,
    transform 0.6s ease;

  ${({ $visible }) => $visible && visibleStyle}
`;
