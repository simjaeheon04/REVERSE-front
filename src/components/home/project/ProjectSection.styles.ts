import styled from "styled-components";
 
if (typeof document !== "undefined") {
  const existing = document.querySelector(
    "link[href*='fonts.googleapis.com']"
  );

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
  padding: 140px 20px 150px;
  background-color : #2D303A;

  font-family: 'Inter', sans-serif;
`;

export const Inner = styled.div`
  position: relative;
  z-index: 1;
  max-width: 1100px;
  margin: 0 auto;
`;

export const Header = styled.div`
  text-align: center;
  color: #ffffff;
  margin-bottom: 72px;
`;

export const Title = styled.h2`
  font-size: 75px;
  font-weight: 500;
  line-height: 1;
  letter-spacing: 0.02em;
  margin-bottom: 40px;

  font-family: 'Jersey 25', sans-serif;

  @media (max-width: 1200px) {
    font-size: 52px;
  }
`;

export const Subtitle = styled.p`
  font-size: 15px;
  font-weight: 100;
  color: #ffffff;

  @media (max-width: 1200px) {
    font-size: 20px;
  }
`;

export const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 26px;
  align-items: start;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    max-width: 420px;
    margin: 0 auto;
  }
`;

export const CardItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const CardFrame = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1;
  overflow: hidden;
  border-radius : 25px;
`;

export const ImageCard = styled.button`
  position: relative;
  width: 100%;
  height: 100%;
  display: block;
  padding: 0;
  border: none;
  background: #1a1a1a;
  cursor: pointer;
  overflow: hidden;
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

export const HoverOverlay = styled.div<{ $visible: boolean }>`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.34);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transition: opacity 0.2s ease;
`;

export const MoreText = styled.span`
  color: #ffffff;
  font-size: 20px;
  font-weight: 500;

  @media (max-width: 1200px) {
    font-size: 24px;
  }
`;

export const DetailCard = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  border: 1px solid rgba(255, 255, 255, 0.45);
  box-shadow: 0 4px 18px rgba(255, 255, 255, 0.12);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius : 25px;
`;

export const DetailGlowWrap = styled.div`
  position: absolute;
  inset: 0;
  overflow: hidden;
`;

export const DetailInner = styled.div`
  position: relative;
  z-index: 1;
  color: #ffffff;
  font-size: 20px;
  font-weight: 400;
  text-align: center;
  padding: 0 24px;

  @media (max-width: 1200px) {
    font-size: 24px;
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 12px;
  right: 14px;
  z-index: 2;
  color: #ffffff;
  font-size: 36px;
  line-height: 1;
  padding: 0;
  background: none;
  border: none;
  cursor: pointer;
`;

export const CardTitle = styled.h3`
  margin-top: 22px;
  color: #ffffff;
  font-size: 20px;
  font-weight: 300;
  text-align: center;

  @media (max-width: 1200px) {
    font-size: 26px;
  }
`;
