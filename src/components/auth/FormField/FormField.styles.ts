import styled from "styled-components";

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  & + & {
    margin-top: 20px;
  }
`;

export const Label = styled.label`
  font-size: 20px;
  font-weight: 700;
  line-height: 1.2;
  color: #ffffff;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;
