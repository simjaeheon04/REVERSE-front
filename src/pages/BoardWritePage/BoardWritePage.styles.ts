import styled from "styled-components";

export const Page = styled.section`
  min-height: calc(100vh - 70px);
  padding: 76px 24px 56px;
  background: linear-gradient(180deg, #2a2d36 0%, #373b46 100%);
`;

export const Frame = styled.div`
  max-width: 1320px;
  margin: 0 auto;
  min-height: 740px;
  padding: 30px 40px 44px;
  border: 1px solid rgba(255, 255, 255, 0.72);
`;

export const Hero = styled.div`
  text-align: center;
  padding: 6px 0 54px;
`;

export const HeroTitle = styled.h1`
  margin: 0;
  color: #d7d9f7;
  font-size: clamp(48px, 7vw, 76px);
  font-weight: 800;
  line-height: 1;
  letter-spacing: 0.02em;
`;

export const HeroText = styled.p`
  margin: 14px 0 0;
  color: rgba(255, 255, 255, 0.76);
  font-size: 14px;
  line-height: 1.5;
`;

export const FormCard = styled.form`
  max-width: 890px;
  margin: 18px auto 0;
  padding: 30px 30px 32px;
  border: 1px solid rgba(255, 255, 255, 0.38);
  border-radius: 8px;
  background: rgba(153, 156, 168, 0.34);
`;

export const Field = styled.div`
  & + & {
    margin-top: 18px;
  }
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 10px;
  color: #ffffff;
  font-size: 16px;
  font-weight: 700;
`;

export const Input = styled.input`
  width: 100%;
  height: 46px;
  padding: 0 16px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.16);
  color: #ffffff;
  font-size: 14px;
  outline: none;

  &::placeholder {
    color: rgba(255, 255, 255, 0.46);
  }
`;

export const AttachmentInput = styled(Input)`
  max-width: 450px;
`;

export const ErrorText = styled.p`
  margin: 18px 0 0;
  color: #ff9d9d;
  font-size: 14px;
  font-weight: 600;
`;

export const TextArea = styled.textarea`
  width: 100%;
  min-height: 288px;
  padding: 16px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.16);
  color: #ffffff;
  font-size: 14px;
  line-height: 1.5;
  resize: vertical;
  outline: none;

  &::placeholder {
    color: rgba(255, 255, 255, 0.46);
  }
`;

export const CategoryRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

export const CategoryButton = styled.button<{ $active: boolean }>`
  min-width: 76px;
  height: 32px;
  padding: 0 12px;
  border: 1px solid
    ${({ $active }) =>
      $active ? "rgba(255, 255, 255, 0.82)" : "rgba(255, 255, 255, 0.24)"};
  border-radius: 4px;
  background: ${({ $active }) =>
    $active ? "rgba(255, 255, 255, 0.92)" : "rgba(43, 43, 43, 0.28)"};
  color: ${({ $active }) => ($active ? "#2f3138" : "#ffffff")};
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const AttachmentRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const AttachmentList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const AttachmentButton = styled.button`
  width: 44px;
  height: 44px;
  flex-shrink: 0;
  border: 1px solid rgba(255, 255, 255, 0.42);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.12);
  color: #ffffff;
  font-size: 18px;
  cursor: pointer;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const AttachmentRemoveButton = styled(AttachmentButton)`
  background: rgba(255, 255, 255, 0.08);
`;

export const AttachmentPickerButton = styled(AttachmentButton)``;

export const FileInput = styled.input`
  display: none;
`;

export const Divider = styled.div`
  height: 1px;
  margin: 32px 0 20px;
  background: rgba(255, 255, 255, 0.44);
`;

export const ActionRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 132px;

  @media (max-width: 640px) {
    gap: 20px;
    justify-content: space-between;
  }
`;

export const SubmitButton = styled.button`
  min-width: 248px;
  height: 40px;
  padding: 0 20px;
  border: 1px solid rgba(255, 255, 255, 0.82);
  border-radius: 4px;
  background: rgba(39, 39, 39, 0.34);
  color: #ffffff;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

export const CancelButton = styled.button`
  min-width: 98px;
  height: 40px;
  padding: 0 14px;
  border: 1px solid rgba(255, 255, 255, 0.34);
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.12);
  color: #ffffff;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 400;
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

  @media (max-width: 768px) {
    min-height: auto;
    padding: 34px 24px 24px;
  }
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

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
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

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;
