import styled from "styled-components";

export const Section = styled.section`
  position: relative;
  width: 100%;
  height: 640px;
  overflow: hidden;
  border-radius: 0 0 22px 22px;
  box-shadow: 0 24px 56px rgba(61, 77, 135, 0.16);

  @media (max-width: 768px) {
    height: 460px;
    margin-top: 10px;
  }
`;

export const EmptyState = styled.div`
  display: grid;
  place-items: center;
  width: 100%;
  height: 100%;
  color: rgba(255, 255, 255, 0.64);
  font-size: 16px;
  background: linear-gradient(180deg, #1a2030 0%, #0f1420 100%);
`;

export const SliderTrack = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  transition: transform 0.8s ease-in-out;
`;

export const Slide = styled.div`
  position: relative;
  height: 100%;
  flex: 0 0 100%;
`;

export const BackgroundImage = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.06) 0%,
    rgba(12, 18, 32, 0.12) 55%,
    rgba(5, 9, 19, 0.24) 100%
  );
`;

export const IndicatorList = styled.div`
  position: absolute;
  left: 50%;
  bottom: 24px;
  z-index: 3;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const IndicatorButton = styled.button<{ $active: boolean }>`
  width: ${({ $active }) => ($active ? "34px" : "12px")};
  height: 12px;
  border: none;
  border-radius: 999px;
  cursor: pointer;
  background: ${({ $active }) =>
    $active ? "#8C9FBF" : "rgba(255, 255, 255, 0.52)"};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.16);
  transition:
    width 0.25s ease,
    background-color 0.25s ease,
    transform 0.25s ease;

  &:hover {
    transform: translateY(-1px);
  }
`;
