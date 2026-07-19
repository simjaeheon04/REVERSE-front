import styled, { css } from "styled-components";

const focusRing = css`
  &:focus-visible {
    outline: 4px solid rgba(156, 176, 255, 0.5);
    outline-offset: 3px;
  }
`;

const buttonBase = css`
  min-height: 56px;
  padding: 0 24px;
  border-radius: 10px;
  font-size: 18px;
  font-weight: 800;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  transition:
    background 0.18s ease,
    border-color 0.18s ease,
    color 0.18s ease,
    transform 0.18s ease;

  &:hover:not(:disabled) {
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.52;
    cursor: not-allowed;
  }

  ${focusRing}
`;

export const Page = styled.main`
  min-height: calc(100vh - 120px);
  padding: 48px 32px 88px;
  background:
    radial-gradient(circle at top left, rgba(99, 117, 204, 0.18), transparent 34%),
    linear-gradient(180deg, #10131b 0%, #141a24 100%);
  color: #eef2ff;
  font-size: 18px;

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  @media (max-width: 640px) {
    padding: 40px 18px 80px;
  }
`;

export const Shell = styled.div`
  width: min(1440px, 100%);
  margin: 0 auto;
  display: grid;
  gap: 30px;
`;

export const Header = styled.header`
  display: grid;
  gap: 14px;
  padding-bottom: 2px;
`;

export const Eyebrow = styled.span`
  color: #aebcff;
  font-size: 17px;
  font-weight: 800;
  letter-spacing: 0;
`;

export const Title = styled.h1`
  margin: 0;
  color: #ffffff;
  font-size: clamp(44px, 5vw, 64px);
  font-weight: 800;
  line-height: 1.15;
  letter-spacing: 0;
`;

export const Description = styled.p`
  margin: 0;
  max-width: 1080px;
  color: rgba(238, 242, 255, 0.78);
  font-size: 20px;
  line-height: 1.65;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 30px;
  align-items: start;
`;

export const Card = styled.section`
  display: grid;
  gap: 24px;
  min-width: 0;
  padding: 38px 42px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 16px;
  background: rgba(13, 18, 29, 0.96);
  box-shadow: 0 24px 58px rgba(0, 0, 0, 0.26);

  @media (max-width: 640px) {
    padding: 22px;
    gap: 18px;
  }
`;

export const Toolbar = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 24px;

  @media (max-width: 720px) {
    flex-direction: column;
  }
`;

export const CardTitle = styled.h2`
  margin: 0;
  color: #ffffff;
  font-size: 30px;
  font-weight: 800;
  line-height: 1.3;
  letter-spacing: 0;

  &[as="h3"] {
    font-size: 24px;
  }
`;

export const CardText = styled.p`
  margin: 0;
  color: rgba(238, 242, 255, 0.74);
  font-size: 18px;
  line-height: 1.7;

  code {
    color: #dfe5ff;
  }
`;

export const Form = styled.form`
  display: grid;
  gap: 24px;
`;

export const Field = styled.label`
  display: grid;
  gap: 10px;
  min-width: 0;
`;

export const FieldLabel = styled.span`
  color: rgba(238, 242, 255, 0.9);
  font-size: 18px;
  font-weight: 700;
  line-height: 1.4;
`;

const controlBase = css`
  width: 100%;
  min-height: 60px;
  padding: 16px 19px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 10px;
  background: #0e1320;
  color: #eef2ff;
  font-size: 18px;
  line-height: 1.5;

  &::placeholder {
    color: rgba(238, 242, 255, 0.4);
  }

  &:read-only {
    color: rgba(238, 242, 255, 0.68);
    background: rgba(14, 19, 32, 0.62);
  }

  ${focusRing}
`;

export const Input = styled.input`
  ${controlBase}
`;

export const TextArea = styled.textarea`
  ${controlBase}
  min-height: 180px;
  resize: vertical;
`;

export const Select = styled.select`
  ${controlBase}
`;

export const InlineFields = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

export const ButtonRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
`;

export const PrimaryButton = styled.button`
  ${buttonBase}
  border: 1px solid #9aa8ff;
  background: #9aa8ff;
  color: #10131b;

  &:hover:not(:disabled) {
    background: #b2beff;
    border-color: #b2beff;
  }
`;

export const SecondaryButton = styled.button`
  ${buttonBase}
  border: 1px solid rgba(255, 255, 255, 0.16);
  background: #1a2131;
  color: #eef2ff;

  &:hover:not(:disabled) {
    border-color: rgba(174, 188, 255, 0.52);
    background: #222a3b;
  }
`;

