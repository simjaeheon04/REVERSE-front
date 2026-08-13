import styled from "styled-components";

export const Page = styled.main`
  min-height: calc(100vh - 70px);
  padding: 42px 24px 0;
  background: linear-gradient(180deg, #272b34 0%, #1f242d 68%, #111722 100%);
  color: #ffffff;
`;

export const Inner = styled.div`
  width: min(1320px, 100%);
  margin: 0 auto;
`;

export const Hero = styled.section`
  display: grid;
  justify-items: center;
  gap: 8px;
  padding: 20px 0 28px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.56);
`;

export const Eyebrow = styled.p`
  margin: 0;
  color: #ffffff;
  font-family: "Jersey 25", "Pretendard", sans-serif;
  font-size: 26px;
  font-weight: 700;
`;

export const Title = styled.h1`
  margin: 0;
  color: #d7d9f7;
  font-family: "Jersey 25", "Pretendard", sans-serif;
  font-size: clamp(54px, 7vw, 82px);
  font-weight: 800;
  line-height: 0.95;
  letter-spacing: 0;
`;

export const ContentGrid = styled.section`
  display: grid;
  grid-template-columns: minmax(0, 2fr) minmax(320px, 0.9fr);
  gap: 54px;
  padding: 46px 48px 70px;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
    padding: 34px 0 56px;
  }
`;

export const ProfileCard = styled.section`
  min-height: 360px;
  padding: 42px 46px;
  border: 1px solid rgba(255, 255, 255, 0.82);
  border-radius: 6px;
  background: linear-gradient(135deg, rgba(123, 121, 139, 0.82), rgba(93, 94, 109, 0.72));
`;

export const ProfileTop = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;
  padding-bottom: 30px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.52);
`;

export const AvatarButton = styled.button`
  width: 72px;
  height: 72px;
  padding: 0;
  border: 3px solid #f0e9ff;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.64);
  color: #6f657f;
  font-size: 38px;
  font-weight: 800;
  overflow: hidden;
  cursor: pointer;
`;

export const AvatarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const HiddenFile = styled.input`
  display: none;
`;

export const NameBlock = styled.div`
  display: grid;
  gap: 8px;
`;

export const RoleBadge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 58px;
  height: 22px;
  background: #d8d2ff;
  color: #68617e;
  font-size: 12px;
  font-weight: 800;
`;

export const UserName = styled.strong`
  color: #ffffff;
  font-size: 22px;
  font-weight: 800;
`;

export const ProfileBody = styled.div`
  display: grid;
  grid-template-columns: minmax(180px, 0.72fr) minmax(260px, 1fr);
  gap: 36px;
  padding-top: 30px;

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`;

export const InfoList = styled.dl`
  display: grid;
  gap: 20px;
  margin: 0;
`;

export const InfoLabel = styled.dt`
  color: rgba(255, 255, 255, 0.88);
  font-size: 16px;
  font-weight: 800;
`;

export const InfoValue = styled.dd`
  margin: 6px 0 0;
  color: rgba(255, 255, 255, 0.72);
  font-size: 15px;
  line-height: 1.45;
  word-break: break-all;
`;

export const PasswordButton = styled.button`
  width: fit-content;
  min-height: 34px;
  padding: 0 16px;
  border: 1px solid rgba(255, 255, 255, 0.48);
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.1);
  color: #ffffff;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-1px);
  }
`;

export const IntroBox = styled.div`
  align-self: start;
  min-height: 170px;
  padding: 18px 24px 20px;
  border: 1px solid rgba(255, 255, 255, 0.44);
  background: rgba(84, 86, 99, 0.62);
`;

export const IntroHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

export const IntroTitle = styled.h2`
  margin: 0;
  color: #ffffff;
  font-size: 16px;
  font-weight: 800;
`;

export const IconButton = styled.button`
  width: 26px;
  height: 26px;
  border: 1px solid rgba(255, 255, 255, 0.38);
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.12);
  color: #ffffff;
  font-size: 14px;
  cursor: pointer;
`;

export const IntroText = styled.p`
  min-height: 110px;
  margin: 16px 0 0;
  padding-top: 10px;
  border-top: 1px solid rgba(255, 255, 255, 0.46);
  color: rgba(255, 255, 255, 0.78);
  font-size: 14px;
  line-height: 1.85;
  white-space: pre-wrap;
`;

export const IntroInput = styled.textarea`
  width: 100%;
  min-height: 118px;
  margin-top: 14px;
  padding: 12px 0;
  border: none;
  border-top: 1px solid rgba(255, 255, 255, 0.46);
  background: transparent;
  color: #ffffff;
  font-size: 14px;
  line-height: 1.8;
  resize: vertical;

  &:focus {
    outline: none;
  }
`;

export const EditActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 10px;
`;

export const SmallButton = styled.button`
  min-width: 48px;
  height: 24px;
  border: 1px solid rgba(255, 255, 255, 0.48);
  background: rgba(255, 255, 255, 0.08);
  color: #ffffff;
  font-size: 12px;
  cursor: pointer;
`;

export const StatusText = styled.p<{ $error?: boolean }>`
  margin: 14px 0 0;
  color: ${({ $error }) => ($error ? "#ffb1b1" : "#b9ffd8")};
  font-size: 13px;
  line-height: 1.5;
`;

export const ActivityCard = styled.aside`
  padding: 36px 26px 30px;
  border: 1px solid rgba(255, 255, 255, 0.82);
  border-radius: 6px;
  background: rgba(96, 94, 111, 0.8);
`;

export const ActivityTitle = styled.h2`
  margin: 0 0 26px;
  color: #ffffff;
  font-size: 18px;
  font-weight: 900;
  text-transform: uppercase;
`;

export const ActivityList = styled.div`
  display: grid;
  gap: 18px;
`;

export const ActivityButton = styled.button`
  display: grid;
  grid-template-columns: 34px 1fr 20px;
  align-items: center;
  width: 100%;
  min-height: 58px;
  border: none;
  background: rgba(255, 255, 255, 0.18);
  color: #ffffff;
  text-align: left;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.26);
    transform: translateY(-1px);
  }
`;

export const ActivityIcon = styled.span`
  display: grid;
  place-items: center;
  color: #ffffff;
  font-size: 16px;
`;

export const Arrow = styled.span`
  color: rgba(255, 255, 255, 0.88);
  font-size: 20px;
`;
