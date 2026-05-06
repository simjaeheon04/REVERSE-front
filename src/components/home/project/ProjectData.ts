import mainProjectImg from "../../../assets/images/project-main.jpg";
import toyProjectImg from "../../../assets/images/project-toy.jpg";
import studyImg from "../../../assets/images/project-study.jpg";

export interface ProjectItem {
  id: number;
  title: string;
  image: string;
  detailText: string;
}

export const projectData: ProjectItem[] = [
  {
    id: 1,
    title: "Main Project",
    image: mainProjectImg,
    detailText: "메인 프로젝트 상세 내용",
  },
  {
    id: 2,
    title: "Toy Project",
    image: toyProjectImg,
    detailText: "토이프로젝트 상세 내용",
  },
  {
    id: 3,
    title: "Study",
    image: studyImg,
    detailText: "스터디 상세 내용",
  },
];
