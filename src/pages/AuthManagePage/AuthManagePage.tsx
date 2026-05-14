import { useState, type ChangeEvent } from "react";
import {
  issueTemporaryPassword,
  registerUser,
  sendEmailCode,
  sendFindPasswordCode,
  sendFindUsernameCode,
  verifyEmailCode,
  verifyFindPasswordCode,
  verifyFindUsernameCode,
  type RegisterPayload,
} from "../../services/authAPI";
import * as S from "../NoticeManagePage/NoticeManagePage.styles";

type MessageState = {
  text: string;
  error?: boolean;
};

type SignupForm = {
  userId: string;
  userName: string;
  userEmail: string;
  userPassword: string;
  userIntroduce: string;
  userMbti: string;
  emailCode: string;
  service: boolean;
  privacy: boolean;
  marketing: boolean;
  event: boolean;
};

type FindUsernameForm = {
  userName: string;
  email: string;
  authCode: string;
};

type FindPasswordForm = {
  userId: string;
  email: string;
  authCode: string;
};

const initialSignupForm: SignupForm = {
  userId: "",
  userName: "",
  userEmail: "",
  userPassword: "",
  userIntroduce: "",
  userMbti: "",
  emailCode: "",
  service: true,
  privacy: true,
  marketing: false,
  event: false,
};

const initialFindUsernameForm: FindUsernameForm = {
  userName: "",
  email: "",
  authCode: "",
};

const initialFindPasswordForm: FindPasswordForm = {
  userId: "",
  email: "",
  authCode: "",
};

