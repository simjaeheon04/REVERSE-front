import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import completeLogo from "../../assets/logos/Logo_4.png";
import Footer from "../../components/common/footer/Footer";
import * as S from "./ProjectApplyCompletePage.styles";

export default function ProjectApplyCompletePage() {
  const navigate = useNavigate();

  useEffect(() => {
    const redirectTimer = window.setTimeout(() => {
      navigate("/");
    }, 2000);

    return () => window.clearTimeout(redirectTimer);
  }, [navigate]);

  return (
    <S.Page>
      <S.CompleteSection>
        <S.Content>
          <S.LogoImage src={completeLogo} alt="REVERSE" />
          <S.Message>프로젝트 지원서가 성공적으로 접수되었습니다🙌</S.Message>
          <S.Description>
            이후 일정은 등록하신 연락처를 통해 개별적으로 안내해드릴 예정입니다.
            <br />
            조금만 기다려 주시면 감사하겠습니다.
          </S.Description>
        </S.Content>
      </S.CompleteSection>
      <Footer />
    </S.Page>
  );
}
