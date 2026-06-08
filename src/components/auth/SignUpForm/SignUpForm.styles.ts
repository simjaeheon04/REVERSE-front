import styled from "styled-components";

export const TermsSection = styled.section`
  margin-top: 50px;
`;

export const TermsTitle = styled.h2`
  margin: 0 0 14px;
  color: #ffffff;
  font-size: 15px;
  font-weight: 500;
`;

export const TermsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const TermsGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-left: 28px;
`;

export const CheckItem = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  color: #ffffff;
  font-size: 10px;
  font-weight: 300;
  cursor: pointer;

  input {
    width: 13px;
    height: 13px;
    appearance: none;
    border: 1px solid #ffffffa2;
    border-radius: 2px;
    background: transparent;
    cursor: pointer;
    display: inline-block;
  }

  input:checked {
    background-color: #7a7a7a;
    border-color: #7a7a7a;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='8' viewBox='0 0 10 8' fill='none'%3E%3Cpath d='M1 4L3.5 6.5L9 1' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: center;
    background-size: 10px 8px;
  }

  span {
    line-height: 1.4;
  }

  @media (max-width: 768px) {
    align-items: flex-start;
    font-size: 13px;
  }
`;

export const Message = styled.p<{ $type?: "error" | "success" }>`
  margin: 8px 0 0;
  font-size: 12px;
  line-height: 1.4;
  color: ${({ $type }) =>
    $type === "error"
      ? "#ff7b7b"
      : $type === "success"
      ? "#7ea6ff"
      : "rgba(255,255,255,0.7)"};
`;
