import styled from "styled-components";

export const Page = styled.main`
  min-height: calc(100vh - 70px);
  padding: 74px 20px 112px;
  background:
    radial-gradient(circle at 50% 24%, rgba(255, 255, 255, 0.04), transparent 32%),
    linear-gradient(180deg, #252933 0%, #20242d 100%);
  color: #ffffff;
`;

export const Inner = styled.div`
  width: min(100%, 860px);
  margin: 0 auto;
`;

export const Header = styled.header`
  text-align: center;
`;

export const Title = styled.h1`
  margin: 0;
  color: #ffffff;
  font-size: 42px;
  font-weight: 800;
  line-height: 1;
`;

export const Rule = styled.div`
  width: min(100%, 620px);
  height: 1px;
  margin: 38px auto 44px;
  background: rgba(255, 255, 255, 0.86);
`;

export const Panel = styled.section`
  width: min(100%, 820px);
  margin: 0 auto;
  padding: 12px;
  border: 1px solid rgba(255, 255, 255, 0.58);
  background: rgba(144, 141, 158, 0.7);
`;

export const PanelInner = styled.div`
  position: relative;
  min-height: 390px;
  padding: 30px 34px 34px;
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

export const VoteTitle = styled.h2`
  margin: 0;
  color: #ffffff;
  font-size: 22px;
  font-weight: 900;
`;

export const Underline = styled.div`
  height: 3px;
  margin: 22px 0 30px;
  background: rgba(255, 255, 255, 0.74);
`;

export const ResultList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const ResultRow = styled.div`
  min-height: 74px;
  display: grid;
  grid-template-columns: 86px 70px minmax(0, 1fr);
  align-items: center;
  border: 1px solid rgba(255, 255, 255, 0.18);
  background: rgba(255, 255, 255, 0.12);

  @media (max-width: 720px) {
    grid-template-columns: 74px 58px minmax(0, 1fr);
  }
`;

export const OptionPill = styled.span`
  justify-self: center;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 62px;
  height: 34px;
  padding: 0 12px;
  border-radius: 17px;
  background: rgba(234, 234, 240, 0.72);
  color: #ffffff;
  font-size: 14px;
  font-weight: 900;
  box-sizing: border-box;
`;

export const Count = styled.span`
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-right: 1px solid rgba(255, 255, 255, 0.66);
  color: #ffffff;
  font-size: 15px;
  font-weight: 900;
`;

export const Members = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 28px;
  padding: 14px 34px;
`;

export const EmptyText = styled.span`
  color: rgba(255, 255, 255, 0.72);
  font-size: 14px;
  font-weight: 800;
`;

export const AnonymousText = styled.span`
  color: rgba(255, 255, 255, 0.86);
  font-size: 14px;
  font-weight: 900;
`;

export const Member = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: rgba(255, 255, 255, 0.86);
  font-size: 13px;
  font-weight: 800;
`;

export const Avatar = styled.span<{ $tone: string }>`
  width: 26px;
  height: 26px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 2px solid rgba(255, 255, 255, 0.84);
  border-radius: 50%;
  background: ${({ $tone }) => $tone};
  color: #ffffff;
  font-size: 11px;
  font-weight: 900;
  box-sizing: border-box;
`;
