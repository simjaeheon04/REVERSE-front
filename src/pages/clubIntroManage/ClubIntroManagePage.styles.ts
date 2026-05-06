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
`;

export const Header = styled.header`
  display: grid;
  gap: 10px;
  margin-bottom: 28px;
`;

export const Eyebrow = styled.span`
  color: #9cb0ff;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

export const Title = styled.h1`
  margin: 0;
  font-size: clamp(32px, 4vw, 48px);
  font-weight: 800;
  letter-spacing: -0.03em;
`;

export const Description = styled.p`
  margin: 0;
  max-width: 720px;
  color: rgba(238, 242, 255, 0.76);
  font-size: 16px;
  line-height: 1.6;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: minmax(320px, 420px) minmax(0, 1fr);
  gap: 24px;

  @media (max-width: 920px) {
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

export const CardTitle = styled.h2`
  margin: 0;
  font-size: 22px;
  font-weight: 700;
`;

export const CardText = styled.p`
  margin: 0;
  color: rgba(238, 242, 255, 0.7);
  font-size: 14px;
  line-height: 1.6;
`;

export const Form = styled.form`
  display: grid;
  gap: 18px;
`;

export const Field = styled.label`
  display: grid;
  gap: 8px;
`;

export const FieldLabel = styled.span`
  color: rgba(238, 242, 255, 0.9);
  font-size: 14px;
  font-weight: 600;
`;

export const Input = styled.input`
  width: 100%;
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
  min-height: 120px;
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

export const Select = styled.select`
  width: 100%;
  padding: 14px 16px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 14px;
  background: #0e1320;
  color: #eef2ff;
  font-size: 15px;
`;

export const InlineFields = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
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
`;

export const StatusText = styled.p<{ $error?: boolean }>`
  margin: 0;
  color: ${({ $error }) => ($error ? "#ff9d9d" : "#8ce6ba")};
  font-size: 13px;
  line-height: 1.5;
`;

export const PreviewPanel = styled.div`
  display: grid;
  gap: 18px;
`;

export const PreviewImage = styled.img`
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  border-radius: 18px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: #0d1220;
`;

export const EmptyPreview = styled.div`
  display: grid;
  place-items: center;
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: 18px;
  border: 1px dashed rgba(255, 255, 255, 0.18);
  background: rgba(11, 15, 24, 0.9);
  color: rgba(238, 242, 255, 0.46);
  font-size: 14px;
`;

export const MetaList = styled.dl`
  display: grid;
  grid-template-columns: 120px 1fr;
  gap: 10px 14px;
  margin: 0;
`;

export const MetaLabel = styled.dt`
  color: rgba(238, 242, 255, 0.56);
  font-size: 13px;
`;

export const MetaValue = styled.dd`
  margin: 0;
  color: #eef2ff;
  font-size: 13px;
  word-break: break-all;
`;

export const CodeBlock = styled.pre`
  margin: 0;
  padding: 18px;
  border-radius: 18px;
  background: #0d1220;
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: #dbe3ff;
  font-size: 13px;
  line-height: 1.55;
  overflow-x: auto;
`;
