import styled from "styled-components";

export const Page = styled.main`
  min-height: calc(100vh - 70px);
  padding: 58px 24px 68px;
  background:
    radial-gradient(circle at 50% 22%, rgba(255, 255, 255, 0.04), transparent 32%),
    linear-gradient(180deg, #262a33 0%, #20242c 100%);
  color: #ffffff;
`;

export const Inner = styled.div`
  width: min(100%, 1128px);
  margin: 0 auto;
`;

export const HeroSection = styled.section``;

export const ProjectTitle = styled.h1`
  margin: 0 0 42px;
  color: #cfd5f4;
  font-size: clamp(48px, 6vw, 76px);
  font-weight: 400;
  line-height: 1;
  letter-spacing: -0.04em;
`;

export const HeroImage = styled.img`
  display: block;
  width: 100%;
  height: clamp(320px, 43vw, 510px);
  object-fit: cover;
`;

export const ProjectInfoLabel = styled.div`
  margin-top: 28px;
  padding-top: 2px;
  border-top: 1px solid rgba(255, 255, 255, 0.64);
  color: rgba(255, 255, 255, 0.16);
  font-size: 16px;
  font-weight: 700;
`;

export const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) 240px;
  gap: 36px;
  margin-top: 36px;
  align-items: start;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

export const SectionTitle = styled.h2`
  position: relative;
  width: fit-content;
  margin: 0 0 10px;
  color: #ffffff;
  font-size: 31px;
  font-weight: 900;
  line-height: 1;
  letter-spacing: -0.04em;

  &::after {
    content: "";
    position: absolute;
    left: 0;
    right: -36px;
    bottom: -10px;
    height: 6px;
    background: rgba(255, 255, 255, 0.78);
  }
`;

export const IntroductionSection = styled.section``;

export const IntroductionBox = styled.div`
  min-height: 430px;
  padding: 44px 40px 42px;
  border: 2px solid rgba(255, 255, 255, 0.72);
  border-radius: 4px;
  background: rgba(129, 134, 145, 0.48);
  box-sizing: border-box;
`;

export const InfoRow = styled.div`
  display: grid;
  grid-template-columns: 118px minmax(0, 1fr);
  gap: 18px;
  margin-bottom: 34px;

  &:last-child {
    margin-bottom: 0;
  }

  @media (max-width: 620px) {
    grid-template-columns: 1fr;
    gap: 8px;
    margin-bottom: 24px;
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
  line-height: 1.45;
  white-space: pre-wrap;
`;

export const LeaderSection = styled.aside``;

export const LeaderCard = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;
  min-height: 96px;
  padding: 20px 22px;
  border: 2px solid rgba(255, 255, 255, 0.72);
  border-radius: 4px;
  background: rgba(129, 134, 145, 0.22);
  box-sizing: border-box;
`;

export const LeaderIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border: 2px solid rgba(255, 255, 255, 0.78);
  border-radius: 999px;
  color: #ffffff;
  font-size: 8px;
  font-weight: 900;
  white-space: nowrap;
`;

export const LeaderName = styled.strong`
  color: #ffffff;
  font-size: 16px;
  font-weight: 900;
`;

export const ApplyRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 34px;
  padding-left: 8px;
`;

export const ApplyButton = styled.button`
  width: 76px;
  height: 40px;
  border: none;
  border-radius: 8px;
  background: linear-gradient(180deg, #3f4f73 0%, #273451 100%);
  box-shadow: 0 6px 14px rgba(16, 23, 37, 0.26);
  cursor: pointer;
`;

export const ApplyText = styled.span`
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
`;

export const NotFoundBox = styled.div`
  min-height: 420px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  color: #ffffff;
`;

export const BackButton = styled.button`
  min-width: 180px;
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
