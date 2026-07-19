import styled from "styled-components";

export const Page = styled.main`
  min-height: calc(100vh - 70px);
  padding: 48px 32px 88px;
  background:
    radial-gradient(circle at top left, rgba(99, 117, 204, 0.18), transparent 34%),
    linear-gradient(180deg, #10131b 0%, #141a24 100%);
  color: #eef2ff;

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  @media (max-width: 640px) {
    padding: 44px 18px 80px;
  }
`;

export const Shell = styled.div`
  width: min(1440px, 100%);
  margin: 0 auto;
  display: grid;
  gap: 30px;
`;

export const Header = styled.header`
  display: grid;
  gap: 14px;
`;

export const Eyebrow = styled.span`
  color: #aebcff;
  font-size: 17px;
  font-weight: 800;
  letter-spacing: 0;
`;

export const Title = styled.h1`
  margin: 0;
  color: #ffffff;
  font-size: clamp(46px, 5vw, 66px);
  font-weight: 800;
  line-height: 1.15;
  letter-spacing: 0;
`;

export const Description = styled.p`
  margin: 0;
  max-width: 900px;
  color: rgba(238, 242, 255, 0.78);
  font-size: 20px;
  font-weight: 500;
  line-height: 1.65;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 380px), 1fr));
  gap: 24px;
`;

export const Card = styled.section`
  display: flex;
  min-height: 270px;
  flex-direction: column;
  gap: 18px;
  padding: 34px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 16px;
  background: rgba(13, 18, 29, 0.96);
  box-shadow: 0 24px 58px rgba(0, 0, 0, 0.26);
`;

export const CardTitle = styled.h2`
  margin: 0;
  color: #ffffff;
  font-size: 30px;
  font-weight: 800;
  line-height: 1.35;
  letter-spacing: 0;
`;

export const CardText = styled.p`
  margin: 0;
  flex: 1;
  color: rgba(238, 242, 255, 0.7);
  font-size: 18px;
  font-weight: 500;
  line-height: 1.65;
`;

export const MoveButton = styled.button`
  align-self: flex-start;
  min-width: 136px;
  min-height: 56px;
  padding: 0 24px;
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: 10px;
  background: #1a2131;
  color: #eef2ff;
  font-size: 18px;
  font-weight: 800;
  cursor: pointer;
  transition:
    background 0.18s ease,
    border-color 0.18s ease,
    transform 0.18s ease;

  &:hover {
    border-color: rgba(174, 188, 255, 0.52);
    background: #222a3b;
    transform: translateY(-1px);
  }

  &:focus-visible {
    outline: 4px solid rgba(156, 176, 255, 0.5);
    outline-offset: 3px;
  }
`;

export const CategoryNav = styled.nav`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 14px;
  padding: 12px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 16px;
  background: rgba(10, 14, 23, 0.82);

  @media (max-width: 760px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

export const CategoryButton = styled.button<{ $active: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  min-height: 64px;
  padding: 0 20px;
  border: 1px solid
    ${({ $active }) => ($active ? "rgba(174, 188, 255, 0.72)" : "transparent")};
  border-radius: 12px;
  background: ${({ $active }) => ($active ? "#9aa8ff" : "rgba(255, 255, 255, 0.05)")};
  color: ${({ $active }) => ($active ? "#10131b" : "#eef2ff")};
  font-size: 19px;
  font-weight: 900;
  cursor: pointer;

  &:hover {
    background: ${({ $active }) => ($active ? "#aeb9ff" : "rgba(255, 255, 255, 0.1)")};
  }

  &:focus-visible {
    outline: 4px solid rgba(156, 176, 255, 0.5);
    outline-offset: 3px;
  }
`;

export const CategoryCount = styled.span`
  display: inline-grid;
  place-items: center;
  min-width: 30px;
  height: 30px;
  padding: 0 8px;
  border-radius: 999px;
  background: rgba(16, 19, 27, 0.14);
  font-size: 15px;
`;

export const SectionIntro = styled.section`
  display: flex;
  align-items: baseline;
  gap: 18px;
  padding-bottom: 18px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.14);

  @media (max-width: 640px) {
    display: grid;
    gap: 8px;
  }
`;

export const SectionTitle = styled.h2`
  margin: 0;
  color: #ffffff;
  font-size: 30px;
  font-weight: 900;
`;

export const SectionDescription = styled.p`
  margin: 0;
  color: rgba(238, 242, 255, 0.7);
  font-size: 18px;
  line-height: 1.6;
`;
