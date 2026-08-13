import styled from "styled-components";

export const Wrapper = styled.header`
  width: 100%;
  display: flex;
  justify-content: center;
  position: sticky;
  top: 0;
  z-index: 100;
  margin: 0;
  padding: 0;
  border-top: 1px solid rgba(255, 255, 255, 0.18);
`;

export const Container = styled.div`
  width: 100%;
  min-height: 70px;
  padding: 0 28px 0 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  background: rgba(193, 191, 222, 0.2);
  backdrop-filter: blur(18px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
`;

export const Logo = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  color: #fff;
  font-size: 28px;
  font-weight: 900;
  padding: 0;
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

export const RightArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 34px;
  margin-left: auto;
  flex: 1;
`;

export const NavArea = styled.div`
  display: flex;
  align-items: center;
`;

export const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 28px;
  min-height: 70px;
  transform: translateY(2px);
`;

export const AuthButtonGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
`;

export const MenuItem = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
`;

export const MenuButton = styled.button<{ $active?: boolean }>`
  border: none;
  background: none;
  cursor: pointer;
  color: ${({ $active }) =>
    $active ? "#f2f4fa" : "rgba(255, 255, 255, 0.52)"};
  font-size: 13px;
  font-weight: 400;
  line-height: 1;
  padding: 0;
  padding-bottom: 6px;
  border-bottom: 1px solid
    ${({ $active }) =>
      $active ? "rgba(255, 255, 255, 0.82)" : "rgba(255, 255, 255, 0.34)"};
  transition: color 0.2s ease, border-color 0.2s ease;

  &:hover {
    color: #f2f4fa;
    border-bottom-color: rgba(255, 255, 255, 0.82);
  }
`;

export const LoginButton = styled.button`
  min-width: 102px;
  height: 30px;
  padding: 0 26px;
  border: none;
  border-radius: 999px;
  cursor: pointer;
  color: #4f5367;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  background: #eef4ff;
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.3);
  transition: background-color 0.2s ease, color 0.2s ease,
    transform 0.2s ease;

  &:hover {
    background: #ffffff;
    color: #373b4c;
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }
`;

export const MegaMenuWrap = styled.div`
  position: fixed;
  top: 70px;
  right: 0;
  width: min(100vw, 1180px);
  padding: 28px 22px 24px;
  box-sizing: border-box;
  background: linear-gradient(180deg, #1f1f1f 0%, #525660 100%);
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.24);
  z-index: 20;

  @media (max-width: 1280px) {
    right: 0;
    width: min(100vw, 1040px);
    padding: 24px 16px 22px;
  }

  @media (max-width: 960px) {
    right: 0;
    width: min(100vw, 760px);
    padding: 22px 14px 20px;
  }
`;

export const MegaMenuInner = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0;

  @media (max-width: 960px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

export const Column = styled.div`
  min-width: 0;
  padding: 0 24px 0 28px;
  min-height: 336px;

  & + & {
    border-left: 1px solid rgba(255, 255, 255, 0.62);
  }

  @media (max-width: 1280px) {
    padding: 0 18px 0 22px;
  }

  @media (max-width: 960px) {
    min-height: auto;
    padding: 0 16px 20px 18px;

    & + & {
      border-left: none;
    }

    &:nth-child(2n) {
      border-left: 1px solid rgba(255, 255, 255, 0.62);
    }
  }

  @media (max-width: 640px) {
    padding: 0 14px 18px 16px;
  }
`;

export const ColumnTitle = styled.h3`
  margin: 0 0 28px;
  color: rgba(255, 255, 255, 0.96);
  font-size: 14px;
  font-weight: 700;
  line-height: 1;

  @media (max-width: 1280px) {
    margin-bottom: 22px;
  }
`;

export const Section = styled.div`
  & + & {
    margin-top: 24px;
  }
`;

export const SectionHeading = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
`;

export const SectionIcon = styled.img`
  width: 18px;
  height: 18px;
  object-fit: contain;
  flex-shrink: 0;
`;

export const SectionTitle = styled.h4`
  margin: 0;
  color: rgba(255, 255, 255, 0.96);
  font-size: 16px;
  font-weight: 700;
  line-height: 1.2;

  @media (max-width: 1280px) {
    font-size: 15px;
  }
`;

export const SubItemList = styled.ul`
  list-style: none;
  padding: 0 0 0 28px;
  margin: 0;

  @media (max-width: 1280px) {
    padding-left: 24px;
  }
`;

export const SubItem = styled.li`
`;

export const SubItemButton = styled.button`
  width: 100%;
  padding: 0;
  border: none;
  background: none;
  color: rgba(255, 255, 255, 0.82);
  font-size: 14px;
  font-weight: 400;
  line-height: 1.9;
  text-align: left;
  cursor: pointer;

  &:disabled {
    cursor: default;
  }

  &:not(:disabled):hover {
    color: #ffffff;
    text-decoration: underline;
  }

  @media (max-width: 1280px) {
    font-size: 13px;
    line-height: 1.8;
  }
`;
