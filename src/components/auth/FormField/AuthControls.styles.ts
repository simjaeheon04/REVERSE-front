import styled from "styled-components";

export const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const Input = styled.input`
  width: 100%;
  height: 36px;
  padding: 0 14px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.28);
  background: rgba(255, 255, 255, 0.88);
  color: #222222;
  font-size: 12px;
  outline: none;

  &::placeholder {
    color: rgba(52, 56, 68, 0.28);
  }

  &:focus {
    border-color: rgba(214, 217, 255, 0.92);
  }
`;

export const Select = styled.select`
  width: 100%;
  height: 44px;
  padding: 0 14px;
  border-radius: 10px;
  border: 1px solid rgba(237, 241, 255, 0.34);
  background: rgba(255, 255, 255, 0.04);
  color: #ffffff;
  font-size: 12px;
  outline: none;

  option {
    color: #111111;
  }

  &:focus {
    border-color: rgba(184, 156, 255, 0.92);
  }
`;

export const PrimaryButton = styled.button`
  width: 100%;
  height: 36px;
  margin-top: 34px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 700;
  color: #ffffff;
  background: #bac2ea;
  box-shadow: inset 0 2px 4px rgba(255, 255, 255, 0.22);

  &:hover {
    filter: brightness(1.02);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

export const GhostButton = styled.button`
  height: 44px;
  padding: 0 16px;
  border-radius: 10px;
  border: 1px solid rgba(237, 241, 255, 0.34);
  background: rgba(255, 255, 255, 0.3);
  color: #ffffff;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    background: rgba(255, 255, 255, 0.12);
  }
`;

export const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 124px;
  gap: 12px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const EmailRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 24px 1fr 104px;
  gap: 12px;
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const At = styled.span`
  text-align: center;
  color: #ffffff;
  font-size: 18px;
  font-weight: 700;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const TextButton = styled.button`
  border: none;
  background: none;
  padding: 0 0 0 6px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 500;
  color: #ffffff;
`;
