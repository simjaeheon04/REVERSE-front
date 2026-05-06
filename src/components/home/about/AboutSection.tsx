import * as S from "./AboutSection.styles";
import introLogo from "../../../assets/logos/Intro_logo.png";
import useScrollReveal from "../../../hooks/useScrollReveal";

export default function AboutSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <S.Section id="club-intro">
      <S.BackgroundMark src={introLogo} alt="" aria-hidden="true" />

      <S.Content ref={ref}>
        <S.Title>
          <S.Reveal $visible={isVisible} style={{ transitionDelay: "0s" }}>
            ABOUT
          </S.Reveal>
          <S.Reveal $visible={isVisible} style={{ transitionDelay: "0.3s" }}>
            REVERSE
          </S.Reveal>
        </S.Title>

        <S.Description>
          <S.Reveal $visible={isVisible} style={{ transitionDelay: "0.6s" }}>
            REVERSE는
          </S.Reveal>
          <S.Reveal $visible={isVisible} style={{ transitionDelay: "0.7s" }}>
            전공에 관계없이 프로그래밍에 관심 있는 학생들이 모여
          </S.Reveal>
          <S.Reveal $visible={isVisible} style={{ transitionDelay: "0.8s" }}>
            함께 공부하고 프로젝트를 진행하는 컴퓨터소프트웨어학과 동아리입니다.
          </S.Reveal>
        </S.Description>

        <S.ButtonGroup>
          <S.LinkButton
            type="button"
            onClick={() =>
              window.open("https://www.instagram.com/nsu_reverse/", "_blank")
            }
          >
            <S.ButtonArrow aria-hidden="true">▶</S.ButtonArrow>
            <span>인스타그램 바로가기</span>
            <S.ButtonIcon aria-hidden="true">↗</S.ButtonIcon>
          </S.LinkButton>

          <S.LinkButton
            type="button"
            onClick={() => window.open("https://cs.nsu.ac.kr/", "_blank")}
          >
            <S.ButtonArrow aria-hidden="true">▶</S.ButtonArrow>
            <span>학과 홈페이지 바로가기</span>
            <S.ButtonIcon aria-hidden="true">↗</S.ButtonIcon>
          </S.LinkButton>
        </S.ButtonGroup>
      </S.Content>
    </S.Section>
  );
}