export const DangerButton = styled.button`
  ${buttonBase}
  border: 1px solid rgba(255, 145, 145, 0.36);
  background: #5f1f29;
  color: #fff3f3;

  &:hover:not(:disabled) {
    border-color: rgba(255, 176, 176, 0.62);
    background: #742936;
  }
`;

export const StatusText = styled.p<{ $error?: boolean }>`
  margin: 0;
  padding: 14px 16px;
  border: 1px solid ${({ $error }) => ($error ? "rgba(255, 145, 145, 0.24)" : "rgba(140, 230, 186, 0.22)")};
  border-radius: 10px;
  background: ${({ $error }) => ($error ? "rgba(95, 31, 41, 0.22)" : "rgba(51, 157, 108, 0.12)")};
  color: ${({ $error }) => ($error ? "#ffb3b3" : "#9ff0c7")};
  font-size: 17px;
  font-weight: 700;
  line-height: 1.6;
`;

export const PreviewPanel = styled.div`
  display: grid;
  gap: 18px;
  min-width: 0;
`;

export const PreviewImage = styled.img`
  display: block;
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 12px;
  background: #0d1220;
`;

export const EmptyPreview = styled.div`
  display: grid;
  place-items: center;
  width: 100%;
  aspect-ratio: 16 / 9;
  padding: 28px;
  border: 1px dashed rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  background: rgba(11, 15, 24, 0.9);
  color: rgba(238, 242, 255, 0.54);
  font-size: 18px;
  line-height: 1.6;
  text-align: center;
`;

export const MetaList = styled.dl`
  display: grid;
  grid-template-columns: 120px minmax(0, 1fr);
  gap: 12px 16px;
  margin: 0;
`;

export const MetaLabel = styled.dt`
  color: rgba(238, 242, 255, 0.58);
  font-size: 17px;
`;

export const MetaValue = styled.dd`
  margin: 0;
  color: #eef2ff;
  font-size: 17px;
  line-height: 1.55;
  overflow-wrap: anywhere;
`;

export const CodeBlock = styled.pre`
  max-width: 100%;
  max-height: 320px;
  margin: 0;
  padding: 22px;
  overflow: auto;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  background: #0d1220;
  color: #dbe3ff;
  font-size: 16px;
  line-height: 1.75;
  white-space: pre-wrap;
  overflow-wrap: anywhere;
`;

export const DataTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  overflow: hidden;
  border-radius: 12px;

  th,
  td {
    padding: 20px 18px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    text-align: left;
    vertical-align: middle;
    font-size: 17px;
    line-height: 1.55;
  }

  th {
    position: sticky;
    top: 0;
    z-index: 2;
    color: rgba(238, 242, 255, 0.74);
    background: #202738;
    font-weight: 800;
    white-space: nowrap;
  }

  td {
    color: rgba(238, 242, 255, 0.9);
    background: rgba(13, 18, 32, 0.45);
  }

  @media (max-width: 900px) {
    display: block;
    overflow-x: auto;
    white-space: nowrap;
  }
`;

export const StrongText = styled.strong`
  display: block;
  max-width: 440px;
  color: #ffffff;
  font-size: 18px;
  font-weight: 800;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const EntityName = styled.strong`
  display: block;
  color: #ffffff;
  font-size: 19px;
  font-weight: 800;
  line-height: 1.35;
`;

export const EntityDescription = styled.span`
  display: block;
  max-width: 440px;
  margin-top: 8px;
  color: rgba(238, 242, 255, 0.58);
  font-size: 16px;
  line-height: 1.55;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const StatusBadge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 86px;
  min-height: 38px;
  padding: 0 14px;
  border: 1px solid rgba(156, 176, 255, 0.22);
  border-radius: 999px;
  background: rgba(140, 156, 255, 0.14);
  color: #c5ceff;
  font-size: 16px;
  font-weight: 800;
`;

export const ActionGroup = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;

  ${SecondaryButton},
  ${DangerButton} {
    min-width: 76px;
    min-height: 42px;
    padding: 0 14px;
  }
`;

export const Pagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 14px;
`;

export const PageText = styled.span`
  min-width: 88px;
  color: rgba(238, 242, 255, 0.8);
  font-size: 18px;
  font-weight: 800;
  text-align: center;
`;

export const PageGroup = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 12px;
`;

export const PageDots = styled.span`
  color: rgba(238, 242, 255, 0.54);
  font-size: 17px;
`;

export const PageButton = styled.button<{ $active: boolean }>`
  ${buttonBase}
  min-width: 46px;
  min-height: 46px;
  padding: 0 14px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: ${({ $active }) => ($active ? "#9aa8ff" : "#1a2131")};
  color: ${({ $active }) => ($active ? "#10131b" : "#eef2ff")};
`;
