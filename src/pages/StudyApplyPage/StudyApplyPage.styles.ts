import styled from "styled-components";
import * as Base from "../ProjectApplyPage/ProjectApplyPage.styles";

export const Page = Base.Page;
export const ApplySection = Base.ApplySection;
export const BackgroundOverlay = Base.BackgroundOverlay;
export const Content = Base.Content;
export const InfoPanel = Base.InfoPanel;
export const Year = Base.Year;
export const Title = Base.Title;
export const Description = Base.Description;
export const ContactList = Base.ContactList;
export const ContactItem = Base.ContactItem;
export const ContactIcon = Base.ContactIcon;
export const FormColumn = Base.FormColumn;
export const VerticalDivider = Base.VerticalDivider;
export const FormPanel = Base.FormPanel;
export const FormTitle = Base.FormTitle;
export const FieldGroup = Base.FieldGroup;
export const Label = Base.Label;
export const Select = Base.Select;
export const TimeBox = Base.TimeBox;
export const TimeOption = Base.TimeOption;
export const AgreementRow = Base.AgreementRow;
export const DetailButton = Base.DetailButton;
export const SubmitButton = Base.SubmitButton;
export const DeviceImage = Base.DeviceImage;
export const NotFoundBox = Base.NotFoundBox;
export const BackButton = Base.BackButton;

export const DateInput = styled.input`
  width: 156px;
  height: 32px;
  padding: 0 10px;
  border: none;
  border-radius: 8px;
  outline: none;
  background: linear-gradient(180deg, #e4e5e8 0%, #b8bbc0 100%);
  color: #222630;
  font-size: 12px;
  font-weight: 700;
  box-shadow: 0 5px 12px rgba(0, 0, 0, 0.22);
`;

export const EmailInput = styled.input`
  width: 220px;
  height: 32px;
  padding: 0 10px;
  border: 1px solid rgba(230, 235, 245, 0.58);
  border-radius: 6px;
  outline: none;
  background: rgba(48, 53, 66, 0.5);
  color: #ffffff;
  font-size: 12px;
  font-weight: 600;

  &::placeholder {
    color: rgba(255, 255, 255, 0.46);
  }
`;

export const ErrorText = styled.p`
  margin: 18px 0 0;
  color: #ffb0b0;
  font-size: 12px;
  font-weight: 700;
  line-height: 1.45;
`;
