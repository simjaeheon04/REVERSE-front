type MemberPermissionInput = {
  isAuthenticated: boolean;
  roleId?: number | string | null;
  roleName?: string | null;
};

const MEMBER_OR_HIGHER_ROLE_IDS = new Set([1, 2, 3]);
const MEMBER_OR_HIGHER_ROLE_NAMES = [
  "SUPER_ADMIN",
  "ADMIN",
  "최고관리자",
  "관리자",
  "현부원",
  "정회원",
  "멤버",
  "member",
];

export const resolveRoleIdFromName = (roleName?: string | null) => {
  if (!roleName) {
    return null;
  }

  const normalizedRoleName = roleName.trim().toLowerCase();

  if (normalizedRoleName.includes("super_admin") || roleName.includes("최고")) {
    return 1;
  }

  if (normalizedRoleName === "admin" || roleName.includes("관리자")) {
    return 2;
  }

  if (
    roleName.includes("현부원") ||
    roleName.includes("정회원") ||
    normalizedRoleName.includes("member")
  ) {
    return 3;
  }

  if (roleName.includes("준회원") || normalizedRoleName.includes("associate")) {
    return 4;
  }

  if (roleName.includes("게스트") || normalizedRoleName.includes("guest")) {
    return 5;
  }

  return null;
};

export const canApplyAsMember = ({
  isAuthenticated,
  roleId,
  roleName,
}: MemberPermissionInput) => {
  if (!isAuthenticated) {
    return false;
  }

  const normalizedRoleId =
    typeof roleId === "string" && roleId.trim() ? Number(roleId) : roleId;

  if (typeof normalizedRoleId === "number" && Number.isFinite(normalizedRoleId)) {
    return MEMBER_OR_HIGHER_ROLE_IDS.has(normalizedRoleId);
  }

  const normalizedRoleName = roleName?.trim().toLowerCase() ?? "";

  return MEMBER_OR_HIGHER_ROLE_NAMES.some((allowedRoleName) =>
    normalizedRoleName.includes(allowedRoleName.toLowerCase())
  );
};
