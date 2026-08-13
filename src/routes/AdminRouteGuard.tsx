import type { ReactElement } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";
import { isAdminRole } from "../utils/admin";

type AdminRouteGuardProps = {
  children: ReactElement;
};

export default function AdminRouteGuard({
  children,
}: AdminRouteGuardProps) {
  const location = useLocation();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isLoading = useAuthStore((state) => state.isLoading);
  const isProfileLoading = useAuthStore((state) => state.isProfileLoading);
  const roleName = useAuthStore((state) => state.roleName);

  if (isLoading || isProfileLoading) {
    return null;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (!isAdminRole(roleName)) {
    return <Navigate to="/" replace />;
  }

  return children;
}
