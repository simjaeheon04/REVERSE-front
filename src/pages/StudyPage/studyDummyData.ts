import projectMainImage from "../../assets/images/project-main.jpg";
import studyImage from "../../assets/images/project-study.jpg";
import toyProjectImage from "../../assets/images/project-toy.jpg";

export type StudyStatus = "모집중" | "완료" | "보류";

export type StudyPost = {
  id: number;
  semester: string;
  status: StudyStatus;
  title: string;
  summary: string;
  imageUrl: string;
  leader: string;
  introduction: string;
  goal: string;
  memberCount: number;
  schedule: string;
  place: string;
  notes: string;
  language: string;
  stack: string[];
  curriculum: Array<{
    week: string;
    title: string;
  }>;
};

export const STUDY_SEMESTERS = ["2026-1학기", "2025-2학기", "2025-1학기"];

export const STUDY_POSTS: StudyPost[] = [
  {
    id: 1,
    semester: "2026-1학기",
    status: "모집중",
    title: "JavaScript Study",
    summary: "프론트엔드 기초 문법과 브라우저 동작을 함께 익히는 스터디",
    imageUrl: studyImage,
    leader: "박시연",
    introduction:
      "자바스크립트 기본 문법부터 DOM, 비동기 처리까지 차근차근 학습하는 스터디입니다. 매주 정해진 분량을 함께 공부하고 짧은 실습 결과물을 공유합니다.",
    goal: "자바스크립트 핵심 개념을 이해하고 간단한 웹 인터랙션을 직접 구현합니다.",
    memberCount: 4,
    schedule: "수요일 5시",
    place: "동아리방 / 대면",
    notes: "기초부터 진행하니 성실하게 참여할 수 있으면 충분합니다.",
    language: "JavaScript",
    stack: ["HTML", "CSS", "DOM"],
    curriculum: [
      { week: "1주차", title: "자바스크립트 스터디 계획" },
      { week: "2주차", title: "변수와 데이터 타입" },
      { week: "3주차", title: "조건문과 반복문" },
      { week: "4주차", title: "함수와 스코프" },
      { week: "5주차", title: "DOM 조작" },
      { week: "6주차", title: "이벤트 처리" },
      { week: "7주차", title: "비동기와 fetch" },
    ],
  },
  {
    id: 2,
    semester: "2026-1학기",
    status: "모집중",
    title: "React Study 2",
    summary: "컴포넌트, 상태관리, 라우팅을 중심으로 리액트 프로젝트 구조 학습",
    imageUrl: projectMainImage,
    leader: "김도윤",
    introduction:
      "React의 컴포넌트 설계와 상태 흐름을 이해하고 작은 기능 단위로 화면을 완성해보는 스터디입니다.",
    goal: "React 기반 페이지를 직접 만들고 API 연동 전까지의 화면 흐름을 구현합니다.",
    memberCount: 5,
    schedule: "금요일 6시",
    place: "온라인 / 디스코드",
    notes: "HTML, CSS, JavaScript 기본 문법을 알고 있으면 좋습니다.",
    language: "TypeScript",
    stack: ["React", "Vite", "Styled Components"],
    curriculum: [
      { week: "1주차", title: "React 환경과 컴포넌트" },
      { week: "2주차", title: "props와 state" },
      { week: "3주차", title: "리스트 렌더링" },
      { week: "4주차", title: "폼 상태 관리" },
      { week: "5주차", title: "라우팅" },
      { week: "6주차", title: "API 연동 준비" },
      { week: "7주차", title: "미니 프로젝트" },
    ],
  },
  {
    id: 3,
    semester: "2026-1학기",
    status: "보류",
    title: "Data Structure Study 3",
    summary: "배열, 스택, 큐, 트리 등 기본 자료구조를 문제 풀이와 함께 정리",
    imageUrl: toyProjectImage,
    leader: "이서현",
    introduction:
      "코딩 테스트와 전공 수업에 필요한 자료구조 개념을 정리하고, 매주 대표 문제를 함께 풀이합니다.",
    goal: "자료구조별 사용 상황을 이해하고 풀이 과정을 설명할 수 있게 됩니다.",
    memberCount: 6,
    schedule: "월요일 7시",
    place: "동아리방",
    notes: "간단한 프로그래밍 경험이 있으면 좋습니다.",
    language: "Python",
    stack: ["List", "Stack", "Queue", "Tree"],
    curriculum: [
      { week: "1주차", title: "복잡도와 배열" },
      { week: "2주차", title: "스택과 큐" },
      { week: "3주차", title: "해시" },
      { week: "4주차", title: "트리 기초" },
      { week: "5주차", title: "그래프 기초" },
      { week: "6주차", title: "정렬" },
      { week: "7주차", title: "종합 문제 풀이" },
    ],
  },
  {
    id: 4,
    semester: "2026-1학기",
    status: "모집중",
    title: "Algorithm Study",
    summary: "기초 알고리즘 유형을 매주 한 가지씩 정리하는 문제 풀이 스터디",
    imageUrl: studyImage,
    leader: "정민재",
    introduction:
      "기본 알고리즘 유형을 정리하고 풀이 습관을 만드는 스터디입니다.",
    goal: "문제를 읽고 적절한 풀이 전략을 선택하는 연습을 합니다.",
    memberCount: 4,
    schedule: "목요일 5시",
    place: "온라인",
    notes: "매주 문제 풀이 인증이 필요합니다.",
    language: "Python",
    stack: ["Algorithm", "BOJ"],
    curriculum: [
      { week: "1주차", title: "입출력과 구현" },
      { week: "2주차", title: "완전탐색" },
      { week: "3주차", title: "그리디" },
      { week: "4주차", title: "DFS/BFS" },
    ],
  },
  {
    id: 5,
    semester: "2026-1학기",
    status: "모집중",
    title: "Backend Study",
    summary: "Spring Boot와 REST API 설계를 중심으로 백엔드 흐름을 익히는 스터디",
    imageUrl: projectMainImage,
    leader: "최유진",
    introduction:
      "서버 애플리케이션의 기본 구조를 이해하고 간단한 API를 직접 설계해보는 스터디입니다.",
    goal: "요청과 응답 흐름을 이해하고 CRUD API를 구현합니다.",
    memberCount: 5,
    schedule: "화요일 6시",
    place: "동아리방",
    notes: "Java 기본 문법을 알고 있으면 좋습니다.",
    language: "Java",
    stack: ["Spring Boot", "JPA", "MySQL"],
    curriculum: [
      { week: "1주차", title: "백엔드 개발 환경 구성" },
      { week: "2주차", title: "HTTP와 REST API" },
      { week: "3주차", title: "Controller와 Service" },
      { week: "4주차", title: "Database 연동" },
      { week: "5주차", title: "CRUD 구현" },
      { week: "6주차", title: "예외 처리" },
      { week: "7주차", title: "API 문서화" },
    ],
  },
  {
    id: 6,
    semester: "2026-1학기",
    status: "모집중",
    title: "UIUX Study",
    summary: "사용자 흐름과 화면 구조를 분석하며 서비스 디자인 기초를 익히는 스터디",
    imageUrl: toyProjectImage,
    leader: "한지우",
    introduction:
      "실제 서비스를 참고해 정보 구조와 사용자 흐름을 분석하고, 와이어프레임을 만들어보는 스터디입니다.",
    goal: "화면 목적에 맞는 UI 구조를 설계하고 근거를 설명할 수 있게 됩니다.",
    memberCount: 4,
    schedule: "목요일 7시",
    place: "온라인 / 피그마",
    notes: "디자인 툴 경험이 없어도 참여할 수 있습니다.",
    language: "Figma",
    stack: ["Wireframe", "Prototype", "Usability"],
    curriculum: [
      { week: "1주차", title: "UI/UX 기본 개념" },
      { week: "2주차", title: "레퍼런스 분석" },
      { week: "3주차", title: "사용자 흐름 정리" },
      { week: "4주차", title: "와이어프레임 제작" },
      { week: "5주차", title: "프로토타입 제작" },
      { week: "6주차", title: "피드백 반영" },
      { week: "7주차", title: "최종 발표" },
    ],
  },
];
