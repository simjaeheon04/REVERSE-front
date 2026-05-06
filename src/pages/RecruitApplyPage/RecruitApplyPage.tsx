import Footer from "../../components/common/footer/Footer";
import RecruitApplyForm from "../../components/recruit/RecruitApplyForm/RecruitApplyForm";
import RecruitApplyInfo from "../../components/recruit/RecruitApplyInfo/RecruitApplyInfo";
import * as S from "./RecruitApplyPage.styles";

export default function RecruitApplyPage() {
  return (
    <S.Page>
      <S.ApplySection>
        <S.BackgroundOverlay />
        <S.Content>
          <RecruitApplyInfo />
          <RecruitApplyForm />
        </S.Content>
        <S.DeviceImage alt='REVERSE iMac' />
      </S.ApplySection>
      <Footer />
    </S.Page>
  );
}
