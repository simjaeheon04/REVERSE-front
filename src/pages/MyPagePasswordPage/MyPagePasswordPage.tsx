import { AxiosError } from "axios";
import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/common/footer/Footer";
import { updateMyPagePassword } from "../../services/userApi";
import * as S from "./MyPagePasswordPage.styles";

type PasswordField = "current" | "new" | "confirm";

const getPasswordChangeErrorMessage = (error: unknown) => {
  if (error instanceof AxiosError) {
    const data = error.response?.data;

    if (typeof data === "string" && data.trim()) {
      return data;
    }

    if (data && typeof data === "object" && "message" in data) {
      const message = (data as { message?: unknown }).message;

      if (typeof message === "string" && message.trim()) {
        return message;
      }
    }
  }

  return "비밀번호 변경에 실패했습니다. 잠시 후 다시 시도해 주세요.";
};

export default function MyPagePasswordPage() {
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [visibleFields, setVisibleFields] = useState<Set<PasswordField>>(new Set());
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleVisibility = (field: PasswordField) => {
    setVisibleFields((previous) => {
      const next = new Set(previous);

      if (next.has(field)) {
        next.delete(field);
      } else {
        next.add(field);
      }

      return next;
    });
  };

  const validate = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      return "모든 비밀번호 항목을 입력해 주세요.";
    }

    if (newPassword.length < 8) {
      return "새 비밀번호는 8자 이상이어야 합니다.";
    }

    if (currentPassword === newPassword) {
      return "현재 비밀번호와 다른 비밀번호를 입력해 주세요.";
    }

    if (newPassword !== confirmPassword) {
      return "새 비밀번호가 일치하지 않습니다.";
    }

    return "";
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationMessage = validate();

    if (validationMessage) {
      setIsError(true);
      setMessage(validationMessage);
      return;
    }

    try {
      setIsSubmitting(true);
      setIsError(false);
      setMessage("");

      const result = await updateMyPagePassword({
        currentPassword,
        newPassword,
      });

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setVisibleFields(new Set());
      setMessage(result.message ?? "비밀번호가 성공적으로 변경되었습니다.");
    } catch (error) {
      setIsError(true);
      setMessage(getPasswordChangeErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <S.Page>
        <S.Inner>
          <S.Hero>
            <S.Eyebrow>REVERSE</S.Eyebrow>
            <S.Title>PASSWORD</S.Title>
            <S.Description>
              안전한 계정 사용을 위해 현재 비밀번호를 확인한 뒤 새 비밀번호로 변경합니다.
            </S.Description>
          </S.Hero>

          <S.Card>
            <S.CardHeader>
              <S.CardTitle>비밀번호 변경</S.CardTitle>
              <S.Guide>새 비밀번호는 8자 이상으로 입력해 주세요.</S.Guide>
            </S.CardHeader>

            <S.Form onSubmit={handleSubmit} noValidate>
              <S.Field>
                <S.Label htmlFor="current-password">현재 비밀번호</S.Label>
                <S.InputWrap>
                  <S.Input
                    id="current-password"
                    type={visibleFields.has("current") ? "text" : "password"}
                    autoComplete="current-password"
                    value={currentPassword}
                    onChange={(event) => setCurrentPassword(event.target.value)}
                    placeholder="현재 비밀번호를 입력하세요."
                  />
                  <S.VisibilityButton
                    type="button"
                    onClick={() => toggleVisibility("current")}
                    aria-label={visibleFields.has("current") ? "현재 비밀번호 숨기기" : "현재 비밀번호 보기"}
                  >
                    {visibleFields.has("current") ? "숨김" : "보기"}
                  </S.VisibilityButton>
                </S.InputWrap>
              </S.Field>

              <S.Field>
                <S.Label htmlFor="new-password">새 비밀번호</S.Label>
                <S.InputWrap>
                  <S.Input
                    id="new-password"
                    type={visibleFields.has("new") ? "text" : "password"}
                    autoComplete="new-password"
                    value={newPassword}
                    onChange={(event) => setNewPassword(event.target.value)}
                    placeholder="8자 이상의 새 비밀번호를 입력하세요."
                  />
                  <S.VisibilityButton
                    type="button"
                    onClick={() => toggleVisibility("new")}
                    aria-label={visibleFields.has("new") ? "새 비밀번호 숨기기" : "새 비밀번호 보기"}
                  >
                    {visibleFields.has("new") ? "숨김" : "보기"}
                  </S.VisibilityButton>
                </S.InputWrap>
              </S.Field>

              <S.Field>
                <S.Label htmlFor="confirm-password">새 비밀번호 확인</S.Label>
                <S.InputWrap>
                  <S.Input
                    id="confirm-password"
                    type={visibleFields.has("confirm") ? "text" : "password"}
                    autoComplete="new-password"
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    placeholder="새 비밀번호를 다시 입력하세요."
                  />
                  <S.VisibilityButton
                    type="button"
                    onClick={() => toggleVisibility("confirm")}
                    aria-label={visibleFields.has("confirm") ? "새 비밀번호 확인 숨기기" : "새 비밀번호 확인 보기"}
                  >
                    {visibleFields.has("confirm") ? "숨김" : "보기"}
                  </S.VisibilityButton>
                </S.InputWrap>
              </S.Field>

              {message ? (
                <S.Message $error={isError} role={isError ? "alert" : "status"}>
                  {message}
                </S.Message>
              ) : null}

              <S.Actions>
                <S.SecondaryButton
                  type="button"
                  onClick={() => navigate("/mypage")}
                  disabled={isSubmitting}
                >
                  취소
                </S.SecondaryButton>
                <S.PrimaryButton type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "변경 중..." : "비밀번호 변경"}
                </S.PrimaryButton>
              </S.Actions>
            </S.Form>
          </S.Card>
        </S.Inner>
      </S.Page>
      <Footer />
    </>
  );
}
