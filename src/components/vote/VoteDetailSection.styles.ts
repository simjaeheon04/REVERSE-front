import styled from "styled-components";

export const Page = styled.main`
  min-height: calc(100vh - 70px);
  padding: 62px 20px 108px;
  background:
    radial-gradient(circle at 50% 24%, rgba(255, 255, 255, 0.04), transparent 32%),
    linear-gradient(180deg, #252933 0%, #20242d 100%);
  color: #ffffff;
`;

export const Inner = styled.div`
  width: min(100%, 930px);
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
  width: min(100%, 612px);
  height: 1px;
  margin: 38px auto 42px;
  background: rgba(255, 255, 255, 0.86);
`;

export const Panel = styled.section`
  padding: 12px;
  border: 1px solid rgba(255, 255, 255, 0.58);
  background: rgba(144, 141, 158, 0.7);
`;

export const PanelInner = styled.div`
  position: relative;
  min-height: 540px;
  padding: 24px 38px 44px;
  border: 1px solid rgba(255, 255, 255, 0.46);
  box-sizing: border-box;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 2px;
  right: 8px;
  border: none;
  background: transparent;
  color: #ffffff;
  font-size: 17px;
  line-height: 1;
  cursor: pointer;
`;

export const AlertBar = styled.div`
  height: 48px;
  display: flex;
  align-items: center;
  gap: 18px;
  padding: 0 26px;
  border: 1px solid rgba(255, 255, 255, 0.82);
  border-radius: 22px;
  background: rgba(236, 236, 241, 0.76);
  color: rgba(84, 87, 98, 0.78);
  font-size: 14px;
  font-weight: 700;
  box-sizing: border-box;
`;

export const BellIcon = styled.span`
  width: 16px;
  height: 16px;
  position: relative;
  flex: 0 0 auto;
  border: 2px solid #ffffff;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  border-bottom: none;
  box-sizing: border-box;

  &::before {
    content: "";
    position: absolute;
    left: 5px;
    bottom: -5px;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: #ffffff;
  }

  &::after {
    content: "";
    position: absolute;
    left: -3px;
    right: -3px;
    bottom: -2px;
    height: 2px;
    background: #ffffff;
    border-radius: 999px;
  }
`;

export const MetaRow = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 18px;
  margin: 30px 8px 10px;
`;

export const VoteTitle = styled.h2`
  margin: 0;
  color: #ffffff;
  font-size: 22px;
  font-weight: 900;
`;

export const Author = styled.span`
  color: rgba(255, 255, 255, 0.62);
  font-size: 13px;
  font-weight: 700;
`;

export const Underline = styled.div`
  height: 3px;
  margin: 0 0 20px;
  background: rgba(255, 255, 255, 0.72);
`;

export const OptionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

export const OptionButton = styled.button<{ $selected: boolean }>`
  width: 100%;
  height: 72px;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 16px;
  border: 1px solid rgba(255, 255, 255, 0.78);
  border-radius: 6px;
  background: ${({ $selected }) =>
    $selected ? "rgba(255, 255, 255, 0.2)" : "rgba(255, 255, 255, 0.1)"};
  color: rgba(255, 255, 255, 0.92);
  font-size: 15px;
  font-weight: 700;
  text-align: left;
  cursor: pointer;
`;

export const CheckCircle = styled.span<{ $selected: boolean }>`
  width: 16px;
  height: 16px;
  position: relative;
  flex: 0 0 auto;
  border: 1px solid #ffffff;
  border-radius: 50%;
  background: ${({ $selected }) => ($selected ? "#ffffff" : "transparent")};
  box-sizing: border-box;

  &::after {
    content: "";
    position: absolute;
    left: 4px;
    top: 3px;
    width: 6px;
    height: 4px;
    border-left: 2px solid ${({ $selected }) => ($selected ? "#7f778c" : "#ffffff")};
    border-bottom: 2px solid ${({ $selected }) => ($selected ? "#7f778c" : "#ffffff")};
    transform: rotate(-45deg);
  }
`;

export const SubmitButton = styled.button`
  width: min(100%, 330px);
  height: 36px;
  border: 1px solid rgba(255, 255, 255, 0.24);
  border-radius: 18px;
  background: linear-gradient(180deg, rgba(120, 111, 139, 0.96), rgba(105, 96, 125, 0.92));
  color: #ffffff;
  font-size: 13px;
  font-weight: 800;
  cursor: pointer;
`;

export const FooterActions = styled.div`
  position: relative;
  min-height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 56px;
`;

export const AuthorActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 18px;

  @media (max-width: 640px) {
    justify-content: center;
  }
`;

export const ActionButton = styled.button`
  width: 146px;
  height: 36px;
  border: 1px solid rgba(255, 255, 255, 0.24);
  border-radius: 18px;
  background: linear-gradient(180deg, rgba(120, 111, 139, 0.96), rgba(105, 96, 125, 0.92));
  color: #ffffff;
  font-size: 13px;
  font-weight: 800;
  cursor: pointer;
`;

export const CompletedMessage = styled.div`
  width: min(100%, 410px);
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(255, 255, 255, 0.64);
  background: rgba(255, 255, 255, 0.06);
  color: #ffffff;
  font-size: 13px;
  font-weight: 800;
`;

export const ParticipantButton = styled.button`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  display: inline-flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
  min-width: 92px;
  border: none;
  background: transparent;
  color: #ffffff;
  font-size: 14px;
  font-weight: 900;
  cursor: pointer;

  @media (max-width: 720px) {
    position: static;
    transform: none;
    margin-left: auto;
  }
`;

export const ParticipantArrow = styled.span`
  width: 9px;
  height: 9px;
  border-top: 2px solid #ffffff;
  border-right: 2px solid #ffffff;
  transform: rotate(45deg);
`;
