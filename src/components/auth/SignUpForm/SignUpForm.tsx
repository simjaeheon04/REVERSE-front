import AuthShell from "../AuthShell/AuthShell";
import FormField from "../FormField/FormField";
import * as C from "../FormField/AuthControls.styles";
import * as S from "./SignUpForm.styles";
import { useState } from "react";

type TermsState = {
  all: boolean;
  service: boolean;
  privacy: boolean;
  marketing: boolean;
  event: boolean;
};

export default function SignUpForm() {
  const [terms, setTerms] = useState<TermsState>({
    all: false,
    service: false,
    privacy: false,
    marketing: false,
    event: false,
  });

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
    setTerms((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <AuthShell title='회원가입'>
      <C.Form>
        <FormField label='아이디' htmlFor='signup-id'>
          <C.Row>
            <C.Input
              id='signup-id'
              type='text'
              placeholder='아이디를 입력하세요.'
            />
            <C.GhostButton type='button'>중복 확인</C.GhostButton>
          </C.Row>
        </FormField>

        <FormField label='비밀번호' htmlFor='signup-password'>
          <C.Input
            id='signup-password'
            type='password'
            placeholder='비밀번호를 입력하세요.'
          />
        </FormField>

        <FormField label='비밀번호 확인' htmlFor='signup-password-confirm'>
          <C.Input
            id='signup-password-confirm'
            type='password'
            placeholder='비밀번호를 입력하세요.'
          />
        </FormField>

        <FormField label='이메일'>
          <C.EmailRow>
            <C.Input type='text' placeholder='이메일을 입력하세요.' />
            <C.At>@</C.At>
            <C.Select defaultValue=''>
              <option value='' disabled>
                선택하세요.
              </option>
              <option value='gmail.com'>gmail.com</option>
              <option value='naver.com'>naver.com</option>
              <option value='daum.net'>daum.net</option>
            </C.Select>
            <C.GhostButton type='button'>전송</C.GhostButton>
          </C.EmailRow>
        </FormField>

        <FormField label='인증번호' htmlFor='signup-code'>
          <C.Row>
            <C.Input
              id='signup-code'
              type='text'
              placeholder='인증번호를 입력하세요.'
            />
            <C.GhostButton type='button'>인증번호 확인</C.GhostButton>
          </C.Row>
        </FormField>

        <S.TermsSection>
          <S.TermsTitle>약관 동의</S.TermsTitle>

          <S.TermsList>
            <S.CheckItem>
              <input
                type='checkbox'
                checked={terms.all}
                onChange={(e) => handleAllChange(e.target.checked)}
              />
              <span>전체 약관에 동의합니다.</span>
            </S.CheckItem>

            <S.TermsGroup>
              <S.CheckItem>
                <input
                  type='checkbox'
                  checked={terms.service}
                  onChange={() => handleTermChange("service")}
                />
                <span>[필수] 이용약관 동의</span>
              </S.CheckItem>

              <S.CheckItem>
                <input
                  type='checkbox'
                  checked={terms.privacy}
                  onChange={() => handleTermChange("privacy")}
                />
                <span>[필수] 개인정보 수집 및 이용 동의</span>
              </S.CheckItem>

              <S.CheckItem>
                <input
                  type='checkbox'
                  checked={terms.marketing}
                  onChange={() => handleTermChange("marketing")}
                />
                <span>[선택] 마케팅 정보 수신 동의</span>
              </S.CheckItem>

              <S.CheckItem>
                <input
                  type='checkbox'
                  checked={terms.event}
                  onChange={() => handleTermChange("event")}
                />
                <span>[선택] 이벤트 및 혜택 알림 수신 동의</span>
              </S.CheckItem>
            </S.TermsGroup>
          </S.TermsList>
        </S.TermsSection>

        <C.PrimaryButton type='button'>회원가입</C.PrimaryButton>
      </C.Form>
    </AuthShell>
  );
}
