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

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: grid;
  place-items: center;
  padding: 24px;
  background: rgba(17, 20, 28, 0.52);
`;

export const ModalCard = styled.div`
  width: min(100%, 360px);
  padding: 30px 28px 26px;
  border-radius: 14px;
  background: #ffffff;
  color: #222631;
  text-align: center;
  box-shadow: 0 22px 46px rgba(0, 0, 0, 0.28);
`;

export const ModalTitle = styled.h2`
  margin: 0;
  color: #252936;
  font-size: 20px;
  font-weight: 800;
  line-height: 1.35;
`;

export const ModalText = styled.p`
  margin: 12px 0 24px;
  color: rgba(37, 41, 54, 0.68);
  font-size: 14px;
  font-weight: 600;
  line-height: 1.5;
`;

export const ModalConfirmButton = styled.button`
  width: 100%;
  height: 42px;
  border: none;
  border-radius: 10px;
  background: #bac2ea;
  color: #ffffff;
  font-size: 15px;
  font-weight: 800;
  cursor: pointer;

  &:hover {
    background: #aeb8dc;
  }
`;
