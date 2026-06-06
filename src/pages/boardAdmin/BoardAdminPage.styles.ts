import styled from "styled-components";

export const Page = styled.main`
  min-height: calc(100vh - 120px);
  padding: 48px 24px 96px;
  background:
    radial-gradient(circle at top left, rgba(99, 117, 204, 0.18), transparent 32%),
    linear-gradient(180deg, #10131b 0%, #141a24 100%);
  color: #eef2ff;
`;

export const Shell = styled.div`
  width: min(1120px, 100%);
  margin: 0 auto;
  display: grid;
  gap: 24px;
`;

export const Header = styled.header`
  display: grid;
  gap: 10px;
`;

export const Eyebrow = styled.span`
  color: #9cb0ff;
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 0.08em;
`;

export const Title = styled.h1`
  margin: 0;
  color: #ffffff;
  font-size: clamp(32px, 4vw, 48px);
  font-weight: 800;
`;

export const Description = styled.p`
  margin: 0;
  max-width: 760px;
  color: rgba(238, 242, 255, 0.76);
  font-size: 16px;
  line-height: 1.6;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 24px;

  @media (max-width: 820px) {
    grid-template-columns: 1fr;
  }
`;

export const Card = styled.section`
  display: grid;
  gap: 18px;
  padding: 24px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 24px;
  background: rgba(14, 18, 28, 0.84);
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.22);
`;

export const Toolbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;

  @media (max-width: 720px) {
    align-items: flex-start;
    flex-direction: column;
  }
`;

export const CardTitle = styled.h2`
  margin: 0;
  color: #ffffff;
  font-size: 22px;
  font-weight: 800;
`;

export const CardText = styled.p`
  margin: 0;
  color: rgba(238, 242, 255, 0.7);
  font-size: 14px;
  line-height: 1.6;
`;

export const Field = styled.label`
  display: grid;
  gap: 8px;
`;

export const FieldLabel = styled.span`
  color: rgba(238, 242, 255, 0.9);
  font-size: 14px;
  font-weight: 700;
`;

export const Input = styled.input`
  width: 100%;
  box-sizing: border-box;
  padding: 14px 16px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 14px;
  background: #0e1320;
  color: #eef2ff;
  font-size: 15px;

  &::placeholder {
    color: rgba(238, 242, 255, 0.32);
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  min-height: 112px;
  box-sizing: border-box;
  padding: 14px 16px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 14px;
  background: #0e1320;
  color: #eef2ff;
  font-size: 15px;
  line-height: 1.6;
  resize: vertical;

  &::placeholder {
    color: rgba(238, 242, 255, 0.32);
  }
`;

export const ButtonRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

export const PrimaryButton = styled.button`
  padding: 13px 18px;
  border: none;
  border-radius: 14px;
  background: linear-gradient(135deg, #8b9cff 0%, #6e80eb 100%);
  color: #0f1428;
  font-size: 14px;
  font-weight: 800;
  cursor: pointer;

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }
`;

export const SecondaryButton = styled.button`
  padding: 13px 18px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 14px;
  background: #171d2b;
  color: #eef2ff;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }
`;

export const DangerButton = styled.button`
  padding: 13px 18px;
  border: 1px solid rgba(255, 145, 145, 0.24);
  border-radius: 14px;
  background: linear-gradient(135deg, #5f1f29 0%, #7d2d39 100%);
  color: #fff3f3;
  font-size: 14px;
  font-weight: 800;
  cursor: pointer;

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }
`;

export const StatusText = styled.p<{ $error?: boolean }>`
  margin: 0;
  color: ${({ $error }) => ($error ? "#ff9d9d" : "#8ce6ba")};
  font-size: 14px;
  font-weight: 700;
`;

export const BoardTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  overflow: hidden;
  border-radius: 18px;

  th,
  td {
    padding: 16px 14px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    text-align: left;
    vertical-align: middle;
    font-size: 14px;
  }

  th {
    color: rgba(238, 242, 255, 0.72);
    background: rgba(255, 255, 255, 0.06);
    font-weight: 800;
    white-space: nowrap;
  }

  td {
    color: rgba(238, 242, 255, 0.9);
    background: rgba(13, 18, 32, 0.42);
  }

  ${DangerButton} {
    min-width: 72px;
    padding: 10px 14px;
  }

  @media (max-width: 760px) {
    display: block;
    overflow-x: auto;
    white-space: nowrap;
  }
`;

export const StrongText = styled.strong`
  display: block;
  max-width: 360px;
  color: #ffffff;
  font-size: 14px;
  font-weight: 800;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const Pagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
`;

export const PageText = styled.span`
  min-width: 72px;
  color: rgba(238, 242, 255, 0.8);
  font-size: 14px;
  font-weight: 800;
  text-align: center;
`;
