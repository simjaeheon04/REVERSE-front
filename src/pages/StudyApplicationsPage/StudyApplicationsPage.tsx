import { AxiosError } from "axios";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../../components/common/footer/Footer";
import {
  approveStudyApplication,
  getStudyApplications,
  getStudyDetail,
  rejectStudyApplication,
  type StudyApplication,
  type StudyRecord,
} from "../../services/studyApi";
import * as S from "./StudyApplicationsPage.styles";

const DAY_LABELS = ["일", "월", "화", "수", "목", "금", "토"];

const getErrorMessage = (error: unknown, fallback: string) => {
  if (error instanceof AxiosError) {
    const data = error.response?.data;

    if (typeof data === "string" && data.trim()) {
      return data;
    }

    if (data && typeof data === "object" && "message" in data) {
      const message = (data as { message?: unknown }).message;

      if (typeof message === "string" && message.trim()) {
        return message;
      }
    }
  }

  return fallback;
};

const formatAppliedDate = (value: string) => {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value || "-";
  }

  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

const formatAvailabilities = (application: StudyApplication) => {
  if (!application.availabilities?.length) {
    return "입력된 가능 시간이 없습니다.";
  }

  return application.availabilities
    .map(
      ({ dayOfWeek, availableTime }) =>
        `${DAY_LABELS[dayOfWeek] ?? "?"}요일 ${availableTime}`
    )
    .join(", ");
};

export default function StudyApplicationsPage() {
  const navigate = useNavigate();
  const { studyId } = useParams();
  const [study, setStudy] = useState<StudyRecord | null>(null);
  const [applications, setApplications] = useState<StudyApplication[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [processingId, setProcessingId] = useState<number | null>(null);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const loadApplications = useCallback(async () => {
    if (!studyId) {
      setErrorMessage("스터디 ID가 올바르지 않습니다.");
      return;
    }

    try {
      setIsLoading(true);
      setErrorMessage("");

      const [studyResult, applicationResult] = await Promise.all([
        getStudyDetail(studyId),
        getStudyApplications(studyId),
      ]);

      setStudy(studyResult);
      setApplications(applicationResult ?? []);
    } catch (error) {
      setStudy(null);
      setApplications([]);
      setErrorMessage(
        getErrorMessage(error, "스터디 신청자 목록을 불러오지 못했습니다.")
      );
    } finally {
      setIsLoading(false);
    }
  }, [studyId]);

  useEffect(() => {
    void loadApplications();
  }, [loadApplications]);

  const processApplication = async (
    application: StudyApplication,
    action: "approve" | "reject"
  ) => {
    const actionLabel = action === "approve" ? "승인" : "반려";

    if (
      !window.confirm(
        `${application.userId}님의 신청을 ${actionLabel}하시겠습니까?`
      )
    ) {
      return;
    }

    try {
      setProcessingId(application.studyApplicationId);
      setMessage("");
      setErrorMessage("");

      const result =
        action === "approve"
          ? await approveStudyApplication(application.studyApplicationId)
          : await rejectStudyApplication(application.studyApplicationId);

      setMessage(result.message ?? `신청이 ${actionLabel}되었습니다.`);
      await loadApplications();
    } catch (error) {
      setErrorMessage(
        getErrorMessage(error, `신청 ${actionLabel} 처리에 실패했습니다.`)
      );
    } finally {
      setProcessingId(null);
    }
  };

  return (
    <>
      <S.Page>
        <S.Shell>
          <S.Header>
            <S.Eyebrow>STUDY APPLICATIONS</S.Eyebrow>
            <S.Title>{study?.studyName ?? "스터디 신청자 관리"}</S.Title>
            <S.Description>
              참여 가능 시간을 확인한 뒤 대기 중인 신청을 승인하거나 반려할 수
              있습니다.
            </S.Description>
          </S.Header>

          <S.Card>
            <S.Toolbar>
              <div>
                <S.CardTitle>대기 중인 신청</S.CardTitle>
                <S.CardText>총 {applications.length}건</S.CardText>
              </div>
              <S.SecondaryButton
                type='button'
                disabled={isLoading}
                onClick={() => void loadApplications()}
              >
                {isLoading ? "조회 중..." : "새로고침"}
              </S.SecondaryButton>
            </S.Toolbar>

            {message ? <S.StatusText>{message}</S.StatusText> : null}
            {errorMessage ? (
              <S.StatusText $error>{errorMessage}</S.StatusText>
            ) : null}

            {!errorMessage && isLoading && applications.length === 0 ? (
              <S.EmptyState>신청자 목록을 불러오는 중입니다.</S.EmptyState>
            ) : null}

            {!errorMessage && !isLoading && applications.length === 0 ? (
              <S.EmptyState>현재 대기 중인 신청이 없습니다.</S.EmptyState>
            ) : null}

            {applications.length > 0 ? (
              <S.TableScroll>
                <S.DataTable>
                  <thead>
                    <tr>
                      <th>신청자</th>
                      <th>참여 가능 시간</th>
                      <th>신청일</th>
                      <th>상태</th>
                      <th>처리</th>
                    </tr>
                  </thead>
                  <tbody>
                    {applications.map((application) => {
                      const isProcessing =
                        processingId === application.studyApplicationId;

                      return (
                        <tr key={application.studyApplicationId}>
                          <td>
                            <S.EntityName>{application.userId}</S.EntityName>
                          </td>
                          <td>{formatAvailabilities(application)}</td>
                          <td>{formatAppliedDate(application.appliedDate)}</td>
                          <td>
                            <S.StatusBadge>{application.status}</S.StatusBadge>
                          </td>
                          <td>
                            <S.ActionGroup>
                              <S.PrimaryButton
                                type='button'
                                disabled={isProcessing}
                                onClick={() =>
                                  void processApplication(
                                    application,
                                    "approve"
                                  )
                                }
                              >
                                승인
                              </S.PrimaryButton>
                              <S.DangerButton
                                type='button'
                                disabled={isProcessing}
                                onClick={() =>
                                  void processApplication(application, "reject")
                                }
                              >
                                반려
                              </S.DangerButton>
                            </S.ActionGroup>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </S.DataTable>
              </S.TableScroll>
            ) : null}

            <S.ButtonRow>
              <S.SecondaryButton
                type='button'
                onClick={() =>
                  navigate(studyId ? `/study/${studyId}` : "/study")
                }
              >
                스터디로 돌아가기
              </S.SecondaryButton>
            </S.ButtonRow>
          </S.Card>
        </S.Shell>
      </S.Page>
      <Footer />
    </>
  );
}
