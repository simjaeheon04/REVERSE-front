import styled from "styled-components";

const textColor = "#B1B8C3";

export const Footer = styled.footer`
  width: 100%;
  background: linear-gradient(180deg, #4a4f61 0%, #11141b 100%);
  padding: 48px 32px 54px;
`;

export const Inner = styled.div`
  max-width: 1080px;
  margin: 0 auto;
`;

export const TopRow = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  margin-bottom: 34px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    justify-items: center;
    gap: 18px;
    margin-bottom: 30px;
  }
`;

export const TopSpacer = styled.div`
  @media (max-width: 900px) {
    display: none;
  }
`;

export const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 26px;

  @media (max-width: 900px) {
    flex-wrap: wrap;
    gap: 14px 22px;
  }
`;

export const NavButton = styled.button`
  padding: 0;
  border: none;
  background: none;
  color: ${textColor};
  font-size: 11px;
  font-weight: 600;
  line-height: 1;
  cursor: pointer;
  white-space: nowrap;
`;

export const IconButton = styled.button`
  justify-self: end;
  width: 24px;
  height: 24px;
  padding: 0;
  border: none;
  background: none;
  color: ${textColor};
  cursor: pointer;

  @media (max-width: 900px) {
    justify-self: center;
  }
`;

export const InstagramIcon = styled.svg`
  width: 16px;
  height: 16px;
  display: block;
`;

export const BottomBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

export const BrandRow = styled.div`
  display: flex;
  align-items: center;
  gap: 36px;

  @media (max-width: 900px) {
    gap: 20px;
  }
`;

export const LogoButton = styled.button`
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
  flex-shrink: 0;
`;

export const LogoImage = styled.img`
  display: block;
  width: 40px;
  height: auto;
  object-fit: contain;
`;

export const Divider = styled.div`
  flex: 1;
  height: 1px;
  background: rgba(177, 184, 195, 0.58);
`;

export const BottomRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
  padding-left: 76px;

  @media (max-width: 900px) {
    padding-left: 0;
    gap: 14px;
  }
`;

export const CopyText = styled.p`
  margin: 0;
  color: ${textColor};
  font-size: 11px;
  font-weight: 400;
  line-height: 1.4;
`;

export const PolicyList = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;
  flex-wrap: wrap;
`;

export const PolicyButton = styled.button`
  padding: 0;
  border: none;
  background: none;
  color: ${textColor};
  font-size: 11px;
  font-weight: 400;
  line-height: 1.4;
  text-decoration: underline;
  cursor: pointer;
`;
