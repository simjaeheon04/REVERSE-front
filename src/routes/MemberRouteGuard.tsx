import type { ReactElement } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";
import { canApplyAsMember } from "../utils/memberPermission";

type MemberRouteGuardProps = {
  children: ReactElement;
  fallbackPath?: string;
};

export default function MemberRouteGuard({
  children,
  fallbackPath = "/",
}: MemberRouteGuardProps) {
  const location = useLocation();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isLoading = useAuthStore((state) => state.isLoading);
  const isProfileLoading = useAuthStore((state) => state.isProfileLoading);
  const roleId = useAuthStore((state) => state.roleId);
  const roleName = useAuthStore((state) => state.roleName);

  if (isLoading || isProfileLoading) {
    return null;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (!canApplyAsMember({ isAuthenticated, roleId, roleName })) {
    return <Navigate to={fallbackPath} replace />;
  }

  return children;
}
