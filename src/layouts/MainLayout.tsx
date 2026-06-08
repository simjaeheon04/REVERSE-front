import { Outlet, useNavigate } from "react-router-dom";
import Header from "../components/common/header/Header";
import { headerMenus } from "../components/common/header/headerData";
import { useAuthStore } from "../stores/authStore";
import { isAdminRole } from "../utils/admin";

export default function MainLayout() {
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isLoading = useAuthStore((state) => state.isLoading);
  const isProfileLoading = useAuthStore((state) => state.isProfileLoading);
  const roleName = useAuthStore((state) => state.roleName);
  const logout = useAuthStore((state) => state.logout);

  const handleLogoClick = () => {
    navigate("/");
    window.setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, 0);
  };

  const handleAuthClick = async () => {
    if (isAuthenticated) {
      await logout();
      navigate("/");
      return;
    }

    navigate("/login");
  };

  return (
    <>
      <Header
        menus={headerMenus}
        loginText={isAuthenticated ? "LOGOUT" : "LOGIN"}
        myPageText={isAuthenticated ? "MY PAGE" : undefined}
        loginDisabled={isLoading || isProfileLoading}
        canAccessAdmin={isAdminRole(roleName)}
        onLogoClick={handleLogoClick}
        onMyPageClick={() => navigate("/mypage")}
        onLoginClick={() => void handleAuthClick()}
      />
      <Outlet />
    </>
  );
}
