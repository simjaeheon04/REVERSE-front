import styled from "styled-components";

export const Page = styled.main`
  min-height: calc(100vh - 70px);
  padding: 60px 20px 74px;
  background:
    radial-gradient(circle at 50% 24%, rgba(255, 255, 255, 0.04), transparent 32%),
    linear-gradient(180deg, #252933 0%, #20242d 100%);
  color: #ffffff;
`;

export const Inner = styled.div`
  width: min(100%, 790px);
  margin: 0 auto;
`;

export const Header = styled.header`
  text-align: center;
`;

export const Title = styled.h1`
  margin: 0;
  color: #ffffff;
  font-size: 40px;
  font-weight: 800;
  line-height: 1;
`;

export const Rule = styled.div`
  width: min(100%, 600px);
  height: 1px;
  margin: 38px auto 38px;
  background: rgba(255, 255, 255, 0.84);
`;

export const Panel = styled.section`
  padding: 12px;
  border: 1px solid rgba(255, 255, 255, 0.58);
  background: rgba(144, 141, 158, 0.7);
`;

export const PanelInner = styled.div`
  padding: 44px 38px 38px;
  border: 1px solid rgba(255, 255, 255, 0.44);
`;

export const SectionTitle = styled.h2`
  display: flex;
  align-items: center;
  gap: 16px;
  margin: 0 0 16px;
  color: #ffffff;
  font-size: 22px;
  font-weight: 900;
`;

export const VoteIcon = styled.span`
  position: relative;
  width: 22px;
  height: 17px;
  border: 3px solid #ffffff;
  border-radius: 5px;
  box-sizing: border-box;

  &::before {
    content: "";
    position: absolute;
    left: 4px;
    right: 4px;
    top: -8px;
    height: 9px;
    border: 3px solid #ffffff;
    border-bottom: none;
    border-radius: 5px 5px 0 0;
    box-sizing: border-box;
  }
`;

export const TitleUnderline = styled.div`
  height: 3px;
  margin-bottom: 24px;
  background: rgba(255, 255, 255, 0.72);
`;

export const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-bottom: 22px;
`;

export const TitleInput = styled.input`
  width: 100%;
  height: 58px;
  padding: 0 24px;
  border: 1px solid rgba(255, 255, 255, 0.62);
  border-radius: 6px;
  outline: none;
  background: rgba(255, 255, 255, 0.12);
  color: #ffffff;
  font-size: 15px;
  font-weight: 700;
  box-sizing: border-box;

  &::placeholder {
    color: rgba(255, 255, 255, 0.62);
  }
`;

export const ContentInput = styled.textarea`
  width: 100%;
  min-height: 100px;
  padding: 18px 24px;
  border: 1px solid rgba(255, 255, 255, 0.62);
  border-radius: 6px;
  outline: none;
  resize: vertical;
  background: rgba(255, 255, 255, 0.12);
  color: #ffffff;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.5;
  box-sizing: border-box;

  &::placeholder {
    color: rgba(255, 255, 255, 0.62);
  }
`;

export const OptionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const OptionRow = styled.div`
  height: 62px;
  display: grid;
  grid-template-columns: minmax(0, 1fr) 44px;
  border: 1px solid rgba(255, 255, 255, 0.62);
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.12);
  overflow: hidden;
`;

export const OptionInput = styled.input`
  width: 100%;
  min-width: 0;
  padding: 0 24px;
  border: none;
  outline: none;
  background: transparent;
  color: #ffffff;
  font-size: 14px;
  font-weight: 600;

  &::placeholder {
    color: rgba(255, 255, 255, 0.62);
  }
`;

export const RemoveButton = styled.button`
  border: none;
  background: transparent;
  color: #ffffff;
  font-size: 18px;
  cursor: pointer;

  &:disabled {
    opacity: 0.32;
    cursor: not-allowed;
  }
`;

export const AddButton = styled.button`
  width: 100%;
  height: 62px;
  border: 1px solid rgba(255, 255, 255, 0.62);
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.2);
  color: #ffffff;
  font-size: 14px;
  font-weight: 800;
  cursor: pointer;
`;

export const CheckGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 24px;
`;

export const CheckLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  color: #ffffff;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;

  input {
    accent-color: #6d5f82;
  }
