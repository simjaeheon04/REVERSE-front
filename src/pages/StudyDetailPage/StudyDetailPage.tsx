import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../../components/common/footer/Footer";
import LoginRequiredModal from "../../components/common/LoginRequiredModal/LoginRequiredModal";
import { getStudyDetail, type StudyRecord } from "../../services/studyApi";
import { useAuthStore } from "../../stores/authStore";
import { canApplyAsMember } from "../../utils/memberPermission";
import * as S from "./StudyDetailPage.styles";

const DAY_LABELS = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];

const getScheduleText = (study: StudyRecord) => {
  if (!study.schedules?.length) {
    return "진행 요일 및 시간이 입력되지 않았습니다.";
  }

  return study.schedules
    .map((schedule) => `${DAY_LABELS[schedule.dayOfWeek] ?? "요일 미정"} ${schedule.meetTime}`)
    .join(", ");
};

function IntroductionPanel({ study }: { study: StudyRecord }) {
  const rows = [
    { label: "활동 소개", value: study.description || "활동 소개가 입력되지 않았습니다." },
    { label: "활동 목표", value: study.goal || "활동 목표가 입력되지 않았습니다." },
    { label: "활동 인원", value: `${study.memberCount ?? study.maxMembers ?? 0}명` },
    { label: "진행요일 및 시간", value: getScheduleText(study) },
    { label: "진행 장소 및 방법", value: study.location || "진행 장소 및 방법이 입력되지 않았습니다." },
    { label: "유의사항", value: study.notice || "유의사항이 입력되지 않았습니다." },
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

function CurriculumPanel({ study }: { study: StudyRecord }) {
  const curriculums = study.curriculums ?? [];

  return (
    <section>
      <S.SectionTitle>curriculum</S.SectionTitle>
      <S.CurriculumBox>
        {curriculums.length ? (
          curriculums.map((item) => (
            <S.CurriculumRow key={item.week}>
              <S.Week>{item.week}주차</S.Week>
              <span>{item.contents}</span>
            </S.CurriculumRow>
          ))
        ) : (
          <span>커리큘럼이 입력되지 않았습니다.</span>
        )}
      </S.CurriculumBox>
    </section>
  );
}

export default function StudyDetailPage() {
  const navigate = useNavigate();
  const { studyId } = useParams();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const roleId = useAuthStore((state) => state.roleId);
  const roleName = useAuthStore((state) => state.roleName);
  const isProfileLoading = useAuthStore((state) => state.isProfileLoading);
  const [study, setStudy] = useState<StudyRecord | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [permissionModal, setPermissionModal] = useState<"login" | "member" | null>(null);

  const handleApply = () => {
    if (!study) {
      return;
    }

    if (!isAuthenticated) {
      setPermissionModal("login");
      return;
    }

    if (isProfileLoading) {
      return;
    }

    if (!canApplyAsMember({ isAuthenticated, roleId, roleName })) {
      setPermissionModal("member");
      return;
    }

    navigate(`/study/${study.studyId}/apply`);
  };

  useEffect(() => {
    if (!studyId) {
      return;
    }

    const loadStudy = async () => {
      try {
        setIsLoading(true);
        setErrorMessage("");
        const result = await getStudyDetail(studyId);
        setStudy(result);
      } catch {
        setStudy(null);
        setErrorMessage("해당 스터디 정보를 찾을 수 없습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    void loadStudy();
  }, [studyId]);

  if (!study) {
    return (
      <>
        <S.Page>
          <S.Inner>
            <S.EmptyState>
              <p>
                {isLoading
                  ? "스터디 정보를 불러오는 중입니다."
                  : errorMessage || "해당 스터디 정보를 찾을 수 없습니다."}
              </p>
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
          <S.Title>{study.studyName}</S.Title>
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
                  <S.LeaderName>{study.leaderName || study.leaderId}</S.LeaderName>
                </S.SideBox>
              </section>

              <section>
                <S.SectionTitle>stack</S.SectionTitle>
                <S.SideBox>
                  <S.StackList>
                    <S.StackLine>
                      <S.StackLabel>사용 언어</S.StackLabel>
                      <span>{study.language || "미정"}</span>
                    </S.StackLine>
                    <S.StackLine>
                      <S.StackLabel>기술 스택</S.StackLabel>
                      <span>{study.techStack || "미정"}</span>
                    </S.StackLine>
                  </S.StackList>
                </S.SideBox>
              </section>

              <S.ApplyRow>
                <S.ApplyButton
                  type="button"
                  aria-label={`${study.studyName} 신청하기`}
                  onClick={handleApply}
                />
                <S.ApplyText>신청하기</S.ApplyText>
              </S.ApplyRow>
            </S.SideColumn>
          </S.ContentGrid>
        </S.Inner>
      </S.Page>
      <LoginRequiredModal
        isOpen={permissionModal === "login"}
        onConfirm={() => {
          setPermissionModal(null);
          navigate("/login");
        }}
      />
      <LoginRequiredModal
        isOpen={permissionModal === "member"}
        title="현부원 이상 신청할 수 있습니다."
        description="스터디 신청은 멤버 권한부터 이용할 수 있습니다."
        onConfirm={() => setPermissionModal(null)}
      />
      <Footer />
    </>
  );
}
