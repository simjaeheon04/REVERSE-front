import styled from "styled-components";

export const Page = styled.main`
  min-height: calc(100vh - 70px);
  padding: 54px 24px 72px;
  background:
    radial-gradient(circle at 50% 24%, rgba(255, 255, 255, 0.045), transparent 34%),
    linear-gradient(180deg, #2a2e38 0%, #20242d 100%);
  color: #ffffff;
`;

export const Inner = styled.div`
  width: min(100%, 760px);
  margin: 0 auto;
`;

export const Title = styled.h1`
  margin: 0 0 34px;
  color: #d7d8ef;
  font-family: "Jersey 25", "Noto Sans KR", sans-serif;
  font-size: clamp(54px, 7vw, 78px);
  font-weight: 400;
  line-height: 1;
  text-align: center;
  letter-spacing: 0;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 34px;
`;

export const Section = styled.section``;

export const SectionTitle = styled.h2`
  position: relative;
  z-index: 1;
  width: fit-content;
  margin: 0 0 -2px;
  color: #ffffff;
  font-family: "Jersey 25", "Noto Sans KR", sans-serif;
  font-size: 32px;
  font-weight: 400;
  line-height: 1;
  letter-spacing: 0;

  &::after {
    content: "";
    position: absolute;
    left: 0;
    right: -26px;
    bottom: -4px;
    height: 5px;
    background: rgba(255, 255, 255, 0.8);
  }
`;

export const Box = styled.div`
  min-height: 520px;
  padding: 44px 36px 38px;
  border: 2px solid rgba(255, 255, 255, 0.68);
  border-radius: 4px;
  background: rgba(130, 135, 146, 0.42);
`;

export const CurriculumBox = styled(Box)`
  min-height: 260px;
`;

export const FieldRow = styled.div`
  display: grid;
  grid-template-columns: 120px minmax(0, 1fr);
  gap: 22px;
  align-items: start;

  & + & {
    margin-top: 22px;
  }

  @media (max-width: 620px) {
    grid-template-columns: 1fr;
    gap: 8px;
  }
`;

export const Label = styled.label`
  color: #ffffff;
  font-size: 14px;
  font-weight: 900;
  line-height: 1.35;
`;

export const Input = styled.input`
  width: 100%;
  height: 34px;
  padding: 0 10px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 2px;
  background: rgba(255, 255, 255, 0.06);
  color: #ffffff;
  font-size: 13px;
  outline: none;

  &::placeholder {
    color: rgba(255, 255, 255, 0.58);
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  min-height: 66px;
  padding: 9px 10px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 2px;
  background: rgba(255, 255, 255, 0.06);
  color: #ffffff;
  font-size: 13px;
  line-height: 1.45;
  resize: vertical;
  outline: none;

  &::placeholder {
    color: rgba(255, 255, 255, 0.58);
  }
`;

export const InlineGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;

  @media (max-width: 620px) {
    grid-template-columns: 1fr;
  }
`;

export const Select = styled.select`
  width: 100%;
  height: 34px;
  padding: 0 10px;
  border: 1px solid rgba(255, 255, 255, 0.34);
  border-radius: 2px;
  background: rgba(72, 77, 88, 0.72);
  color: #ffffff;
  font-size: 12px;
  outline: none;

  option {
    color: #20242d;
  }
`;

export const CurriculumList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

export const CurriculumRow = styled.div`
  display: grid;
  grid-template-columns: 70px minmax(0, 1fr);
  gap: 18px;
  align-items: center;
`;

export const WeekLabel = styled.span`
  color: #ffffff;
  font-size: 14px;
  font-weight: 900;
`;

export const AddButton = styled.button`
  width: 46px;
  height: 24px;
  margin-top: 12px;
  border: 1px solid rgba(255, 255, 255, 0.38);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.1);
  color: #ffffff;
  font-size: 12px;
  cursor: pointer;
`;

export const ErrorText = styled.p`
  margin: 0;
  color: #ffb0b0;
  font-size: 13px;
  font-weight: 700;
  text-align: center;
`;

export const ActionRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 84px;
  margin-top: -10px;
`;

export const SubmitButton = styled.button`
  width: 210px;
  height: 34px;
  border: 1px solid rgba(255, 255, 255, 0.56);
  border-radius: 3px;
  background: rgba(48, 48, 48, 0.72);
  color: #ffffff;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
`;

export const CancelButton = styled.button`
  width: 86px;
  height: 34px;
  border: none;
  border-radius: 3px;
  background: rgba(255, 255, 255, 0.72);
  color: #30343c;
  font-size: 12px;
  font-weight: 800;
  cursor: pointer;
`;
