import { useLocation, useNavigate } from "react-router-dom";
import LoginForm from "../../../components/auth/LoginForm/LoginForm";
import { useAuthStore } from "../../../stores/authStore";
import * as S from "./LoginPage.styles";

type LoginLocationState = {
  from?: {
    pathname?: string;
  };
};

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const login = useAuthStore((state) => state.login);
  const isLoading = useAuthStore((state) => state.isLoading);
  const error = useAuthStore((state) => state.error);
  const locationState = location.state as LoginLocationState | null;
  const redirectPath = locationState?.from?.pathname || "/";

  const handleSubmit = async (values: { id: string; password: string }) => {
    try {
      await login(values.id, values.password);
      navigate(redirectPath, { replace: true });
    } catch {
      // Error state is rendered in the form.
    }
  };

  return (
    <S.Page>
      <S.Content>
        <LoginForm
          onSubmit={handleSubmit}
          onClickSignUp={() => navigate("/signup")}
          onClickFindId={() => navigate("/find-id")}
          onClickFindPassword={() => navigate("/find-password")}
          isSubmitting={isLoading}
          submitError={error}
        />
      </S.Content>
    </S.Page>
  );
}
