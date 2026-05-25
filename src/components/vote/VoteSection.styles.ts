import styled from "styled-components";

export const HeroSection = styled.section`
  width: 100%;
  min-height: 260px;
  background:
    radial-gradient(circle at 50% 36%, rgba(255, 255, 255, 0.04), transparent 34%),
    linear-gradient(180deg, #262a33 0%, #242832 100%);
`;

export const HeroTextWrap = styled.div`
  min-height: 260px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 62px 20px 34px;
  text-align: center;
  box-sizing: border-box;
`;

export const HeroTitle = styled.h1`
  margin: 0;
  color: #ffffff;
  font-size: 48px;
  font-weight: 900;
  line-height: 1;
`;

export const HeroDesc = styled.p`
  margin: 28px 0 0;
  color: rgba(255, 255, 255, 0.82);
  font-size: 13px;
  font-weight: 500;
`;

export const HeroRule = styled.div`
  width: min(100%, 640px);
  height: 1px;
  margin-top: 42px;
  background: rgba(255, 255, 255, 0.82);
`;

export const Section = styled.section`
  width: 100%;
  min-height: 920px;
  padding: 34px 20px 92px;
  background: linear-gradient(180deg, #242832 0%, #2c303a 100%);
  box-sizing: border-box;
`;

export const Inner = styled.div`
  position: relative;
  width: min(100%, 1100px);
  margin: 0 auto;
`;

export const VoteList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-height: 650px;
`;

export const VoteCard = styled.button`
  width: 100%;
  min-height: 86px;
  padding: 0 28px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 22px;
  border: 1px solid rgba(255, 255, 255, 0.62);
  border-radius: 4px;
  background: rgba(122, 126, 138, 0.33);
  color: #ffffff;
  text-align: left;
  cursor: pointer;
  box-sizing: border-box;

  &:hover {
    background: rgba(135, 140, 154, 0.42);
  }
`;

export const VoteInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 22px;
  min-width: 0;
`;

export const VoteIcon = styled.span`
  position: relative;
  width: 22px;
  height: 17px;
  flex: 0 0 auto;
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

export const VoteTitle = styled.h2`
  margin: 0;
  color: #ffffff;
  font-size: 15px;
  font-weight: 800;
  line-height: 1.3;
`;

export const StatusBadge = styled.span<{ $status: "active" | "closed" }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 22px;
  padding: 0 10px;
  background: ${({ $status }) =>
    $status === "active" ? "rgba(218, 224, 230, 0.8)" : "rgba(0, 0, 0, 0.48)"};
  color: ${({ $status }) => ($status === "active" ? "#5a5f69" : "#cfd3dc")};
  font-size: 12px;
  font-weight: 700;
  white-space: nowrap;
`;

export const Arrow = styled.span`
  width: 10px;
  height: 10px;
  flex: 0 0 auto;
  border-top: 2px solid #ffffff;
  border-right: 2px solid #ffffff;
  transform: rotate(45deg);
`;

export const Pagination = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 14px;
`;

export const PageNavButton = styled.button`
  border: none;
  background: transparent;
  color: rgba(255, 255, 255, 0.52);
  font-size: 10px;
  cursor: pointer;
`;

export const PageNumberButton = styled.button<{ $active: boolean }>`
  min-width: 20px;
  height: 20px;
  border: none;
  border-radius: 5px;
  background: ${({ $active }) =>
    $active ? "rgba(255, 255, 255, 0.18)" : "transparent"};
  color: rgba(255, 255, 255, 0.86);
  font-size: 10px;
  cursor: pointer;
`;

export const PageDots = styled.span`
  color: rgba(255, 255, 255, 0.56);
  font-size: 10px;
`;

export const WriteButton = styled.button`
  position: absolute;
  right: 8px;
  bottom: 12px;
  width: 64px;
  height: 64px;
  border: 1px solid rgba(255, 255, 255, 0.78);
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  @media (max-width: 760px) {
    position: fixed;
    right: 20px;
    bottom: 24px;
  }
`;

export const WriteIcon = styled.span`
  width: 26px;
  height: 26px;
  position: relative;
  border: 3px solid #ffffff;
  border-radius: 4px;
  box-sizing: border-box;

  &::before {
    content: "";
    position: absolute;
    width: 22px;
    height: 3px;
    right: -10px;
    top: 2px;
    background: #ffffff;
    transform: rotate(-45deg);
    transform-origin: right center;
    border-radius: 999px;
  }

  &::after {
    content: "";
    position: absolute;
    right: -12px;
    top: -4px;
    width: 7px;
    height: 7px;
    background: #ffffff;
    transform: rotate(-45deg);
  }
`;
