import styled from "styled-components";

export const Page = styled.main`
  position: relative;
  min-height: calc(100vh - 70px);
  padding: 58px 24px 68px;
  background:
    radial-gradient(circle at 50% 30%, rgba(255, 255, 255, 0.04), transparent 34%),
    linear-gradient(180deg, #262a33 0%, #20242c 100%);
  color: #f7f7fb;
`;

export const Inner = styled.div`
  position: relative;
  width: min(100%, 1128px);
  margin: 0 auto;
`;

export const Hero = styled.header`
  text-align: center;
`;

export const Eyebrow = styled.p`
  margin: 0 0 10px;
  color: #ffffff;
  font-size: 26px;
  font-weight: 900;
  line-height: 1;
  letter-spacing: 0.05em;
`;

export const Title = styled.h1`
  margin: 0;
  color: #d9d8e7;
  font-size: clamp(48px, 7vw, 72px);
  font-weight: 900;
  line-height: 0.95;
  letter-spacing: 0.04em;
  text-shadow: 0 2px 0 rgba(255, 255, 255, 0.08);
`;

export const ControlRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 38px;
  margin-top: 34px;

  @media (max-width: 720px) {
    flex-direction: column;
    gap: 16px;
    align-items: stretch;
  }
`;

export const SemesterSelect = styled.select`
  width: 122px;
  height: 46px;
  padding: 0 18px;
  border: 1px solid rgba(255, 255, 255, 0.78);
  border-radius: 999px;
  background: transparent;
  color: #ffffff;
  font-size: 14px;
  font-weight: 700;
  text-align: center;
  outline: none;
  appearance: none;
  cursor: pointer;

  option {
    color: #20242c;
  }

  @media (max-width: 720px) {
    width: 100%;
  }
`;

export const SearchBox = styled.label`
  display: flex;
  align-items: center;
  width: min(100%, 420px);
  height: 48px;
  padding: 0 18px 0 22px;
  border-radius: 999px;
  background: #f1edf7;
  box-sizing: border-box;
`;

export const SearchInput = styled.input`
  flex: 1;
  min-width: 0;
  border: none;
  background: transparent;
  color: #4e4a59;
  font-size: 14px;
  font-weight: 600;
  outline: none;

  &::placeholder {
    color: #b9b4c1;
  }
`;

export const SearchIconText = styled.span`
  margin-left: 12px;
  color: #242733;
  font-size: 11px;
  font-weight: 800;
  white-space: nowrap;
`;

export const Divider = styled.div`
  height: 1px;
  margin: 48px 0 28px;
  background: rgba(255, 255, 255, 0.58);
`;

export const ProjectGrid = styled.div`
  width: min(100%, 860px);
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 32px 42px;

  @media (max-width: 820px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    width: min(100%, 620px);
  }

  @media (max-width: 520px) {
    grid-template-columns: 1fr;
    width: min(100%, 320px);
  }
`;

export const ProjectCard = styled.button`
  overflow: hidden;
  padding: 0;
  border: none;
  border-radius: 11px;
  background: #5a5f6a;
  text-align: left;
  cursor: pointer;
  box-shadow: 0 14px 26px rgba(0, 0, 0, 0.16);
`;

export const ProjectImage = styled.img`
  display: block;
  width: 100%;
  height: 192px;
  object-fit: cover;
`;

export const ProjectInfo = styled.div`
  min-height: 66px;
  padding: 10px 14px 12px;
  background: #575c66;
  color: #ffffff;
  box-sizing: border-box;
`;

export const ProjectTitle = styled.h2`
  margin: 0;
  color: #ffffff;
  font-size: 14px;
  font-weight: 700;
  line-height: 1.2;
`;

export const ProjectRule = styled.div`
  width: 94px;
  height: 1px;
  margin: 8px 0 7px;
  background: rgba(255, 255, 255, 0.78);
`;

export const ProjectDescription = styled.p`
  margin: 0;
  color: rgba(255, 255, 255, 0.82);
  font-size: 10px;
  font-weight: 500;
  line-height: 1.3;
`;

export const Pagination = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin-top: 38px;
`;

export const PageNavButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 7px;
  border: none;
  background: transparent;
  color: rgba(255, 255, 255, 0.72);
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;

  &:disabled {
    cursor: default;
    opacity: 0.36;
  }
`;

export const PageNumberButton = styled.button<{ $active: boolean }>`
  min-width: 28px;
  height: 28px;
  padding: 0 8px;
  border: none;
  border-radius: 8px;
  background: ${({ $active }) => ($active ? "rgba(255, 255, 255, 0.18)" : "transparent")};
  color: ${({ $active }) => ($active ? "#ffffff" : "rgba(255, 255, 255, 0.68)")};
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
`;

export const PageDots = styled.span`
  color: rgba(255, 255, 255, 0.68);
  font-size: 13px;
  font-weight: 700;
`;

export const EmptyState = styled.div`
  min-height: 356px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  color: #ffffff;
`;

export const EmptyIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-size: 12px;
  font-weight: 900;
  white-space: nowrap;
`;

export const EmptyText = styled.p`
  margin: 0;
  color: #ffffff;
  font-size: 16px;
  font-weight: 700;
`;

export const WriteButton = styled.button`
  position: absolute;
  right: 0;
  bottom: 6px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 52px;
  height: 52px;
  border: 1px solid rgba(255, 255, 255, 0.62);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.16);
  color: #ffffff;
  font-size: 10px;
  font-weight: 900;
  cursor: pointer;
  backdrop-filter: blur(8px);

  @media (max-width: 720px) {
    position: fixed;
    right: 18px;
    bottom: 18px;
  }
`;
