import { AxiosError } from "axios";
import { useState, type ChangeEvent } from "react";
import * as S from "../clubIntroManage/ClubIntroManagePage.styles";
import {
  type AdminUserRoleId,
  deleteAdminUser,
  updateAdminUserRole,
} from "../../services/userApi";

const roleOptions = [
  { value: 1, label: "1 - 최고관리자" },
  { value: 2, label: "2 - 관리자" },
  { value: 3, label: "3 - 정회원" },
  { value: 4, label: "4 - 준회원" },
  { value: 5, label: "5 - 게스트" },
] as const;

type RoleOptionValue = (typeof roleOptions)[number]["value"];

const stringifyError = (error: unknown, fallback: string) => {
  if (error instanceof AxiosError) {
    const data = error.response?.data;
    console.error("[admin/users] request failed", {
      status: error.response?.status,
      data,
      message: error.message,
    });

    if (typeof data === "string" && data.trim()) {
      return `[${error.response?.status ?? "ERROR"}] ${data}`;
    }

    if (data && typeof data === "object" && "message" in data) {
      const message = (data as { message?: unknown }).message;
      if (typeof message === "string" && message.trim()) {
        return `[${error.response?.status ?? "ERROR"}] ${message}`;
      }
    }

    if (data) {
      return JSON.stringify(
        {
          status: error.response?.status,
          data,
        },
        null,
        2
      );
    }
  }

  if (error instanceof Error && error.message.trim()) {
    return error.message;
  }

  return fallback;
};

export default function UserAdminPage() {
  const [targetUserId, setTargetUserId] = useState("");
  const [roleId, setRoleId] = useState<RoleOptionValue>(3);
  const [result, setResult] = useState("아직 실행한 요청이 없습니다.");
  const [isLoading, setIsLoading] = useState(false);

  const trimmedTargetUserId = targetUserId.trim();

  const handleTargetUserIdChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTargetUserId(event.target.value);
  };

  const assertTargetUserId = () => {
    if (!trimmedTargetUserId) {
      throw new Error("대상 userId를 입력해 주세요.");
    }
  };

  const runRequest = async (
    request: () => Promise<unknown>,
    fallback: string
  ) => {
    try {
      setIsLoading(true);
      setResult("요청 처리 중입니다...");
      const data = await request();
      setResult(JSON.stringify(data, null, 2));
    } catch (error) {
      setResult(stringifyError(error, fallback));
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateRole = () =>
    runRequest(async () => {
      assertTargetUserId();

      console.log("[admin/users/role] submit", {
        targetUserId: trimmedTargetUserId,
        requestBody: { roleId },
      });

      return updateAdminUserRole(
        trimmedTargetUserId,
        roleId as AdminUserRoleId
      );
    }, "회원 권한 수정에 실패했습니다.");

  const handleDeleteUser = () =>
    runRequest(async () => {
      assertTargetUserId();

      console.log("[admin/users/delete] submit", {
        targetUserId: trimmedTargetUserId,
      });

      return deleteAdminUser(trimmedTargetUserId);
    }, "회원 강제 탈퇴 처리에 실패했습니다.");

  return (
    <S.Page>
      <S.Shell>
        <S.Header>
          <S.Eyebrow>최고관리자 전용</S.Eyebrow>
          <S.Title>회원 관리자</S.Title>
          <S.Description>
            API.md 23번 회원 관리 Admin 명세에 맞춰 회원 권한 수정과
            강제 탈퇴를 처리합니다. 모든 요청은 Bearer 토큰이 필요하며,
            최고관리자(roleId=1)만 접근할 수 있습니다.
          </S.Description>
        </S.Header>

        <S.Grid>
          <S.Card>
            <S.CardTitle>회원 권한 수정</S.CardTitle>
            <S.CardText>
              <code>PATCH /api/admin/users/{"{targetUserId}"}/role</code>
            </S.CardText>
            <S.Field>
              <S.FieldLabel>대상 userId</S.FieldLabel>
              <S.Input
                value={targetUserId}
                onChange={handleTargetUserIdChange}
                placeholder="member01"
              />
            </S.Field>
            <S.Field>
              <S.FieldLabel>변경할 roleId</S.FieldLabel>
              <S.Select
                value={roleId}
                onChange={(event) =>
                  setRoleId(Number(event.target.value) as RoleOptionValue)
                }
              >
                {roleOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </S.Select>
            </S.Field>
            <S.CardText>
              Request Body: <code>{`{ "roleId": ${roleId} }`}</code>
            </S.CardText>
            <S.ButtonRow>
              <S.PrimaryButton
                type="button"
                disabled={isLoading}
                onClick={() => void handleUpdateRole()}
              >
                권한 수정
              </S.PrimaryButton>
            </S.ButtonRow>
          </S.Card>

          <S.Card>
            <S.CardTitle>응답</S.CardTitle>
            <S.CardText>
              {isLoading
                ? "요청을 보내는 중입니다."
                : "마지막 요청 결과가 표시됩니다."}
            </S.CardText>
            <S.CodeBlock>{result}</S.CodeBlock>
          </S.Card>

          <S.Card>
            <S.CardTitle>회원 강제 탈퇴</S.CardTitle>
            <S.CardText>
              <code>DELETE /api/admin/users/{"{targetUserId}"}</code>
            </S.CardText>
            <S.Field>
              <S.FieldLabel>대상 userId</S.FieldLabel>
              <S.Input
                value={targetUserId}
                onChange={handleTargetUserIdChange}
                placeholder="member01"
              />
            </S.Field>
            <S.ButtonRow>
              <S.DangerButton
                type="button"
                disabled={isLoading}
                onClick={() => void handleDeleteUser()}
              >
                강제 탈퇴
              </S.DangerButton>
            </S.ButtonRow>
          </S.Card>
        </S.Grid>
      </S.Shell>
    </S.Page>
  );
}
