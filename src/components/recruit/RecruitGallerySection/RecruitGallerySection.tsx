import { useEffect, useRef, useState } from "react";
import { galleryItems, infiniteGalleryItems } from "../recruitData";
import * as S from "./RecruitGallerySection.styles";

const AUTO_GALLERY_DELAY = 5400;

export default function RecruitGallerySection() {
  const [displayIndex, setDisplayIndex] = useState(1);
  const [trackOffset, setTrackOffset] = useState(0);
  const [isTrackAnimating, setIsTrackAnimating] = useState(true);
  const galleryStageRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const activeIndex =
    (displayIndex - 1 + galleryItems.length) % galleryItems.length;

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setDisplayIndex((prev) => prev + 1);
    }, AUTO_GALLERY_DELAY);

    return () => window.clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const updateTrackOffset = () => {
      const stage = galleryStageRef.current;
      const activeSlide = slideRefs.current[displayIndex];

      if (!stage || !activeSlide) return;

      const nextOffset =
        activeSlide.offsetLeft +
        activeSlide.offsetWidth / 2 -
        stage.clientWidth / 2;

      setTrackOffset(nextOffset);
    };

    updateTrackOffset();
    window.addEventListener("resize", updateTrackOffset);

    return () => window.removeEventListener("resize", updateTrackOffset);
  }, [displayIndex]);

  const handleGalleryTransitionEnd = () => {
    if (displayIndex === galleryItems.length + 1) {
      setIsTrackAnimating(false);
      setDisplayIndex(1);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setIsTrackAnimating(true));
      });
      return;
    }

    if (displayIndex === 0) {
      setIsTrackAnimating(false);
      setDisplayIndex(galleryItems.length);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setIsTrackAnimating(true));
      });
    }
  };

  const handleCategoryClick = (index: number) => {
    if (activeIndex === galleryItems.length - 1 && index === 0) {
      setDisplayIndex(galleryItems.length + 1);
      return;
    }

    if (activeIndex === 0 && index === galleryItems.length - 1) {
      setDisplayIndex(0);
      return;
    }

    setDisplayIndex(index + 1);
  };

  return (
    <S.Section>
      <S.Title>GALLERY</S.Title>
      <S.Stage ref={galleryStageRef}>
        <S.Track
          $animate={isTrackAnimating}
          style={{
            transform: `translateX(-${trackOffset}px)`,
          }}
          onTransitionEnd={handleGalleryTransitionEnd}
        >
          {infiniteGalleryItems.map((item, index) => (
            <S.Slide
              key={`${item.label}-${index}`}
              ref={(node) => {
                slideRefs.current[index] = node;
              }}
            >
              <S.Image src={item.image} alt={`${item.label} 활동 이미지`} />
            </S.Slide>
          ))}
        </S.Track>
      </S.Stage>

      <S.CategoryList aria-label='갤러리 카테고리'>
        {galleryItems.map((item, index) => (
          <S.CategoryChip
            key={item.label}
            type='button'
            $active={activeIndex === index}
            onClick={() => handleCategoryClick(index)}
          >
            {activeIndex === index ? (
              <S.CheckMark aria-hidden='true'>✓</S.CheckMark>
            ) : null}
            {item.label}
          </S.CategoryChip>
        ))}
        <S.ChatButton type='button' aria-label='갤러리 문의'>
          <S.ChatIcon viewBox='0 0 24 24' fill='none'></S.ChatIcon>
        </S.ChatButton>
      </S.CategoryList>
    </S.Section>
  );
}
