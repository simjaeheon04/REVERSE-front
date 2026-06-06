import { getAllStudyPosts } from "../StudyPage/studyStorage";
import MyActivityManagePage from "./MyActivityManagePage";

const getMyStudies = () =>
  getAllStudyPosts()
    .slice(0, 1)
    .map((study) => ({
      id: study.id,
      title: study.title,
      meta: study.status,
      editable: false,
      detailPath: `/study/${study.id}`,
    }));

export default function MyStudyManagePage() {
  return (
    <MyActivityManagePage
      title="Study Management"
      description="나의 스터디를 관리하는 페이지입니다."
      summaryLabel="나의 스터디"
      summaryIcon="▥"
      sectionLabel="내 스터디"
      writeLabel="스터디 글 작성하기"
      writePath="/study/write"
      deleteTitle="정말로 삭제하시겠습니까?"
      deleteDescription="삭제된 스터디 글은 다시 복구할 수 없습니다."
      emptyText="아직 참여 중인 스터디가 없습니다."
      items={getMyStudies()}
    />
  );
}
