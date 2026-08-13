import styled from "styled-components";

export const Page = styled.main`
  min-height: calc(100vh - 70px);
  padding: 58px 24px 78px;
  background:
    radial-gradient(circle at 48% 18%, rgba(255, 255, 255, 0.05), transparent 32%),
    linear-gradient(180deg, #262a33 0%, #20242c 100%);
  color: #ffffff;
`;

export const Inner = styled.div`
  width: min(100%, 920px);
  margin: 0 auto;
`;

export const Hero = styled.header`
  text-align: center;
`;

export const Title = styled.h1`
  margin: 0;
  color: #d9d8e7;
  font-size: clamp(48px, 7vw, 74px);
  font-weight: 900;
  line-height: 0.95;
  letter-spacing: 0.04em;
`;

export const SectionTitle = styled.h2`
  position: relative;
  width: fit-content;
  margin: 46px 0 12px;
  color: #ffffff;
  font-size: 30px;
  font-weight: 900;
  line-height: 1;

  &::after {
    content: "";
    position: absolute;
    left: 0;
    right: -48px;
    bottom: -10px;
    height: 5px;
    background: rgba(255, 255, 255, 0.82);
  }
`;

export const Form = styled.form`
  padding: 42px 34px 48px;
  border: 2px solid rgba(255, 255, 255, 0.74);
  border-radius: 6px;
  background: rgba(111, 116, 128, 0.48);
  box-sizing: border-box;
`;

export const Row = styled.div`
  display: grid;
  grid-template-columns: 132px minmax(0, 1fr);
  gap: 28px;
  align-items: start;
  margin-bottom: 28px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 10px;
  }
`;

export const Label = styled.label`
  color: #ffffff;
  font-size: 15px;
  font-weight: 900;
  line-height: 1.4;
`;

export const Input = styled.input`
  width: min(100%, 520px);
  height: 38px;
  padding: 0 14px;
  border: 1px solid transparent;
  border-radius: 4px;
  outline: none;
  background: rgba(43, 48, 61, 0.5);
  color: #ffffff;
  font-size: 14px;
  font-weight: 600;
  box-sizing: border-box;

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }

  &:focus {
    border-color: rgba(255, 255, 255, 0.88);
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.11);
  }
`;

export const Textarea = styled.textarea`
  width: min(100%, 520px);
  min-height: 92px;
  padding: 12px 14px;
  border: 1px solid transparent;
  border-radius: 4px;
  outline: none;
  resize: vertical;
  background: rgba(43, 48, 61, 0.5);
  color: #ffffff;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.5;
  box-sizing: border-box;

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }

  &:focus {
    border-color: rgba(255, 255, 255, 0.88);
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.11);
  }
`;

export const FileControl = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  min-height: 38px;
`;

export const FileButton = styled.label`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 132px;
  height: 34px;
  padding: 0 14px;
  border: 1px solid rgba(255, 255, 255, 0.72);
  border-radius: 4px;
  color: #ffffff;
  font-size: 13px;
  font-weight: 800;
  cursor: pointer;

  input {
    display: none;
  }
`;

export const FileName = styled.span`
  min-width: 0;
  color: rgba(255, 255, 255, 0.72);
  font-size: 13px;
  font-weight: 600;
`;

export const SelectRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
`;

export const Select = styled.select`
  width: 124px;
  height: 38px;
  padding: 0 12px;
  border: 1px solid rgba(255, 255, 255, 0.58);
  border-radius: 4px;
  outline: none;
  background: rgba(43, 48, 61, 0.82);
  color: #ffffff;
  font-size: 13px;
  font-weight: 700;

  option {
    color: #20242c;
  }
`;

export const Message = styled.p<{ $type: "error" | "success" }>`
  margin: 10px 0 0 160px;
  color: ${({ $type }) => ($type === "success" ? "#c8f7d4" : "#ffb5b5")};
  font-size: 13px;
  font-weight: 800;
  line-height: 1.5;

  @media (max-width: 640px) {
    margin-left: 0;
  }
`;

export const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 28px;
  margin-top: 46px;

  @media (max-width: 640px) {
    flex-direction: column;
    gap: 12px;
  }
`;

export const PrimaryButton = styled.button`
  width: 280px;
  height: 42px;
  border: 1px solid rgba(255, 255, 255, 0.82);
  border-radius: 6px;
  background: rgba(54, 57, 62, 0.72);
  color: #ffffff;
  font-size: 14px;
  font-weight: 800;
  cursor: pointer;

  &:disabled {
    cursor: default;
    opacity: 0.56;
  }

  @media (max-width: 640px) {
    width: 100%;
  }
`;

export const SecondaryButton = styled.button`
  width: 124px;
  height: 42px;
  border: 1px solid rgba(255, 255, 255, 0.72);
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.08);
  color: #ffffff;
  font-size: 14px;
  font-weight: 800;
  cursor: pointer;

  @media (max-width: 640px) {
    width: 100%;
  }
`;
