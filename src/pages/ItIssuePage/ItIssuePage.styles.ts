import styled from "styled-components";

export const Page = styled.main`
  min-height: calc(100vh - 70px);
  padding: 42px 24px 0;
  background:
    radial-gradient(circle at 50% 22%, rgba(255, 255, 255, 0.05), transparent 34%),
    linear-gradient(180deg, #282c36 0%, #20242d 100%);
  color: #f7f7fb;
`;

export const Inner = styled.div`
  width: min(100%, 1128px);
  margin: 0 auto;
`;

export const Hero = styled.header`
  text-align: center;
  padding-top: 16px;
`;

export const Eyebrow = styled.p`
  margin: 0 0 8px;
  color: #ffffff;
  font-family: "Jersey 25", "Noto Sans KR", sans-serif;
  font-size: 26px;
  line-height: 1;
  letter-spacing: 0;
`;

export const Title = styled.h1`
  margin: 0;
  color: #d7d8ef;
  font-family: "Jersey 25", "Noto Sans KR", sans-serif;
  font-size: clamp(58px, 8vw, 86px);
  font-weight: 400;
  line-height: 0.86;
  letter-spacing: 0;
`;

export const Subtitle = styled.p`
  margin: 24px 0 0;
  color: rgba(231, 231, 247, 0.82);
  font-size: 18px;
  font-weight: 800;
`;

export const Divider = styled.div`
  height: 1px;
  margin: 40px 0 48px;
  background: rgba(255, 255, 255, 0.58);
`;

export const IssueGrid = styled.section`
  width: min(100%, 920px);
  min-height: 430px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 34px 48px;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 580px) {
    grid-template-columns: 1fr;
  }
`;

export const IssueCard = styled.article`
  overflow: hidden;
  border-radius: 10px;
  background: #5a5f69;
  box-shadow: 0 16px 28px rgba(0, 0, 0, 0.18);
`;

export const CardImage = styled.img`
  display: block;
  width: 100%;
  height: 128px;
  object-fit: cover;
`;

export const CardBody = styled.div`
  min-height: 66px;
  padding: 12px 16px 11px;
  background: rgba(94, 99, 110, 0.96);
`;

export const CardTitle = styled.h2`
  margin: 0;
  color: #ffffff;
  font-size: 14px;
  font-weight: 800;
  line-height: 1.2;
`;

export const TitleRule = styled.div`
  width: 94px;
  height: 1px;
  margin: 8px 0 8px;
  background: rgba(255, 255, 255, 0.78);
`;

export const CardFooter = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const LinkButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 0;
  border: none;
  background: transparent;
  color: #ffffff;
  font-family: "Jersey 25", "Noto Sans KR", sans-serif;
  font-size: 12px;
  font-weight: 400;
  cursor: pointer;
`;

export const EmptyState = styled.div`
  grid-column: 1 / -1;
  min-height: 320px;
  display: grid;
  place-items: center;
  color: rgba(255, 255, 255, 0.82);
  font-size: 14px;
  font-weight: 800;
`;
