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
    grid-template-columns: 1fr;
    gap: 34px;
  }

  @media (max-width: 640px) {
    min-height: auto;
    padding: 34px 22px 28px;
  }
`;

export const InfoPanel = styled.div`
  min-height: 280px;
  display: flex;
  flex-direction: column;
  color: #f5f7fb;
`;

export const Year = styled.p`
  margin: 0 0 22px;
  color: rgba(255, 255, 255, 0.94);
  font-size: 18px;
  font-weight: 700;
  line-height: 1;
`;

export const Title = styled.h1`
  margin: 0;
  color: #ffffff;
  font-size: 44px;
  font-weight: 800;
  line-height: 1.18;
  letter-spacing: -0.02em;

  @media (max-width: 640px) {
    font-size: 34px;
  }
`;

export const Description = styled.p`
  margin: 34px 0 0;
  color: rgba(255, 255, 255, 0.82);
  font-size: 18px;
  font-weight: 500;
  line-height: 1.5;
`;

export const ContactList = styled.ul`
  list-style: none;
  margin: 34px 0 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const ContactItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 14px;
  color: rgba(255, 255, 255, 0.84);
  font-size: 15px;
  font-weight: 500;
  line-height: 1.45;
`;

export const ContactIcon = styled.svg`
  width: 20px;
  height: 20px;
  flex: 0 0 20px;
  color: rgba(255, 255, 255, 0.92);
`;

export const FormColumn = styled.div`
  display: grid;
  grid-template-columns: 1px minmax(0, 1fr);
  gap: 100px;
  min-height: 620px;

  @media (max-width: 1100px) {
    grid-template-columns: 1fr;
    gap: 0;
    min-height: auto;
  }
`;

export const VerticalDivider = styled.div`
  width: 1px;
  min-height: 620px;
  background: rgba(255, 255, 255, 0.92);

  @media (max-width: 1100px) {
    display: none;
  }
`;

export const FormPanel = styled.form`
  width: 230px;
  padding-top: 8px;
  color: #f2f5fb;

  @media (max-width: 1100px) {
    width: min(100%, 360px);
  }
`;

export const FormTitle = styled.h2`
  margin: 0 0 54px;
  color: #ffffff;
  font-size: 30px;
  font-weight: 400;
  line-height: 1;
  border-bottom: 1px solid rgba(255, 255, 255, 0.62);
  padding-bottom: 4px;
`;

export const FieldGroup = styled.div`
  margin-top: 26px;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 16px;
  color: rgba(255, 255, 255, 0.78);
  font-size: 13px;
  font-weight: 700;
  line-height: 1;
`;

export const Select = styled.select`
  width: 116px;
  height: 32px;
  padding: 0 10px;
  border: none;
  border-radius: 8px;
  outline: none;
  background: linear-gradient(180deg, #e4e5e8 0%, #b8bbc0 100%);
  color: #222630;
  font-size: 13px;
  font-weight: 700;
  box-shadow: 0 5px 12px rgba(0, 0, 0, 0.22);
`;

export const Input = styled.input`
  width: 220px;
  height: 34px;
  padding: 0 12px;
  border: 1px solid rgba(230, 235, 245, 0.66);
  outline: none;
  background: rgba(48, 53, 66, 0.58);
  color: #ffffff;
  font-size: 13px;
  font-weight: 600;
  box-sizing: border-box;

  &::placeholder {
    color: rgba(255, 255, 255, 0.42);
  }

  &:focus {
    border-color: rgba(255, 255, 255, 0.95);
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.12);
  }

  &[type="date"] {
    color-scheme: dark;
  }
`;

export const TimeBox = styled.div`
  width: 220px;
  min-height: 146px;
  padding: 12px 12px 14px;
  border: 1px solid rgba(230, 235, 245, 0.66);
  background: rgba(48, 53, 66, 0.48);
  box-sizing: border-box;
`;

export const TimeControl = styled.div`
  position: relative;
  width: 220px;
  height: 40px;
  border: 1px solid rgba(230, 235, 245, 0.66);
  background: rgba(48, 53, 66, 0.58);
  box-sizing: border-box;

  &:focus-within {
    border-color: rgba(255, 255, 255, 0.95);
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.12);
  }
`;

export const TimeSelectButton = styled.button`
  width: 100%;
  height: 100%;
  padding: 0 42px 0 14px;
  border: none;
  background: transparent;
  color: #ffffff;
  font-size: 13px;
  font-weight: 700;
  text-align: left;
  cursor: pointer;
`;

export const TimeArrowButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  width: 38px;
  height: 100%;
  padding: 0;
  border: none;
  border-left: 1px solid rgba(230, 235, 245, 0.22);
  background: transparent;
  cursor: pointer;
`;

export const TimeArrow = styled.span`
  display: block;
  width: 0;
  height: 0;
  margin: 0 auto;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 5px solid rgba(255, 255, 255, 0.86);
`;

export const TimeMenu = styled.div`
  position: absolute;
  top: calc(100% + 4px);
  left: -1px;
  right: -1px;
  z-index: 20;
  display: flex;
  flex-direction: column;
  padding: 8px 12px 10px;
  border: 1px solid rgba(230, 235, 245, 0.66);
  background: rgba(45, 50, 64, 0.98);
  box-shadow: 0 10px 18px rgba(0, 0, 0, 0.18);
`;

export const TimeOption = styled.button<{ $active: boolean }>`
  min-height: 30px;
  padding: 0;
  border: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.26);
  background: transparent;
  color: ${({ $active }) => ($active ? "#ffffff" : "rgba(255, 255, 255, 0.74)")};
  font-size: 12px;
  font-weight: ${({ $active }) => ($active ? 800 : 500)};
  text-align: left;
  cursor: pointer;

  &:hover {
    color: #ffffff;
  }
`;

export const AgreementRow = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: 18px;
  color: rgba(255, 255, 255, 0.82);
  font-size: 11px;
  font-weight: 600;
  line-height: 1;
  white-space: nowrap;
`;

export const AgreementCheck = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 7px;
  min-width: 0;
  cursor: pointer;

  input {
    flex: 0 0 auto;
    width: 13px;
    height: 13px;
    accent-color: #ffffff;
  }

  span {
    white-space: nowrap;
  }
`;

export const DetailButton = styled.button`
  flex: 0 0 auto;
  border: none;
  background: transparent;
  color: rgba(255, 255, 255, 0.62);
  font-size: 10px;
  font-weight: 600;
  cursor: pointer;
`;

export const FormMessage = styled.p`
  margin: 16px 0 0;
  color: #ffb5b5;
  font-size: 12px;
  font-weight: 700;
  line-height: 1.4;
`;

export const SubmitButton = styled.button`
  display: block;
  width: 220px;
  height: 40px;
  margin: 58px 0 0;
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: 8px;
  background: linear-gradient(180deg, #50617f 0%, #3e4d6d 100%);
  color: #ffffff;
  font-size: 13px;
  font-weight: 700;
  line-height: 1;
  cursor: pointer;
  transition:
    transform 0.2s ease,
    filter 0.2s ease,
    opacity 0.2s ease;

  &:hover:not(:disabled) {
    transform: translateY(-1px);
    filter: brightness(1.08);
  }

  &:disabled {
    cursor: default;
    opacity: 0.55;
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

export const NotFoundBox = styled.div`
  min-height: 420px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  color: #ffffff;
`;

export const BackButton = styled.button`
  min-width: 180px;
  height: 42px;
  padding: 0 18px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.08);
  color: #ffffff;
  font-size: 13px;
  font-weight: 800;
  cursor: pointer;
`;
