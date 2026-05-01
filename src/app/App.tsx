import { useEffect } from "react";
import Router from "../routes";
import { useAuthStore } from "../stores/authStore";
import GlobalStyle from "../styles/globalStyle";

function App() {
  const hydrate = useAuthStore((state) => state.hydrate);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  return (
    <>
      <GlobalStyle />
      <Router />
    </>
  );
}

export default App;
