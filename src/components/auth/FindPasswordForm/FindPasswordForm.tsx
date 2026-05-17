import { useState, type ChangeEvent } from "react";
import {
  issueTemporaryPassword,
  sendFindPasswordCode,
  verifyFindPasswordCode,
} from "../../../services/authApi";
import AuthShell from "../AuthShell/AuthShell";
import FormField from "../FormField/FormField";
import * as C from "../FormField/AuthControls.styles";

export default function FindPasswordForm() {
  const [userId, setUserId] = useState("");
  const [emailId, setEmailId] = useState("");
  const [emailDomain, setEmailDomain] = useState("");
  const [authCode, setAuthCode] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [message, setMessage] = useState<{
    text: string;
    type?: "error" | "success";
  }>({ text: "", type: undefined });
  const [isSending, setIsSending] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isIssuing, setIsIssuing] = useState(false);

  const email = emailId && emailDomain ? `${emailId}@${emailDomain}` : "";

  const handleSendCode = async () => {
    if (!userId.trim() || !email) {
      setMessage({ text: "아이디와 이메일을 모두 입력해 주세요.", type: "error" });
      return;
    }

    try {
      setIsSending(true);
      const result = await sendFindPasswordCode({
        userId: userId.trim(),
        email,
      });
      setMessage({ text: result.message ?? "인증번호가 발송되었습니다.", type: "success" });
    } catch (error) {
      console.error("find password send failed", error);
      setMessage({ text: "비밀번호 찾기 인증번호 발송에 실패했습니다.", type: "error" });
    } finally {
      setIsSending(false);
    }
  };

  const handleVerifyCode = async () => {
    if (!email || !authCode.trim()) {
      setMessage({ text: "이메일과 인증번호를 입력해 주세요.", type: "error" });
      return;
    }

    try {
      setIsVerifying(true);
      const result = await verifyFindPasswordCode({
        email,
        authCode: authCode.trim(),
      });
      setIsVerified(true);
      setMessage({ text: result.message ?? "인증에 성공했습니다.", type: "success" });
    } catch (error) {
      console.error("find password verify failed", error);
      setIsVerified(false);
      setMessage({ text: "인증번호 확인에 실패했습니다.", type: "error" });
    } finally {
      setIsVerifying(false);
    }
  };

  const handleIssuePassword = async () => {
    if (!isVerified) {
      setMessage({ text: "이메일 인증을 먼저 완료해 주세요.", type: "error" });
      return;
    }

    try {
      setIsIssuing(true);
      const result = await issueTemporaryPassword({
        userId: userId.trim(),
        email,
      });
      setMessage({
        text: result.message ?? "임시 비밀번호가 메일로 전송되었습니다.",
        type: "success",
      });
    } catch (error) {
      console.error("temporary password issue failed", error);
      setMessage({ text: "임시 비밀번호 발급에 실패했습니다.", type: "error" });
    } finally {
      setIsIssuing(false);
    }
  };

  return (
    <AuthShell title="비밀번호 찾기">
      <C.Form>
        <FormField label="아이디" htmlFor="find-pw-id">
          <C.Input
            id="find-pw-id"
            type="text"
            placeholder="아이디를 입력하세요."
            value={userId}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setUserId(event.target.value)
            }
          />
        </FormField>

        <FormField label="이메일">
          <C.EmailRow>
            <C.Input
              type="text"
              placeholder="이메일을 입력하세요."
              value={emailId}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setEmailId(event.target.value)
              }
            />
            <C.At>@</C.At>
            <C.Select
              value={emailDomain}
              onChange={(event: ChangeEvent<HTMLSelectElement>) =>
                setEmailDomain(event.target.value)
              }
            >
              <option value="" disabled>
                선택하세요.
              </option>
              <option value="gmail.com">gmail.com</option>
              <option value="naver.com">naver.com</option>
              <option value="daum.net">daum.net</option>
            </C.Select>

            <C.GhostButton type="button" onClick={handleSendCode}>
              {isSending ? "전송 중..." : "인증번호 전송"}
            </C.GhostButton>
          </C.EmailRow>
        </FormField>

        <FormField label="인증번호" htmlFor="find-pw-code">
          <C.Row>
            <C.Input
              id="find-pw-code"
              type="text"
              placeholder="인증번호를 입력하세요."
              value={authCode}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setAuthCode(event.target.value)
              }
            />
            <C.GhostButton type="button" onClick={handleVerifyCode}>
              {isVerifying ? "확인 중..." : "인증번호 확인"}
            </C.GhostButton>
          </C.Row>
        </FormField>

        {message.text ? (
          <C.Message $type={message.type}>{message.text}</C.Message>
        ) : null}

        <C.PrimaryButton type="button" onClick={handleIssuePassword}>
          {isIssuing ? "발급 중..." : "비밀번호 찾기"}
        </C.PrimaryButton>
      </C.Form>
    </AuthShell>
  );
}
