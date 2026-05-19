import styled from "styled-components";
import * as Base from "../ProjectApplyPage/ProjectApplyPage.styles";

export const Page = Base.Page;
export const ApplySection = Base.ApplySection;
export const BackgroundOverlay = Base.BackgroundOverlay;
export const Content = styled(Base.Content)`
  min-height: 650px;
  padding: 48px 76px 64px;
  grid-template-columns: minmax(460px, 1fr) minmax(380px, 455px);
  gap: 74px;

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
export const Year = Base.Year;
export const Title = styled(Base.Title)`
  font-size: 42px;
  font-weight: 900;
  letter-spacing: 0;
`;
export const Description = styled(Base.Description)`
  margin-top: 28px;
  font-size: 16px;
`;
export const ContactList = styled(Base.ContactList)`
  margin-top: 28px;
  gap: 18px;
`;
export const ContactItem = Base.ContactItem;
export const ContactIcon = Base.ContactIcon;
export const FormColumn = styled(Base.FormColumn)`
  grid-template-columns: 1px minmax(0, 1fr);
  gap: 92px;
  min-height: 510px;

  @media (max-width: 1100px) {
    grid-template-columns: 1fr;
    gap: 0;
    min-height: auto;
  }
`;
export const VerticalDivider = styled(Base.VerticalDivider)`
  min-height: 510px;
`;
export const FormPanel = styled(Base.FormPanel)`
  width: 238px;
  padding-top: 6px;
`;
export const FormTitle = styled(Base.FormTitle)`
  margin-bottom: 40px;
  border-bottom: none;
  padding-bottom: 0;
  font-size: 26px;
  font-weight: 400;
`;
export const FieldGroup = Base.FieldGroup;
export const Label = Base.Label;
export const Select = styled(Base.Select)`
  width: 116px;
`;
export const TimeBox = styled(Base.TimeBox)`
  width: 220px;
  min-height: 116px;
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
`;
export const AgreementRow = styled(Base.AgreementRow)`
  margin-top: 14px;
  white-space: nowrap;
`;
export const DetailButton = Base.DetailButton;
export const SubmitButton = styled(Base.SubmitButton)`
  margin-top: 62px;
`;
export const DeviceImage = styled(Base.DeviceImage)`
  left: max(52px, calc((100vw - 1280px) / 2 + 70px));
  bottom: -8px;
  width: 430px;

  @media (max-width: 1100px) {
    left: 40px;
    width: 360px;
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
