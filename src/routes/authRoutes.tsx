import FindIdPage from "../pages/auth/FindIdPage/FindIdPage";
import FindPasswordPage from "../pages/auth/FindPasswordPage/FindPasswordPage";
import LoginPage from "../pages/auth/LoginPage/LoginPage";
import SignUpPage from "../pages/auth/SignUpPage/SignUpPage";

export const authRoutes = [
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignUpPage />,
  },
  {
    path: "/find-id",
    element: <FindIdPage />,
  },
  {
    path: "/find-password",
    element: <FindPasswordPage />,
  },
];
