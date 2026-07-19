import styled from "styled-components";

export const Page = styled.main`
  min-height: calc(100vh - 70px);
  padding: 42px 24px 72px;
  background: linear-gradient(180deg, #272b34 0%, #1f242d 68%, #111722 100%);
  color: #ffffff;
`;

export const Inner = styled.div`
  width: min(760px, 100%);
  margin: 0 auto;
`;

export const Hero = styled.section`
  display: grid;
  justify-items: center;
  gap: 8px;
  padding: 20px 0 32px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.56);
  text-align: center;
`;

export const Eyebrow = styled.p`
  margin: 0;
  font-family: "Jersey 25", "Pretendard", sans-serif;
  font-size: 26px;
  font-weight: 700;
`;

export const Title = styled.h1`
  margin: 0;
  color: #d7d9f7;
  font-family: "Jersey 25", "Pretendard", sans-serif;
  font-size: clamp(52px, 9vw, 76px);
  font-weight: 800;
  line-height: 0.95;
`;

export const Description = styled.p`
  margin: 10px 0 0;
  color: rgba(255, 255, 255, 0.68);
  font-size: 14px;
  line-height: 1.6;
`;

export const Card = styled.section`
  margin-top: 42px;
  padding: 38px 42px 42px;
  border: 1px solid rgba(255, 255, 255, 0.74);
  border-radius: 8px;
  background: linear-gradient(135deg, rgba(123, 121, 139, 0.78), rgba(76, 78, 91, 0.82));

  @media (max-width: 600px) {
    padding: 30px 22px 32px;
  }
`;

export const CardHeader = styled.header`
  padding-bottom: 22px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.32);
`;

export const CardTitle = styled.h2`
  margin: 0;
  font-size: 22px;
  font-weight: 800;
`;

export const Guide = styled.p`
  margin: 8px 0 0;
  color: rgba(255, 255, 255, 0.68);
  font-size: 13px;
`;

export const Form = styled.form`
  display: grid;
  gap: 22px;
  padding-top: 28px;
`;

export const Field = styled.div`
  display: grid;
  gap: 9px;
`;

export const Label = styled.label`
  font-size: 14px;
  font-weight: 700;
`;

export const InputWrap = styled.div`
  position: relative;
`;

export const Input = styled.input`
  width: 100%;
  height: 48px;
  padding: 0 76px 0 15px;
  border: 1px solid rgba(255, 255, 255, 0.32);
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.92);
  color: #252832;
  font-size: 14px;
  outline: none;

  &::placeholder {
    color: #9296a1;
  }

  &:focus {
    border-color: #d8d2ff;
    box-shadow: 0 0 0 3px rgba(216, 210, 255, 0.2);
  }
`;

export const VisibilityButton = styled.button`
  position: absolute;
  top: 50%;
  right: 12px;
  transform: translateY(-50%);
  min-width: 46px;
  height: 28px;
  border: none;
  border-radius: 4px;
  background: #d8d2ff;
  color: #5f5872;
  font-size: 11px;
  font-weight: 800;
  cursor: pointer;
`;

export const Message = styled.p<{ $error: boolean }>`
  margin: 0;
  padding: 12px 14px;
  border: 1px solid ${({ $error }) => ($error ? "rgba(255, 144, 144, 0.46)" : "rgba(159, 255, 201, 0.42)")};
  border-radius: 5px;
  background: ${({ $error }) => ($error ? "rgba(115, 41, 50, 0.24)" : "rgba(34, 103, 68, 0.22)")};
  color: ${({ $error }) => ($error ? "#ffc0c0" : "#b9ffd8")};
  font-size: 13px;
  line-height: 1.5;
`;

export const Actions = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 12px;
  margin-top: 6px;
`;

const ActionButton = styled.button`
  height: 44px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 800;
  cursor: pointer;

  &:disabled {
    opacity: 0.58;
    cursor: not-allowed;
  }
`;

export const SecondaryButton = styled(ActionButton)`
  border: 1px solid rgba(255, 255, 255, 0.46);
  background: transparent;
  color: #ffffff;
`;

export const PrimaryButton = styled(ActionButton)`
  border: none;
  background: #d8d2ff;
  color: #5f5872;

  &:hover:not(:disabled) {
    background: #e4e0ff;
  }
`;
