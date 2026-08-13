import styled from "styled-components";

export const FormPanel = styled.form`
  width: 100%;
  padding-top: 6px;
  color: #f2f5fb;
`;

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 22px 22px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

export const Field = styled.div`
  min-width: 0;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  color: rgba(255, 255, 255, 0.78);
  font-size: 12px;
  font-weight: 700;
  line-height: 1;
`;

export const Input = styled.input`
  width: 100%;
  height: 34px;
  padding: 0 10px;
  border: 1px solid rgba(230, 235, 245, 0.66);
  border-radius: 0;
  outline: none;
  background: rgba(48, 53, 66, 0.54);
  color: #ffffff;
  font-size: 14px;

  &:focus {
    border-color: #ffffff;
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.14);
  }
`;

export const Fieldset = styled.fieldset`
  margin: 28px 0 0;
  padding: 0;
  border: none;
`;

export const Legend = styled.legend`
  margin-bottom: 14px;
  color: rgba(255, 255, 255, 0.78);
  font-size: 12px;
  font-weight: 700;
  line-height: 1;
`;

export const OptionRow = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 18px 44px;
`;

export const RadioLabel = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  min-width: 92px;
  color: rgba(255, 255, 255, 0.86);
  font-size: 12px;
  font-weight: 700;
  line-height: 1;
  cursor: pointer;

  input {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    accent-color: #ffffff;
  }
`;

export const EmailGroup = styled.div`
  margin-top: 28px;
`;

export const EmailRow = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto minmax(150px, 1fr);
  align-items: center;
  gap: 12px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 8px;
  }
`;

export const AtSign = styled.span`
  color: rgba(255, 255, 255, 0.82);
  font-size: 14px;
  font-weight: 700;

  @media (max-width: 640px) {
    display: none;
  }
`;

export const Select = styled.select`
  width: 100%;
  height: 34px;
  padding: 0 10px;
  border: 1px solid rgba(230, 235, 245, 0.66);
  border-radius: 0;
  outline: none;
  background: rgba(48, 53, 66, 0.72);
  color: #ffffff;
  font-size: 13px;

  option {
    color: #1e2430;
  }
`;

export const DomainControl = styled.div`
  position: relative;
  width: 100%;
  height: 34px;
  border: 1px solid rgba(230, 235, 245, 0.66);
  background: rgba(48, 53, 66, 0.72);

  &:focus-within {
    border-color: #ffffff;
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.14);
  }
`;

export const DomainInput = styled.input`
  width: 100%;
  height: 100%;
  padding: 0 38px 0 10px;
  border: none;
  outline: none;
  background: transparent;
  color: #ffffff;
  font-size: 13px;
`;

export const DomainSelectButton = styled.button`
  width: 100%;
  height: 100%;
  padding: 0 38px 0 10px;
  border: none;
  outline: none;
  background: transparent;
  color: #ffffff;
  font-size: 13px;
  text-align: left;
  cursor: pointer;
`;

export const DomainArrowButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  width: 34px;
  height: 100%;
  padding: 0;
  border: none;
  border-left: 1px solid rgba(230, 235, 245, 0.22);
  background: transparent;
  cursor: pointer;
`;

export const DomainArrow = styled.span`
  display: block;
  width: 0;
  height: 0;
  margin: 0 auto;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 5px solid rgba(255, 255, 255, 0.86);
`;

export const DomainMenu = styled.div`
  position: absolute;
  top: calc(100% + 4px);
  left: -1px;
  right: -1px;
  z-index: 20;
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(230, 235, 245, 0.5);
  background: rgba(45, 50, 64, 0.98);
  box-shadow: 0 10px 18px rgba(0, 0, 0, 0.18);
`;

export const DomainOption = styled.button`
  width: 100%;
  height: 30px;
  padding: 0 10px;
  border: none;
  background: transparent;
  color: rgba(255, 255, 255, 0.86);
  font-size: 12px;
  text-align: left;
  cursor: pointer;

  &:hover {
    background: rgba(255, 255, 255, 0.12);
    color: #ffffff;
  }
`;

export const DateInput = styled(Input)`
  max-width: 220px;
  color-scheme: dark;

  @media (max-width: 640px) {
    max-width: none;
  }
`;

export const InterviewScheduleRow = styled.div`
  display: grid;
  grid-template-columns: 260px minmax(220px, 1fr);
  align-items: start;
  gap: 24px;
  margin-top: 24px;

  > div {
    margin-top: 0;
  }

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

export const InterviewTimeField = styled.div`
  min-width: 0;
