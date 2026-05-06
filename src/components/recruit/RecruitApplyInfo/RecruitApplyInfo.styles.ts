import styled from "styled-components";

export const InfoPanel = styled.div`
  min-height: 280px;
  display: flex;
  flex-direction: column;
  color: #f5f7fb;

  @media (max-width: 1100px) {
    min-height: auto;
  }
`;

export const Year = styled.p`
  margin: 0 0 22px;
  color: rgba(255, 255, 255, 0.94);
  font-size: 18px;
  font-weight: 700;
  line-height: 1;
`;

export const Title = styled.h1`
  margin: 0;
  color: #ffffff;
  font-size: 44px;
  font-weight: 800;
  line-height: 1.18;
  letter-spacing: 0;

  @media (max-width: 640px) {
    font-size: 34px;
  }
`;

export const Description = styled.p`
  margin: 34px 0 0;
  color: rgba(255, 255, 255, 0.82);
  font-size: 18px;
  font-weight: 500;
  line-height: 1.5;
`;

export const ContactList = styled.ul`
  list-style: none;
  margin: 34px 0 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const ContactItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 14px;
  color: rgba(255, 255, 255, 0.84);
  font-size: 15px;
  font-weight: 500;
  line-height: 1.45;
`;

export const ContactIcon = styled.svg`
  width: 20px;
  height: 20px;
  flex: 0 0 20px;
  color: rgba(255, 255, 255, 0.9);
`;

export const EligibilityNotice = styled.p`
  margin: 22px 0 0 34px;
  color: rgba(255, 255, 255, 0.78);
  font-size: 14px;
  font-weight: 700;
  line-height: 1.6;
`;
