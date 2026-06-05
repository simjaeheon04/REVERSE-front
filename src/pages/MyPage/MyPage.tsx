import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/common/footer/Footer";
import {
  getMyPageProfile,
  updateMyPageIntroduce,
  updateMyPagePhoto,
  type MyPageProfile,
} from "../../services/userApi";
import { useAuthStore } from "../../stores/authStore";
import * as S from "./MyPage.styles";

const activityItems = [
  { label: "투표", icon: "□", path: "/mypage/votes" },
  { label: "게시글", icon: "▤", path: "/board/manage" },
  { label: "프로젝트", icon: "▱", path: "/mypage/projects" },
  { label: "스터디", icon: "▥", path: "/mypage/studies" },
];

export default function MyPage() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const userId = useAuthStore((state) => state.userId);
  const userName = useAuthStore((state) => state.userName);
  const roleName = useAuthStore((state) => state.roleName);
  const [profile, setProfile] = useState<MyPageProfile | null>(null);
  const [profileImage, setProfileImage] = useState("");
  const [introduction, setIntroduction] = useState("나의 소개를 입력해 주세요.");
  const [draftIntroduction, setDraftIntroduction] = useState(introduction);
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const displayName = profile?.userName || userName || userId || "REVERSE";
  const displayRole =
    (profile?.roleName || roleName) === "ADMIN" || (profile?.roleName || roleName) === "SUPER_ADMIN"
      ? "임원"
      : "부원";
  const displayEmail = profile?.userEmail || "등록된 이메일 정보가 없습니다.";
  const displayMbti = profile?.userMbti || "미등록";

  useEffect(() => {
    if (!userId) {
      return;
    }

    const loadProfile = async () => {
      try {
        setIsLoading(true);
        setErrorMessage("");
        const result = await getMyPageProfile(userId);
        const nextIntroduction = result.userIntroduce || "나의 소개를 입력해 주세요.";
        setProfile(result);
        setProfileImage(result.userPhotoUrl ?? "");
        setIntroduction(nextIntroduction);
        setDraftIntroduction(nextIntroduction);
      } catch {
        setErrorMessage("마이페이지 정보를 불러오지 못했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    void loadProfile();
  }, [userId]);

  const handleProfileImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (!["image/jpeg", "image/png", "image/jpg"].includes(file.type)) {
      window.alert("이미지 파일만 업로드할 수 있습니다.");
      return;
    }

    try {
      setIsSaving(true);
      setMessage("");
      setErrorMessage("");
      const result = await updateMyPagePhoto(file);
      setProfileImage(result.attachedUrl ?? "");
      setMessage("프로필 사진이 성공적으로 변경되었습니다.");
    } catch {
      setErrorMessage("사진 변경에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleStartEdit = () => {
    setDraftIntroduction(introduction);
    setIsEditing(true);
  };

  const handleSaveIntroduction = async () => {
    const nextValue = draftIntroduction.trim() || "나의 소개를 입력해 주세요.";

    try {
      setIsSaving(true);
      setMessage("");
      setErrorMessage("");
      await updateMyPageIntroduce({ userIntroduce: nextValue });
      setIntroduction(nextValue);
      setProfile((prev) => (prev ? { ...prev, userIntroduce: nextValue } : prev));
      setIsEditing(false);
      setMessage("자기소개가 성공적으로 수정되었습니다.");
    } catch {
      setErrorMessage("저장에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsSaving(false);
    }
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
                    <S.InfoValue>{profile?.userId ?? userId ?? "로그인 정보 없음"}</S.InfoValue>
                  </div>
                  <div>
                    <S.InfoLabel>Mail</S.InfoLabel>
                    <S.InfoValue>{displayEmail}</S.InfoValue>
                  </div>
                  <div>
                    <S.InfoLabel>MBTI</S.InfoLabel>
                    <S.InfoValue>{displayMbti}</S.InfoValue>
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
                        <S.SmallButton
                          type="button"
                          onClick={() => void handleSaveIntroduction()}
                          disabled={isSaving}
                        >
                          확인
                        </S.SmallButton>
                        <S.SmallButton
                          type="button"
                          onClick={handleCancelIntroduction}
                          disabled={isSaving}
                        >
                          취소
                        </S.SmallButton>
                      </S.EditActions>
                    </>
                  ) : (
                    <S.IntroText>{introduction}</S.IntroText>
                  )}
                  {isLoading ? <S.StatusText>마이페이지 정보를 불러오는 중입니다.</S.StatusText> : null}
                  {message ? <S.StatusText>{message}</S.StatusText> : null}
                  {errorMessage ? <S.StatusText $error>{errorMessage}</S.StatusText> : null}
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
