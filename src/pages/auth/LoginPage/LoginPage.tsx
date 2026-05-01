import { useNavigate } from "react-router-dom";
import LoginForm from "../../../components/auth/LoginForm/LoginForm";
import { useAuthStore } from "../../../stores/authStore";
import * as S from "./LoginPage.styles";

export default function LoginPage() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const isLoading = useAuthStore((state) => state.isLoading);
  const error = useAuthStore((state) => state.error);

  const handleSubmit = async (values: { id: string; password: string }) => {
    try {
      await login(values.id, values.password);
      navigate("/");
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
          isSubmitting={isLoading}
          submitError={error}
        />
      </S.Content>
    </S.Page>
  );
}
