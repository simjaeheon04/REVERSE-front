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

export const ImageList = styled.div`
  margin-top: 22px;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const ImageItem = styled.img`
  width: 100%;
  max-height: 560px;
  object-fit: cover;
  border-radius: 8px;
`;

export const FileList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-top: 28px;
`;

export const FileItem = styled.a`
  width: fit-content;
  color: #ffffff;
  font-size: 15px;
  font-weight: 600;
  line-height: 1.5;
  text-decoration: underline;
  text-underline-offset: 3px;
`;

export const ActionBar = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
  margin-top: 12px;
`;

export const LikeButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-width: 76px;
  height: 46px;
  padding: 0 16px;
  border: none;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.9);
  color: #7a5ab8;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;

  &:disabled {
    cursor: default;
    opacity: 0.85;
  }
`;

export const DownloadButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-width: 142px;
  height: 46px;
  padding: 0 18px;
  border: none;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.9);
  color: #7a5ab8;
  font-size: 14px;
  font-weight: 800;
  cursor: pointer;
  box-shadow: 0 3px 8px rgba(41, 29, 84, 0.22);
`;

export const ActionIcon = styled.img`
  width: 18px;
  height: 18px;
  object-fit: contain;
  flex-shrink: 0;
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
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  grid-template-rows: auto auto;
  column-gap: 14px;
  row-gap: 8px;
  padding: 15px 12px 7px;
  border-radius: 10px;
  background: #d9d9d9;
  align-items: start;
  width: 100%;
  box-sizing: border-box;
`;

export const ReplyComposer = styled(CommentComposer)`
  margin-top: 12px;
  padding: 0;
  background: transparent;
`;

export const ComposerTop = styled.div`
  position: relative;
  display: flex;
  align-items: flex-start;
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

export const ComposerName = styled.span`
  position: absolute;
  left: 42px;
  top: 4px;
  min-width: 120px;
  color: #6a6a6a;
  font-size: 12px;
  font-weight: 700;
  line-height: 1;
  white-space: nowrap;
`;

export const ComposerInput = styled.textarea<{ $isMainComposer?: boolean }>`
  display: block;
  width: 100%;
  height: ${({ $isMainComposer }) => ($isMainComposer ? "165px" : "132px")};
  min-height: ${({ $isMainComposer }) => ($isMainComposer ? "165px" : "132px")};
  max-height: ${({ $isMainComposer }) => ($isMainComposer ? "165px" : "132px")};
  margin-top: ${({ $isMainComposer }) => ($isMainComposer ? "24px" : "0")};
  padding: ${({ $isMainComposer }) => ($isMainComposer ? "12px 18px" : "12px 14px")};
  border: none;
  border-radius: 6px;
  background: ${({ $isMainComposer }) =>
    $isMainComposer ? "#bcbcbc" : "rgba(188, 188, 188, 0.82)"};
  color: #ffffff;
  font-size: 14px;
  resize: none;
  outline: none;
  overflow-y: auto;
  box-sizing: border-box;

  &::placeholder {
    color: rgba(255, 255, 255, 0.85);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.8;
  }
`;

export const ComposerActions = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
  margin-top: 0;
  grid-column: 2 / 3;
  justify-self: stretch;
  align-self: end;
  min-height: 36px;
`;

export const ComposerSubmitButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  min-width: 86px;
  height: 36px;
  padding: 0 16px;
  border: 1px solid rgba(79, 55, 138, 0.28);
  border-radius: 14px;
  background: #fbf8ff;
  color: #4f378a;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 3px 8px rgba(41, 29, 84, 0.22);

  &:disabled {
    cursor: default;
    opacity: 0.7;
  }
`;

export const ComposerCancelButton = styled.button`
  min-width: 66px;
  height: 32px;
  padding: 0 14px;
  border: 1px solid rgba(79, 55, 138, 0.18);
  border-radius: 12px;
  background: #ffffff;
  color: #4f378a;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(41, 29, 84, 0.12);
`;

export const ButtonIcon = styled.img`
  width: 15px;
  height: 15px;
  object-fit: contain;
  flex-shrink: 0;
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
  background: ${({ $depth }) => ($depth > 0 ? "#b7b7b7" : "#a9a9ac")};
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
  width: 100%;
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

export const CommentActions = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 10px;
`;

export const CommentActionButton = styled.button`
  min-width: 66px;
  height: 28px;
  padding: 0 10px;
  border: 1px solid rgba(255, 255, 255, 0.72);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.08);
  color: rgba(255, 255, 255, 0.88);
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;

  &:disabled {
    cursor: default;
    opacity: 0.6;
  }
`;

export const ReplyMark = styled.span`
  display: inline-flex;
  align-items: center;
  margin-right: 10px;
  color: #585b63;
  font-size: 28px;
  line-height: 1;
  transform: translateY(-2px);
`;

export const CommentEmptyText = styled.p`
  margin: 0;
  color: rgba(255, 255, 255, 0.76);
  font-size: 14px;
  line-height: 1.6;
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
