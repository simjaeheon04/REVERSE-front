import styled from "styled-components";

export const Page = styled.main`
  min-height: calc(100vh - 70px);
  padding: 64px 24px 96px;
  background:
    radial-gradient(circle at top left, rgba(99, 117, 204, 0.18), transparent 32%),
    linear-gradient(180deg, #10131b 0%, #141a24 100%);
  color: #eef2ff;
`;

export const Shell = styled.div`
  width: min(1120px, 100%);
  margin: 0 auto;
`;

export const Header = styled.header`
  display: grid;
  gap: 12px;
  margin-bottom: 32px;
`;

export const Eyebrow = styled.span`
  color: #9cb0ff;
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

export const Title = styled.h1`
  margin: 0;
  color: #ffffff;
  font-size: clamp(32px, 4vw, 48px);
  font-weight: 800;
  line-height: 1.2;
`;

export const Description = styled.p`
  margin: 0;
  max-width: 720px;
  color: rgba(238, 242, 255, 0.76);
  font-size: 16px;
  font-weight: 500;
  line-height: 1.6;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`;

export const Card = styled.section`
  display: flex;
  min-height: 210px;
  flex-direction: column;
  gap: 14px;
  padding: 24px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  background: rgba(14, 18, 28, 0.84);
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.22);
`;

export const CardTitle = styled.h2`
  margin: 0;
  color: #ffffff;
  font-size: 22px;
  font-weight: 800;
  line-height: 1.3;
`;

export const CardText = styled.p`
  margin: 0;
  flex: 1;
  color: rgba(238, 242, 255, 0.7);
  font-size: 14px;
  font-weight: 500;
  line-height: 1.6;
`;

export const MoveButton = styled.button`
  width: 140px;
  height: 40px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  background: #50617f;
  color: #ffffff;
  font-size: 14px;
  font-weight: 800;
  cursor: pointer;
  transition:
    transform 0.2s ease,
    filter 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    filter: brightness(1.08);
  }
`;
