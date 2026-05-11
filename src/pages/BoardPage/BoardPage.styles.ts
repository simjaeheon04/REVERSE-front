import styled from "styled-components";

export const Page = styled.section`
  min-height: calc(100vh - 70px);
  padding: 56px 24px 120px;
  background: linear-gradient(180deg, #2a2d36 0%, #373b46 100%);
`;

export const Inner = styled.div`
  max-width: 1140px;
  margin: 0 auto;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding-bottom: 18px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.18);

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const Title = styled.h1`
  margin: 0;
  color: #ffffff;
  font-size: 32px;
  font-weight: 800;
  line-height: 1.1;
`;

export const WriteButton = styled.button`
  min-width: 124px;
  height: 38px;
  padding: 0 18px;
  border: 1px solid rgba(255, 255, 255, 0.66);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.06);
  color: #ffffff;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    transform 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.14);
    transform: translateY(-1px);
  }
`;

export const List = styled.div`
  margin-top: 28px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const PostCard = styled.button`
  width: 100%;
  padding: 22px 24px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.06);
  color: #ffffff;
  text-align: left;
  cursor: pointer;
  transition:
    transform 0.2s ease,
    background-color 0.2s ease,
    border-color 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.28);
  }
`;

export const PostHeader = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 16px;
  align-items: flex-start;

  @media (max-width: 640px) {
    flex-direction: column;
  }
`;

export const PostTitle = styled.h2`
  margin: 0;
  color: #ffffff;
  font-size: 22px;
  font-weight: 800;
  line-height: 1.2;
`;

export const PostMeta = styled.span`
  color: rgba(255, 255, 255, 0.68);
  font-size: 13px;
  line-height: 1.4;
  white-space: nowrap;
`;

export const PostPreview = styled.p`
  margin: 14px 0 0;
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
  line-height: 1.6;
  white-space: pre-wrap;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const PostFooter = styled.div`
  display: flex;
  gap: 18px;
  margin-top: 16px;
  color: rgba(255, 255, 255, 0.62);
  font-size: 12px;
  font-weight: 600;
`;

