import { AxiosError } from "axios";
import { useState, type ChangeEvent, type FormEvent } from "react";
import {
  getMyPageProfile,
  updateMyPageIntroduce,
  updateMyPagePhoto,
  type MyPageProfile,
} from "../../services/userApi";
import { useAuthStore } from "../../stores/authStore";
import * as S from "../clubIntroManage/ClubIntroManagePage.styles";

const getApiErrorMessage = (error: unknown, fallback: string) => {
  if (error instanceof AxiosError) {
    const data = error.response?.data;

    if (typeof data === "string" && data.trim()) {
      return data;
    }

    if (data && typeof data === "object") {
      const record = data as Record<string, unknown>;

      if (typeof record.message === "string" && record.message.trim()) {
        return record.message;
      }
    }
  }

  if (error instanceof Error && error.message.trim()) {
    return error.message;
  }

  return fallback;
};

export default function MyPageManagePage() {
  const currentUserId = useAuthStore((state) => state.userId);
  const [targetUserId, setTargetUserId] = useState(currentUserId ?? "");
  const [introduce, setIntroduce] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [profile, setProfile] = useState<MyPageProfile | null>(null);
  const [photoResponse, setPhotoResponse] = useState<unknown>(null);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleLoadProfile = async (event?: FormEvent<HTMLFormElement>) => {
    event?.preventDefault();

    if (!targetUserId.trim()) {
      setMessage("조회할 사용자 ID를 입력해 주세요.");
      return;
    }

    try {
      setIsLoading(true);
      setMessage("");
      const result = await getMyPageProfile(targetUserId.trim());
      setProfile(result);
      setIntroduce(result.userIntroduce ?? "");
      setMessage("마이페이지 회원 정보를 불러왔습니다.");
    } catch (error) {
      setProfile(null);
      setMessage(getApiErrorMessage(error, "마이페이지 회원 정보 조회에 실패했습니다."));
    } finally {
      setIsLoading(false);
    }
  };

  const handleIntroduceSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setIsSaving(true);
      setMessage("");
      await updateMyPageIntroduce({ userIntroduce: introduce });
      setProfile((prev) => (prev ? { ...prev, userIntroduce: introduce } : prev));
      setMessage("자기소개가 성공적으로 수정되었습니다.");
    } catch (error) {
      setMessage(getApiErrorMessage(error, "자기소개 수정에 실패했습니다."));
    } finally {
      setIsSaving(false);
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(event.target.files?.[0] ?? null);
  };

  const handlePhotoUpload = async () => {
    if (!selectedFile) {
      setMessage("프로필 사진 파일을 선택해 주세요.");
      return;
    }

    try {
      setIsUploading(true);
      setMessage("");
      const result = await updateMyPagePhoto(selectedFile);
      setPhotoResponse(result);
      setProfile((prev) =>
        prev ? { ...prev, userPhotoUrl: result.attachedUrl ?? prev.userPhotoUrl } : prev
      );
      setMessage("프로필 사진이 성공적으로 변경되었습니다.");
    } catch (error) {
      setMessage(getApiErrorMessage(error, "프로필 사진 변경에 실패했습니다."));
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <S.Page>
      <S.Shell>
        <S.Header>
          <S.Eyebrow>마이페이지 관리자</S.Eyebrow>
          <S.Title>마이페이지 관리</S.Title>
          <S.Description>
            회원 마이페이지 단건 조회, 자기소개 수정, 프로필 사진 수정 API를 확인합니다.
          </S.Description>
        </S.Header>

        <S.Grid>
          <S.Card>
            <S.CardTitle>회원 정보 단건 조회</S.CardTitle>
            <S.CardText>
              <code>GET /api/mypage/{`{targetUserId}`}</code>로 회원 마이페이지 정보를
              조회합니다.
            </S.CardText>

            <S.Form onSubmit={(event) => void handleLoadProfile(event)}>
              <S.Field>
                <S.FieldLabel>targetUserId</S.FieldLabel>
                <S.Input
                  value={targetUserId}
                  onChange={(event) => setTargetUserId(event.target.value)}
                  placeholder="예: admin01"
                />
              </S.Field>
              <S.PrimaryButton type="submit" disabled={isLoading}>
                {isLoading ? "조회 중" : "회원 정보 조회"}
              </S.PrimaryButton>
            </S.Form>

            {profile ? (
              <S.MetaList>
                <S.MetaLabel>ID</S.MetaLabel>
                <S.MetaValue>{profile.userId}</S.MetaValue>
                <S.MetaLabel>이름</S.MetaLabel>
                <S.MetaValue>{profile.userName}</S.MetaValue>
                <S.MetaLabel>이메일</S.MetaLabel>
                <S.MetaValue>{profile.userEmail}</S.MetaValue>
                <S.MetaLabel>MBTI</S.MetaLabel>
                <S.MetaValue>{profile.userMbti}</S.MetaValue>
                <S.MetaLabel>권한</S.MetaLabel>
                <S.MetaValue>{profile.roleName}</S.MetaValue>
                <S.MetaLabel>본인 여부</S.MetaLabel>
                <S.MetaValue>{profile.isOwner ? "true" : "false"}</S.MetaValue>
              </S.MetaList>
            ) : null}
          </S.Card>

          <S.Card>
            <S.CardTitle>한 줄 자기소개 수정</S.CardTitle>
            <S.CardText>
              <code>PATCH /api/mypage/introduce</code>로 로그인한 사용자의 자기소개를
              수정합니다.
            </S.CardText>

            <S.Form onSubmit={handleIntroduceSubmit}>
              <S.Field>
                <S.FieldLabel>userIntroduce</S.FieldLabel>
                <S.TextArea
                  value={introduce}
                  maxLength={100}
                  onChange={(event) => setIntroduce(event.target.value)}
                  placeholder="최대 100자"
                />
              </S.Field>
              <S.PrimaryButton type="submit" disabled={isSaving}>
                {isSaving ? "수정 중" : "자기소개 수정"}
              </S.PrimaryButton>
            </S.Form>
          </S.Card>

          <S.Card>
            <S.CardTitle>프로필 사진 수정</S.CardTitle>
            <S.CardText>
              <code>POST /api/mypage/photo</code>로 로그인한 사용자의 프로필 사진을
              업로드합니다.
            </S.CardText>

            <S.Field>
              <S.FieldLabel>이미지 파일</S.FieldLabel>
              <S.Input type="file" accept="image/png,image/jpeg,image/jpg" onChange={handleFileChange} />
            </S.Field>
            <S.ButtonRow>
              <S.PrimaryButton type="button" onClick={handlePhotoUpload} disabled={isUploading}>
                {isUploading ? "업로드 중" : "프로필 사진 업로드"}
              </S.PrimaryButton>
            </S.ButtonRow>

            {profile?.userPhotoUrl ? (
              <S.PreviewImage src={profile.userPhotoUrl} alt="프로필 사진 미리보기" />
            ) : (
              <S.EmptyPreview>프로필 사진 없음</S.EmptyPreview>
            )}
          </S.Card>

          <S.Card>
            <S.CardTitle>요청 결과</S.CardTitle>
            {message ? <S.StatusText>{message}</S.StatusText> : null}
            <S.CodeBlock>
              {JSON.stringify(
                {
                  profile,
                  photoResponse,
                },
                null,
                2
              )}
            </S.CodeBlock>
          </S.Card>
        </S.Grid>
      </S.Shell>
    </S.Page>
  );
}
