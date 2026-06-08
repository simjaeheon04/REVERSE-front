import { AxiosError } from "axios";
import {
  useEffect,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Footer from "../../components/common/footer/Footer";
import {
  createProjectPost,
  getProjectDetail,
  updateProjectPost,
  type ProjectCreatePayload,
  type ProjectUpdatePayload,
} from "../../services/projectAPI";
import * as S from "./ProjectWritePage.styles";

const DAYS = [
  { label: "월", value: 1 },
  { label: "화", value: 2 },
  { label: "수", value: 3 },
  { label: "목", value: 4 },
  { label: "금", value: 5 },
  { label: "토", value: 6 },
  { label: "일", value: 0 },
];

const TIMES = [
  { label: "4시", value: "16:00" },
  { label: "5시", value: "17:00" },
  { label: "6시", value: "18:00" },
  { label: "7시", value: "19:00" },
  { label: "8시", value: "20:00" },
  { label: "9시", value: "21:00" },
  { label: "10시", value: "22:00" },
  { label: "11시", value: "23:00" },
];

type FormValues = {
  projectName: string;
  leaderName: string;
  description: string;
  goal: string;
  memberCount: string;
  dayOfWeek: number;
  meetTime: string;
  location: string;
  notice: string;
};

const initialValues: FormValues = {
  projectName: "",
  leaderName: "",
  description: "",
  goal: "",
  memberCount: "4",
  dayOfWeek: 1,
  meetTime: "17:00",
  location: "",
  notice: "",
};

const getApiErrorMessage = (error: unknown, fallback: string) => {
  if (error instanceof AxiosError) {
    const responseData = error.response?.data;

    if (responseData && typeof responseData === "object") {
      const message = (responseData as { message?: unknown }).message;
      if (typeof message === "string" && message.trim()) {
        return message;
      }
    }
  }

  return fallback;
};

export default function ProjectWritePage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode");
  const projectId = searchParams.get("projectId");
  const isEditMode = mode === "edit" && Boolean(projectId);
  const [values, setValues] = useState<FormValues>(initialValues);
  const [photoName, setPhotoName] = useState("");
  const [message, setMessage] = useState<{
    text: string;
    type: "error" | "success";
  } | null>(null);
  const [isLoadingDetail, setIsLoadingDetail] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isEditMode || !projectId) {
      return;
    }

    const loadProject = async () => {
      try {
        setIsLoadingDetail(true);
        setMessage(null);
        const project = await getProjectDetail(projectId);
        const firstSchedule = project.schedules[0];

        setValues({
          projectName: project.projectName,
          leaderName: project.leaderName || project.leaderId,
          description: project.description,
          goal: project.goal,
          memberCount: String(project.memberCount || 4),
          dayOfWeek: Number(firstSchedule?.dayOfWeek ?? 1),
          meetTime: firstSchedule?.meetTime || "17:00",
          location: project.location,
          notice: project.notice,
        });
      } catch (error) {
        console.error("[project/write] detail load failed", error);
        setMessage({
          text: getApiErrorMessage(error, "프로젝트 정보를 불러오지 못했습니다."),
          type: "error",
        });
      } finally {
        setIsLoadingDetail(false);
      }
    };

    void loadProject();
  }, [isEditMode, projectId]);

  const handleTextChange =
    (key: keyof FormValues) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const value = event.target.value;
      setValues((prev) => ({
        ...prev,
        [key]: key === "dayOfWeek" ? Number(value) : value,
      }));
    };

  const handlePhotoChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setPhotoName(file?.name ?? "");
  };

  const validate = () => {
    if (
      !values.projectName.trim() ||
      !values.description.trim() ||
      !values.goal.trim() ||
      !values.location.trim()
    ) {
      return "필수 항목(프로젝트명, 소개, 목표, 장소)을 입력해 주세요.";
    }

    if (isEditMode && !values.leaderName.trim()) {
      return "팀장 이름을 입력해 주세요.";
    }

    return null;
  };

  const getBasePayload = (): ProjectCreatePayload => ({
    projectName: values.projectName.trim(),
    description: values.description.trim(),
    goal: values.goal.trim(),
    location: values.location.trim(),
    notice: values.notice.trim(),
    status: "ACTIVE",
    schedules: [
      {
        dayOfWeek: values.dayOfWeek,
        meetTime: values.meetTime,
      },
    ],
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationMessage = validate();
    if (validationMessage) {
      setMessage({ text: validationMessage, type: "error" });
      return;
    }

    try {
      setIsSubmitting(true);
      setMessage(null);

      if (isEditMode && projectId) {
        const updatePayload: ProjectUpdatePayload = {
          ...getBasePayload(),
          leaderName: values.leaderName.trim(),
        };
        const result = await updateProjectPost(projectId, updatePayload);
        setMessage({
          text: result.message || "프로젝트 모집글이 수정되었습니다.",
          type: "success",
        });
        navigate("/project/manage");
        return;
      }

      const result = await createProjectPost(getBasePayload());
      setMessage({
        text: result.message || "프로젝트 모집글이 등록되었습니다.",
        type: "success",
      });
      navigate(`/project/${result.projectId}`);
    } catch (error) {
      console.error("[project/write] submit failed", error);
      setMessage({
        text: getApiErrorMessage(
          error,
          isEditMode
            ? "프로젝트 모집글 수정에 실패했습니다."
            : "프로젝트 모집글 등록에 실패했습니다."
        ),
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <S.Page>
        <S.Inner>
          <S.Hero>
            <S.Title>PROJECT INFO</S.Title>
          </S.Hero>

          <S.SectionTitle>Introduction</S.SectionTitle>

          <S.Form onSubmit={handleSubmit}>
            <S.Row>
              <S.Label htmlFor="project-name">프로젝트명:</S.Label>
              <S.Input
                id="project-name"
                value={values.projectName}
                onChange={handleTextChange("projectName")}
                placeholder="프로젝트명을 입력하세요"
              />
            </S.Row>

            {isEditMode ? (
              <S.Row>
                <S.Label htmlFor="project-leader">팀장 이름:</S.Label>
                <S.Input
                  id="project-leader"
                  value={values.leaderName}
                  onChange={handleTextChange("leaderName")}
                  placeholder="팀장 이름을 입력하세요"
                />
              </S.Row>
            ) : null}

            <S.Row>
              <S.Label htmlFor="project-photo">사진 첨부:</S.Label>
              <S.FileControl>
                <S.FileButton htmlFor="project-photo">
                  프로젝트 사진 첨부
                  <input
                    id="project-photo"
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                  />
                </S.FileButton>
                <S.FileName>{photoName || "선택된 파일 없음"}</S.FileName>
              </S.FileControl>
            </S.Row>

            <S.Row>
              <S.Label htmlFor="project-description">프로젝트 소개:</S.Label>
              <S.Textarea
                id="project-description"
                value={values.description}
                onChange={handleTextChange("description")}
                placeholder="프로젝트 소개를 입력하세요."
              />
            </S.Row>

            <S.Row>
              <S.Label htmlFor="project-goal">활동 목표:</S.Label>
              <S.Textarea
                id="project-goal"
                value={values.goal}
                onChange={handleTextChange("goal")}
                placeholder="활동 목표를 입력하세요."
              />
            </S.Row>

            <S.Row>
              <S.Label htmlFor="project-member-count">활동 인원</S.Label>
              <S.Select
                id="project-member-count"
                value={values.memberCount}
                onChange={handleTextChange("memberCount")}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map((count) => (
                  <option key={count} value={count}>
                    {count}
                  </option>
                ))}
              </S.Select>
            </S.Row>

            <S.Row>
              <S.Label htmlFor="project-day">진행 요일 및 시간</S.Label>
              <S.SelectRow>
                <S.Select
                  id="project-day"
                  value={values.dayOfWeek}
                  onChange={handleTextChange("dayOfWeek")}
                >
                  {DAYS.map((day) => (
                    <option key={day.value} value={day.value}>
                      {day.label}
                    </option>
                  ))}
                </S.Select>
                <S.Select
                  aria-label="진행 시간"
                  value={values.meetTime}
                  onChange={handleTextChange("meetTime")}
                >
                  {TIMES.map((time) => (
                    <option key={time.value} value={time.value}>
                      {time.label}
                    </option>
                  ))}
                </S.Select>
              </S.SelectRow>
            </S.Row>

            <S.Row>
              <S.Label htmlFor="project-location">진행 장소 및 방법</S.Label>
              <S.Textarea
                id="project-location"
                value={values.location}
                onChange={handleTextChange("location")}
                placeholder="진행 장소 및 방법을 입력하세요."
              />
            </S.Row>

            <S.Row>
              <S.Label htmlFor="project-notice">유의사항</S.Label>
              <S.Textarea
                id="project-notice"
                value={values.notice}
                onChange={handleTextChange("notice")}
                placeholder="지원자가 확인해야 할 내용을 입력하세요."
              />
            </S.Row>

            {message ? (
              <S.Message $type={message.type}>{message.text}</S.Message>
            ) : null}

            <S.Actions>
              <S.PrimaryButton
                type="submit"
                disabled={isSubmitting || isLoadingDetail}
              >
                {isSubmitting
                  ? isEditMode
                    ? "수정 중..."
                    : "게시 중..."
                  : isEditMode
                    ? "수정하기"
                    : "게시하기"}
              </S.PrimaryButton>
              <S.SecondaryButton
                type="button"
                onClick={() => navigate(isEditMode ? "/project/manage" : "/project")}
              >
                작성 취소
              </S.SecondaryButton>
            </S.Actions>
          </S.Form>
        </S.Inner>
      </S.Page>
      <Footer />
    </>
  );
}
