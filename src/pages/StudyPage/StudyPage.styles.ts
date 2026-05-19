import styled from "styled-components";

export const Page = styled.main`
  min-height: calc(100vh - 70px);
  padding: 42px 24px 0;
  background:
    radial-gradient(circle at 50% 24%, rgba(255, 255, 255, 0.05), transparent 34%),
    linear-gradient(180deg, #282c36 0%, #20242d 100%);
  color: #f7f7fb;
`;

export const Inner = styled.div`
  width: min(100%, 1128px);
  margin: 0 auto;
`;

export const Hero = styled.header`
  text-align: center;
`;

export const Eyebrow = styled.p`
  margin: 0 0 6px;
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
  line-height: 0.85;
  letter-spacing: 0;
`;

export const ControlRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 24px;
  margin-top: 28px;

  @media (max-width: 700px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const SelectWrap = styled.div`
  position: relative;
  width: 126px;
  z-index: 5;
`;

export const SemesterButton = styled.button`
  width: 100%;
  height: 38px;
  padding: 0 16px;
  border: 1px solid rgba(255, 255, 255, 0.76);
  border-radius: 999px;
  background: transparent;
  color: #ffffff;
  font-size: 13px;
  font-weight: 700;
  outline: none;
  cursor: pointer;
`;

export const SemesterMenu = styled.div`
  position: absolute;
  top: 43px;
  left: 50%;
  width: 112px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.42);
  border-radius: 8px;
  background: rgba(226, 228, 235, 0.92);
  transform: translateX(-50%);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
`;

export const SemesterOption = styled.button`
  width: 100%;
  height: 30px;
  padding: 0 10px;
  border: none;
  border-bottom: 1px solid rgba(62, 66, 78, 0.14);
  background: transparent;
  color: #575c68;
  font-size: 11px;
  font-weight: 800;
  text-align: left;
  cursor: pointer;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.48);
  }
`;

export const SearchBox = styled.label`
  display: flex;
  align-items: center;
  width: min(100%, 430px);
  height: 40px;
  padding: 0 16px 0 22px;
  border-radius: 999px;
  background: #f0edf6;
`;

export const SearchInput = styled.input`
  flex: 1;
  min-width: 0;
  border: none;
  background: transparent;
  color: #4d5060;
  font-size: 13px;
  font-weight: 600;
  outline: none;

  &::placeholder {
    color: #aaa8b4;
  }
`;

export const SearchIcon = styled.span`
  width: 18px;
  height: 18px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-left: 10px;
  border: 1px solid #4d5060;
  border-radius: 999px;
  color: #4d5060;
  font-size: 10px;
  font-weight: 900;
`;

export const Divider = styled.div`
  height: 1px;
  margin: 40px 0 22px;
  background: rgba(255, 255, 255, 0.58);
`;

export const ContentArea = styled.section`
  min-height: 430px;
  position: relative;
`;

export const StudyGrid = styled.div`
  width: min(100%, 900px);
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 34px 42px;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 580px) {
    grid-template-columns: 1fr;
  }
`;

export const StudyCard = styled.button`
  overflow: hidden;
  min-height: 176px;
  padding: 0;
  border: none;
  border-radius: 10px;
  background: #5a5f69;
  text-align: left;
  cursor: pointer;
  box-shadow: 0 16px 28px rgba(0, 0, 0, 0.18);
  transition:
    transform 0.2s ease,
    filter 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    filter: brightness(1.06);
  }
`;

export const StudyImage = styled.img`
  display: block;
  width: 100%;
  height: 128px;
  object-fit: cover;
`;

export const StudyInfo = styled.div`
  min-height: 48px;
  padding: 12px 16px;
  background: rgba(94, 99, 110, 0.96);
`;

export const StudyTitle = styled.h2`
  margin: 0;
  color: #ffffff;
  font-family: "Jersey 25", "Noto Sans KR", sans-serif;
  font-size: 20px;
  font-weight: 400;
  line-height: 1.2;
  letter-spacing: 0;
`;

export const StudySummary = styled.p`
  margin: 6px 0 0;
  color: rgba(255, 255, 255, 0.76);
  font-size: 11px;
  line-height: 1.35;
`;

export const EmptyState = styled.div`
  min-height: 386px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  color: #ffffff;
`;

export const EmptyIcon = styled.span`
  width: 18px;
  height: 18px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #ffffff;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 900;
`;

export const EmptyText = styled.p`
  margin: 0;
  color: #ffffff;
  font-size: 14px;
  font-weight: 700;
`;

export const Pagination = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin-top: 34px;
  color: rgba(255, 255, 255, 0.66);
  font-size: 11px;
`;

export const PageButton = styled.button<{ $active?: boolean }>`
  min-width: 18px;
  height: 18px;
  border: none;
  background: transparent;
  color: ${({ $active }) => ($active ? "#ffffff" : "rgba(255, 255, 255, 0.62)")};
  font-size: 11px;
  font-weight: ${({ $active }) => ($active ? 800 : 600)};
  cursor: pointer;
`;

export const WriteButton = styled.button`
  position: absolute;
  right: 8px;
  bottom: 8px;
  width: 52px;
  height: 52px;
  border: 1px solid rgba(255, 255, 255, 0.48);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.16);
  color: #ffffff;
  font-size: 24px;
  line-height: 1;
  cursor: pointer;
`;
