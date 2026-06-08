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