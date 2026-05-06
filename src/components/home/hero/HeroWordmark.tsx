import * as S from "./HeroWordmark.styles";
import aboutLogo from "../../../assets/logos/about_logo.png";

type HeroWordmarkProps = {
  subtitle?: string;
};

export default function HeroWordmark({ subtitle }: HeroWordmarkProps) {
  return (
    <S.Section>
      <S.TitleImage src={aboutLogo} alt='REVERSE' />
      <S.Subtitle>{subtitle || " "}</S.Subtitle>
    </S.Section>
  );
}
