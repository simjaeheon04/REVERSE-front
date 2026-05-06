import styled from "styled-components";
import applyBg from "../../assets/images/apply-bg.png";
import iMacImage from "../../assets/images/iMac.png";

export const Page = styled.main`
  min-height: calc(100vh - 70px);
  display: flex;
  flex-direction: column;
  background: #20242d;
`;

export const ApplySection = styled.section`
  position: relative;
  isolation: isolate;
  flex: 1;
  min-height: 760px;
  overflow: hidden;
  background-image: url(${applyBg});
  background-size: cover;
  background-position: center;

  @media (max-width: 900px) {
    min-height: auto;
    display: flex;
    flex-direction: column;
  }
`;

export const BackgroundOverlay = styled.div`
  position: absolute;
  inset: 0;
  z-index: -1;
  background: linear-gradient(
      90deg,
      rgba(29, 32, 42, 0.5),
      rgba(29, 32, 42, 0.18)
    ),
    rgba(17, 20, 28, 0.08);
`;

export const Content = styled.div`
  position: relative;
  z-index: 1;
  width: min(100%, 1280px);
  min-height: 760px;
  margin: 0 auto;
  padding: 56px 72px 72px;
  display: grid;
  grid-template-columns: minmax(360px, 1fr) minmax(420px, 520px);
  gap: 58px;
  align-items: start;

  @media (max-width: 1100px) {
    padding: 46px 40px 72px;
    grid-template-columns: minmax(0, 1fr);
    gap: 34px;
  }

  @media (max-width: 640px) {
    min-height: auto;
    padding: 34px 22px 28px;
  }
`;

export const DeviceImage = styled.img.attrs({ src: iMacImage })`
  position: absolute;
  left: max(40px, calc((100vw - 1280px) / 2 + 60px));
  bottom: -60px;
  z-index: 0;
  width: 460px;
  height: auto;
  object-fit: contain;
  pointer-events: none;
  filter: drop-shadow(0 22px 28px rgba(0, 0, 0, 0.18));

  @media (max-width: 1100px) {
    left: 40px;
    width: 370px;
    bottom: -42px;
  }

  @media (max-width: 900px) {
    position: relative;
    left: auto;
    bottom: auto;
    align-self: center;
    width: 330px;
    max-width: calc(100% - 44px);
    margin: -12px auto -42px;
  }
`;
