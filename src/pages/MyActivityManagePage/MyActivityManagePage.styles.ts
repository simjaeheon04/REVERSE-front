import styled from "styled-components";

export const Page = styled.section`
  min-height: calc(100vh - 70px);
  padding: 52px 24px 0;
  background: linear-gradient(180deg, #2a2d36 0%, #373b46 100%);
`;

export const Frame = styled.div`
  width: min(1360px, 100%);
  min-height: 650px;
  margin: 0 auto;
  padding: 48px 34px 40px;
  border: 1px solid rgba(255, 255, 255, 0.72);
`;

export const Hero = styled.div`
  text-align: center;
`;

export const HeroTitle = styled.h1`
  margin: 0;
  color: #d7d9f7;
  font-family: "Jersey 25", "Pretendard", sans-serif;
  font-size: clamp(56px, 7vw, 82px);
  font-weight: 800;
  line-height: 1;
  letter-spacing: 0;
`;

export const HeroText = styled.p`
  margin: 18px 0 0;
  color: rgba(255, 255, 255, 0.82);
  font-size: 14px;
  line-height: 1.5;
`;

export const SummaryBar = styled.div`
  display: grid;
  grid-template-columns: minmax(180px, 1fr) minmax(220px, 280px);
  align-items: stretch;
  margin-top: 46px;
  border-radius: 24px;
  overflow: hidden;
  background: rgba(160, 160, 168, 0.66);

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`;

export const SummaryInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  min-height: 68px;
  padding: 0 28px;
`;

export const SummaryIcon = styled.span`
  color: #ffffff;
  font-size: 26px;
  line-height: 1;
`;

export const SummaryValue = styled.strong`
  display: block;
  color: #ffffff;
  font-size: 34px;
  font-weight: 900;
  line-height: 1;
`;

export const SummaryLabel = styled.span`
  display: block;
  margin-top: 4px;
  color: rgba(255, 255, 255, 0.92);
  font-size: 18px;
  font-weight: 600;
`;

export const SummaryAction = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 14px 20px;
`;

export const ActionButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  width: 100%;
  height: 40px;
  border: none;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.9);
  color: #686975;
  font-size: 15px;
  font-weight: 800;
  cursor: pointer;
`;

export const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 28px;
  color: #ffffff;
  font-size: 14px;
  font-weight: 700;
`;

export const List = styled.div`
  display: grid;
  gap: 14px;
  margin-top: 14px;
`;

export const ItemCard = styled.article`
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: center;
  min-height: 86px;
  padding: 0 26px;
  border: 1px solid rgba(255, 255, 255, 0.46);
  border-radius: 4px;
  background: rgba(91, 94, 107, 0.34);
`;

export const ItemInfo = styled.div`
  min-width: 0;
`;

export const ItemTitle = styled.h2`
  margin: 0;
  color: #ffffff;
  font-size: 17px;
  font-weight: 900;
`;

export const ItemMeta = styled.p`
  margin: 10px 0 0;
  color: rgba(255, 255, 255, 0.68);
  font-size: 13px;
`;

export const ItemActions = styled.div`
  display: flex;
  gap: 10px;
`;

export const SmallButton = styled.button`
  min-width: 82px;
  height: 30px;
  border: 1px solid rgba(255, 255, 255, 0.72);
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.04);
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
`;

export const ArrowButton = styled.button`
  width: 32px;
  height: 32px;
  border: none;
  background: transparent;
  color: #ffffff;
  font-size: 28px;
  line-height: 1;
  cursor: pointer;
`;

export const EmptyPanel = styled.div`
  margin-top: 14px;
  padding: 30px 24px;
  border: 1px solid rgba(255, 255, 255, 0.24);
  color: rgba(255, 255, 255, 0.76);
  font-size: 14px;
`;

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: rgba(9, 12, 18, 0.24);
`;

export const ModalCard = styled.div`
  position: relative;
  width: min(100%, 460px);
  padding: 28px 28px 24px;
  border: 1px solid #d9d9e1;
  border-radius: 4px;
  background: #ffffff;
  color: #242424;
  box-shadow: 0 16px 48px rgba(15, 18, 28, 0.18);
`;

export const ModalCloseButton = styled.button`
  position: absolute;
  top: 12px;
  right: 14px;
  border: none;
  background: transparent;
  color: #222222;
  font-size: 20px;
  cursor: pointer;
`;

export const ModalTitle = styled.h2`
  margin: 0;
  color: #222222;
  font-size: 18px;
  font-weight: 900;
`;

export const ModalText = styled.p`
  margin: 10px 0 0;
  color: #222222;
  font-size: 13px;
  line-height: 1.5;
`;

export const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 22px;
`;

export const ModalSecondaryButton = styled.button`
  min-width: 48px;
  height: 32px;
  border: 1px solid #d7d5df;
  border-radius: 4px;
  background: #e4e2ea;
  color: #5d5b64;
  font-size: 12px;
  cursor: pointer;
`;

export const ModalPrimaryButton = styled.button`
  min-width: 48px;
  height: 32px;
  border: none;
  border-radius: 4px;
  background: #242424;
  color: #ffffff;
  font-size: 12px;
  cursor: pointer;
`;