export default function AuthManagePage() {
  const [signupForm, setSignupForm] = useState<SignupForm>(initialSignupForm);
  const [findUsernameForm, setFindUsernameForm] =
    useState<FindUsernameForm>(initialFindUsernameForm);
  const [findPasswordForm, setFindPasswordForm] =
    useState<FindPasswordForm>(initialFindPasswordForm);

  const [signupMessage, setSignupMessage] = useState<MessageState>({
    text: "",
  });
  const [findUsernameMessage, setFindUsernameMessage] = useState<MessageState>({
    text: "",
  });
  const [findPasswordMessage, setFindPasswordMessage] = useState<MessageState>({
    text: "",
  });

  const [signupResponse, setSignupResponse] = useState<unknown>(null);
  const [findUsernameResponse, setFindUsernameResponse] =
    useState<unknown>(null);
  const [findPasswordResponse, setFindPasswordResponse] =
    useState<unknown>(null);

  const [isSignupLoading, setIsSignupLoading] = useState(false);
  const [isFindUsernameLoading, setIsFindUsernameLoading] = useState(false);
  const [isFindPasswordLoading, setIsFindPasswordLoading] = useState(false);

  const handleSignupTextChange =
    (key: keyof Pick<
      SignupForm,
      | "userId"
      | "userName"
      | "userEmail"
      | "userPassword"
      | "userIntroduce"
      | "userMbti"
      | "emailCode"
    >) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setSignupForm((prev) => ({
        ...prev,
        [key]: event.target.value,
      }));
    };

  const handleSignupConsentChange =
    (key: keyof Pick<SignupForm, "service" | "privacy" | "marketing" | "event">) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      setSignupForm((prev) => ({
        ...prev,
        [key]: event.target.checked,
      }));
    };

  const handleFindUsernameChange =
    (key: keyof FindUsernameForm) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      setFindUsernameForm((prev) => ({
        ...prev,
        [key]: event.target.value,
      }));
    };

  const handleFindPasswordChange =
    (key: keyof FindPasswordForm) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      setFindPasswordForm((prev) => ({
        ...prev,
        [key]: event.target.value,
      }));
    };

  const handleSignupEmailSend = async () => {
    if (!signupForm.userEmail.trim()) {
      setSignupMessage({ text: "이메일을 입력해주세요.", error: true });
      return;
    }

    try {
      setIsSignupLoading(true);
      const result = await sendEmailCode({ email: signupForm.userEmail.trim() });
      setSignupResponse(result);
      setSignupMessage({ text: "회원가입 이메일 인증번호를 전송했습니다." });
    } catch (error) {
      console.error("auth admin signup email send failed", error);
      setSignupResponse(null);
      setSignupMessage({ text: "이메일 인증번호 전송에 실패했습니다.", error: true });
    } finally {
      setIsSignupLoading(false);
    }
  };

  const handleSignupEmailVerify = async () => {
    if (!signupForm.userEmail.trim() || !signupForm.emailCode.trim()) {
      setSignupMessage({ text: "이메일과 인증번호를 입력해주세요.", error: true });
      return;
    }

    try {
      setIsSignupLoading(true);
      const result = await verifyEmailCode({
        email: signupForm.userEmail.trim(),
        code: signupForm.emailCode.trim(),
      });
      setSignupResponse(result);
      setSignupMessage({ text: "회원가입 이메일 인증을 확인했습니다." });
    } catch (error) {
      console.error("auth admin signup email verify failed", error);
      setSignupResponse(null);
      setSignupMessage({ text: "이메일 인증 확인에 실패했습니다.", error: true });
    } finally {
      setIsSignupLoading(false);
    }
  };

  const handleRegister = async () => {
    if (
      !signupForm.userId.trim() ||
      !signupForm.userName.trim() ||
      !signupForm.userEmail.trim() ||
      !signupForm.userPassword.trim()
    ) {
      setSignupMessage({ text: "회원가입 필수 값을 입력해주세요.", error: true });
      return;
    }

    try {
      setIsSignupLoading(true);

      const payload: RegisterPayload = {
        userId: signupForm.userId.trim(),
        userName: signupForm.userName.trim(),
        userEmail: signupForm.userEmail.trim(),
        userPassword: signupForm.userPassword,
        userIntroduce: signupForm.userIntroduce.trim() || undefined,
        userMbti: signupForm.userMbti.trim() || undefined,
        consents: [
          { consentItemId: 1, isAgreed: signupForm.service },
          { consentItemId: 2, isAgreed: signupForm.privacy },
          { consentItemId: 3, isAgreed: signupForm.marketing },
          { consentItemId: 4, isAgreed: signupForm.event },
        ],
      };

      const result = await registerUser(payload);
      setSignupResponse(result);
      setSignupMessage({ text: "회원가입 요청이 완료되었습니다." });
    } catch (error) {
      console.error("auth admin register failed", error);
      setSignupResponse(null);
      setSignupMessage({ text: "회원가입 요청에 실패했습니다.", error: true });
    } finally {
      setIsSignupLoading(false);
    }
  };

  const handleFindUsernameSend = async () => {
    if (!findUsernameForm.userName.trim() || !findUsernameForm.email.trim()) {
      setFindUsernameMessage({
        text: "이름과 이메일을 입력해주세요.",
        error: true,
      });
      return;
    }

    try {
      setIsFindUsernameLoading(true);
      const result = await sendFindUsernameCode({
        userName: findUsernameForm.userName.trim(),
        email: findUsernameForm.email.trim(),
      });
      setFindUsernameResponse(result);
      setFindUsernameMessage({ text: "아이디 찾기 인증번호를 전송했습니다." });
    } catch (error) {
      console.error("auth admin find username send failed", error);
      setFindUsernameResponse(null);
      setFindUsernameMessage({
        text: "아이디 찾기 인증번호 전송에 실패했습니다.",
        error: true,
      });
    } finally {
      setIsFindUsernameLoading(false);
    }
  };

  const handleFindUsernameVerify = async () => {
    if (!findUsernameForm.email.trim() || !findUsernameForm.authCode.trim()) {
      setFindUsernameMessage({
        text: "이메일과 인증번호를 입력해주세요.",
        error: true,
      });
      return;
    }

    try {
      setIsFindUsernameLoading(true);
      const result = await verifyFindUsernameCode({
        email: findUsernameForm.email.trim(),
        authCode: findUsernameForm.authCode.trim(),
      });
      setFindUsernameResponse(result);
      setFindUsernameMessage({ text: "아이디 찾기 인증을 확인했습니다." });
    } catch (error) {
      console.error("auth admin find username verify failed", error);
      setFindUsernameResponse(null);
      setFindUsernameMessage({
        text: "아이디 찾기 인증 확인에 실패했습니다.",
        error: true,
      });
    } finally {
      setIsFindUsernameLoading(false);
    }
  };

  const handleFindPasswordSend = async () => {
    if (!findPasswordForm.userId.trim() || !findPasswordForm.email.trim()) {
      setFindPasswordMessage({
        text: "아이디와 이메일을 입력해주세요.",
        error: true,
      });
      return;
    }

    try {
      setIsFindPasswordLoading(true);
      const result = await sendFindPasswordCode({
        userId: findPasswordForm.userId.trim(),
        email: findPasswordForm.email.trim(),
      });
      setFindPasswordResponse(result);
      setFindPasswordMessage({ text: "비밀번호 찾기 인증번호를 전송했습니다." });
    } catch (error) {
      console.error("auth admin find password send failed", error);
      setFindPasswordResponse(null);
      setFindPasswordMessage({
        text: "비밀번호 찾기 인증번호 전송에 실패했습니다.",
        error: true,
      });
    } finally {
      setIsFindPasswordLoading(false);
    }
  };

  const handleFindPasswordVerify = async () => {
    if (!findPasswordForm.email.trim() || !findPasswordForm.authCode.trim()) {
      setFindPasswordMessage({
        text: "이메일과 인증번호를 입력해주세요.",
        error: true,
      });
      return;
    }

    try {
      setIsFindPasswordLoading(true);
      const result = await verifyFindPasswordCode({
        email: findPasswordForm.email.trim(),
        authCode: findPasswordForm.authCode.trim(),
      });
      setFindPasswordResponse(result);
      setFindPasswordMessage({ text: "비밀번호 찾기 인증을 확인했습니다." });
    } catch (error) {
      console.error("auth admin find password verify failed", error);
      setFindPasswordResponse(null);
      setFindPasswordMessage({
        text: "비밀번호 찾기 인증 확인에 실패했습니다.",
        error: true,
      });
    } finally {
      setIsFindPasswordLoading(false);
    }
  };

  const handleIssueTemporaryPassword = async () => {
    if (!findPasswordForm.userId.trim() || !findPasswordForm.email.trim()) {
      setFindPasswordMessage({
        text: "아이디와 이메일을 입력해주세요.",
        error: true,
      });
      return;
    }

    try {
      setIsFindPasswordLoading(true);
      const result = await issueTemporaryPassword({
        userId: findPasswordForm.userId.trim(),
        email: findPasswordForm.email.trim(),
      });
      setFindPasswordResponse(result);
      setFindPasswordMessage({ text: "임시 비밀번호 발급 요청이 완료되었습니다." });
    } catch (error) {
      console.error("auth admin issue password failed", error);
      setFindPasswordResponse(null);
      setFindPasswordMessage({
        text: "임시 비밀번호 발급에 실패했습니다.",
        error: true,
      });
    } finally {
      setIsFindPasswordLoading(false);
    }
  };

  return (
    <S.Page>
      <S.Shell>
        <S.Header>
          <S.Eyebrow>Auth Admin</S.Eyebrow>
          <S.Title>인증 API 관리</S.Title>
          <S.Description>
            회원가입, 아이디 찾기, 비밀번호 찾기 인증 API를 한 화면에서
            테스트하는 관리 페이지입니다.
          </S.Description>
        </S.Header>

        <S.Grid>
          <S.Card>
            <S.CardTitle>회원가입 이메일 인증 / 가입</S.CardTitle>
            <S.CardText>
              <code>POST /api/auth/email/send</code>,{" "}
              <code>POST /api/auth/email/verify</code>,{" "}
              <code>POST /api/auth/register</code> 요청을 확인합니다.
            </S.CardText>

            <S.Input
              value={signupForm.userEmail}
              onChange={handleSignupTextChange("userEmail")}
              placeholder="이메일"
            />
            <S.Input
              value={signupForm.emailCode}
              onChange={handleSignupTextChange("emailCode")}
              placeholder="인증번호"
            />
            <S.ButtonRow>
              <S.SecondaryButton type="button" onClick={handleSignupEmailSend}>
                인증번호 전송
              </S.SecondaryButton>
              <S.SecondaryButton type="button" onClick={handleSignupEmailVerify}>
                인증번호 확인
              </S.SecondaryButton>
            </S.ButtonRow>

            <S.Input
              value={signupForm.userId}
              onChange={handleSignupTextChange("userId")}
              placeholder="아이디"
            />
            <S.Input
              value={signupForm.userName}
              onChange={handleSignupTextChange("userName")}
              placeholder="이름"
            />
            <S.Input
              value={signupForm.userPassword}
              onChange={handleSignupTextChange("userPassword")}
              placeholder="비밀번호"
              type="password"
            />
            <S.Input
              value={signupForm.userIntroduce}
              onChange={handleSignupTextChange("userIntroduce")}
              placeholder="자기소개"
            />
            <S.Input
              value={signupForm.userMbti}
              onChange={handleSignupTextChange("userMbti")}
              placeholder="MBTI"
            />

            <S.CheckboxRow>
              <S.Checkbox
                type="checkbox"
                checked={signupForm.service}
                onChange={handleSignupConsentChange("service")}
              />
              <S.CheckboxLabel>이용약관 동의</S.CheckboxLabel>
            </S.CheckboxRow>
            <S.CheckboxRow>
              <S.Checkbox
                type="checkbox"
                checked={signupForm.privacy}
                onChange={handleSignupConsentChange("privacy")}
              />
              <S.CheckboxLabel>개인정보 수집 및 이용 동의</S.CheckboxLabel>
            </S.CheckboxRow>
            <S.CheckboxRow>
              <S.Checkbox
                type="checkbox"
                checked={signupForm.marketing}
                onChange={handleSignupConsentChange("marketing")}
              />
              <S.CheckboxLabel>마케팅 수신 동의</S.CheckboxLabel>
            </S.CheckboxRow>
            <S.CheckboxRow>
              <S.Checkbox
                type="checkbox"
                checked={signupForm.event}
                onChange={handleSignupConsentChange("event")}
              />
              <S.CheckboxLabel>이벤트 알림 수신 동의</S.CheckboxLabel>
            </S.CheckboxRow>

            <S.PrimaryButton type="button" onClick={handleRegister}>
              {isSignupLoading ? "처리 중..." : "회원가입 요청"}
            </S.PrimaryButton>

            {signupMessage.text ? (
              <S.StatusText $error={signupMessage.error}>
                {signupMessage.text}
              </S.StatusText>
            ) : null}
            <S.CodeBlock>
              {signupResponse
                ? JSON.stringify(signupResponse, null, 2)
                : "회원가입 API 응답이 없습니다."}
            </S.CodeBlock>
          </S.Card>

          <S.Card>
            <S.CardTitle>아이디 찾기</S.CardTitle>
            <S.CardText>
              <code>POST /api/auth/find-username/send-code</code>,{" "}
              <code>POST /api/auth/find-username/verify</code> 요청을
              확인합니다.
            </S.CardText>

            <S.Input
              value={findUsernameForm.userName}
              onChange={handleFindUsernameChange("userName")}
              placeholder="가입 시 등록한 이름"
            />
            <S.Input
              value={findUsernameForm.email}
              onChange={handleFindUsernameChange("email")}
              placeholder="가입 시 등록한 이메일"
            />
            <S.Input
              value={findUsernameForm.authCode}
              onChange={handleFindUsernameChange("authCode")}
              placeholder="인증번호"
            />

            <S.ButtonRow>
              <S.SecondaryButton type="button" onClick={handleFindUsernameSend}>
                인증번호 전송
              </S.SecondaryButton>
              <S.PrimaryButton type="button" onClick={handleFindUsernameVerify}>
                {isFindUsernameLoading ? "확인 중..." : "아이디 찾기 확인"}
              </S.PrimaryButton>
            </S.ButtonRow>

            {findUsernameMessage.text ? (
              <S.StatusText $error={findUsernameMessage.error}>
                {findUsernameMessage.text}
              </S.StatusText>
            ) : null}
            <S.CodeBlock>
              {findUsernameResponse
                ? JSON.stringify(findUsernameResponse, null, 2)
                : "아이디 찾기 API 응답이 없습니다."}
            </S.CodeBlock>
          </S.Card>

          <S.Card>
            <S.CardTitle>비밀번호 찾기</S.CardTitle>
            <S.CardText>
              <code>POST /api/auth/find-password/send-code</code>,{" "}
              <code>POST /api/auth/find-password/verify</code>,{" "}
              <code>POST /api/auth/find-password/issue</code> 요청을
              확인합니다.
            </S.CardText>

            <S.Input
              value={findPasswordForm.userId}
              onChange={handleFindPasswordChange("userId")}
              placeholder="가입한 아이디"
            />
            <S.Input
              value={findPasswordForm.email}
              onChange={handleFindPasswordChange("email")}
              placeholder="가입 시 등록한 이메일"
            />
            <S.Input
              value={findPasswordForm.authCode}
              onChange={handleFindPasswordChange("authCode")}
              placeholder="인증번호"
            />

            <S.ButtonRow>
              <S.SecondaryButton type="button" onClick={handleFindPasswordSend}>
                인증번호 전송
              </S.SecondaryButton>
              <S.SecondaryButton type="button" onClick={handleFindPasswordVerify}>
                인증번호 확인
              </S.SecondaryButton>
              <S.PrimaryButton type="button" onClick={handleIssueTemporaryPassword}>
                {isFindPasswordLoading ? "처리 중..." : "임시 비밀번호 발급"}
              </S.PrimaryButton>
            </S.ButtonRow>

            {findPasswordMessage.text ? (
              <S.StatusText $error={findPasswordMessage.error}>
                {findPasswordMessage.text}
              </S.StatusText>
            ) : null}
            <S.CodeBlock>
              {findPasswordResponse
                ? JSON.stringify(findPasswordResponse, null, 2)
                : "비밀번호 찾기 API 응답이 없습니다."}
            </S.CodeBlock>
          </S.Card>
        </S.Grid>
      </S.Shell>
    </S.Page>
  );
}
