import styled from "styled-components";
import * as Base from "../ProjectApplyPage/ProjectApplyPage.styles";

export const Page = Base.Page;
export const ApplySection = styled(Base.ApplySection)`
  min-height: 535px;
`;
export const BackgroundOverlay = Base.BackgroundOverlay;
export const Content = styled(Base.Content)`
  width: min(100%, 1240px);
  min-height: 535px;
  padding: 30px 72px 54px;
  grid-template-columns: minmax(500px, 1fr) 440px;
  gap: 70px;

  @media (max-width: 1100px) {
    grid-template-columns: 1fr;
    padding: 44px 40px 72px;
    gap: 34px;
  }

  @media (max-width: 640px) {
    padding: 34px 22px 28px;
  }
`;
export const InfoPanel = Base.InfoPanel;
export const Year = styled(Base.Year)`
  margin-bottom: 26px;
  font-size: 15px;
`;
export const Title = styled(Base.Title)`
  font-size: 42px;
  font-weight: 900;
  letter-spacing: 0;
`;
export const Description = styled(Base.Description)`
  margin-top: 28px;
  font-size: 15px;
`;
export const ContactList = styled(Base.ContactList)`
  margin-top: 26px;
  gap: 16px;
`;
export const ContactItem = styled(Base.ContactItem)`
  font-size: 12px;
`;
export const ContactIcon = styled(Base.ContactIcon)`
  width: 17px;
  height: 17px;
  flex-basis: 17px;
`;
export const FormColumn = styled(Base.FormColumn)`
  grid-template-columns: 1px minmax(0, 1fr);
  gap: 86px;
  min-height: 420px;
  padding-top: 75px;

  @media (max-width: 1100px) {
    grid-template-columns: 1fr;
    gap: 0;
    min-height: auto;
  }
`;
export const VerticalDivider = styled(Base.VerticalDivider)`
  min-height: 420px;
`;
export const FormPanel = styled(Base.FormPanel)`
  position: relative;
  width: 236px;
  padding-top: 0;
`;
export const FormTitle = styled(Base.FormTitle)`
  margin-bottom: 44px;
  border-bottom: none;
  padding-bottom: 0;
  font-size: 25px;
  font-weight: 400;
`;
export const FieldGroup = styled(Base.FieldGroup)`
  margin-top: 24px;
`;
export const Label = styled(Base.Label)`
  margin-bottom: 18px;
  font-size: 12px;
`;
export const WeekdayField = styled(FieldGroup)`
  position: relative;
`;
export const WeekdayButton = styled.button`
  width: 116px;
  height: 31px;
  padding: 0 11px;
  border: none;
  border-radius: 8px;
  outline: none;
  background: linear-gradient(180deg, #e4e5e8 0%, #b8bbc0 100%);
  color: #222630;
  font-size: 13px;
  font-weight: 700;
  text-align: left;
  box-shadow: 0 5px 12px rgba(0, 0, 0, 0.22);
  cursor: pointer;

  &::after {
    content: "⌄";
    float: right;
    color: #353944;
    font-size: 12px;
  }
`;
export const WeekdayMenuWrap = styled.div`
  position: absolute;
  top: 70px;
  left: 0;
  width: 92px;
  z-index: 10;

  @media (max-width: 1100px) {
    left: 0;
  }
`;
export const WeekdayMenuLabel = styled.div`
  display: none;
  margin-bottom: 9px;
  color: rgba(255, 255, 255, 0.55);
  font-size: 12px;
  font-weight: 700;
`;
export const WeekdayMenu = styled.div`
  width: 86px;
  padding: 8px 9px 7px;
  background: rgba(205, 205, 205, 0.88);
`;
export const WeekdayOption = styled.button`
  width: 100%;
  height: 17px;
  padding: 0;
  border: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.34);
  background: transparent;
  color: rgba(255, 255, 255, 0.78);
  font-size: 8px;
  line-height: 17px;
  text-align: left;
  cursor: pointer;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    color: #ffffff;
  }
`;
export const TimeBox = styled(Base.TimeBox)`
  width: 220px;
  min-height: 126px;
  padding: 0 12px 10px;
`;
export const TimeHeader = styled.button`
  width: calc(100% + 24px);
  height: 36px;
  margin: 0 -12px 8px;
  padding: 0 14px;
  border: none;
  border-bottom: 1px solid rgba(230, 235, 245, 0.76);
  background: rgba(255, 255, 255, 0.08);
  color: rgba(255, 255, 255, 0.86);
  font-size: 12px;
  font-weight: 700;
  text-align: right;
  cursor: default;
`;
export const TimeOption = styled(Base.TimeOption)`
  min-height: 24px;
  font-size: 11px;
`;
export const AgreementRow = styled(Base.AgreementRow)`
  margin-top: 14px;
  white-space: nowrap;
`;
export const DetailButton = Base.DetailButton;
export const SubmitButton = styled(Base.SubmitButton)`
  width: 220px;
  margin-top: 62px;
`;
export const DeviceImage = styled(Base.DeviceImage)`
  left: max(48px, calc((100vw - 1240px) / 2 + 48px));
  bottom: -38px;
  width: 335px;

  @media (max-width: 1100px) {
    left: 40px;
    width: 340px;
    bottom: -36px;
  }

  @media (max-width: 900px) {
    position: relative;
    left: auto;
    bottom: auto;
    width: 330px;
    margin: -12px auto -42px;
  }
`;
export const NotFoundBox = Base.NotFoundBox;
export const BackButton = Base.BackButton;

export const ErrorText = styled.p`
  margin: 18px 0 0;
  color: #ffb0b0;
  font-size: 12px;
  font-weight: 700;
  line-height: 1.45;
`;
