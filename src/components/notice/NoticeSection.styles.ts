import styled from "styled-components";

export const HeroSection = styled.section`
  position: relative;
  width: 100%;
  height: 200px;
  background: #2d303a;
`;

export const HeroTextWrap = styled.div`
  position: absolute;
  left: 50%;
  top: 52%;
  transform: translate(-50%, -50%);
  z-index: 2;
  text-align: center;
  padding-top: 60px;
`;

export const HeroTitle = styled.h1`
  margin: 0;
  color: #ffffff;
  font-size: 50px;
  font-weight: 550;
  letter-spacing: -0.04em;
`;

export const HeroDesc = styled.p`
  margin: 40px 0 0;
  color: #ffffff;
  font-size: 13px;
`;

export const Section = styled.section`
  width: 100%;
  padding: 50px 20px 112px;
  background: #2d303a;
  min-height: 900px;
`;

export const Inner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

export const TopLine = styled.div`
  width: 100%;
  height: 1px;
  background: #ffffff;
  margin-bottom: 100px;
`;

export const EmptyState = styled.div`
  width: 100%;
  max-width: 580px;
  min-height: 80px;
  display: grid;
  place-items: center;
  padding: 16px;
  border: 1px solid rgba(255, 255, 255, 0.24);
  background: rgba(135, 140, 156, 0.16);
  color: rgba(255, 255, 255, 0.82);
  font-size: 14px;
  text-align: center;
`;

export const TabList = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 40px;
  flex-wrap: wrap;
`;

export const TabButton = styled.button<{ $active: boolean }>`
  min-width: 40px;
  height: 30px;
  padding: 0 5px 0;
  border: ${({ $active }) =>
    $active ? "1px solid #ffffff" : "1px solid transparent"};
  background: transparent;
  color: ${({ $active }) => ($active ? "#ffffff" : "rgba(255,255,255,0.78)")};
  font-size: 11px;
  cursor: pointer;

  &:hover {
    color: #ffffff;
  }
`;

export const CardList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

export const Card = styled.button`
  width: 100%;
  max-width: 580px;
  min-height: 54px;
  padding: 6px 0 6px;
  border: 1px solid #ffffff;
  background: rgba(135, 140, 156, 0.3);
  cursor: pointer;
  text-align: left;
`;

export const CardRow = styled.div`
  min-height: 54px;
  padding: 0 18px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const MetaText = styled.span`
  color: rgba(255, 255, 255, 0.74);
  font-size: 11px;
`;

export const Title = styled.h3`
  margin: 0;
  color: #ffffff;
  font-size: 15px;
  font-weight: 700;
`;

export const Category = styled.span<{ $bgColor: string }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 16px;
  padding: 0 6px;
  background: ${({ $bgColor }) => $bgColor};
  color: #ffffff;
  font-size: 8px;
`;

export const ApplyText = styled.span`
  color: #ffffff;
  font-size: 10px;
`;

export const More = styled.span`
  color: #ffffff;
  font-size: 14px;
`;

export const Pagination = styled.div`
  margin-top: 34px;
  display: flex;
  justify-content: center;
  gap: 8px;
`;

export const PageNavButton = styled.button`
  border: none;
  background: transparent;
  color: rgba(255, 255, 255, 0.62);
  font-size: 10px;
  cursor: pointer;
`;

export const PageNumberButton = styled.button<{ $active: boolean }>`
  width: 18px;
  height: 18px;
  border: none;
  background: ${({ $active }) =>
    $active ? "rgba(255,255,255,0.18)" : "transparent"};
  color: #ffffff;
  font-size: 10px;
`;

export const PageDots = styled.span`
  color: rgba(255, 255, 255, 0.62);
`;

export const PageStaticNumber = styled.span`
  color: rgba(255, 255, 255, 0.62);
`;

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 999;
  background: rgba(0, 0, 0, 0.5);

  display: flex;
  justify-content: center;
  align-items: flex-start;

  padding-top: 360px;
  overflow-y: auto;
`;

export const ModalContainer = styled.div`
  position: relative;
  width: 620px;
  background: #2D303A;
  color: #ffffff;
  padding: 18px 18px 16px;
  box-sizing: border-box;

  border: 1px solid rgba(255, 255, 255, 0.08);
`;

export const Close = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  border: none;
  background: transparent;
  color: #ffffff;
  font-size: 12px;
  line-height: 1;
  cursor: pointer;
  padding: 0;
`;

export const ModalTopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding : 10px 0 10px;
  margin-bottom: 20px;
`;

export const ModalCategoryChip = styled.span<{ $bgColor: string }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 18px;
  height: 16px;
  padding: 0 4px;
  background: ${({ $bgColor }) => $bgColor};
  color: #ffffff;
  font-size: 10px;
  font-weight: 700;
  line-height: 1;
`;

export const ModalTopTitle = styled.span`
  color: #ffffff;
  font-size: 15px;
  font-weight: 400;
  line-height: 1;
`;

export const ModalDivider = styled.div`
  width: 100%;
  height: 1px;
  background: #ffffff;
  margin-bottom: 25px;
`;

export const ModalHeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 12px;
`;

export const ModalHeaderLeft = styled.div`
  flex: 1;
  min-width: 0;
  padding-right: 12px;
`;

export const ModalTitle = styled.h2`
  margin: 0;
  color: #ffffff;
  font-size: 34px;
  font-weight: 700;
  line-height: 1.08;
  letter-spacing: -0.03em;

  white-space: normal;
  word-break: keep-all;
  overflow-wrap: break-word;
`;

export const ModalSub = styled.p`
  margin: 15px 0 5px;
  color: rgba(255, 255, 255, 0.3);
  font-size: 14px;
  line-height: 1;
`;

export const Meta = styled.div`
  margin-top: 34px;
  display: flex;
  flex-direction: column;  
  align-items: flex-start;
  gap: 2px;
`;

export const AuthorText = styled.span`
  font-size: 8px;
  color: rgba(255, 255, 255, 0.85); 
  font-weight: 500;
  white-space: nowrap;
`;

export const DateText = styled.span`
  font-size: 8px;
  color: rgba(255, 255, 255, 0.5); 
  white-space: nowrap;
`;

export const ContentBox = styled.div`
  margin-top: 14px;
  width: 100%;
  min-height: 136px;
  max-height: 136px;
  border: 1px solid rgba(255, 255, 255, 0.38);
  padding: 8px 8px;
  color: #ffffff;
  font-size: 9px;
  line-height: 1.3;
  white-space: pre-wrap;
  word-break: break-word;
  overflow-y: auto;
  overflow-x: hidden;
  box-sizing: border-box;
`;

export const ImageBox = styled.div`
  margin-top: 12px;
  width: 100%;
  padding: 20px;
  background: rgb(231, 231, 231);
  box-sizing: border-box;

  img {
    width: 100%;
    height: 150px;
    object-fit: cover;
    display: block;
  }
`;
