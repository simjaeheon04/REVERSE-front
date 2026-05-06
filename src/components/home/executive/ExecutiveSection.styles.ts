import styled from "styled-components";

export const Section = styled.section`
  position: relative;
  width: 100%;
  overflow: hidden;
  padding: 120px 20px 140px;
  background-color : #2D303A;
`;

export const Inner = styled.div`
  position: relative;
  z-index: 1;
  max-width: 1120px;
  margin: 0 auto;
`;

export const Header = styled.div`
  text-align: center;
  color: #ffffff;
  margin-bottom: 90px;
`;

export const Title = styled.h2`
  font-size: 52px;
  font-weight: 500;
  line-height: 1;
  letter-spacing: -0.03em;
  margin-bottom: 40px;

  @media (max-width: 1200px) {
    font-size: 48px;
  }

  @media (max-width: 768px) {
    font-size: 38px;
  }
`;

export const Subtitle = styled.p`
  font-size: 18px;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.82);

  @media (max-width: 1200px) {
    font-size: 18px;
  }

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

export const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 44px;

  @media (max-width: 1200px) {
    gap: 28px;
  }

  @media (max-width: 980px) {
    grid-template-columns: repeat(2, 1fr);
    row-gap: 44px;
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

export const TeamColumn = styled.div`
  color: #ffffff;
`;

export const TeamTitle = styled.h3`
  position: relative;
  display: inline-block;
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 34px;
  padding-top: 10px;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 56px;
    height: 2px;
    background: rgba(255, 255, 255, 0.9);
  }

  @media (max-width: 1200px) {
    font-size: 20px;
  }
`;

export const MemberList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 26px;
`;

export const MemberCard = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const Avatar = styled.div`
  flex-shrink: 0;
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: radial-gradient(
      circle at 35% 30%,
      rgba(255, 255, 255, 0.18),
      transparent 45%
    ),
    linear-gradient(135deg, #2a2a2a 0%, #4a4a4a 100%);
  border: 1px solid rgba(255, 255, 255, 0.18);
  box-shadow: inset 0 0 18px rgba(255, 255, 255, 0.08);

  @media (max-width: 1200px) {
    width: 64px;
    height: 64px;
  }
`;

export const AvatarImage = styled.img`
  flex-shrink: 0;
  width: 72px;
  height: 72px;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid rgba(255, 255, 255, 0.18);

  @media (max-width: 1200px) {
    width: 64px;
    height: 64px;
  }
`;

export const MemberInfo = styled.div`
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const Name = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: #ffffff;

  @media (max-width: 1200px) {
    font-size: 16px;
  }
`;

export const Role = styled.div`
  font-size: 15px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.82);
`;

export const Email = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.72);
  word-break: break-all;
`;

export const EmptyState = styled.div`
  display: grid;
  place-items: center;
  min-height: 220px;
  color: rgba(255, 255, 255, 0.7);
  font-size: 16px;
  border: 1px dashed rgba(255, 255, 255, 0.16);
  border-radius: 24px;
`;

export const DecoBox = styled.div`
  position: absolute;

  right: -90px;
  bottom: -90px;

  width: 25px;
  height: 25px;

  background-color: #4A4D56;
`;
