import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../../components/common/footer/Footer";
import type { StudyPost } from "../StudyPage/studyDummyData";
import { getAllStudyPosts } from "../StudyPage/studyStorage";
import * as S from "./StudyDetailPage.styles";

function IntroductionPanel({ study }: { study: StudyPost }) {
  const rows = [
    { label: "활동 소개", value: study.introduction },
    { label: "활동 목표", value: study.goal },
    { label: "활동 인원", value: `${study.memberCount}명` },
    { label: "진행요일 및 시간", value: study.schedule },
    { label: "진행 장소 및 방법", value: study.place },
    { label: "유의사항", value: study.notes },
  ];

  return (
    <section>
      <S.SectionTitle>Introduction</S.SectionTitle>
      <S.InfoBox>
        {rows.map((row) => (
          <S.InfoRow key={row.label}>
            <S.InfoLabel>{row.label}</S.InfoLabel>
            <S.InfoValue>{row.value}</S.InfoValue>
          </S.InfoRow>
        ))}
      </S.InfoBox>
    </section>
  );
}

function CurriculumPanel({ study }: { study: StudyPost }) {
  return (
    <section>
      <S.SectionTitle>curriculum</S.SectionTitle>
      <S.CurriculumBox>
        {study.curriculum.map((item) => (
          <S.CurriculumRow key={item.week}>
            <S.Week>{item.week}</S.Week>
            <span>{item.title}</span>
          </S.CurriculumRow>
        ))}
      </S.CurriculumBox>
    </section>
  );
}

export default function StudyDetailPage() {
  const navigate = useNavigate();
  const { studyId } = useParams();
  const study = useMemo(
    () => getAllStudyPosts().find((item) => String(item.id) === studyId),
    [studyId]
  );

  if (!study) {
    return (
      <>
        <S.Page>
          <S.Inner>
            <S.EmptyState>
              <p>해당 스터디 정보를 찾을 수 없습니다.</p>
              <S.BackButton type="button" onClick={() => navigate("/study")}>
                스터디 목록으로 돌아가기
              </S.BackButton>
            </S.EmptyState>
          </S.Inner>
        </S.Page>
        <Footer />
      </>
    );
  }

  return (
    <>
      <S.Page>
        <S.Inner>
          <S.Title>{study.title}</S.Title>
          <S.Divider />

          <S.ContentGrid>
            <S.MainColumn>
              <IntroductionPanel study={study} />
              <CurriculumPanel study={study} />
            </S.MainColumn>

            <S.SideColumn>
              <section>
                <S.SectionTitle>leader</S.SectionTitle>
                <S.SideBox>
                  <S.LeaderName>{study.leader}</S.LeaderName>
                </S.SideBox>
              </section>

              <section>
                <S.SectionTitle>stack</S.SectionTitle>
                <S.SideBox>
                  <S.StackList>
                    <S.StackLine>
                      <S.StackLabel>사용 언어</S.StackLabel>
                      <span>{study.language}</span>
                    </S.StackLine>
                    <S.StackLine>
                      <S.StackLabel>기술 스택</S.StackLabel>
                      <span>{study.stack.join(", ")}</span>
                    </S.StackLine>
                  </S.StackList>
                </S.SideBox>
              </section>

              <S.ApplyRow>
                <S.ApplyButton
                  type="button"
                  aria-label={`${study.title} 신청하기`}
                  onClick={() => navigate(`/study/${study.id}/apply`)}
                />
                <S.ApplyText>신청하기</S.ApplyText>
              </S.ApplyRow>
            </S.SideColumn>
          </S.ContentGrid>
        </S.Inner>
      </S.Page>
      <Footer />
    </>
  );
}
