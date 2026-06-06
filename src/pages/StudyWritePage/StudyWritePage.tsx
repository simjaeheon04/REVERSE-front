import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/common/footer/Footer";
import { createStudyRecruitment } from "../../services/studyApi";
import { useAuthStore } from "../../stores/authStore";
import { STUDY_SEMESTERS } from "../StudyPage/studyDummyData";
import * as S from "./StudyWritePage.styles";

const WEEKDAYS = ["월요일", "화요일", "수요일", "목요일", "금요일", "토요일", "일요일"];
const TIMES = ["오후 5시", "오후 6시", "오후 7시", "오후 8시", "오후 9시"];
const DAY_OF_WEEK: Record<string, number> = {
  일요일: 0,
  월요일: 1,
  화요일: 2,
  수요일: 3,
  목요일: 4,
  금요일: 5,
  토요일: 6,
};
const MEET_TIME: Record<string, string> = {
  "오후 5시": "17:00",
  "오후 6시": "18:00",
  "오후 7시": "19:00",
  "오후 8시": "20:00",
  "오후 9시": "21:00",
};

const INITIAL_CURRICULUM = [
  "1주차 내용을 입력하세요.",
  "2주차 내용을 입력하세요.",
  "3주차 내용을 입력하세요.",
  "4주차 내용을 입력하세요.",
  "5주차 내용을 입력하세요.",
  "6주차 내용을 입력하세요.",
  "7주차 내용을 입력하세요.",
];

