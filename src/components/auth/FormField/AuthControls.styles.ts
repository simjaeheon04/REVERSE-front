import styled from "styled-components";

export const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const Input = styled.input`
  width: 100%;
  height: 32px;
  padding: 0 14px;
  border-radius: 10px;
  border: 1px solid rgba(237, 241, 255, 0.34);
  background: #ffffff;
  color: #000000;
  font-size: 12px;
  outline: none;
  margin-top: 10px;
  margin-bottom : 10px;

  &::placeholder {
    font-size: 10px;
    color: rgba(114, 123, 135, 0.6);
  }
`;

export const Select = styled.select`
  width: 100%;
  min-width: 0;
  height: 32px;
  padding: 0 10px;
  border-radius: 10px;
  border: 1px solid rgba(237, 241, 255, 0.34);
  background: #ffffff;
    color: rgba(114, 123, 135, 0.6);
  font-size: 10px;
  outline: none;
  margin-top: 10px;
  margin-bottom : 10px;

  option {
    color: #111111;
  }

  &:focus {
    border-color: rgba(184, 156, 255, 0.92);
  }
`;

export const PrimaryButton = styled.button`
  width: 100%;
  height: 34px;
  margin-top: 30px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 700;
  color: #ffffff;
  background: #bbc4e5;

  &:hover {
    opacity: 0.96;
  }
`;

export const GhostButton = styled.button`
  width: 100%;
  height: 32px;
  padding: 0 12px;
  border-radius: 10px;
  border: 1px solid rgba(237, 241, 255, 0.34);
  background: #bbc4e5;
  color: #ffffff;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
  margin-top: 10px;
  margin-bottom : 10px;

  &:hover {
    background: #aeb8dc;
  }
`;

export const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 140px;
  gap: 12px;
  align-items: center;
`;

export const EmailRow = styled.div`
  display: grid;
  grid-template-columns: 140px 20px minmax(0, 1fr) 140px;
  gap: 12px;
  align-items: center;
`;

export const At = styled.span`
  text-align: center;
  color: #ffffff;
  font-size: 10px;
  font-weight: 300;
`;

export const TextButton = styled.button`
  border: none;
  background: none;
  padding-left: 6px;
  cursor: pointer;
  font-size: 11px;
  color: #ffffff;
`;

export const Message = styled.p<{ $type?: "error" | "success" }>`
  margin: 12px 0 0;
  color: ${({ $type }) =>
    $type === "error"
      ? "#ff7b7b"
      : $type === "success"
        ? "#7ea6ff"
        : "rgba(255, 255, 255, 0.74)"};
  font-size: 13px;
  line-height: 1.4;
  text-align: center;
`;
