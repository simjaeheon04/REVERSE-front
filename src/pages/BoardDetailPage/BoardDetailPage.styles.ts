import styled from "styled-components";

export const Page = styled.section`
  min-height: calc(100vh - 70px);
  padding: 54px 24px 0;
  background: linear-gradient(180deg, #2a2d36 0%, #373b46 100%);
`;

export const Inner = styled.div`
  max-width: 1240px;
  margin: 0 auto;
`;

export const ContentCard = styled.section`
  padding: 26px 28px 20px;
  background: rgba(151, 147, 167, 0.48);
`;

export const Title = styled.h1`
  margin: 0;
  color: #ffffff;
  font-size: 56px;
  font-weight: 800;
  line-height: 1.05;
`;

export const MetaRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 16px;
  margin-top: 14px;
  padding-bottom: 14px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.72);
`;

export const AuthorBlock = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const AuthorAvatar = styled.div`
  width: 34px;
  height: 34px;
  border-radius: 999px;
  background: linear-gradient(180deg, #ffd7e6 0%, #8ad7ff 100%);
  flex-shrink: 0;
`;

export const AuthorInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const AuthorName = styled.span`
  color: #ffffff;
  font-size: 15px;
  font-weight: 700;
`;

export const DateText = styled.span`
  color: rgba(255, 255, 255, 0.76);
  font-size: 14px;
`;

export const MetaActions = styled.div`
  color: rgba(255, 255, 255, 0.88);
  font-size: 18px;
`;

export const BodyBox = styled.div`
  margin-top: 14px;
  min-height: 274px;
  padding: 18px;
  border: 1px solid rgba(255, 255, 255, 0.72);
  box-sizing: border-box;
`;

export const BodyText = styled.div`
  color: #ffffff;
  font-size: 15px;
  line-height: 1.8;
  white-space: pre-wrap;
`;

export const AttachmentList = styled.div`
  margin-top: 22px;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const AttachmentItem = styled.div`
  color: #ffffff;
  font-size: 15px;
  line-height: 1.6;
`;

export const ActionBar = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
  margin-top: 12px;
`;

export const DownloadLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-width: 160px;
  height: 46px;
  padding: 0 18px;
  border: 1px solid rgba(79, 79, 79, 0.26);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.88);
  color: #7a5ab8;
  font-size: 14px;
  font-weight: 700;
  text-decoration: none;
  box-shadow: 0 2px 6px rgba(15, 18, 28, 0.14);
`;

export const LikeButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-width: 76px;
  height: 46px;
  padding: 0 12px;
  border: none;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.9);
  color: #7a5ab8;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
`;

export const CommentSection = styled.section`
  margin-top: 22px;
  padding-bottom: 42px;
`;

export const CommentHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: #ffffff;
  font-size: 14px;
  font-weight: 700;
`;

export const CommentComposer = styled.div`
  margin-top: 12px;
  padding: 14px 12px 12px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.88);
`;

export const ComposerTop = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #686868;
  font-size: 13px;
  font-weight: 600;
`;

export const ComposerAvatar = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 999px;
  background: linear-gradient(180deg, #8dd0ff 0%, #4b8dff 100%);
`;

export const ComposerInput = styled.textarea`
  width: 100%;
  min-height: 104px;
  margin-top: 12px;
  padding: 14px;
  border: none;
  border-radius: 4px;
  background: rgba(0, 0, 0, 0.08);
  color: #444444;
  font-size: 14px;
  resize: vertical;
  outline: none;
`;

export const ComposerActions = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
`;

export const ComposerSubmitButton = styled.button`
  min-width: 70px;
  height: 26px;
  padding: 0 10px;
  border: none;
  border-radius: 999px;
  background: #f0ebff;
  color: #7c5ac4;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
`;

export const Divider = styled.div`
  height: 1px;
  margin: 20px 0 22px;
  background: rgba(255, 255, 255, 0.48);
`;

export const CommentList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1px;
`;

export const CommentItem = styled.div<{ $depth: number }>`
  padding: 16px 18px 16px ${({ $depth }) => 18 + $depth * 42}px;
  background: rgba(255, 255, 255, 0.7);
`;

export const CommentRow = styled.div`
  display: flex;
  gap: 10px;
  align-items: flex-start;
`;

export const CommentAvatar = styled.div<{ $depth: number }>`
  width: 24px;
  height: 24px;
  border-radius: 999px;
  background: ${({ $depth }) =>
    $depth > 0
      ? "linear-gradient(180deg, #9df563 0%, #70bf26 100%)"
      : "linear-gradient(180deg, #ffd1df 0%, #73d4ff 100%)"};
  flex-shrink: 0;
`;

export const CommentContent = styled.div`
  min-width: 0;
`;

export const CommentAuthor = styled.div`
  color: #6a6a6a;
  font-size: 12px;
  font-weight: 700;
`;

export const CommentDate = styled.div`
  margin-top: 2px;
  color: #9a9a9a;
  font-size: 11px;
`;

export const CommentText = styled.p`
  margin: 8px 0 0;
  color: #4a4a4a;
  font-size: 13px;
  line-height: 1.6;
  white-space: pre-wrap;
`;

export const BackButton = styled.button`
  min-width: 120px;
  height: 38px;
  padding: 0 18px;
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.06);
  color: #ffffff;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
`;

export const EmptyState = styled.div`
  padding: 40px 24px 80px;
  color: #ffffff;
`;
