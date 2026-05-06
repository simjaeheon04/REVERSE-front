import { useState } from "react";
import { recruitCards, recruitFields } from "../recruitData";
import * as S from "./RecruitFieldSection.styles";

export default function RecruitFieldSection() {
  const [isFieldTabsOpen, setIsFieldTabsOpen] = useState(false);

  return (
    <S.Section>
      <S.Header>
        <S.Title>모집 분야</S.Title>
        <S.TitleRule />
      </S.Header>

      <S.Content>
        <S.CardGrid>
          {recruitCards.map((card, index) => (
            <S.RecruitCard
              key={card.title}
              onMouseEnter={() => {
                if (index === 0) {
                  setIsFieldTabsOpen(true);
                }
              }}
              onMouseLeave={() => {
                if (index === 0) {
                  setIsFieldTabsOpen(false);
                }
              }}
            >
              <S.ImageStage>
                {index === 0 ? (
                  <S.FieldTabs
                    aria-label='모집 분야 목록'
                    $visible={isFieldTabsOpen}
                  >
                    {recruitFields.map((field, fieldIndex) => (
                      <S.FieldTab
                        key={field}
                        type='button'
                        $visible={isFieldTabsOpen}
                        style={{ transitionDelay: `${fieldIndex * 0.07}s` }}
                      >
                        {field}
                      </S.FieldTab>
                    ))}
                  </S.FieldTabs>
                ) : null}
                <S.CardImage src={card.image} alt={card.title} />
              </S.ImageStage>
              <S.CardTitle>{card.title}</S.CardTitle>
              <S.CardSubtitle>{card.subtitle}</S.CardSubtitle>
              <S.CardDescription>{card.description}</S.CardDescription>
            </S.RecruitCard>
          ))}
        </S.CardGrid>
      </S.Content>

      <S.BottomRule />
    </S.Section>
  );
}
