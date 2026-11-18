import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecruitStore } from "../../../stores/recruitStore";
import * as S from "./RecruitHeroSection.styles";

export default function RecruitHeroSection() {
  const navigate = useNavigate();
  const activeRecruitment = useRecruitStore((state) => state.activeRecruitment);
  const isLoadingRecruitments = useRecruitStore((state) => state.isLoadingRecruitments);
  const fetchRecruitments = useRecruitStore((state) => state.fetchRecruitments);

  useEffect(() => {
    void fetchRecruitments();
  }, [fetchRecruitments]);

  return (
    <S.Section>
      <S.Inner>
        <S.Year>2026</S.Year>
        <S.Title>REVERSE 부원 모집</S.Title>
        <S.Text>
          학과 상관없이 프로그래밍에 관심과 열정이 있는 본교 학생이라면 누구나 지원 가능합니다!
        </S.Text>
        <S.ApplyButton
          type="button"
          disabled={isLoadingRecruitments || !activeRecruitment?.isActive}
          onClick={() => {
            if (!isLoadingRecruitments && activeRecruitment?.isActive) navigate("/recruit/apply");
          }}
        >
          신청하기
        </S.ApplyButton>
      </S.Inner>
    </S.Section>
  );
}
