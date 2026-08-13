import { AxiosError } from "axios";
import { useCallback, useEffect, useState, type ChangeEvent } from "react";
import {
  type AdminUserRecord,
  type AdminUserRoleId,
  deleteAdminUser,
  getAdminUsers,
  updateAdminUserRole,
} from "../../services/userApi";
import * as S from "./UserAdminPage.styles";

const roleOptions = [
  { value: 1, label: "1 - 최고관리자" },
  { value: 2, label: "2 - 관리자" },
  { value: 3, label: "3 - 정회원" },
  { value: 4, label: "4 - 준회원" },
  { value: 5, label: "5 - 게스트" },
] as const;

type RoleOptionValue = (typeof roleOptions)[number]["value"];

const PAGE_SIZE = 20;

const formatCreatedDate = (value: string) => {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value || "-";
  }

  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
};

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
  const [users, setUsers] = useState<AdminUserRecord[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [targetUserId, setTargetUserId] = useState("");
  const [roleId, setRoleId] = useState<RoleOptionValue>(3);
  const [result, setResult] = useState("아직 실행한 요청이 없습니다.");
  const [isLoading, setIsLoading] = useState(false);
  const [isListLoading, setIsListLoading] = useState(false);
  const [listError, setListError] = useState("");

  const trimmedTargetUserId = targetUserId.trim();

  const loadUsers = useCallback(async (targetPage: number) => {
    try {
      setIsListLoading(true);
      setListError("");

      const data = await getAdminUsers({
        page: targetPage,
        size: PAGE_SIZE,
        sort: "createdDate,desc",
      });

      setUsers(data.content ?? []);
      setTotalPages(data.totalPages ?? 0);
      setTotalElements(data.totalElements ?? 0);
    } catch (error) {
      setUsers([]);
      setTotalPages(0);
      setTotalElements(0);
      setListError(stringifyError(error, "회원 목록 조회에 실패했습니다."));
    } finally {
      setIsListLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadUsers(page);
  }, [loadUsers, page]);

  const handleTargetUserIdChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTargetUserId(event.target.value);
  };

  const assertTargetUserId = () => {
    if (!trimmedTargetUserId) {
      throw new Error("대상 userId를 입력해 주세요.");
    }
  };

  const handleSelectUser = (user: AdminUserRecord) => {
    setTargetUserId(user.userId);
    setRoleId(user.roleId);
    setResult(`${user.userName}(${user.userId}) 회원을 선택했습니다.`);
  };

  const runRequest = async (
    request: () => Promise<unknown>,
    fallback: string,
    options: { afterSuccess?: () => Promise<void> } = {}
  ) => {
    try {
      setIsLoading(true);
      setResult("요청 처리 중입니다...");
      const data = await request();
      setResult(JSON.stringify(data, null, 2));
      await options.afterSuccess?.();
    } catch (error) {
      setResult(stringifyError(error, fallback));
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateRole = () =>
    runRequest(async () => {
      assertTargetUserId();

      return updateAdminUserRole(
        trimmedTargetUserId,
        roleId as AdminUserRoleId
      );
    }, "회원 권한 수정에 실패했습니다.", {
      afterSuccess: () => loadUsers(page),
    });

  const handleDeleteUser = () => {
    if (!trimmedTargetUserId) {
      setResult("대상 userId를 입력해 주세요.");
      return;
    }

    const shouldDelete = window.confirm(
      `${trimmedTargetUserId} 회원을 강제 탈퇴 처리하시겠습니까?`
    );

    if (!shouldDelete) {
      return;
    }

    void runRequest(async () => {
      assertTargetUserId();

      return deleteAdminUser(trimmedTargetUserId);
    }, "회원 강제 탈퇴 처리에 실패했습니다.", {
      afterSuccess: async () => {
        setTargetUserId("");

        if (users.length === 1 && page > 0) {
          setPage((current) => current - 1);
          return;
        }

        await loadUsers(page);
      },
    });
  };

  return (
    <S.Page>
      <S.Shell>
        <S.Header>
          <S.Eyebrow>최고관리자 전용</S.Eyebrow>
          <S.Title>회원 관리자</S.Title>
          <S.Description>
            전체 회원을 가입일 최신순으로 조회하고 권한 수정과 강제 탈퇴를
            처리합니다. 목록 조회는 관리자 이상, 변경 작업은 최고관리자만
            사용할 수 있습니다.
          </S.Description>
        </S.Header>

        <S.Card>
          <S.Toolbar>
            <div>
              <S.CardTitle>전체 회원</S.CardTitle>
              <S.CardText>
                총 {totalElements.toLocaleString("ko-KR")}명의 회원이 있습니다.
              </S.CardText>
            </div>
            <S.SecondaryButton
              type="button"
              disabled={isListLoading}
              onClick={() => void loadUsers(page)}
            >
              {isListLoading ? "조회 중..." : "새로고침"}
            </S.SecondaryButton>
          </S.Toolbar>

          {listError ? <S.StatusText $error>{listError}</S.StatusText> : null}

          {!listError && isListLoading && users.length === 0 ? (
            <S.EmptyState>회원 목록을 불러오는 중입니다.</S.EmptyState>
          ) : null}

          {!listError && !isListLoading && users.length === 0 ? (
            <S.EmptyState>조회된 회원이 없습니다.</S.EmptyState>
          ) : null}

          {users.length > 0 ? (
            <S.TableScroll>
              <S.DataTable>
                <thead>
                  <tr>
                    <th>회원</th>
                    <th>이메일</th>
                    <th>MBTI</th>
                    <th>권한</th>
                    <th>가입일</th>
                    <th>관리</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.userId}>
                      <td>
                        <S.EntityName>{user.userName}</S.EntityName>
                        <S.EntityDescription>{user.userId}</S.EntityDescription>
                      </td>
                      <td>{user.userEmail}</td>
                      <td>{user.userMbti || "-"}</td>
                      <td>
                        <S.StatusBadge>{user.roleName}</S.StatusBadge>
                      </td>
                      <td>{formatCreatedDate(user.createdDate)}</td>
                      <td>
                        <S.ActionGroup>
                          <S.SecondaryButton
                            type="button"
                            onClick={() => handleSelectUser(user)}
                          >
                            선택
                          </S.SecondaryButton>
                        </S.ActionGroup>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </S.DataTable>
            </S.TableScroll>
          ) : null}

          {totalPages > 1 ? (
            <S.Pagination>
              <S.SecondaryButton
                type="button"
                disabled={isListLoading || page === 0}
                onClick={() => setPage((current) => Math.max(0, current - 1))}
              >
                이전
              </S.SecondaryButton>
              <S.PageText>
                {page + 1} / {totalPages}
              </S.PageText>
              <S.SecondaryButton
                type="button"
                disabled={isListLoading || page + 1 >= totalPages}
                onClick={() => setPage((current) => current + 1)}
              >
                다음
              </S.SecondaryButton>
            </S.Pagination>
          ) : null}
        </S.Card>

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
                onClick={handleDeleteUser}
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
