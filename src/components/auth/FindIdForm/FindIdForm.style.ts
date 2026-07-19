import styled from "styled-components";

export const Message = styled.p<{ $type?: "error" | "success" }>`
  margin: 14px 0 0;
  font-size: 13px;
  line-height: 1.4;
  text-align: center;

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
  margin: 14px 0 10px;
  color: rgba(37, 41, 54, 0.68);
  font-size: 14px;
  font-weight: 600;
  line-height: 1.5;
`;

export const FoundUserId = styled.p`
  margin: 0 0 24px;
  padding: 12px 14px;
  border-radius: 10px;
  background: #f2f4fb;
  color: #20242d;
  font-size: 18px;
  font-weight: 800;
  line-height: 1.4;
  word-break: break-all;
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
