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
    description: "임원진 프로필, 역할, 노출 여부를 등록하고 관리합니다.",
    path: "/admin/officer",
  },
  {
    title: "규정 관리",
    description: "동아리 규정과 약관 데이터를 등록, 수정, 삭제합니다.",
    path: "/admin/terms",
  },
  {
    title: "프로젝트 관리",
    description: "프로젝트 이름, 링크, 썸네일 이미지를 등록하고 관리합니다.",
    path: "/admin/project",
  },
  {
    title: "공지사항 관리",
    description: "공지사항을 등록, 수정, 삭제하고 목록을 관리합니다.",
    path: "/admin/notice",
  },
  {
    title: "캘린더 관리",
    description: "행사 일정 생성, 수정, 삭제 및 외부 캘린더 데이터를 관리합니다.",
    path: "/admin/calendar",
  },
  {
    title: "게시판 관리",
    description: "메인 게시판 게시글 목록 조회와 게시글 등록 API를 관리합니다.",
    path: "/admin/board",
  },
];

export default function AdminPage() {
  const navigate = useNavigate();

  return (
    <S.Page>
      <S.Shell>
        <S.Header>
          <S.Eyebrow>Admin Dashboard</S.Eyebrow>
          <S.Title>관리자 페이지</S.Title>
          <S.Description>
            각 관리 기능 페이지로 이동할 수 있는 관리자 대시보드입니다.
          </S.Description>
        </S.Header>

        <S.Grid>
          {adminMenus.map((menu) => (
            <S.Card key={menu.path}>
              <S.CardTitle>{menu.title}</S.CardTitle>
              <S.CardText>{menu.description}</S.CardText>
              <S.MoveButton
                type="button"
                onClick={() => navigate(menu.path)}
              >
                이동하기
              </S.MoveButton>
            </S.Card>
          ))}
        </S.Grid>
      </S.Shell>
    </S.Page>
  );
}
