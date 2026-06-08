import Footer from "../../components/common/footer/Footer";
import * as S from "./StudyApplyCompletePage.styles";

export default function StudyApplyCompletePage() {
  return (
    <S.Page>
      <S.CompleteSection>
        <S.Content>
          <S.BrandTitle>REVERSE</S.BrandTitle>
          <S.Message>스터디 지원서가 성공적으로 접수되었습니다🙌</S.Message>
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
