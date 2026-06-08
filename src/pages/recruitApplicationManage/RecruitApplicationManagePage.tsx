import { AxiosError } from "axios";
import { useState, type ChangeEvent } from "react";
import * as S from "../clubIntroManage/ClubIntroManagePage.styles";
import {
  assignRecruitAdminInterviews,
  downloadRecruitAdminApplicationsExcel,
  getRecruitAdminApplicationDetail,
  getRecruitAdminApplications,
  updateRecruitAdminApplicationStatus,
  updateRecruitAdminPage,
  updateRecruitAdminSlots,
  type RecruitApplicationStatus,
} from "../../services/recruitApi";
import { useAuthStore } from "../../stores/authStore";

const DEFAULT_PAGE_JSON = `{
  "heroYear": "2026",
  "heroTitle": "REVERSE 모집",
  "heroSubTitle": "함께 성장할 부원을 모집합니다.",
  "heroBtnText": "지원하기",
  "intros": [],
  "cards": [],
  "galleries": [],
  "contacts": []
}`;

const DEFAULT_SLOTS_JSON = `{
  "slots": [
    { "slotDate": "2026-06-01", "capacity": 10 }
  ]
}`;

const stringifyError = (error: unknown, fallback: string) => {
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

  if (error instanceof Error && error.message.trim()) {
    return error.message;
  }

  return fallback;
};

const parseJsonObject = (value: string) => {
  const parsed = JSON.parse(value) as unknown;
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    throw new Error("JSON 객체 형식으로 입력해 주세요.");
  }

  return parsed as Record<string, unknown>;
};

