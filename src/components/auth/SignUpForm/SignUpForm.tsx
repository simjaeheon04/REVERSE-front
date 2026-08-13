import { useState, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import {
  registerUser,
  sendEmailCode,
  verifyEmailCode,
  type RegisterPayload,
} from "../../../services/authApi";
import AuthShell from "../AuthShell/AuthShell";
import FormField from "../FormField/FormField";
import * as C from "../FormField/AuthControls.styles";
import * as S from "./SignUpForm.styles";

type TermsState = {
  all: boolean;
  service: boolean;
  privacy: boolean;
  marketing: boolean;
  event: boolean;
};

type SignUpValues = {
  userId: string;
  userName: string;
  userPassword: string;
  passwordConfirm: string;
  emailId: string;
  emailDomain: string;
  authCode: string;
  userIntroduce: string;
  userMbti: string;
};

const initialValues: SignUpValues = {
  userId: "",
  userName: "",
  userPassword: "",
  passwordConfirm: "",
  emailId: "",
  emailDomain: "",
  authCode: "",
  userIntroduce: "",
  userMbti: "",
};

export default function SignUpForm() {
  const navigate = useNavigate();
  const [values, setValues] = useState<SignUpValues>(initialValues);
  const [terms, setTerms] = useState<TermsState>({
    all: false,
    service: false,
    privacy: false,
    marketing: false,
    event: false,
  });
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [message, setMessage] = useState<{
    text: string;
    type?: "error" | "success";
  }>({ text: "", type: undefined });
  const [emailMessage, setEmailMessage] = useState<{
    text: string;
    type?: "error" | "success";
  }>({ text: "", type: undefined });
  const [codeMessage, setCodeMessage] = useState<{
    text: string;
    type?: "error" | "success";
  }>({ text: "", type: undefined });
  const [isSendingCode, setIsSendingCode] = useState(false);
  const [isVerifyingCode, setIsVerifyingCode] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const userEmail =
    values.emailId && values.emailDomain
      ? `${values.emailId}@${values.emailDomain}`
      : "";

  const handleValueChange =
    (key: keyof SignUpValues) =>
    (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setValues((prev) => ({
        ...prev,
        [key]: event.target.value,
      }));

      if (key === "emailId" || key === "emailDomain") {
        setIsEmailVerified(false);
        setEmailMessage({ text: "", type: undefined });
        setCodeMessage({ text: "", type: undefined });
      }

      if (key === "authCode") {
        setCodeMessage({ text: "", type: undefined });
      }
    };

  const handleAllChange = (checked: boolean) => {
    setTerms({
      all: checked,
      service: checked,
      privacy: checked,
      marketing: checked,
      event: checked,
    });
  };

  const handleTermChange = (key: keyof Omit<TermsState, "all">) => {
    setTerms((prev) => {
      const next = {
        ...prev,
        [key]: !prev[key],
      };

      return {
        ...next,
        all: next.service && next.privacy && next.marketing && next.event,
      };
    });
  };

  const handleSendCode = async () => {
    if (!userEmail) {
      setEmailMessage({ text: "이메일을 입력해 주세요.", type: "error" });
      setCodeMessage({ text: "", type: undefined });
      return;
    }

    try {
      setIsSendingCode(true);
      setMessage({ text: "", type: undefined });
      setCodeMessage({ text: "", type: undefined });
      const result = await sendEmailCode({ email: userEmail });
      setEmailMessage({ text: result || "인증번호가 전송되었습니다.", type: "success" });
    } catch (error) {
      console.error("signup email send failed", error);
      setEmailMessage({ text: "인증번호 전송에 실패했습니다.", type: "error" });
    } finally {
      setIsSendingCode(false);
    }
  };

  const handleVerifyCode = async () => {
    if (!userEmail || !values.authCode.trim()) {
      setCodeMessage({ text: "이메일과 인증번호를 입력해 주세요.", type: "error" });
      return;
    }

    try {
      setIsVerifyingCode(true);
      setMessage({ text: "", type: undefined });
      const result = await verifyEmailCode({
        email: userEmail,
        code: values.authCode.trim(),
      });
      setIsEmailVerified(true);
      setCodeMessage({ text: result || "이메일 인증이 완료되었습니다.", type: "success" });
    } catch (error) {
      console.error("signup email verify failed", error);
      setIsEmailVerified(false);
      setCodeMessage({ text: "인증번호 확인에 실패했습니다.", type: "error" });
    } finally {
      setIsVerifyingCode(false);
    }
  };

  const handleSubmit = async () => {
    if (
      !values.userId.trim() ||
      !values.userName.trim() ||
      !values.userPassword.trim() ||
      !userEmail
    ) {
      setMessage({ text: "필수 정보를 모두 입력해 주세요.", type: "error" });
      return;
    }

    if (values.userPassword !== values.passwordConfirm) {
      setMessage({ text: "비밀번호가 일치하지 않습니다.", type: "error" });
      return;
    }

    if (!isEmailVerified) {
      setCodeMessage({ text: "이메일 인증을 완료해 주세요.", type: "error" });
      return;
    }

    if (!terms.service || !terms.privacy) {
      setMessage({ text: "필수 약관에 동의해 주세요.", type: "error" });
      return;
    }

    try {
      setIsSubmitting(true);

      const payload: RegisterPayload = {
        userId: values.userId.trim(),
        userName: values.userName.trim(),
        userEmail,
        userPassword: values.userPassword,
        userIntroduce: values.userIntroduce.trim() || undefined,
        userMbti: values.userMbti.trim() || undefined,
        consents: [
          { consentItemId: 1, isAgreed: terms.service },
          { consentItemId: 2, isAgreed: terms.privacy },
          { consentItemId: 3, isAgreed: terms.marketing },
          { consentItemId: 4, isAgreed: terms.event },
        ],
      };

      await registerUser(payload);
      setMessage({ text: "", type: undefined });
      setEmailMessage({ text: "", type: undefined });
      setCodeMessage({ text: "", type: undefined });
      setValues(initialValues);
      setIsEmailVerified(false);
      handleAllChange(false);
      setIsSuccessModalOpen(true);
    } catch (error) {
      console.error("signup failed", error);
      setMessage({ text: "회원가입에 실패했습니다.", type: "error" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSuccessConfirm = () => {
    setIsSuccessModalOpen(false);
    navigate("/login");
  };

  return (
    <AuthShell title="회원가입">
      <C.Form>
        <FormField label="아이디" htmlFor="signup-id">
          <C.Input
            id="signup-id"
            type="text"
            placeholder="아이디를 입력하세요."
            value={values.userId}
            onChange={handleValueChange("userId")}
          />
        </FormField>

        <FormField label="이름" htmlFor="signup-name">
          <C.Input
            id="signup-name"
            type="text"
            placeholder="이름을 입력하세요."
            value={values.userName}
            onChange={handleValueChange("userName")}
          />
        </FormField>

        <FormField label="비밀번호" htmlFor="signup-password">
          <C.Input
            id="signup-password"
            type="password"
            placeholder="비밀번호를 입력하세요."
            value={values.userPassword}
            onChange={handleValueChange("userPassword")}
          />
        </FormField>

        <FormField label="비밀번호 확인" htmlFor="signup-password-confirm">
          <C.Input
            id="signup-password-confirm"
            type="password"
            placeholder="비밀번호를 다시 입력하세요."
            value={values.passwordConfirm}
            onChange={handleValueChange("passwordConfirm")}
          />
        </FormField>

        <FormField label="이메일">
          <C.EmailRow>
            <C.Input
              type="text"
              placeholder="이메일을 입력하세요."
              value={values.emailId}
              onChange={handleValueChange("emailId")}
            />
            <C.At>@</C.At>
            <C.Select
              value={values.emailDomain}
              onChange={handleValueChange("emailDomain")}
            >
              <option value="" disabled>
                선택하세요.
              </option>
              <option value="gmail.com">gmail.com</option>
              <option value="naver.com">naver.com</option>
              <option value="daum.net">daum.net</option>
            </C.Select>
            <C.GhostButton
              type="button"
              onClick={handleSendCode}
              disabled={isSendingCode || isEmailVerified}
            >
              {isSendingCode ? "전송 중..." : "전송"}
            </C.GhostButton>
          </C.EmailRow>
          {emailMessage.text ? (
            <C.FieldMessage $type={emailMessage.type}>
              {emailMessage.text}
            </C.FieldMessage>
          ) : null}
        </FormField>

        <FormField label="인증번호" htmlFor="signup-code">
          <C.Row>
            <C.Input
              id="signup-code"
              type="text"
              placeholder="인증번호를 입력하세요."
              value={values.authCode}
              onChange={handleValueChange("authCode")}
            />
            <C.GhostButton
              type="button"
              onClick={handleVerifyCode}
              disabled={isVerifyingCode || isEmailVerified}
            >
              {isVerifyingCode ? "확인 중..." : "인증번호 확인"}
            </C.GhostButton>
          </C.Row>
          {codeMessage.text ? (
            <C.FieldMessage $type={codeMessage.type}>
              {codeMessage.text}
            </C.FieldMessage>
          ) : null}
        </FormField>

        <FormField label="자기소개" htmlFor="signup-introduce">
          <C.Input
            id="signup-introduce"
            type="text"
            placeholder="자기소개를 입력하세요."
            value={values.userIntroduce}
            onChange={handleValueChange("userIntroduce")}
          />
        </FormField>

        <FormField label="MBTI" htmlFor="signup-mbti">
          <C.Input
            id="signup-mbti"
            type="text"
            placeholder="MBTI를 입력하세요."
            value={values.userMbti}
            onChange={handleValueChange("userMbti")}
          />
        </FormField>

        <S.TermsSection>
          <S.TermsTitle>약관 동의</S.TermsTitle>

          <S.TermsList>
            <S.CheckItem>
              <input
                type="checkbox"
                checked={terms.all}
                onChange={(event) => handleAllChange(event.target.checked)}
              />
              <span>전체 약관에 동의합니다.</span>
            </S.CheckItem>

            <S.TermsGroup>
              <S.CheckItem>
                <input
                  type="checkbox"
                  checked={terms.service}
                  onChange={() => handleTermChange("service")}
                />
                <span>[필수] 이용약관 동의</span>
              </S.CheckItem>

              <S.CheckItem>
                <input
                  type="checkbox"
                  checked={terms.privacy}
                  onChange={() => handleTermChange("privacy")}
                />
                <span>[필수] 개인정보 수집 및 이용 동의</span>
              </S.CheckItem>

              <S.CheckItem>
                <input
                  type="checkbox"
                  checked={terms.marketing}
                  onChange={() => handleTermChange("marketing")}
                />
                <span>[선택] 마케팅 정보 수신 동의</span>
              </S.CheckItem>

              <S.CheckItem>
                <input
                  type="checkbox"
                  checked={terms.event}
                  onChange={() => handleTermChange("event")}
                />
                <span>[선택] 이벤트 및 혜택 알림 수신 동의</span>
              </S.CheckItem>
            </S.TermsGroup>
          </S.TermsList>
        </S.TermsSection>

        {message.text ? (
          <C.Message $type={message.type}>{message.text}</C.Message>
        ) : null}

        <C.PrimaryButton type="button" onClick={handleSubmit}>
          {isSubmitting ? "가입 중..." : "회원가입"}
        </C.PrimaryButton>
      </C.Form>
      {isSuccessModalOpen ? (
        <S.ModalOverlay role="presentation">
          <S.ModalCard
            role="dialog"
            aria-modal="true"
            aria-labelledby="signup-success-title"
          >
            <S.ModalTitle id="signup-success-title">
              회원가입이 완료되었습니다.
            </S.ModalTitle>
            <S.ModalText>로그인 페이지로 이동합니다.</S.ModalText>
            <S.ModalConfirmButton type="button" onClick={handleSuccessConfirm}>
              확인
            </S.ModalConfirmButton>
          </S.ModalCard>
        </S.ModalOverlay>
      ) : null}
    </AuthShell>
  );
}
