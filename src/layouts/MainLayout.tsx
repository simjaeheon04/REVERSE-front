import { Outlet, useNavigate } from "react-router-dom";
import Header from "../components/common/header/Header";
import { headerMenus } from "../components/common/header/headerData";
import { useAuthStore } from "../stores/authStore";

export default function MainLayout() {
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isLoading = useAuthStore((state) => state.isLoading);
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
        loginDisabled={isLoading}
        onLogoClick={handleLogoClick}
        onLoginClick={() => void handleAuthClick()}
      />
      <Outlet />
    </>
  );
}
