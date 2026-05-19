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
  width: min(100%, 1128px);
  margin: 0 auto;
`;

export const Title = styled.h1`
  margin: 0 0 28px;
  color: #cfd4f4;
  font-family: "Jersey 25", "Noto Sans KR", sans-serif;
  font-size: clamp(48px, 7vw, 78px);
  font-weight: 400;
  line-height: 1;
  letter-spacing: 0;
`;

export const Divider = styled.div`
  height: 1px;
  margin-bottom: 28px;
  background: rgba(255, 255, 255, 0.54);
`;

export const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) 240px;
  gap: 36px;
  align-items: start;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

export const MainColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 42px;
`;

export const SideColumn = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

export const SectionTitle = styled.h2`
  position: relative;
  width: fit-content;
  margin: 0 0 12px;
  color: #ffffff;
  font-family: "Jersey 25", "Noto Sans KR", sans-serif;
  font-size: 34px;
  font-weight: 400;
  line-height: 1;
  letter-spacing: 0;

  &::after {
    content: "";
    position: absolute;
    left: 0;
    right: -24px;
    bottom: -8px;
    height: 5px;
    background: rgba(255, 255, 255, 0.8);
  }
`;

export const InfoBox = styled.div`
  min-height: 420px;
  padding: 38px 34px;
  border: 2px solid rgba(255, 255, 255, 0.68);
  border-radius: 4px;
  background: rgba(130, 135, 146, 0.42);
`;

export const InfoRow = styled.div`
  display: grid;
  grid-template-columns: 132px minmax(0, 1fr);
  gap: 18px;

  & + & {
    margin-top: 26px;
  }

  @media (max-width: 620px) {
    grid-template-columns: 1fr;
    gap: 8px;
  }
`;

export const InfoLabel = styled.div`
  color: #ffffff;
  font-size: 15px;
  font-weight: 900;
  line-height: 1.35;
`;

export const InfoValue = styled.div`
  color: #ffffff;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.55;
  white-space: pre-wrap;
`;

export const CurriculumBox = styled.div`
  min-height: 290px;
  padding: 36px 34px;
  border: 2px solid rgba(255, 255, 255, 0.68);
  border-radius: 4px;
  background: rgba(130, 135, 146, 0.42);
`;

export const CurriculumRow = styled.div`
  display: grid;
  grid-template-columns: 74px minmax(0, 1fr);
  gap: 20px;
  color: #ffffff;
  font-size: 14px;
  line-height: 1.4;

  & + & {
    margin-top: 20px;
  }
`;

export const Week = styled.strong`
  font-weight: 900;
`;

export const SideBox = styled.div`
  min-height: 94px;
  padding: 20px;
  border: 2px solid rgba(255, 255, 255, 0.68);
  border-radius: 4px;
  background: rgba(130, 135, 146, 0.28);
`;

export const LeaderName = styled.strong`
  display: flex;
  align-items: center;
  gap: 12px;
  color: #ffffff;
  font-size: 15px;
  font-weight: 900;

  &::before {
    content: "";
    width: 22px;
    height: 22px;
    border: 2px solid #ffffff;
    border-radius: 999px;
  }
`;

export const StackList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

export const StackLine = styled.div`
  display: flex;
  gap: 14px;
  color: #ffffff;
  font-size: 13px;
  line-height: 1.4;
`;

export const StackLabel = styled.strong`
  width: 64px;
  flex: 0 0 64px;
  font-weight: 900;
`;

export const ApplyRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 2px;
`;

export const ApplyButton = styled.button`
  width: 76px;
  height: 36px;
  border: none;
  border-radius: 8px;
  background: linear-gradient(180deg, #4f5f7e 0%, #35405e 100%);
  box-shadow: 0 6px 14px rgba(16, 23, 37, 0.24);
  cursor: pointer;
`;

export const ApplyText = styled.span`
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
`;

export const EmptyState = styled.div`
  min-height: 420px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
`;

export const BackButton = styled.button`
  min-width: 176px;
  height: 42px;
  padding: 0 18px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.08);
  color: #ffffff;
  font-size: 13px;
  font-weight: 800;
  cursor: pointer;
`;
