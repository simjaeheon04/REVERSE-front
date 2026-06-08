import MyActivityManagePage from "./MyActivityManagePage";

const myProjects = [
  {
    id: 1,
    title: "리버스 홈페이지 제작",
    meta: "팀장으로 참여 중",
    editable: true,
    editPath: "/project",
  },
  {
    id: 2,
    title: "Clean Sync",
    meta: "팀원으로 참여 중",
    editable: false,
    detailPath: "/project/3",
  },
];

export default function MyProjectManagePage() {
  return (
    <MyActivityManagePage
      title="Project Management"
      description="나의 프로젝트를 관리하는 페이지입니다."
      summaryLabel="나의 프로젝트"
      summaryIcon="▱"
      sectionLabel="내 프로젝트"
      writeLabel="프로젝트 글 작성하기"
      writePath="/project"
      deleteTitle="정말로 삭제하시겠습니까?"
      deleteDescription="삭제된 프로젝트 글은 다시 복구할 수 없습니다."
      emptyText="아직 참여 중인 프로젝트가 없습니다."
      items={myProjects}
    />
  );
}
