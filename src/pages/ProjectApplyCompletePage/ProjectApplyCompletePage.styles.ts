import styled from "styled-components";

export const Page = styled.main`
  min-height: calc(100vh - 70px);
  display: flex;
  flex-direction: column;
  background: #20242d;
`;

export const CompleteSection = styled.section`
  flex: 1;
  min-height: 620px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 96px 24px 120px;
  background:
    radial-gradient(circle at 50% 35%, rgba(86, 96, 122, 0.18), transparent 32%),
    linear-gradient(180deg, #252936 0%, #1e222c 100%);
`;

export const Content = styled.div`
  width: min(100%, 720px);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

export const LogoImage = styled.img`
  display: block;
  width: min(100%, 260px);
  height: auto;
  object-fit: contain;

  @media (max-width: 640px) {
    width: min(100%, 220px);
  }
`;

export const Message = styled.p`
  margin: 54px 0 0;
  color: #b8c4df;
  font-size: 18px;
  font-weight: 800;
  line-height: 1.5;
`;

export const Description = styled.p`
  margin: 34px 0 0;
  color: #b8c4df;
  font-size: 18px;
  font-weight: 800;
  line-height: 1.65;

  @media (max-width: 640px) {
    font-size: 15px;
  }
`;
