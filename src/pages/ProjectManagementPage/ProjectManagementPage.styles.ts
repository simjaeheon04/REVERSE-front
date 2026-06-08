import styled from "styled-components";

export const Page = styled.section`
  min-height: calc(100vh - 70px);
  padding: 4px 2px 0;
  background: linear-gradient(180deg, #252933 0%, #303440 100%);
`;

export const Frame = styled.div`
  min-height: 620px;
  max-width: 1460px;
  margin: 0 auto;
  padding: 36px 36px 108px;
  border: 1px solid rgba(255, 255, 255, 0.78);
  box-sizing: border-box;
`;

export const Hero = styled.div`
  text-align: center;
`;

export const HeroTitle = styled.h1`
  margin: 0;
  color: #d8daf7;
  font-size: clamp(44px, 6.2vw, 74px);
  font-weight: 900;
  line-height: 1;
  letter-spacing: 0.01em;
`;

export const HeroText = styled.p`
  margin: 18px 0 0;
  color: rgba(255, 255, 255, 0.9);
  font-size: 12px;
  font-weight: 500;
`;

export const SummaryBar = styled.div`
  display: grid;
  grid-template-columns: 1fr minmax(230px, 300px);
  align-items: stretch;
  margin-top: 34px;
  border-radius: 22px;
  overflow: hidden;
  background: rgba(158, 160, 168, 0.72);

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`;

export const SummaryItem = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;
  min-height: 74px;
  padding: 0 30px;
  border-right: 1px solid rgba(255, 255, 255, 0.32);

  @media (max-width: 760px) {
    border-right: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0.22);
  }
`;

export const SummaryIcon = styled.img`
  width: 30px;
  height: 30px;
  object-fit: contain;
`;

export const SummaryTextGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const SummaryValue = styled.strong`
  color: #ffffff;
  font-size: 26px;
  font-weight: 900;
  line-height: 1;
`;

export const SummaryLabel = styled.span`
  color: #ffffff;
  font-size: 13px;
  font-weight: 700;
`;

export const SummaryAction = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px 22px;
`;

export const WriteActionButton = styled.button`
  width: 100%;
  height: 44px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
  border: none;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.88);
  color: #707078;
  font-size: 13px;
  font-weight: 800;
  cursor: pointer;
`;

export const WriteActionIcon = styled.img`
  width: 22px;
  height: 22px;
  object-fit: contain;
`;

export const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 28px;
  color: #ffffff;
  font-size: 13px;
  font-weight: 800;
`;

export const Caret = styled.span`
  font-size: 13px;
  line-height: 1;
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;
  margin-top: 16px;
`;

export const Card = styled.article`
  min-height: 132px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding: 28px 24px 28px 18px;
  border: 1px solid rgba(255, 255, 255, 0.52);
  border-radius: 4px;
  background: rgba(55, 59, 72, 0.64);
  box-shadow: inset 0 1px 16px rgba(255, 255, 255, 0.03);
  box-sizing: border-box;

  @media (max-width: 720px) {
    align-items: flex-start;
    flex-direction: column;
  }
`;

export const CardTitle = styled.h2`
  margin: 0;
  color: #ffffff;
  font-size: 17px;
  font-weight: 900;
  line-height: 1.35;
`;

export const CardActions = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  margin-left: auto;

  @media (max-width: 720px) {
    width: 100%;
    justify-content: flex-end;
  }
`;

export const SecondaryButton = styled.button`
  min-width: 122px;
  height: 32px;
  padding: 0 22px;
  border: 1px solid rgba(255, 255, 255, 0.82);
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.02);
  color: #ffffff;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;

  &:hover {
    background: rgba(255, 255, 255, 0.12);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const EmptyPanel = styled.div`
  margin-top: 16px;
  padding: 42px 48px;
  border: 1px solid rgba(255, 255, 255, 0.42);
  border-radius: 4px;
  background: rgba(55, 59, 72, 0.42);
  color: rgba(255, 255, 255, 0.88);
  font-size: 15px;
  font-weight: 700;
`;

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 400;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: rgba(9, 12, 18, 0.42);
`;

export const ModalCard = styled.div`
  position: relative;
  width: min(100%, 560px);
  padding: 34px 30px 30px;
  border: 1px solid #d9d9e1;
  border-radius: 4px;
  background: #ffffff;
  color: #242424;
  box-shadow: 0 16px 48px rgba(15, 18, 28, 0.18);
`;

export const ModalCloseButton = styled.button`
  position: absolute;
  top: 18px;
  right: 17px;
  width: 24px;
  height: 24px;
  padding: 0;
  border: none;
  background: transparent;
  color: #222222;
  font-size: 26px;
  font-weight: 300;
  line-height: 1;
  cursor: pointer;
`;

export const ModalTitle = styled.h2`
  margin: 0;
  padding-right: 36px;
  color: #222222;
  font-size: 24px;
  font-weight: 800;
  line-height: 1.28;
`;

export const ModalText = styled.p`
  margin: 16px 0 0;
  color: #222222;
  font-size: 15px;
  font-weight: 500;
  line-height: 1.5;
`;

export const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 14px;
  margin-top: 24px;
`;

export const ModalSecondaryButton = styled.button`
  min-width: 62px;
  height: 38px;
  padding: 0 14px;
  border: 1px solid #d7d5df;
  border-radius: 6px;
  background: #e4e2ea;
  color: #5d5b64;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
`;

export const ModalPrimaryButton = styled.button`
  min-width: 62px;
  height: 38px;
  padding: 0 14px;
  border: 1px solid #242424;
  border-radius: 6px;
  background: #242424;
  color: #ffffff;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;
