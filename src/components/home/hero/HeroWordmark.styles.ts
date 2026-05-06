import styled from "styled-components";

export const Section = styled.section`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 26px 20px 14px;
  background-color: #2c2f39;
  box-shadow: inset 0 1px 0 rgba(164, 173, 207, 0.5);
`;

export const TitleImage = styled.img`
  display: block;
  width: min(720px, 78vw);
  height: auto;
  object-fit: contain;

  @media (max-width: 768px) {
    width: min(420px, 84vw);
  }
`;

export const Subtitle = styled.p`
  margin: 10px 0 0;
  color: #c5cbdf;
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 0.04em;
  text-align: center;
`;
