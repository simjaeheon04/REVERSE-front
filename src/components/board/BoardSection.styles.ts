import styled from "styled-components";
import noticeBg from "../../assets/images/notice-bg.jpg";

export const HeroSection = styled.section`
  position: relative;
  width: 100%;
  min-height: 260px;
  background: #2d303a url(${noticeBg}) center / cover no-repeat;
  overflow: hidden;
`;

export const HeroOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(30, 33, 42, 0.72);
`;

export const HeroTextWrap = styled.div`
  position: relative;
  z-index: 1;
  min-height: 260px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 64px 20px 36px;
  box-sizing: border-box;
`;

export const HeroTitle = styled.h1`
  margin: 0;
  color: #ffffff;
  font-size: 50px;
  font-weight: 700;
  line-height: 1.1;
`;

export const HeroDesc = styled.p`
  margin: 22px 0 0;
  color: rgba(255, 255, 255, 0.88);
  font-size: 13px;
  line-height: 1.65;
`;

export const Section = styled.section`
  width: 100%;
  min-height: 860px;
  padding: 50px 20px 86px;
  background: #2d303a;
  box-sizing: border-box;
`;

export const Inner = styled.div`
  position: relative;
  max-width: 720px;
  margin: 0 auto;
`;

export const Toolbar = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 18px;
  align-items: start;
  margin-bottom: 42px;

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`;

export const CategoryList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
`;

export const CategoryButton = styled.button<{ $active: boolean }>`
  min-width: 32px;
  height: 22px;
  padding: 0 8px;
  border: ${({ $active }) =>
    $active ? "1px solid rgba(255, 255, 255, 0.84)" : "1px solid transparent"};
  background: ${({ $active }) =>
    $active ? "rgba(255, 255, 255, 0.08)" : "rgba(255, 255, 255, 0.78)"};
  color: ${({ $active }) => ($active ? "#ffffff" : "#50535d")};
  font-size: 10px;
  font-weight: 600;
  cursor: pointer;
`;

export const SearchArea = styled.div`
  display: flex;
  align-items: start;
  gap: 10px;
  justify-content: flex-end;

  @media (max-width: 760px) {
    justify-content: flex-start;
  }
`;

export const Select = styled.select`
  width: 78px;
  height: 30px;
  border: 1px solid rgba(30, 33, 42, 0.24);
  border-radius: 4px;
  background: rgba(223, 225, 232, 0.95);
  color: #565b68;
  font-size: 10px;
  padding: 0 8px;
  outline: none;
`;

export const SearchBox = styled.div`
  width: 190px;
  height: 30px;
  display: flex;
  align-items: center;
  border-radius: 999px;
  background: #ffffff;
  overflow: hidden;
`;

export const SearchInput = styled.input`
  min-width: 0;
  flex: 1;
  height: 100%;
  border: none;
  padding: 0 10px 0 14px;
  color: #4d5260;
  font-size: 10px;
  outline: none;

  &::placeholder {
    color: rgba(65, 70, 82, 0.48);
  }
`;

export const SearchButton = styled.button`
  width: 30px;
  height: 30px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: transparent;
  cursor: pointer;
`;

export const SearchIcon = styled.span`
  width: 10px;
  height: 10px;
  border: 1.5px solid #4d5260;
  border-radius: 50%;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    width: 5px;
    height: 1.5px;
    right: -4px;
    bottom: -2px;
    background: #4d5260;
    transform: rotate(45deg);
    border-radius: 999px;
  }
`;

export const PostList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

export const PostCard = styled.button`
  width: 100%;
  min-height: 64px;
  padding: 10px 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  border: 1px solid rgba(255, 255, 255, 0.78);
  border-radius: 4px;
  background: rgba(135, 140, 156, 0.28);
  color: #ffffff;
  text-align: left;
  cursor: pointer;
  box-sizing: border-box;
`;

export const PostInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-width: 0;
`;

export const PostTitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
`;

export const PostTitle = styled.h2`
  margin: 0;
  color: #ffffff;
  font-size: 15px;
  font-weight: 700;
  line-height: 1;
`;

export const PostCategory = styled.span`
  height: 16px;
  padding: 0 6px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.76);
  color: #666b78;
  font-size: 8px;
  font-weight: 700;
  white-space: nowrap;
`;

export const MetaRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const Avatar = styled.span<{ $color: string }>`
  width: 20px;
  height: 20px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: ${({ $color }) => $color};
  color: #ffffff;
  font-size: 9px;
  font-weight: 700;
`;

export const MetaText = styled.span`
  display: flex;
  flex-direction: column;
  gap: 2px;
  color: rgba(255, 255, 255, 0.72);
  font-size: 8px;
  line-height: 1.15;
`;

export const ApplyText = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #ffffff;
  font-size: 10px;
  white-space: nowrap;
`;

export const Arrow = styled.span`
  width: 5px;
  height: 5px;
  border-top: 1px solid currentColor;
  border-right: 1px solid currentColor;
  transform: rotate(45deg);
`;

export const Pagination = styled.div`
  margin-top: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

export const PageNavButton = styled.button`
  border: none;
  background: transparent;
  color: rgba(255, 255, 255, 0.62);
  font-size: 10px;
  cursor: pointer;

  &:disabled {
    cursor: default;
    opacity: 0.42;
  }
`;

export const PageNumberButton = styled.button<{ $active: boolean }>`
  width: 18px;
  height: 18px;
  border: none;
  border-radius: 2px;
  background: ${({ $active }) =>
    $active ? "rgba(255, 255, 255, 0.18)" : "transparent"};
  color: #ffffff;
  font-size: 10px;
  cursor: pointer;
`;

export const PageDots = styled.span`
  color: rgba(255, 255, 255, 0.62);
  font-size: 10px;
`;

export const PageStaticNumber = styled.span`
  color: rgba(255, 255, 255, 0.62);
  font-size: 10px;
`;

export const WriteButton = styled.button`
  position: absolute;
  right: -90px;
  bottom: 28px;
  width: 58px;
  height: 58px;
  border: 1px solid rgba(255, 255, 255, 0.82);
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.24);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  @media (max-width: 980px) {
    right: 0;
    bottom: -78px;
  }
`;

export const WriteIcon = styled.span`
  width: 22px;
  height: 22px;
  position: relative;
  border: 2px solid #ffffff;
  border-radius: 3px;

  &::before {
    content: "";
    position: absolute;
    width: 18px;
    height: 2px;
    right: -8px;
    top: 2px;
    background: #ffffff;
    transform: rotate(-45deg);
    transform-origin: right center;
    border-radius: 999px;
  }

  &::after {
    content: "";
    position: absolute;
    right: -10px;
    top: -3px;
    width: 5px;
    height: 5px;
    background: #ffffff;
    transform: rotate(-45deg);
  }
`;
