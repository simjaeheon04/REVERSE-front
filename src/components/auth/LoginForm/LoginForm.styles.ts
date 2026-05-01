import styled from "styled-components";

export const BottomText = styled.div`
  margin-top: 42px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
  font-size: 12px;
  color: #2f3342;
  text-align: center;
`;

export const ErrorText = styled.p`
  margin-top: 12px;
  color: #8b1020;
  font-size: 12px;
  font-weight: 600;
  line-height: 1.4;
  text-align: center;
`;

export const SignUpButton = styled.button`
  border: none;
  background: none;
  padding: 0 0 0 6px;
  cursor: pointer;
  font-size: 11px;
  font-weight: 400;
  color: #ffffff;
`;

export const UtilityRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 24px;
  margin-top: 34px;
`;

export const UtilityButton = styled.button`
  padding: 0 0 2px;
  border: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.4);
  background: none;
  color: rgba(255, 255, 255, 0.7);
  font-size: 10px;
  font-weight: 400;
  line-height: 1.2;
  cursor: pointer;
`;
