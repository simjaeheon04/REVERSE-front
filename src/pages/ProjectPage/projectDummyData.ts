import projectMainImage from "../../assets/images/project-main.jpg";
import projectStudyImage from "../../assets/images/project-study.jpg";
import projectToyImage from "../../assets/images/project-toy.jpg";

export type ProjectPost = {
  id: number;
  semester: string;
  title: string;
  description: string;
  imageUrl: string;
  leader: string;
  introduction: string;
  goal: string;
  memberCount: number;
  schedule: string;
  place: string;
  notes: string;
};

export const PROJECT_POSTS: ProjectPost[] = [
  {
    id: 1,
    semester: "2026-1학기",
    title: "우주밤",
    description: "우주 사진 보정 일기 앱",
    imageUrl: projectMainImage,
    leader: "박시연",
    introduction: "우리 주변 맛집을 찾아주는 서비스를 개발하였습니다.",
    goal:
      "주변 맛집 찾는 앱이 별로 없기도 하고, 차별점을 두어 획기적인 서비스를 만들어 보고 싶었습니다. 스프린트 밀리지 않고 이번 학기 안에 끝내는 것이 저희 팀의 목표입니다.",
    memberCount: 5,
    schedule: "수요일 5시",
    place: "동아리방 / 대면 회의 진행",
    notes: "기초적인 언어를 아셔야 합니다.",
  },
  {
    id: 2,
    semester: "2026-1학기",
    title: "너와 나의 연결고리",
    description: "사주 기반 매칭 앱",
    imageUrl: projectStudyImage,
    leader: "김도윤",
    introduction: "관심사와 성향을 기반으로 팀원을 연결하는 매칭 서비스를 개발합니다.",
    goal: "사용자가 부담 없이 자신의 성향을 입력하고 잘 맞는 사람을 찾을 수 있는 경험을 만드는 것이 목표입니다.",
    memberCount: 4,
    schedule: "금요일 6시",
    place: "온라인 / 디스코드",
    notes: "React 기본 문법을 알고 있으면 좋습니다.",
  },
  {
    id: 3,
    semester: "2026-1학기",
    title: "Clean Sync",
    description: "미세먼지 공기 청정 서비스",
    imageUrl: projectToyImage,
    leader: "이서현",
    introduction: "실내 공기 상태를 확인하고 청정 루틴을 추천하는 서비스를 만듭니다.",
    goal: "공공 API와 사용자 알림을 연결해 생활에 바로 쓰이는 서비스를 구현합니다.",
    memberCount: 6,
    schedule: "화요일 7시",
    place: "동아리방",
    notes: "API 통신 경험이 있으면 좋습니다.",
  },
  {
    id: 4,
    semester: "2026-1학기",
    title: "우주배송",
    description: "가장 빠른 데브옵스 위성 서비스",
    imageUrl: projectToyImage,
    leader: "정민재",
    introduction: "배송 흐름을 시각화하고 배포 자동화를 연습하는 프로젝트입니다.",
    goal: "팀 단위 개발에서 배포와 운영까지 경험하는 것을 목표로 합니다.",
    memberCount: 5,
    schedule: "목요일 5시",
    place: "온라인 / 오프라인 병행",
    notes: "Git 사용 경험이 있으면 좋습니다.",
  },
  {
    id: 5,
    semester: "2026-1학기",
    title: "써칭",
    description: "사이트 링크 검색창",
    imageUrl: projectMainImage,
    leader: "최유진",
    introduction: "필요한 링크와 자료를 빠르게 찾는 검색형 웹 서비스를 만듭니다.",
    goal: "검색 UX와 북마크 관리 흐름을 직접 설계하고 구현합니다.",
    memberCount: 3,
    schedule: "월요일 6시",
    place: "동아리방",
    notes: "UI 구현에 관심 있는 분을 환영합니다.",
  },
  {
    id: 6,
    semester: "2026-1학기",
    title: "투게더",
    description: "작업 관리 서비스",
    imageUrl: projectStudyImage,
    leader: "한지우",
    introduction: "팀 작업을 정리하고 진행률을 확인하는 협업 서비스를 만듭니다.",
    goal: "칸반 보드, 일정, 알림을 묶어 실제 팀이 쓸 수 있는 형태로 완성합니다.",
    memberCount: 5,
    schedule: "수요일 7시",
    place: "동아리방 / 회의실",
    notes: "상태관리 경험이 있으면 좋습니다.",
  },
  {
    id: 7,
    semester: "2026-1학기",
    title: "리버스 아카이브",
    description: "동아리 프로젝트 기록 저장소",
    imageUrl: projectMainImage,
    leader: "오하린",
    introduction: "동아리에서 진행한 프로젝트를 모아 보여주는 아카이브를 만듭니다.",
    goal: "검색, 필터, 상세 보기까지 프로젝트 기록을 오래 보존할 수 있는 구조를 만듭니다.",
    memberCount: 4,
    schedule: "토요일 2시",
    place: "온라인",
    notes: "문서화와 UI에 관심 있으면 좋습니다.",
  },
];