export default function StudyWritePage() {
  const navigate = useNavigate();
  const userId = useAuthStore((state) => state.userId);
  const userName = useAuthStore((state) => state.userName);
  const [semester, setSemester] = useState(STUDY_SEMESTERS[0]);
  const [title, setTitle] = useState("");
  const [leader, setLeader] = useState("");
  const [language, setLanguage] = useState("");
  const [stack, setStack] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [goal, setGoal] = useState("");
  const [memberCount, setMemberCount] = useState("4");
  const [weekday, setWeekday] = useState(WEEKDAYS[0]);
  const [time, setTime] = useState(TIMES[0]);
  const [place, setPlace] = useState("");
  const [notes, setNotes] = useState("");
  const [curriculum, setCurriculum] = useState(INITIAL_CURRICULUM);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateCurriculum = (index: number, value: string) => {
    setCurriculum((prev) =>
      prev.map((item, itemIndex) => (itemIndex === index ? value : item))
    );
  };

  const handleAddWeek = () => {
    setCurriculum((prev) => [...prev, `${prev.length + 1}주차 내용을 입력하세요.`]);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title.trim() || !leader.trim()) {
      setErrorMessage("스터디명과 팀장 이름은 필수입니다.");
      return;
    }

    if (!userId) {
      setErrorMessage("로그인 후 스터디를 작성할 수 있습니다.");
      return;
    }

    try {
      setIsSubmitting(true);
      setErrorMessage("");

      await createStudyRecruitment({
        studyName: title.trim(),
        leaderId: userId,
        leaderName: leader.trim() || userName || userId,
        language: language.trim() || undefined,
        techStack: stack.trim() || undefined,
        description: introduction.trim() || undefined,
        goal: goal.trim() || undefined,
        maxMembers: Number(memberCount) || undefined,
        location: place.trim() || undefined,
        notice: notes.trim() || undefined,
        status: "ACTIVE",
        schedules: [
          {
            dayOfWeek: DAY_OF_WEEK[weekday] ?? 1,
            meetTime: MEET_TIME[time] ?? "18:00",
          },
        ],
        curriculums: curriculum.map((item, index) => ({
          week: index + 1,
          contents: item.trim() || `${index + 1}주차 내용을 입력하세요.`,
        })),
      });
      navigate("/study");
    } catch (error) {
      setErrorMessage(
        error instanceof Error && error.message.trim()
          ? error.message
          : "스터디 생성에 실패했습니다."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <S.Page>
        <S.Inner>
          <S.Title>STUDY INFO</S.Title>

          <S.Form onSubmit={handleSubmit}>
            <S.Section>
              <S.SectionTitle>Introduction</S.SectionTitle>
              <S.Box>
                <S.FieldRow>
                  <S.Label htmlFor="study-semester">스터디명:</S.Label>
                  <S.InlineGrid>
                    <S.Select
                      id="study-semester"
                      value={semester}
                      onChange={(event) => setSemester(event.target.value)}
                    >
                      {STUDY_SEMESTERS.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </S.Select>
                    <S.Input
                      value={title}
                      placeholder="스터디명을 입력하세요"
                      onChange={(event) => setTitle(event.target.value)}
                    />
                  </S.InlineGrid>
                </S.FieldRow>

                <S.FieldRow>
                  <S.Label htmlFor="study-leader">팀장 이름:</S.Label>
                  <S.Input
                    id="study-leader"
                    value={leader}
                    placeholder="팀장 이름을 입력하세요."
                    onChange={(event) => setLeader(event.target.value)}
                  />
                </S.FieldRow>

                <S.FieldRow>
                  <S.Label htmlFor="study-language">사용 언어:</S.Label>
                  <S.Input
                    id="study-language"
                    value={language}
                    placeholder="사용 언어를 입력하세요."
                    onChange={(event) => setLanguage(event.target.value)}
                  />
                </S.FieldRow>

                <S.FieldRow>
                  <S.Label htmlFor="study-stack">기술 스택:</S.Label>
                  <S.Input
                    id="study-stack"
                    value={stack}
                    placeholder="기술 스택을 입력하세요. 예: React, TypeScript"
                    onChange={(event) => setStack(event.target.value)}
                  />
                </S.FieldRow>

                <S.FieldRow>
                  <S.Label htmlFor="study-introduction">활동 소개:</S.Label>
                  <S.TextArea
                    id="study-introduction"
                    value={introduction}
                    placeholder="활동 소개를 입력하세요."
                    onChange={(event) => setIntroduction(event.target.value)}
                  />
                </S.FieldRow>

                <S.FieldRow>
                  <S.Label htmlFor="study-goal">활동 목표:</S.Label>
                  <S.TextArea
                    id="study-goal"
                    value={goal}
                    placeholder="활동 목표를 입력하세요."
                    onChange={(event) => setGoal(event.target.value)}
                  />
                </S.FieldRow>

                <S.FieldRow>
                  <S.Label htmlFor="study-member-count">활동 인원</S.Label>
                  <S.Select
                    id="study-member-count"
                    value={memberCount}
                    onChange={(event) => setMemberCount(event.target.value)}
                  >
                    {Array.from({ length: 8 }, (_, index) => index + 1).map((count) => (
                      <option key={count} value={count}>
                        {count}
                      </option>
                    ))}
                  </S.Select>
                </S.FieldRow>

                <S.FieldRow>
                  <S.Label>진행요일 및 시간</S.Label>
                  <S.InlineGrid>
                    <S.Select value={weekday} onChange={(event) => setWeekday(event.target.value)}>
                      {WEEKDAYS.map((day) => (
                        <option key={day} value={day}>
                          {day}
                        </option>
                      ))}
                    </S.Select>
                    <S.Select value={time} onChange={(event) => setTime(event.target.value)}>
                      {TIMES.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </S.Select>
                  </S.InlineGrid>
                </S.FieldRow>

                <S.FieldRow>
                  <S.Label htmlFor="study-place">진행 장소 및 방법</S.Label>
                  <S.Input
                    id="study-place"
                    value={place}
                    placeholder="진행 장소 및 방법을 입력하세요."
                    onChange={(event) => setPlace(event.target.value)}
                  />
                </S.FieldRow>

                <S.FieldRow>
                  <S.Label htmlFor="study-notes">유의사항</S.Label>
                  <S.Input
                    id="study-notes"
                    value={notes}
                    placeholder="유의사항을 입력하세요."
                    onChange={(event) => setNotes(event.target.value)}
                  />
                </S.FieldRow>
              </S.Box>
            </S.Section>

            <S.Section>
              <S.SectionTitle>curriculum</S.SectionTitle>
              <S.CurriculumBox>
                <S.CurriculumList>
                  {curriculum.map((item, index) => (
                    <S.CurriculumRow key={`${index + 1}week`}>
                      <S.WeekLabel>{index + 1}주차</S.WeekLabel>
                      <S.Input
                        value={item}
                        onChange={(event) => updateCurriculum(index, event.target.value)}
                      />
                    </S.CurriculumRow>
                  ))}
                </S.CurriculumList>
                <S.AddButton type="button" onClick={handleAddWeek}>
                  + 추가
                </S.AddButton>
              </S.CurriculumBox>
            </S.Section>

            {errorMessage ? <S.ErrorText>{errorMessage}</S.ErrorText> : null}

            <S.ActionRow>
              <S.SubmitButton type="submit" disabled={isSubmitting}>
                {isSubmitting ? "게시 중" : "게시하기"}
              </S.SubmitButton>
              <S.CancelButton type="button" onClick={() => navigate("/study")}>
                작성 취소
              </S.CancelButton>
            </S.ActionRow>
          </S.Form>
        </S.Inner>
      </S.Page>
      <Footer />
    </>
  );
}
