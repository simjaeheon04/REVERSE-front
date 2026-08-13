import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";

export const useLoginRequiredNavigation = () => {
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const [isLoginRequiredOpen, setIsLoginRequiredOpen] = useState(false);

  const navigateWithAuth = useCallback(
    (path: string) => {
      if (isAuthenticated) {
        navigate(path);
        return;
      }

      setIsLoginRequiredOpen(true);
    },
    [isAuthenticated, navigate]
  );

  const moveToLogin = useCallback(() => {
    setIsLoginRequiredOpen(false);
    navigate("/login");
  }, [navigate]);

  return {
    isLoginRequiredOpen,
    navigateWithAuth,
    moveToLogin,
  };
};
