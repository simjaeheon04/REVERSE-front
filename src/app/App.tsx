import { useEffect } from "react";
import Router from "../routes";
import { useAuthStore } from "../stores/authStore";
import GlobalStyle from "../styles/globalStyle";

function App() {
  const initializeAuth = useAuthStore((state) => state.initializeAuth);

  useEffect(() => {
    void initializeAuth();
  }, [initializeAuth]);

  return (
    <>
      <GlobalStyle />
      <Router />
    </>
  );
}

export default App;
