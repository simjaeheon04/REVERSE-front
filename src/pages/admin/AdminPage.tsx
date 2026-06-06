import { useNavigate } from "react-router-dom";
import * as S from "./AdminPage.styles";

const adminMenus = [
  {
    title: "동아리 소개 관리",
    description: "메인 소개 문구와 배너 이미지를 등록하고 관리합니다.",
    path: "/admin/club-intro",
  },
  {
    title: "임원진 관리",
    description: "임원진 프로필과 역할, 노출 여부를 등록하고 관리합니다.",
    path: "/admin/officer",
  },
  {
    title: "약관 관리",
    description: "동아리 약관과 버전 정보를 등록, 수정, 삭제합니다.",
    path: "/admin/terms",
  },
  {
    title: "프로젝트 관리",
    description: "프로젝트 이름, 링크, 썸네일 이미지를 등록하고 관리합니다.",
    path: "/admin/project",
  },
  {
    title: "프로젝트 운영 관리",
    description:
      "전체 프로젝트 모집글을 조회하고 관리자 권한으로 강제 종료 또는 삭제를 처리합니다.",
    path: "/admin/project-monitoring",
  },
  {
    title: "캘린더 관리",
    description: "일정 카테고리와 실제 일정을 등록, 조회, 수정, 삭제합니다.",
    path: "/admin/calendar",
  },
  {
    title: "공지사항 관리",
    description: "공지사항 목록을 확인하고 공지를 등록, 수정, 삭제합니다.",
    path: "/admin/notice",
  },
  {
    title: "게시판 관리자",
    description:
      "게시판을 추가/삭제하고 게시글을 관리자 권한으로 강제 삭제합니다.",
    path: "/admin/board",
  },
  {
    title: "모집공고 관리",
    description:
      "모집공고 목록을 조회하고 공고 등록, 수정, 상태 변경, 삭제를 처리합니다.",
    path: "/admin/recruit",
  },
  {
    title: "모집 지원자 관리",
    description:
      "지원서 조회, 상태 변경, 면접 배정, 엑셀 다운로드와 상세 페이지/슬롯 설정을 처리합니다.",
    path: "/admin/recruit-applications",
  },
];

export default function AdminPage() {
  const navigate = useNavigate();

  return (
    <S.Page>
      <S.Shell>
        <S.Header>
          <S.Eyebrow>관리자</S.Eyebrow>
          <S.Title>관리자 페이지</S.Title>
          <S.Description>
            각 관리자 기능으로 이동할 수 있는 진입 페이지입니다.
          </S.Description>
        </S.Header>

        <S.Grid>
          {adminMenus.map((menu) => (
            <S.Card key={menu.path}>
              <S.CardTitle>{menu.title}</S.CardTitle>
              <S.CardText>{menu.description}</S.CardText>
              <S.MoveButton type='button' onClick={() => navigate(menu.path)}>
                이동하기
              </S.MoveButton>
            </S.Card>
          ))}
        </S.Grid>
      </S.Shell>
    </S.Page>
  );
}