`;

export const RoleGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
  margin-top: 6px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

export const SelectLabel = styled.label`
  display: grid;
  gap: 8px;
  color: #ffffff;
  font-size: 13px;
  font-weight: 800;
`;

export const RoleSelect = styled.select`
  width: 100%;
  height: 42px;
  padding: 0 14px;
  border: 1px solid rgba(255, 255, 255, 0.48);
  border-radius: 6px;
  outline: none;
  background: rgba(255, 255, 255, 0.82);
  color: #252832;
  font-size: 13px;
  font-weight: 800;

  &:disabled {
    opacity: 0.48;
    cursor: not-allowed;
  }
`;

export const DatePanel = styled.section`
  position: relative;
  margin-top: 26px;
  min-height: 130px;
  padding: 28px 38px;
  border: 1px solid rgba(255, 255, 255, 0.42);
  background: rgba(144, 141, 158, 0.46);
  box-sizing: border-box;
`;

export const DateLabel = styled.p`
  margin: 0 0 18px;
  color: rgba(255, 255, 255, 0.88);
  font-size: 14px;
  font-weight: 700;
`;

export const DateTrigger = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  border: none;
  background: transparent;
  color: #ffffff;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
`;

export const DateControls = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;
  flex-wrap: wrap;
`;

export const TimeInput = styled.input`
  height: 36px;
  padding: 0 12px;
  border: none;
  border-radius: 8px;
  outline: none;
  background: rgba(255, 255, 255, 0.82);
  color: #252832;
  font-size: 14px;
  font-weight: 700;
`;

export const ClockIcon = styled.span`
  width: 14px;
  height: 14px;
  border: 2px solid #ffffff;
  border-radius: 50%;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    left: 5px;
    top: 3px;
    width: 2px;
    height: 5px;
    background: #ffffff;
  }

  &::after {
    content: "";
    position: absolute;
    left: 5px;
    top: 7px;
    width: 5px;
    height: 2px;
    background: #ffffff;
  }
`;

export const CalendarPopup = styled.div`
  position: absolute;
  left: 38px;
  top: 82px;
  z-index: 20;
  width: 312px;
  padding: 18px 26px 24px;
  border-radius: 14px;
  background: #c8c8cb;
  color: #252832;
  box-shadow: 0 18px 34px rgba(0, 0, 0, 0.24);
  box-sizing: border-box;
`;

export const CalendarToolbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 18px;
`;

export const CalendarNavButton = styled.button`
  width: 28px;
  height: 28px;
  border: none;
  background: transparent;
  color: #252832;
  font-size: 24px;
  line-height: 1;
  cursor: pointer;
`;

export const CalendarSelect = styled.select`
  height: 30px;
  min-width: 78px;
  border: none;
  border-radius: 8px;
  background: #f1f1f4;
  color: #252832;
  font-size: 14px;
  padding: 0 10px;
  outline: none;
`;

export const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  row-gap: 12px;
  text-align: center;
`;

export const CalendarWeekday = styled.div`
  color: #8a8a92;
  font-size: 12px;
  font-weight: 700;
`;

export const CalendarDay = styled.button<{ $selected?: boolean; $muted?: boolean }>`
  width: 30px;
  height: 30px;
  justify-self: center;
  border: none;
  border-radius: 50%;
  background: ${({ $selected }) => ($selected ? "#80758e" : "transparent")};
  color: ${({ $selected, $muted }) =>
    $selected ? "#ffffff" : $muted ? "rgba(37, 40, 50, 0.18)" : "#252832"};
  font-size: 16px;
  cursor: pointer;

  &:disabled {
    color: rgba(37, 40, 50, 0.16);
    cursor: not-allowed;
  }
`;

export const CalendarUnsetButton = styled.button`
  width: 100%;
  height: 36px;
  margin-top: 22px;
  border: none;
  border-radius: 10px;
  background: #eeeeef;
  color: #565963;
  font-size: 13px;
  cursor: pointer;
`;

export const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 14px;
  margin-top: 38px;
`;

export const ActionButton = styled.button`
  width: 124px;
  height: 28px;
  border: 1px solid rgba(255, 255, 255, 0.72);
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.04);
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;

  &:disabled {
    opacity: 0.48;
    cursor: not-allowed;
  }
`;
