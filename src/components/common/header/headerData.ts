import type { HeaderMenuItem } from "./Header.types";

export const headerMenus: HeaderMenuItem[] = [
  {
    key: "about",
    label: "About Us",
    path: "/",
    sections: [
      {
        title: "소개",
        items: [
          { label: "동아리 소개", path: "/#club-intro" },
          { label: "프로젝트 소개", path: "/#project-intro" },
          { label: "임원진 소개", path: "/#officer-intro" },
        ],
      },
      {
        title: "가입 안내",
        items: [{ label: "모집 공고 및 지원", path: "/recruit" }],
      },
    ],
  },
  {
    key: "activity",
    label: "활동 및 참여",
    path: "/recruit",
    sections: [
      {
        title: "스터디",
        items: [{ label: "스터디 소개", path: "/recruit" }],
      },
      {
        title: "프로젝트",
        items: [
          { label: "메인 프로젝트", path: "/" },
          { label: "프로젝트 소개", path: "/" },
        ],
      },
      {
        title: "출석 관리",
        items: [{ label: "관리자 임시 페이지", path: "/admin" }],
      },
    ],
  },
  {
    key: "info",
    label: "정보 및 교류",
    path: "/notice",
    sections: [
      {
        title: "정보",
        items: [
          { label: "공지사항", path: "/notice" },
          { label: "캘린더", path: "/calendar" },
        ],
      },
      {
        title: "교류",
        items: [],
      },
    ],
  },
  {
    key: "board",
    label: "게시판",
    sections: [
      {
        title: "자유 게시판",
        items: [],
      },
      {
        title: "대외활동 게시판",
        items: [],
      },
      {
        title: "나눔 게시판",
        items: [],
      },
      {
        title: "질의응답 게시판",
        items: [],
      },
    ],
  },
];
