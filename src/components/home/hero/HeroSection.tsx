import { useEffect, useState } from "react";
import * as S from "./HeroSection.styles";

const AUTO_SLIDE_DELAY = 4000;

type HeroSectionProps = {
  imageUrls: string[];
};

export default function HeroSection({ imageUrls }: HeroSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (imageUrls.length <= 1) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % imageUrls.length);
    }, AUTO_SLIDE_DELAY);

    return () => window.clearInterval(intervalId);
  }, [imageUrls]);

  if (imageUrls.length === 0) {
    return (
      <S.Section>
        <S.EmptyState>등록된 배너 이미지가 없습니다.</S.EmptyState>
      </S.Section>
    );
  }

  const visibleIndex = activeIndex < imageUrls.length ? activeIndex : 0;

  return (
    <S.Section>
      <S.SliderTrack style={{ transform: `translateX(-${visibleIndex * 100}%)` }}>
        {imageUrls.map((image, index) => (
          <S.Slide key={`${image}-${index}`}>
            <S.BackgroundImage
              src={image}
              alt={`REVERSE hero slide ${index + 1}`}
            />
            <S.Overlay />
          </S.Slide>
        ))}
      </S.SliderTrack>

      <S.IndicatorList>
        {imageUrls.map((_, index) => (
          <S.IndicatorButton
            key={`hero-indicator-${index}`}
            type='button'
            $active={visibleIndex === index}
            aria-label={`Go to hero slide ${index + 1}`}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </S.IndicatorList>
    </S.Section>
  );
}
