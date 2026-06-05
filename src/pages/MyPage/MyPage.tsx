import { useRef, useState, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/common/footer/Footer";
import { useAuthStore } from "../../stores/authStore";
import * as S from "./MyPage.styles";

const INTRO_STORAGE_KEY = "reverse.myPage.introduction";
const PROFILE_IMAGE_STORAGE_KEY = "reverse.myPage.profileImage";

const activityItems = [
  { label: "투표", icon: "□", path: "/mypage/votes" },
  { label: "게시글", icon: "▤", path: "/board/manage" },
  { label: "프로젝트", icon: "▱", path: "/mypage/projects" },
  { label: "스터디", icon: "▥", path: "/mypage/studies" },
];

const getStoredValue = (key: string, fallback: string) => {
  if (typeof window === "undefined") {
    return fallback;
  }

  return window.localStorage.getItem(key) ?? fallback;
};

export default function MyPage() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const userId = useAuthStore((state) => state.userId);
  const userName = useAuthStore((state) => state.userName);
  const roleName = useAuthStore((state) => state.roleName);
  const [profileImage, setProfileImage] = useState(() =>
    getStoredValue(PROFILE_IMAGE_STORAGE_KEY, "")
  );
  const [introduction, setIntroduction] = useState(() =>
    getStoredValue(INTRO_STORAGE_KEY, "나의 소개를 입력해 주세요.")
  );
  const [draftIntroduction, setDraftIntroduction] = useState(introduction);
  const [isEditing, setIsEditing] = useState(false);

  const displayName = userName || userId || "REVERSE";
  const displayRole = roleName === "ADMIN" || roleName === "SUPER_ADMIN" ? "임원" : "부원";
  const displayEmail = userId ? `${userId}@reverse.local` : "등록된 이메일 정보가 없습니다.";

  const handleProfileImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (!["image/jpeg", "image/png", "image/jpg"].includes(file.type)) {
      window.alert("이미지 파일만 업로드할 수 있습니다.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = typeof reader.result === "string" ? reader.result : "";
      setProfileImage(result);
      window.localStorage.setItem(PROFILE_IMAGE_STORAGE_KEY, result);
    };
    reader.readAsDataURL(file);
  };

  const handleStartEdit = () => {
    setDraftIntroduction(introduction);
    setIsEditing(true);
  };

  const handleSaveIntroduction = () => {
    const nextValue = draftIntroduction.trim() || "나의 소개를 입력해 주세요.";
    setIntroduction(nextValue);
    window.localStorage.setItem(INTRO_STORAGE_KEY, nextValue);
    setIsEditing(false);
  };

  const handleCancelIntroduction = () => {
    setDraftIntroduction(introduction);
    setIsEditing(false);
  };

  return (
    <>
      <S.Page>
        <S.Inner>
          <S.Hero>
            <S.Eyebrow>REVERSE</S.Eyebrow>
            <S.Title>MY PAGE</S.Title>
          </S.Hero>

          <S.ContentGrid>
            <S.ProfileCard>
              <S.ProfileTop>
                <S.AvatarButton
                  type="button"
                  aria-label="프로필 이미지 변경"
                  onClick={() => fileInputRef.current?.click()}
                >
                  {profileImage ? (
                    <S.AvatarImage src={profileImage} alt="" />
                  ) : (
                    displayName.slice(0, 1).toUpperCase()
                  )}
                </S.AvatarButton>
                <S.HiddenFile
                  ref={fileInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/jpg"
                  onChange={handleProfileImageChange}
                />
                <S.NameBlock>
                  <S.RoleBadge>{displayRole}</S.RoleBadge>
                  <S.UserName>{displayName}</S.UserName>
                </S.NameBlock>
              </S.ProfileTop>

              <S.ProfileBody>
                <S.InfoList>
                  <div>
                    <S.InfoLabel>ID</S.InfoLabel>
                    <S.InfoValue>{userId ?? "로그인 정보 없음"}</S.InfoValue>
                  </div>
                  <div>
                    <S.InfoLabel>Mail</S.InfoLabel>
                    <S.InfoValue>{displayEmail}</S.InfoValue>
                  </div>
                  <div>
                    <S.InfoLabel>MBTI</S.InfoLabel>
                    <S.InfoValue>ESTJ</S.InfoValue>
                  </div>
                </S.InfoList>

                <S.IntroBox>
                  <S.IntroHeader>
                    <S.IntroTitle>자기소개</S.IntroTitle>
                    {!isEditing ? (
                      <S.IconButton type="button" onClick={handleStartEdit}>
                        ↗
                      </S.IconButton>
                    ) : null}
                  </S.IntroHeader>

                  {isEditing ? (
                    <>
                      <S.IntroInput
                        value={draftIntroduction}
                        onChange={(event) => setDraftIntroduction(event.target.value)}
                        placeholder="나의 소개를 입력해 주세요."
                      />
                      <S.EditActions>
                        <S.SmallButton type="button" onClick={handleSaveIntroduction}>
                          확인
                        </S.SmallButton>
                        <S.SmallButton type="button" onClick={handleCancelIntroduction}>
                          취소
                        </S.SmallButton>
                      </S.EditActions>
                    </>
                  ) : (
                    <S.IntroText>{introduction}</S.IntroText>
                  )}
                </S.IntroBox>
              </S.ProfileBody>
            </S.ProfileCard>

            <S.ActivityCard>
              <S.ActivityTitle>MY ACTIVITIES</S.ActivityTitle>
              <S.ActivityList>
                {activityItems.map((item) => (
                  <S.ActivityButton
                    key={item.path}
                    type="button"
                    onClick={() => navigate(item.path)}
                  >
                    <S.ActivityIcon aria-hidden="true">{item.icon}</S.ActivityIcon>
                    <span>{item.label}</span>
                    <S.Arrow aria-hidden="true">›</S.Arrow>
                  </S.ActivityButton>
                ))}
              </S.ActivityList>
            </S.ActivityCard>
          </S.ContentGrid>
        </S.Inner>
      </S.Page>
      <Footer />
    </>
  );
}
