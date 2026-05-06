import styled from "styled-components";

if (typeof document !== "undefined") {
  const existing = document.querySelector("link[href*='fonts.googleapis.com']");

  if (!existing) {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Jersey+25&family=Inter:wght@400;500;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }
}

export const Section = styled.section`
  position: relative;
  width: 100%;
  padding: 160px 20px;
`;

export const BgWrap = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
  background: #2d303a;
`;

export const BgImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

export const Inner = styled.div`
  position: relative;
  z-index: 1;
  max-width: 960px;
  margin: 0 auto;
  text-align: center;
  color: #ffffff;
`;

export const Title = styled.h2`
  margin-bottom: 35px;
  font-family: "Jersey 25", sans-serif;
  font-size: 90px;
  font-weight: 500;
  letter-spacing: 0.02em;

  @media (max-width: 1200px) {
    font-size: 44px;
  }

  @media (max-width: 768px) {
    font-size: 36px;
  }
`;

export const Subtitle = styled.p`
  margin-bottom: 72px;
  font-size: 15px;
  color: rgba(255, 255, 255, 0.85);

  @media (max-width: 1200px) {
    font-size: 18px;
  }
`;

export const RuleList = styled.ol`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 0;
  padding: 0;
  list-style: none;
`;

export const RuleItem = styled.li`
  font-size: 22px;
  font-weight: 700;
  line-height: 1.3;
  color: #ffffff;
  text-align: center;
  word-break: keep-all;

  @media (max-width: 1200px) {
    font-size: 18px;
  }

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

export const StateMessage = styled.p`
  margin: 0;
  font-size: 16px;
  color: rgba(255, 255, 255, 0.72);
`;

export const ButtonWrap = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 72px;
`;

export const Button = styled.button`
  min-width: 178px;
  padding: 14px 28px;
  border: 1px solid rgba(173, 195, 255, 0.35);
  border-radius: 9px;
  background: rgba(120, 140, 184, 0.42);
  color: #ffffff;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease, border-color 0.2s ease;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);

  &:hover {
    background: rgba(120, 140, 184, 0.56);
    border-color: rgba(173, 195, 255, 0.5);
  }

  &:disabled {
    cursor: default;
    opacity: 0.72;
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: rgba(20, 23, 32, 0.74);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
`;

export const ModalCard = styled.div`
  width: min(920px, 100%);
  max-height: min(80vh, 760px);
  overflow: hidden;
  border: 1px solid rgba(173, 195, 255, 0.18);
  border-radius: 24px;
  background: #2f3340;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.34);
`;

export const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 24px 28px 18px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
`;

export const ModalTitle = styled.h3`
  margin: 0;
  font-family: "Jersey 25", sans-serif;
  font-size: 42px;
  font-weight: 500;
  letter-spacing: 0.02em;
  color: #ffffff;
`;

export const ModalCloseButton = styled.button`
  padding: 10px 16px;
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.06);
  color: #ffffff;
  font-size: 13px;
  cursor: pointer;
`;

export const ModalList = styled.ol`
  display: flex;
  flex-direction: column;
  gap: 18px;
  max-height: calc(80vh - 96px);
  margin: 0;
  padding: 24px 28px 28px;
  overflow-y: auto;
  list-style: none;
`;

export const ModalItem = styled.li`
  display: grid;
  gap: 10px;
  padding-bottom: 18px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);

  &:last-child {
    padding-bottom: 0;
    border-bottom: none;
  }
`;

export const ModalItemTitle = styled.h4`
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  color: #ffffff;
`;

export const ModalItemContent = styled.p`
  margin: 0;
  font-size: 14px;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.82);
  white-space: pre-wrap;
`;
