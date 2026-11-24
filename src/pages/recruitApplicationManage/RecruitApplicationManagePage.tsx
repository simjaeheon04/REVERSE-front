import { AxiosError } from "axios";
import { useCallback, useEffect, useRef, useState, type ChangeEvent } from "react";
import { useSearchParams } from "react-router-dom";
import * as S from "../clubIntroManage/ClubIntroManagePage.styles";
import {
  downloadRecruitAdminApplicationsExcel,
  getRecruitAdminApplicationDetail,
  getRecruitAdminApplications,
  getRecruitmentDetail,
  getRecruitApiErrorMessage,
  toRecruitAdminSlots,
  updateRecruitAdminApplicationStatus,
  updateRecruitAdminPage,
  updateRecruitAdminSlots,
  type RecruitApplicationStatus,
  type RecruitAdminSlotsPayload,
} from "../../services/recruitApi";
import { useAuthStore } from "../../stores/authStore";
import { useRecruitStore } from "../../stores/recruitStore";

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
    { "slotDate": "", "startTime": "", "endTime": "", "capacity": null, "isActive": true }
  ]
}`;

const stringifyError = (error: unknown, fallback: string) => {
  if (error instanceof AxiosError) {
    const conflictMessage = error.response?.status === 409
      ? "중복되거나 현재 배정할 수 없는 면접 슬롯입니다. "
      : "";
    const data = error.response?.data;
    if (typeof data === "string" && data.trim()) {
      return `${conflictMessage}${data}`;
    }
    if (data && typeof data === "object" && "message" in data) {
      const message = (data as { message?: unknown }).message;
      if (typeof message === "string" && message.trim()) {
        return `${conflictMessage}${message}`;
      }
    }
    if (conflictMessage) return conflictMessage.trim();
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

const parseSlotRows = (value: string): Record<string, unknown>[] => {
  const payload = parseJsonObject(value);
  if (!Array.isArray(payload.slots)) throw new Error("slots 배열을 입력해 주세요.");
  return payload.slots.map((slot: unknown) => {
    if (!slot || typeof slot !== "object" || Array.isArray(slot)) {
      throw new Error("각 면접 일정은 JSON 객체여야 합니다.");
    }
    return slot as Record<string, unknown>;
  });
};

export default function RecruitApplicationManagePage() {
  const adminId = useAuthStore((state) => state.userId);
  const createdRecruitmentId = useRecruitStore((state) => state.createdRecruitmentId);
  const [searchParams, setSearchParams] = useSearchParams();
  const [roleId, setRoleId] = useState("");
  const recruitmentId = searchParams.get("recruitmentId") ?? createdRecruitmentId?.toString() ?? "";
  const [applicationId, setApplicationId] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState<RecruitApplicationStatus | "">("");
  const [nextStatus, setNextStatus] = useState<RecruitApplicationStatus>("PASS");
  const [pageJson, setPageJson] = useState(DEFAULT_PAGE_JSON);
  const [slotsJson, setSlotsJson] = useState(DEFAULT_SLOTS_JSON);
  const [result, setResult] = useState("아직 실행한 요청이 없습니다.");
  const [isLoading, setIsLoading] = useState(false);
  const requestLockRef = useRef(false);
  const slotsRequestRef = useRef(0);
  const [loadedSlots, setLoadedSlots] = useState<{
    recruitmentId: number;
    slots: RecruitAdminSlotsPayload["slots"];
  } | null>(null);

  const numericRoleId = Number(roleId);
  const numericRecruitmentId = Number(recruitmentId);
  const numericApplicationId = Number(applicationId);
  const canEditSlots = !isLoading && loadedSlots?.recruitmentId === numericRecruitmentId;
  let slotRows: Record<string, unknown>[] = [];
  let slotRowsError = "";
  try {
    slotRows = parseSlotRows(slotsJson);
  } catch (error) {
    slotRowsError = stringifyError(error, "면접 일정 JSON을 확인해 주세요.");
  }

  const updateSlotField = (index: number, key: string, value: string | number | null) => {
    const payload = parseJsonObject(slotsJson);
    const slots = parseSlotRows(slotsJson);
    setSlotsJson(JSON.stringify({
      ...payload,
      slots: slots.map((slot, slotIndex) => slotIndex === index ? { ...slot, [key]: value } : slot),
    }, null, 2));
  };

  const addSlot = () => {
    const payload = parseJsonObject(slotsJson);
    setSlotsJson(JSON.stringify({
      ...payload,
      slots: [...parseSlotRows(slotsJson), ...parseSlotRows(DEFAULT_SLOTS_JSON)],
    }, null, 2));
  };

  const removeNewSlot = (index: number) => {
    const payload = parseJsonObject(slotsJson);
    setSlotsJson(JSON.stringify({
      ...payload,
      slots: parseSlotRows(slotsJson).filter((slot, slotIndex) => slotIndex !== index || slot.slotId != null),
    }, null, 2));
  };

  const refreshSlots = useCallback(async (id: number) => {
    const requestId = ++slotsRequestRef.current;
    const detail = await getRecruitmentDetail(id);
    if (requestId !== slotsRequestRef.current) return;
    const slots = toRecruitAdminSlots(detail.page?.interviewSlots ?? []);
    setLoadedSlots({ recruitmentId: id, slots });
    setSlotsJson(slots.length ? JSON.stringify({ slots }, null, 2) : DEFAULT_SLOTS_JSON);
    return detail;
  }, []);

  useEffect(() => {
    if (!Number.isSafeInteger(numericRecruitmentId) || numericRecruitmentId <= 0) return;
    const requests = slotsRequestRef;
    let cancelled = false;
    void refreshSlots(numericRecruitmentId).then((detail) => {
      if (!cancelled && detail) setResult(JSON.stringify(detail, null, 2));
    }).catch((error: unknown) => {
      if (!cancelled) setResult(getRecruitApiErrorMessage(error, "면접 슬롯 조회에 실패했습니다."));
    });
    return () => {
      cancelled = true;
      requests.current++;
    };
  }, [numericRecruitmentId, refreshSlots]);

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
    if (requestLockRef.current) return;
    requestLockRef.current = true;
    try {
      setIsLoading(true);
      setResult("요청 중입니다...");
      const data = await request();
      setResult(JSON.stringify(data, null, 2));
    } catch (error) {
      setResult(stringifyError(error, fallback));
    } finally {
      requestLockRef.current = false;
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
      assertApplicationId();
      throw new Error("개별 면접 배정에는 slotId 선택이 필요합니다. 현재 화면에 슬롯 선택 입력이 없어 배정 기능은 보류 중입니다.");
    }, "면접 일정 배정에 실패했습니다.");

  const downloadExcel = async () => {
    if (requestLockRef.current) return;
    requestLockRef.current = true;
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
      requestLockRef.current = false;
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
      assertRecruitmentId();
      if (loadedSlots?.recruitmentId !== numericRecruitmentId) {
        try {
          const detail = await refreshSlots(numericRecruitmentId);
          return { message: "최신 슬롯을 불러왔습니다. 내용을 확인한 뒤 다시 저장해 주세요.", detail };
        } catch (error) {
          throw new Error(getRecruitApiErrorMessage(error, "면접 슬롯 조회에 실패했습니다."));
        }
      }
      const payload = parseJsonObject(slotsJson);
      const slots = (Array.isArray(payload.slots) ? payload.slots : []).filter((slot) => {
        if (!slot || typeof slot !== "object" || slot.slotId != null) return true;
        // 추가만 하고 입력하지 않은 새 행은 저장 대상에서 제외한다.
        return [slot.slotDate, slot.startTime, slot.endTime, slot.capacity]
          .some((value) => value != null && value !== "");
      });
      try {
        await updateRecruitAdminSlots(numericRecruitmentId, {
          adminId: adminId ?? undefined,
          slots: slots.map((slot) => {
            if (!slot || typeof slot !== "object" || slot.slotId == null) return slot;
            const original = loadedSlots.slots.find((item) => item.slotId === slot.slotId);
            if (!original) throw new Error("조회된 공고에 없는 slotId입니다. 공고 ID를 확인하고 다시 조회해 주세요.");
            return {
              ...slot,
              capacity: slot.capacity === undefined ? original.capacity : slot.capacity,
              isActive: slot.isActive === undefined ? original.isActive : slot.isActive,
            };
          }),
        });
      } catch (error) {
        if (error instanceof AxiosError && [404, 409].includes(error.response?.status ?? 0)) {
          setLoadedSlots(null);
          try {
            const detail = await refreshSlots(numericRecruitmentId);
            return { message: getRecruitApiErrorMessage(error, "면접 슬롯 설정에 실패했습니다."), detail };
          } catch (refreshError) {
            throw new Error(`${getRecruitApiErrorMessage(error, "저장 실패")} ${getRecruitApiErrorMessage(refreshError, "최신 조회에 실패했습니다.")}`);
          }
        }
        throw new Error(getRecruitApiErrorMessage(error, "면접 슬롯 설정에 실패했습니다."));
      }
      setLoadedSlots(null);
      try {
        return await refreshSlots(numericRecruitmentId);
      } catch (error) {
        throw new Error(`슬롯은 저장됐지만 최신 조회에 실패했습니다. 다시 저장하기 전에 조회가 필요합니다. ${getRecruitApiErrorMessage(error, "조회 실패")}`);
      }
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
                  onChange={(event) => {
                    slotsRequestRef.current++;
                    setLoadedSlots(null);
                    setSlotsJson(DEFAULT_SLOTS_JSON);
                    setSearchParams((previous) => {
                      const next = new URLSearchParams(previous);
                      next.set("recruitmentId", event.target.value);
                      return next;
                    }, { replace: true });
                  }}
                  disabled={isLoading}
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
              <code>POST /api/recruit/admin/{`{id}`}/slots/v2</code>
            </S.CardText>
            {slotRowsError ? (
              <S.StatusText $error>JSON 입력을 확인해 주세요. {slotRowsError}</S.StatusText>
            ) : slotRows.map((slot, index) => (
              <S.PreviewPanel key={typeof slot.slotId === "number" ? `slot-${slot.slotId}` : `new-${index}`}>
                <S.CardTitle as="h3">면접 일정 {index + 1}</S.CardTitle>
                <S.CardText>
                  {slot.slotId != null ? `기존 일정 #${String(slot.slotId)}` : "새 일정"}
                  {slot.isActive === false ? " · 비활성" : " · 활성"}
                </S.CardText>
                <S.InlineFields>
                  <S.Field>
                    <S.FieldLabel>면접 날짜</S.FieldLabel>
                    <S.Input
                      type="date"
                      value={typeof slot.slotDate === "string" ? slot.slotDate : ""}
                      onChange={(event) => updateSlotField(index, "slotDate", event.target.value)}
                      disabled={!canEditSlots}
                    />
                  </S.Field>
                  <S.Field>
                    <S.FieldLabel>정원</S.FieldLabel>
                    <S.Input
                      type="number"
                      min={1}
                      step={1}
                      value={typeof slot.capacity === "number" ? slot.capacity : ""}
                      onChange={(event) => updateSlotField(index, "capacity", event.target.value === "" ? null : Number(event.target.value))}
                      disabled={!canEditSlots}
                    />
                  </S.Field>
                </S.InlineFields>
                <S.InlineFields>
                  <S.Field>
                    <S.FieldLabel>시작 시간</S.FieldLabel>
                    <S.Input
                      type="time"
                      step={1}
                      value={typeof slot.startTime === "string" ? slot.startTime : ""}
                      onChange={(event) => updateSlotField(index, "startTime", event.target.value || null)}
                      disabled={!canEditSlots}
                    />
                  </S.Field>
                  <S.Field>
                    <S.FieldLabel>종료 시간</S.FieldLabel>
                    <S.Input
                      type="time"
                      step={1}
                      value={typeof slot.endTime === "string" ? slot.endTime : ""}
                      onChange={(event) => updateSlotField(index, "endTime", event.target.value || null)}
                      disabled={!canEditSlots}
                    />
                  </S.Field>
                </S.InlineFields>
                {slot.slotId == null && (
                  <S.ButtonRow>
                    <S.SecondaryButton type="button" onClick={() => removeNewSlot(index)} disabled={!canEditSlots}>
                      새 일정 입력 취소
                    </S.SecondaryButton>
                  </S.ButtonRow>
                )}
              </S.PreviewPanel>
            ))}
            <S.ButtonRow>
              <S.SecondaryButton type="button" onClick={addSlot} disabled={!canEditSlots || Boolean(slotRowsError)}>
                면접 일정 추가
              </S.SecondaryButton>
            </S.ButtonRow>
            <S.Field>
              <S.FieldLabel>요청 Body JSON</S.FieldLabel>
              <S.TextArea value={slotsJson} onChange={handleText(setSlotsJson)} disabled={isLoading || loadedSlots?.recruitmentId !== numericRecruitmentId} />
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
