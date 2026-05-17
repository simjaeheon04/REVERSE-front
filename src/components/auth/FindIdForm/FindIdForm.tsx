import { useState, type ChangeEvent } from "react";
import {
  sendFindUsernameCode,
  verifyFindUsernameCode,
} from "../../../services/authApi";
import AuthShell from "../AuthShell/AuthShell";
import FormField from "../FormField/FormField";
import * as C from "../FormField/AuthControls.styles";

export default function FindIdForm() {
  const [userName, setUserName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [emailDomain, setEmailDomain] = useState("");
  const [authCode, setAuthCode] = useState("");
  const [foundUserId, setFoundUserId] = useState("");
  const [message, setMessage] = useState<{
    text: string;
    type?: "error" | "success";
  }>({ text: "", type: undefined });
  const [isSending, setIsSending] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const email = emailId && emailDomain ? `${emailId}@${emailDomain}` : "";

  const handleSendCode = async () => {
    if (!userName.trim() || !email) {
      setMessage({ text: "이름과 이메일을 모두 입력해 주세요.", type: "error" });
      return;
    }

    try {
      setIsSending(true);
      const result = await sendFindUsernameCode({
        userName: userName.trim(),
        email,
      });
      setMessage({ text: result.message ?? "인증번호가 발송되었습니다.", type: "success" });
    } catch (error) {
      console.error("find username send failed", error);
      setMessage({ text: "아이디 찾기 인증번호 발송에 실패했습니다.", type: "error" });
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
      const result = await verifyFindUsernameCode({
        email,
        authCode: authCode.trim(),
      });
      setFoundUserId(result.userId);
      setMessage({
        text: result.userId
          ? `아이디 찾기에 성공했습니다. 아이디: ${result.userId}`
          : result.message,
        type: "success",
      });
    } catch (error) {
      console.error("find username verify failed", error);
      setFoundUserId("");
      setMessage({ text: "인증번호 확인에 실패했습니다.", type: "error" });
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <AuthShell title="아이디 찾기">
      <C.Form>
        <FormField label="이름" htmlFor="find-id-name">
          <C.Input
            id="find-id-name"
            type="text"
            placeholder="이름을 입력하세요."
            value={userName}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setUserName(event.target.value)
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

        <FormField label="인증번호" htmlFor="find-id-code">
          <C.Row>
            <C.Input
              id="find-id-code"
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

        <C.PrimaryButton type="button" onClick={handleVerifyCode}>
          {foundUserId ? `아이디: ${foundUserId}` : "아이디 찾기"}
        </C.PrimaryButton>
      </C.Form>
    </AuthShell>
  );
}
