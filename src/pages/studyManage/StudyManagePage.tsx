import { AxiosError } from "axios";
import { useCallback, useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import {
  createStudyRecruitment,
  deleteStudyRecruitment,
  getStudies,
  updateStudyRecruitment,
  type StudyCreatePayload,
  type StudyRecord,
} from "../../services/studyApi";
import { useAuthStore } from "../../stores/authStore";
import * as S from "../clubIntroManage/ClubIntroManagePage.styles";

const getApiErrorMessage = (error: unknown, fallback: string) => {
  if (error instanceof AxiosError) {
    const data = error.response?.data;

    if (typeof data === "string" && data.trim()) {
      return data;
    }

    if (data && typeof data === "object") {
      const record = data as Record<string, unknown>;

      if (typeof record.message === "string" && record.message.trim()) {
        return record.message;
      }
    }
  }

  if (error instanceof Error && error.message.trim()) {
    return error.message;
  }

  return fallback;
};

const toJsonText = (value: unknown) => JSON.stringify(value ?? null, null, 2);

const initialForm = {
  studyName: "",
  leaderName: "",
  language: "",
  techStack: "",
  description: "",
  goal: "",
  location: "",
  notice: "",
  dayOfWeek: "1",
  meetTime: "18:00",
  curriculum: "1주차: OT\n2주차: 주제 학습",
};

export default function StudyManagePage() {
  const userId = useAuthStore((state) => state.userId);
  const userName = useAuthStore((state) => state.userName);
  const [form, setForm] = useState(initialForm);
  const [studyId, setStudyId] = useState("");
  const [keyword, setKeyword] = useState("");
  const [studies, setStudies] = useState<StudyRecord[]>([]);
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState<unknown>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const buildPayload = (): StudyCreatePayload => ({
    studyName: form.studyName.trim(),
    leaderId: userId ?? "",
    leaderName: form.leaderName.trim() || userName || userId || "",
    language: form.language.trim() || undefined,
    techStack: form.techStack.trim() || undefined,
    description: form.description.trim() || undefined,
    goal: form.goal.trim() || undefined,
    location: form.location.trim() || undefined,
    notice: form.notice.trim() || undefined,
    status: "ACTIVE",
    schedules: [
      {
        dayOfWeek: Number(form.dayOfWeek),
        meetTime: form.meetTime,
      },
    ],
    curriculums: form.curriculum
      .split("\n")
      .map((line, index) => ({
        week: index + 1,
        contents: line.replace(/^\d+주차:\s*/, "").trim(),
      }))
      .filter((item) => item.contents),
  });

  const loadStudies = useCallback(async () => {
    try {
      setIsLoading(true);
      setMessage("");
      const result = await getStudies({ keyword: keyword.trim() || undefined, page: 0 });
      setStudies(result.content ?? []);
      setResponse(result);
      setMessage("스터디 목록을 불러왔습니다.");
    } catch (error) {
      setStudies([]);
      setResponse(null);
      setMessage(getApiErrorMessage(error, "스터디 목록 조회에 실패했습니다."));
    } finally {
      setIsLoading(false);
    }
  }, [keyword]);

  useEffect(() => {
    void loadStudies();
  }, [loadStudies]);

  const handleCreateStudy = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!userId) {
      setMessage("로그인 후 스터디를 생성할 수 있습니다.");
      return;
    }

    if (!form.studyName.trim()) {
      setMessage("스터디명을 입력해 주세요.");
      return;
    }

    try {
      setIsSubmitting(true);
      setMessage("");
      const result = await createStudyRecruitment(buildPayload());
      setResponse(result);
      setMessage("스터디가 생성되었습니다.");
      await loadStudies();
    } catch (error) {
      setResponse(null);
      setMessage(getApiErrorMessage(error, "스터디 생성에 실패했습니다."));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateStudy = async () => {
    if (!studyId.trim()) {
      setMessage("수정할 스터디 ID를 입력해 주세요.");
      return;
    }

    try {
      setIsSubmitting(true);
      setMessage("");
      const result = await updateStudyRecruitment(studyId.trim(), buildPayload());
      setResponse(result);
      setMessage("스터디가 수정되었습니다.");
      await loadStudies();
    } catch (error) {
      setResponse(null);
      setMessage(getApiErrorMessage(error, "스터디 수정에 실패했습니다."));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteStudy = async () => {
    if (!studyId.trim()) {
      setMessage("삭제할 스터디 ID를 입력해 주세요.");
      return;
    }

    try {
      setIsSubmitting(true);
      setMessage("");
      const result = await deleteStudyRecruitment(studyId.trim());
      setResponse(result ?? { success: true });
      setMessage("스터디가 삭제되었습니다.");
      await loadStudies();
    } catch (error) {
      setResponse(null);
      setMessage(getApiErrorMessage(error, "스터디 삭제에 실패했습니다."));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSelectStudy = (study: StudyRecord) => {
    setStudyId(String(study.studyId));
    setForm({
      studyName: study.studyName ?? "",
      leaderName: study.leaderName ?? "",
      language: study.language ?? "",
      techStack: study.techStack ?? "",
      description: study.description ?? "",
      goal: study.goal ?? "",
      location: study.location ?? "",
      notice: study.notice ?? "",
      dayOfWeek: String(study.schedules?.[0]?.dayOfWeek ?? 1),
      meetTime: study.schedules?.[0]?.meetTime ?? "18:00",
      curriculum:
        study.curriculums
          ?.map((item) => `${item.week}주차: ${item.contents}`)
          .join("\n") || initialForm.curriculum,
    });
  };

  const handleTextChange =
    (key: keyof typeof initialForm) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setForm((prev) => ({ ...prev, [key]: event.target.value }));
    };

  return (
    <S.Page>
      <S.Shell>
        <S.Header>
          <S.Eyebrow>스터디 관리자</S.Eyebrow>
          <S.Title>스터디 관리</S.Title>
          <S.Description>
            최신 명세 기준 스터디 목록 조회, 생성, 수정, 삭제 API를 관리합니다.
          </S.Description>
        </S.Header>

        <S.Grid>
          <S.Card>
            <S.CardTitle>스터디 목록 조회</S.CardTitle>
            <S.CardText>
              <code>GET /api/studies</code>로 스터디 목록을 조회합니다.
            </S.CardText>
            <S.Field>
              <S.FieldLabel>keyword</S.FieldLabel>
              <S.Input
                value={keyword}
                onChange={(event) => setKeyword(event.target.value)}
                placeholder="스터디명, 소개, 목표 검색"
              />
            </S.Field>
            <S.ButtonRow>
              <S.SecondaryButton type="button" onClick={() => void loadStudies()}>
                {isLoading ? "조회 중" : "목록 새로고침"}
              </S.SecondaryButton>
            </S.ButtonRow>
            <S.ButtonRow>
              {studies.map((study) => (
                <S.SecondaryButton
                  key={study.studyId}
                  type="button"
                  onClick={() => handleSelectStudy(study)}
                >
                  {study.studyId}. {study.studyName}
                </S.SecondaryButton>
              ))}
            </S.ButtonRow>
          </S.Card>

          <S.Card>
            <S.CardTitle>스터디 생성 / 수정</S.CardTitle>
            <S.CardText>
              생성은 <code>POST /api/studies</code>, 수정은{" "}
              <code>PUT /api/studies/{`{studyId}`}</code>를 사용합니다.
            </S.CardText>
            <S.Form onSubmit={handleCreateStudy}>
              <S.Field>
                <S.FieldLabel>studyId</S.FieldLabel>
                <S.Input
                  value={studyId}
                  onChange={(event) => setStudyId(event.target.value)}
                  placeholder="수정/삭제 시 입력"
                />
              </S.Field>
              <S.Field>
                <S.FieldLabel>studyName</S.FieldLabel>
                <S.Input value={form.studyName} onChange={handleTextChange("studyName")} />
              </S.Field>
              <S.Field>
                <S.FieldLabel>leaderName</S.FieldLabel>
                <S.Input value={form.leaderName} onChange={handleTextChange("leaderName")} />
              </S.Field>
              <S.Field>
                <S.FieldLabel>language</S.FieldLabel>
                <S.Input value={form.language} onChange={handleTextChange("language")} />
              </S.Field>
              <S.Field>
                <S.FieldLabel>techStack</S.FieldLabel>
                <S.Input value={form.techStack} onChange={handleTextChange("techStack")} />
              </S.Field>
              <S.Field>
                <S.FieldLabel>description</S.FieldLabel>
                <S.TextArea value={form.description} onChange={handleTextChange("description")} />
              </S.Field>
              <S.Field>
                <S.FieldLabel>goal</S.FieldLabel>
                <S.TextArea value={form.goal} onChange={handleTextChange("goal")} />
              </S.Field>
              <S.Field>
                <S.FieldLabel>location</S.FieldLabel>
                <S.Input value={form.location} onChange={handleTextChange("location")} />
              </S.Field>
              <S.Field>
                <S.FieldLabel>notice</S.FieldLabel>
                <S.Input value={form.notice} onChange={handleTextChange("notice")} />
              </S.Field>
              <S.Field>
                <S.FieldLabel>dayOfWeek</S.FieldLabel>
                <S.Select value={form.dayOfWeek} onChange={handleTextChange("dayOfWeek")}>
                  <option value="0">일요일</option>
                  <option value="1">월요일</option>
                  <option value="2">화요일</option>
                  <option value="3">수요일</option>
                  <option value="4">목요일</option>
                  <option value="5">금요일</option>
                  <option value="6">토요일</option>
                </S.Select>
              </S.Field>
              <S.Field>
                <S.FieldLabel>meetTime</S.FieldLabel>
                <S.Input value={form.meetTime} onChange={handleTextChange("meetTime")} />
              </S.Field>
              <S.Field>
                <S.FieldLabel>curriculums</S.FieldLabel>
                <S.TextArea value={form.curriculum} onChange={handleTextChange("curriculum")} />
              </S.Field>
              <S.ButtonRow>
                <S.PrimaryButton type="submit" disabled={isSubmitting}>
                  스터디 생성
                </S.PrimaryButton>
                <S.PrimaryButton type="button" onClick={() => void handleUpdateStudy()}>
                  스터디 수정
                </S.PrimaryButton>
              </S.ButtonRow>
            </S.Form>
          </S.Card>

          <S.Card>
            <S.CardTitle>스터디 삭제</S.CardTitle>
            <S.CardText>
              <code>DELETE /api/studies/{`{studyId}`}</code>로 팀장 권한 삭제를 요청합니다.
            </S.CardText>
            <S.Field>
              <S.FieldLabel>studyId</S.FieldLabel>
              <S.Input
                value={studyId}
                onChange={(event) => setStudyId(event.target.value)}
                placeholder="예: 10"
              />
            </S.Field>
            <S.DangerButton type="button" onClick={() => void handleDeleteStudy()}>
              스터디 삭제
            </S.DangerButton>
          </S.Card>

          <S.Card>
            <S.CardTitle>요청 결과</S.CardTitle>
            {message ? <S.StatusText>{message}</S.StatusText> : null}
            <S.CodeBlock>{toJsonText(response)}</S.CodeBlock>
          </S.Card>
        </S.Grid>
      </S.Shell>
    </S.Page>
  );
}
