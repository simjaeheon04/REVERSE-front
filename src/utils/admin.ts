export const ADMIN_ROLE_NAMES = ["SUPER_ADMIN", "ADMIN"] as const;

export const isAdminRole = (roleName: string | null | undefined) =>
  roleName !== null &&
  roleName !== undefined &&
  ADMIN_ROLE_NAMES.includes(roleName as (typeof ADMIN_ROLE_NAMES)[number]);
