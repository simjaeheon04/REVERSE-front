import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./AdminPage.styles";

type AdminCategory = "content" | "activity" | "operation" | "member";

const adminCategories: Array<{
  id: AdminCategory;
  label: string;
  description: string;
}> = [
  {
    id: "content",
    label: "콘텐츠",
    description: "홈페이지에 노출되는 콘텐츠를 관리합니다.",
  },
  {
    id: "activity",
    label: "활동",
    description: "모집, 프로젝트, 투표, 스터디를 관리합니다.",
  },
  {
    id: "operation",
    label: "운영",
    description: "캘린더와 게시판 운영 기능을 관리합니다.",
  },
  {
    id: "member",
    label: "회원",
    description: "회원 권한과 마이페이지 정보를 관리합니다.",
  },
];

const adminMenus = [
  {
    category: "content",
    title: "동아리 소개 관리",
    description: "메인 소개 문구와 배너 이미지를 등록하고 관리합니다.",
    path: "/admin/club-intro",
  },
  {
    category: "content",
    title: "임원진 관리",
    description: "임원진 프로필과 역할, 노출 여부를 등록하고 관리합니다.",
    path: "/admin/officer",
  },
  {
    category: "content",
    title: "약관 관리",
    description: "동아리 약관과 버전 정보를 등록, 수정, 삭제합니다.",
    path: "/admin/terms",
  },
  {
    category: "content",
    title: "프로젝트 관리",
    description: "프로젝트 이름, 링크, 썸네일 이미지를 등록하고 관리합니다.",
    path: "/admin/project",
  },
  {
    category: "content",
    title: "공지사항 관리",
    description: "공지사항 목록을 확인하고 공지를 등록, 수정, 삭제합니다.",
    path: "/admin/notice",
  },
  {
    category: "content",
    title: "IT 이슈 관리",
    description: "IT 이슈 목록을 조회하고 생성, 수정, 삭제를 처리합니다.",
    path: "/admin/it-issue",
  },
  {
    category: "activity",
    title: "프로젝트 운영 관리",
    description:
      "전체 프로젝트 모집글을 조회하고 관리자 권한으로 강제 종료 또는 삭제를 처리합니다.",
    path: "/admin/project-monitoring",
  },
  {
    category: "activity",
    title: "모집공고 관리",
    description:
      "모집공고 목록을 조회하고 공고 등록, 수정, 상태 변경, 삭제를 처리합니다.",
    path: "/admin/recruit",
  },
  {
    category: "activity",
    title: "모집 지원자 관리",
    description:
      "지원서 조회, 상태 변경, 면접 배정, 엑셀 다운로드와 상세 페이지/슬롯 설정을 처리합니다.",
    path: "/admin/recruit-applications",
  },
  {
    category: "activity",
    title: "투표 관리",
    description: "투표 목록, 상세 결과 조회, 관리자 권한 수정과 삭제를 처리합니다.",
    path: "/admin/votes",
  },
  {
    category: "activity",
    title: "스터디 관리",
    description: "스터디 모집, 게시글 자료, 참여 신청과 멤버 처리 기능을 관리합니다.",
    path: "/admin/study",
  },
  {
    category: "operation",
    title: "캘린더 관리",
    description: "일정 카테고리와 실제 일정을 등록, 조회, 수정, 삭제합니다.",
    path: "/admin/calendar",
  },
  {
    category: "operation",
    title: "게시판 관리자",
    description: "게시판을 추가/삭제하고 게시글을 관리자 권한으로 강제 삭제합니다.",
    path: "/admin/board",
  },
  {
    category: "member",
    title: "회원 관리자",
    description: "회원 전체 조회, 권한 변경과 강제 탈퇴를 처리합니다.",
    path: "/admin/users",
  },
  {
    category: "member",
    title: "마이페이지 관리",
    description: "회원 마이페이지 조회, 자기소개 수정, 프로필 사진 수정을 확인합니다.",
    path: "/admin/mypage",
  },
] satisfies Array<{
  category: AdminCategory;
  title: string;
  description: string;
  path: string;
}>;

export default function AdminPage() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<AdminCategory>("content");
  const selectedCategory =
    adminCategories.find((category) => category.id === activeCategory) ?? adminCategories[0];
  const visibleMenus = adminMenus.filter((menu) => menu.category === activeCategory);

  return (
    <S.Page>
      <S.Shell>
        <S.Header>
          <S.Eyebrow>관리자</S.Eyebrow>
          <S.Title>관리자 페이지</S.Title>
          <S.Description>
            필요한 관리 영역을 선택하면 관련 기능만 한 화면에 표시됩니다.
          </S.Description>
        </S.Header>

        <S.CategoryNav aria-label="관리자 기능 분류">
          {adminCategories.map((category) => (
            <S.CategoryButton
              key={category.id}
              type="button"
              $active={activeCategory === category.id}
              aria-pressed={activeCategory === category.id}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.label}
              <S.CategoryCount>
                {adminMenus.filter((menu) => menu.category === category.id).length}
              </S.CategoryCount>
            </S.CategoryButton>
          ))}
        </S.CategoryNav>

        <S.SectionIntro>
          <S.SectionTitle>{selectedCategory.label} 관리</S.SectionTitle>
          <S.SectionDescription>{selectedCategory.description}</S.SectionDescription>
        </S.SectionIntro>

        <S.Grid>
          {visibleMenus.map((menu) => (
            <S.Card key={menu.path}>
              <S.CardTitle>{menu.title}</S.CardTitle>
              <S.CardText>{menu.description}</S.CardText>
              <S.MoveButton type="button" onClick={() => navigate(menu.path)}>
                이동하기
              </S.MoveButton>
            </S.Card>
          ))}
        </S.Grid>
      </S.Shell>
    </S.Page>
  );
}
