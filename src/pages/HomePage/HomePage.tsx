import { useEffect, useState } from "react";
import * as S from "./HomePage.styles";

import AboutSection from "../../components/home/about/AboutSection";
import ExecutiveSection from "../../components/home/executive/ExecutiveSection";
import HeroSection from "../../components/home/hero/HeroSection";
import HeroWordmark from "../../components/home/hero/HeroWordmark";
import ProjectSection from "../../components/home/project/ProjectSection";
import RuleSection from "../../components/home/rule/RuleSection";
import Footer from "../../components/common/footer/Footer";
import {
  getClubIntroList,
  type ClubIntroResponse,
} from "../../services/clubIntroApi";

export default function HomePage() {
  const [clubIntros, setClubIntros] = useState<ClubIntroResponse[]>([]);

  useEffect(() => {
    const fetchClubIntros = async () => {
      try {
        const data = await getClubIntroList();
        setClubIntros(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("failed to load club intro list", error);
        setClubIntros([]);
      }
    };

    fetchClubIntros();
  }, []);

  const heroSubtitle = clubIntros[0]?.subTitle ?? "";
  const heroImageUrls = clubIntros
    .map((item) => item.bannerUrl)
    .filter((url): url is string => Boolean(url));

  return (
    <S.Page>
      <HeroWordmark subtitle={heroSubtitle} />
      <HeroSection imageUrls={heroImageUrls} />
      <AboutSection />
      <ProjectSection />
      <ExecutiveSection />
      <RuleSection />
      <Footer />
    </S.Page>
  );
}
