import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/common/footer/Footer";
import LoginRequiredModal from "../components/common/LoginRequiredModal/LoginRequiredModal";
import VoteSection from "../components/vote/VoteSection";
import { useAuthStore } from "../stores/authStore";

export default function VotePage() {
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isLoading = useAuthStore((state) => state.isLoading);
  const isProfileLoading = useAuthStore((state) => state.isProfileLoading);
  const [isLoginRequiredOpen] = useState(true);

  if (isLoading || isProfileLoading) {
    return null;
  }

  if (!isAuthenticated) {
    return (
      <>
        <LoginRequiredModal
          isOpen={isLoginRequiredOpen}
          onConfirm={() => navigate("/login")}
        />
        <Footer />
      </>
    );
  }

  return (
    <>
      <VoteSection />
      <Footer />
    </>
  );
}
