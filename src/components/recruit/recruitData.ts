import aboutImg from "../../assets/images/about-bg.jpg";
import calendarImg from "../../assets/images/calendar-bg.jpg";

import heroImg from "../../assets/images/hero-bg.jpg";
import mainProjectImg from "../../assets/images/project-main.jpg";
import studyImg from "../../assets/images/project-study.jpg";
import toyProjectImg from "../../assets/images/project-toy.jpg";

export const recruitFields = [
  "프론트엔드",
  "백엔드",
  "서버 보안",
  "데이터베이스",
  "디자인",
];

export const recruitCards = [
  {
    title: "메인 프로젝트",
    subtitle: "-Main Project-",
    image: mainProjectImg,
    description:
      "동아리에서 메인으로 진행하는 핵심 프로젝트입니다. 함께 서비스를 기획하고 구현하며 실전 개발 흐름을 경험합니다.",
  },
  {
    title: "토이 프로젝트",
    subtitle: "-Toy Project-",
    image: toyProjectImg,
    description:
      "부원끼리 팀을 이뤄 진행하는 서브 프로젝트입니다. 작은 아이디어를 빠르게 만들며 협업 경험을 쌓습니다.",
  },
  {
    title: "스터디",
    subtitle: "-Study-",
    image: studyImg,
    description:
      "개인적으로 팀을 이뤄 공부하는 스터디 그룹입니다. 관심 분야를 함께 탐구하고 꾸준히 성장합니다.",
  },
];

export const galleryItems = [
  {
    label: "팀 프로젝트",
    image: mainProjectImg,
  },
  {
    label: "스터디",
    image: studyImg,
  },
  {
    label: "세미나",
    image: toyProjectImg,
  },
  {
    label: "대외활동",
    image: aboutImg,
  },
  {
    label: "OT",
    image: calendarImg,
  },
  {
    label: "MT",
    image: heroImg,
  },
  {
    label: "기타",
    image: toyProjectImg,
  },
];

export const infiniteGalleryItems = [
  galleryItems[galleryItems.length - 1],
  ...galleryItems,
  galleryItems[0],
];
