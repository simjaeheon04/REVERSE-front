import Footer from "../../components/common/footer/Footer";
import {
  RecruitContactSection,
  RecruitFieldSection,
  RecruitGallerySection,
  RecruitHeroSection,
  RecruitIntroSection,
} from "../../components/recruit";
import * as S from "./RecruitPage.styles";

export default function RecruitPage() {
  return (
    <S.Page>
      <RecruitHeroSection />
      <RecruitIntroSection />
      <RecruitFieldSection />
      <RecruitGallerySection />
      <RecruitContactSection />
      <Footer />
    </S.Page>
  );
}