export default function RecruitApplicationManagePage() {
  const adminId = useAuthStore((state) => state.userId);
  const [roleId, setRoleId] = useState("");
  const [recruitmentId, setRecruitmentId] = useState("");
  const [applicationId, setApplicationId] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState<RecruitApplicationStatus | "">("");
  const [nextStatus, setNextStatus] = useState<RecruitApplicationStatus>("PASS");
  const [pageJson, setPageJson] = useState(DEFAULT_PAGE_JSON);
  const [slotsJson, setSlotsJson] = useState(DEFAULT_SLOTS_JSON);
  const [result, setResult] = useState("아직 실행한 요청이 없습니다.");
  const [isLoading, setIsLoading] = useState(false);

  const numericRoleId = Number(roleId);
  const numericRecruitmentId = Number(recruitmentId);
  const numericApplicationId = Number(applicationId);

  const assertRoleId = () => {
    if (!Number.isFinite(numericRoleId) || numericRoleId <= 0) {
      throw new Error("roleId를 숫자로 입력해 주세요.");
    }
  };

  const assertRecruitmentId = () => {
    if (!Number.isFinite(numericRecruitmentId) || numericRecruitmentId <= 0) {
      throw new Error("recruitmentId를 숫자로 입력해 주세요.");
    }
  };

  const assertApplicationId = () => {
    if (!Number.isFinite(numericApplicationId) || numericApplicationId <= 0) {
      throw new Error("applicationId를 숫자로 입력해 주세요.");
    }
  };

  const runRequest = async (request: () => Promise<unknown>, fallback: string) => {
    try {
      setIsLoading(true);
      setResult("요청 중입니다...");
      const data = await request();
      setResult(JSON.stringify(data, null, 2));
    } catch (error) {
      setResult(stringifyError(error, fallback));
    } finally {
      setIsLoading(false);
    }
  };

  const loadApplications = () =>
    runRequest(async () => {
      assertRoleId();
      assertRecruitmentId();
      return getRecruitAdminApplications({
        roleId: numericRoleId,
        recruitmentId: numericRecruitmentId,
        name: name.trim() || undefined,
        status,
      });
    }, "지원서 목록 조회에 실패했습니다.");

  const loadApplicationDetail = () =>
    runRequest(async () => {
      assertRoleId();
      assertApplicationId();
      return getRecruitAdminApplicationDetail(numericApplicationId, numericRoleId);
    }, "지원서 상세 조회에 실패했습니다.");

  const changeApplicationStatus = () =>
    runRequest(async () => {
      assertRoleId();
      assertApplicationId();
      return updateRecruitAdminApplicationStatus({
        roleId: numericRoleId,
        applicationId: numericApplicationId,
        status: nextStatus,
      });
    }, "지원서 상태 변경에 실패했습니다.");

  const assignInterviews = () =>
    runRequest(async () => {
      assertRoleId();
      return assignRecruitAdminInterviews(numericRoleId);
    }, "면접 일정 배정에 실패했습니다.");

  const downloadExcel = async () => {
    try {
      setIsLoading(true);
      assertRoleId();
      assertRecruitmentId();
      const blob = await downloadRecruitAdminApplicationsExcel(
        numericRecruitmentId,
        numericRoleId
      );
      const objectUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = objectUrl;
      link.download = `applications_recruit_${numericRecruitmentId}.xlsx`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(objectUrl);
      setResult("엑셀 다운로드 요청을 완료했습니다.");
    } catch (error) {
      setResult(stringifyError(error, "엑셀 다운로드에 실패했습니다."));
    } finally {
      setIsLoading(false);
    }
  };

  const saveRecruitPage = () =>
    runRequest(async () => {
      assertRoleId();
      assertRecruitmentId();
      const payload = parseJsonObject(pageJson);
      return updateRecruitAdminPage(numericRecruitmentId, {
        ...payload,
        roleId: numericRoleId,
        adminId: adminId ?? undefined,
      });
    }, "모집 상세 페이지 수정에 실패했습니다.");

  const saveSlots = () =>
    runRequest(async () => {
      assertRoleId();
      assertRecruitmentId();
      const payload = parseJsonObject(slotsJson);
      return updateRecruitAdminSlots(numericRecruitmentId, {
        ...payload,
        roleId: numericRoleId,
        adminId: adminId ?? undefined,
        slots: Array.isArray(payload.slots) ? payload.slots : [],
      });
    }, "면접 슬롯 설정에 실패했습니다.");

  const handleText =
    (setter: (value: string) => void) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setter(event.target.value);
    };

  return (
    <S.Page>
      <S.Shell>
        <S.Header>
          <S.Eyebrow>관리자 전용</S.Eyebrow>
          <S.Title>모집 지원자 관리</S.Title>
          <S.Description>
            관리자 API만 모아둔 화면입니다. roleId를 입력한 뒤 지원서 조회,
            상태 변경, 면접 배정, 엑셀 다운로드, 모집 상세 페이지와 면접 슬롯을
            관리합니다.
          </S.Description>
        </S.Header>

        <S.Grid>
          <S.Card>
            <S.CardTitle>기본 파라미터</S.CardTitle>
            <S.InlineFields>
              <S.Field>
                <S.FieldLabel>roleId</S.FieldLabel>
                <S.Input value={roleId} onChange={handleText(setRoleId)} placeholder="1" />
              </S.Field>
              <S.Field>
                <S.FieldLabel>recruitmentId</S.FieldLabel>
                <S.Input
                  value={recruitmentId}
                  onChange={handleText(setRecruitmentId)}
                  placeholder="1"
                />
              </S.Field>
            </S.InlineFields>
            <S.InlineFields>
              <S.Field>
                <S.FieldLabel>applicationId</S.FieldLabel>
                <S.Input
                  value={applicationId}
                  onChange={handleText(setApplicationId)}
                  placeholder="5"
                />
              </S.Field>
              <S.Field>
                <S.FieldLabel>지원자 이름 필터</S.FieldLabel>
                <S.Input value={name} onChange={handleText(setName)} placeholder="홍길동" />
              </S.Field>
            </S.InlineFields>
            <S.InlineFields>
              <S.Field>
                <S.FieldLabel>목록 상태 필터</S.FieldLabel>
                <S.Select
                  value={status}
                  onChange={(event) =>
                    setStatus(event.target.value as RecruitApplicationStatus | "")
                  }
                >
                  <option value="">전체</option>
                  <option value="PENDING">PENDING</option>
                  <option value="PASS">PASS</option>
                  <option value="FAIL">FAIL</option>
                </S.Select>
              </S.Field>
              <S.Field>
                <S.FieldLabel>변경할 상태</S.FieldLabel>
                <S.Select
                  value={nextStatus}
                  onChange={(event) =>
                    setNextStatus(event.target.value as RecruitApplicationStatus)
                  }
                >
                  <option value="PENDING">PENDING</option>
                  <option value="PASS">PASS</option>
                  <option value="FAIL">FAIL</option>
                </S.Select>
              </S.Field>
            </S.InlineFields>

            <S.ButtonRow>
              <S.PrimaryButton type="button" onClick={() => void loadApplications()}>
                지원서 목록 조회
              </S.PrimaryButton>
              <S.SecondaryButton type="button" onClick={() => void loadApplicationDetail()}>
                지원서 상세 조회
              </S.SecondaryButton>
              <S.SecondaryButton type="button" onClick={() => void changeApplicationStatus()}>
                지원서 상태 변경
              </S.SecondaryButton>
              <S.SecondaryButton type="button" onClick={() => void assignInterviews()}>
                면접 배정
              </S.SecondaryButton>
              <S.SecondaryButton type="button" onClick={() => void downloadExcel()}>
                엑셀 다운로드
              </S.SecondaryButton>
            </S.ButtonRow>
          </S.Card>

          <S.Card>
            <S.CardTitle>응답</S.CardTitle>
            <S.CardText>{isLoading ? "요청 처리 중입니다." : "마지막 요청 결과입니다."}</S.CardText>
            <S.CodeBlock>{result}</S.CodeBlock>
          </S.Card>

          <S.Card>
            <S.CardTitle>모집 상세 페이지 수정</S.CardTitle>
            <S.CardText>
              <code>PATCH /api/recruit/admin/{`{id}`}/page</code>
            </S.CardText>
            <S.Field>
              <S.FieldLabel>요청 Body JSON</S.FieldLabel>
              <S.TextArea value={pageJson} onChange={handleText(setPageJson)} />
            </S.Field>
            <S.ButtonRow>
              <S.PrimaryButton type="button" onClick={() => void saveRecruitPage()}>
                상세 페이지 저장
              </S.PrimaryButton>
            </S.ButtonRow>
          </S.Card>

          <S.Card>
            <S.CardTitle>면접 슬롯 설정</S.CardTitle>
            <S.CardText>
              <code>POST /api/recruit/admin/{`{id}`}/slots</code>
            </S.CardText>
            <S.Field>
              <S.FieldLabel>요청 Body JSON</S.FieldLabel>
              <S.TextArea value={slotsJson} onChange={handleText(setSlotsJson)} />
            </S.Field>
            <S.ButtonRow>
              <S.PrimaryButton type="button" onClick={() => void saveSlots()}>
                면접 슬롯 저장
              </S.PrimaryButton>
            </S.ButtonRow>
          </S.Card>
        </S.Grid>
      </S.Shell>
    </S.Page>
  );
}