`;

export const InterviewTimeLabel = styled.p`
  margin: 0 0 8px;
  color: rgba(255, 255, 255, 0.78);
  font-size: 12px;
  font-weight: 700;
  line-height: 1;
`;

export const InterviewTimeControl = styled.div`
  position: relative;
  width: 100%;
  height: 34px;
  border: 1px solid rgba(230, 235, 245, 0.66);
  background: rgba(48, 53, 66, 0.72);

  &:focus-within {
    border-color: #ffffff;
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.14);
  }
`;

export const InterviewTimeSelectButton = styled.button`
  width: 100%;
  height: 100%;
  padding: 0 38px 0 10px;
  border: none;
  outline: none;
  background: transparent;
  color: #ffffff;
  font-size: 13px;
  text-align: left;
  cursor: pointer;
`;

export const InterviewTimeArrowButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  width: 34px;
  height: 100%;
  padding: 0;
  border: none;
  border-left: 1px solid rgba(230, 235, 245, 0.22);
  background: transparent;
  cursor: pointer;
`;

export const InterviewTimeArrow = styled.span`
  display: block;
  width: 0;
  height: 0;
  margin: 0 auto;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 5px solid rgba(255, 255, 255, 0.86);
`;

export const InterviewTimeMenu = styled.div`
  position: absolute;
  top: calc(100% + 4px);
  left: -1px;
  right: -1px;
  z-index: 20;
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(230, 235, 245, 0.5);
  background: rgba(45, 50, 64, 0.98);
  box-shadow: 0 10px 18px rgba(0, 0, 0, 0.18);
`;

export const InterviewTimeOption = styled.button`
  width: 100%;
  height: 30px;
  padding: 0 10px;
  border: none;
  background: transparent;
  color: rgba(255, 255, 255, 0.86);
  font-size: 12px;
  text-align: left;
  cursor: pointer;

  &:hover {
    background: rgba(255, 255, 255, 0.12);
    color: #ffffff;
  }
`;

export const AgreeLabel = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 9px;
  margin-top: 24px;
  color: rgba(255, 255, 255, 0.78);
  font-size: 12px;
  font-weight: 600;
  line-height: 1.3;
  cursor: pointer;

  input {
    width: 12px;
    height: 12px;
    accent-color: #ffffff;
  }
`;

export const ErrorMessage = styled.p`
  margin: 8px 0 0;
  color: #ffb5b5;
  font-size: 12px;
  font-weight: 700;
  line-height: 1.4;
`;

export const SubmitButton = styled.button`
  display: block;
  width: min(190px, 100%);
  height: 38px;
  margin: 24px auto 0;
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
    filter 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    filter: brightness(1.08);
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 300;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: rgba(9, 12, 18, 0.32);
`;

export const ModalCard = styled.div`
  position: relative;
  width: min(100%, 582px);
  min-height: 190px;
  padding: 34px 30px 30px;
  border: 1px solid #d9d9e1;
  border-radius: 4px;
  background: #ffffff;
  color: #242424;
  box-shadow: 0 16px 48px rgba(15, 18, 28, 0.18);
`;

export const ModalCloseButton = styled.button`
  position: absolute;
  top: 18px;
  right: 17px;
  width: 24px;
  height: 24px;
  padding: 0;
  border: none;
  background: transparent;
  color: #222222;
  font-size: 26px;
  font-weight: 300;
  line-height: 1;
  cursor: pointer;
`;

export const ModalTitle = styled.h2`
  margin: 0;
  padding-right: 36px;
  color: #222222;
  font-size: 24px;
  font-weight: 800;
  line-height: 1.28;
  white-space: nowrap;

  @media (max-width: 640px) {
    font-size: 19px;
    white-space: normal;
  }
`;

export const ModalText = styled.p`
  margin: 16px 0 0;
  color: #222222;
  font-size: 15px;
  font-weight: 500;
  line-height: 1.5;
  white-space: nowrap;

  @media (max-width: 640px) {
    white-space: normal;
  }
`;

export const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 14px;
  margin-top: 20px;
`;

export const ModalSecondaryButton = styled.button`
  min-width: 54px;
  height: 38px;
  padding: 0 14px;
  border: 1px solid #d7d5df;
  border-radius: 6px;
  background: #e4e2ea;
  box-shadow: inset 0 10px 10px -8px rgba(118, 116, 132, 0.55);
  color: #5d5b64;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
`;

export const ModalPrimaryButton = styled.button`
  min-width: 54px;
  height: 38px;
  padding: 0 14px;
  border: 1px solid #242424;
  border-radius: 6px;
  background: #242424;
  color: #ffffff;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
`;
