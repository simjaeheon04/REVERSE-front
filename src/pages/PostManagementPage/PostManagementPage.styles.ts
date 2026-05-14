import styled from "styled-components";

export const Page = styled.section`
  min-height: calc(100vh - 70px);
  padding: 52px 24px 40px;
  background: linear-gradient(180deg, #2a2d36 0%, #373b46 100%);
`;

export const Frame = styled.div`
  max-width: 1360px;
  margin: 0 auto;
  padding: 26px 34px 40px;
  border: 1px solid rgba(255, 255, 255, 0.72);
`;

export const Hero = styled.div`
  text-align: center;
  padding: 10px 0 28px;
`;

export const HeroTitle = styled.h1`
  margin: 0;
  color: #d7d9f7;
  font-size: clamp(54px, 7vw, 78px);
  font-weight: 800;
  line-height: 1;
`;

export const HeroText = styled.p`
  margin: 18px 0 0;
  color: rgba(255, 255, 255, 0.82);
  font-size: 14px;
  line-height: 1.5;
`;

export const SummaryBar = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr minmax(220px, 258px);
  align-items: stretch;
  margin-top: 16px;
  border-radius: 24px;
  overflow: hidden;
  background: rgba(160, 160, 168, 0.66);

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

export const SummaryItem = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;
  min-height: 70px;
  padding: 0 26px;
  border-right: 1px solid rgba(255, 255, 255, 0.16);

  @media (max-width: 900px) {
    border-right: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0.16);
  }
`;

export const SummaryIcon = styled.img`
  width: 30px;
  height: 30px;
  object-fit: contain;
  flex-shrink: 0;
`;

export const SummaryTextGroup = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const SummaryValue = styled.strong`
  color: #ffffff;
  font-size: 36px;
  font-weight: 800;
  line-height: 1;
`;

export const SummaryLabel = styled.span`
  margin-top: 4px;
  color: rgba(255, 255, 255, 0.92);
  font-size: 20px;
  font-weight: 500;
  line-height: 1.2;
`;

export const SummaryAction = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 14px 20px;
`;

export const WriteActionButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
  width: 100%;
  height: 40px;
  border: none;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.88);
  color: #6b6b72;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
`;

export const WriteActionIcon = styled.img`
  width: 24px;
  height: 24px;
  object-fit: contain;
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

export const Caret = styled.span`
  font-size: 14px;
  line-height: 1;
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-top: 14px;
`;

export const Card = styled.article`
  padding: 34px 28px 30px;
  border: 1px solid rgba(255, 255, 255, 0.42);
  border-radius: 6px;
  background: rgba(120, 122, 134, 0.34);
`;

export const CardTop = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  align-items: center;

  @media (max-width: 900px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const CardInfo = styled.div`
  min-width: 0;
`;

export const CardTitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
`;

export const CardTitle = styled.h2`
  margin: 0;
  color: #ffffff;
  font-size: 18px;
  font-weight: 800;
  line-height: 1.3;
`;

export const CategoryChip = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 70px;
  height: 22px;
  padding: 0 8px;
  background: rgba(255, 255, 255, 0.24);
  color: rgba(255, 255, 255, 0.86);
  font-size: 12px;
  font-weight: 600;
`;

export const AuthorRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 18px;
`;

export const AuthorAvatar = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 999px;
  background: linear-gradient(180deg, #ffd6e4 0%, #79d8ff 100%);
  flex-shrink: 0;
`;

export const AuthorTextGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const AuthorName = styled.span`
  color: rgba(255, 255, 255, 0.82);
  font-size: 13px;
  font-weight: 600;
`;

export const DateText = styled.span`
  color: rgba(255, 255, 255, 0.62);
  font-size: 12px;
`;

export const CardActions = styled.div`
  display: flex;
  gap: 12px;
`;

export const SecondaryButton = styled.button`
  min-width: 116px;
  height: 32px;
  padding: 0 18px;
  border: 1px solid rgba(255, 255, 255, 0.72);
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.02);
  color: #ffffff;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

export const EmptyPanel = styled.div`
  margin-top: 14px;
  padding: 28px 24px;
  border: 1px solid rgba(255, 255, 255, 0.24);
  background: rgba(255, 255, 255, 0.04);
  color: rgba(255, 255, 255, 0.82);
  font-size: 14px;
`;

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 400;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: rgba(9, 12, 18, 0.32);
`;

export const ModalCard = styled.div`
  position: relative;
  width: min(100%, 582px);
  min-height: 190px;
  padding: 34px 30px 30px;
  border: 1px solid #d9d9e1;
  border-radius: 4px;
  background: #ffffff;
  color: #242424;
  box-shadow: 0 16px 48px rgba(15, 18, 28, 0.18);

  @media (max-width: 768px) {
    min-height: auto;
    padding: 34px 24px 24px;
  }
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
  white-space: nowrap;

  @media (max-width: 640px) {
    font-size: 19px;
    white-space: normal;
  }
`;

export const ModalText = styled.p`
  margin: 16px 0 0;
  color: #222222;
  font-size: 15px;
  font-weight: 500;
  line-height: 1.5;
  white-space: nowrap;

  @media (max-width: 640px) {
    white-space: normal;
  }
`;

export const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 14px;
  margin-top: 20px;
`;

export const ModalSecondaryButton = styled.button`
  min-width: 54px;
  height: 38px;
  padding: 0 14px;
  border: 1px solid #d7d5df;
  border-radius: 6px;
  background: #e4e2ea;
  box-shadow: inset 0 10px 10px -8px rgba(118, 116, 132, 0.55);
  color: #5d5b64;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

export const ModalPrimaryButton = styled.button`
  min-width: 54px;
  height: 38px;
  padding: 0 14px;
  border: 1px solid #242424;
  border-radius: 6px;
  background: #242424;
  color: #ffffff;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;
