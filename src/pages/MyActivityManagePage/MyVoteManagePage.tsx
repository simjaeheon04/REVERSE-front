import MyActivityManagePage from "./MyActivityManagePage";

const myVotes = [
  {
    id: 1,
    title: "MT 최종 인원 조사",
    meta: "진행중",
    editable: true,
  },
  {
    id: 2,
    title: "OT 안주 정하기",
    meta: "종료",
    editable: true,
  },
];

export default function MyVoteManagePage() {
  return (
    <MyActivityManagePage
      title="Vote Management"
      description="나의 투표 글을 관리하는 페이지입니다."
      summaryLabel="내가 올린 투표"
      summaryIcon="□"
      sectionLabel="내 투표"
      writeLabel="투표 생성"
      writePath="/mypage/votes"
      deleteTitle="정말로 삭제하시겠습니까?"
      deleteDescription="삭제된 투표는 다시 복구할 수 없습니다."
      emptyText="아직 올린 투표가 없습니다."
      items={myVotes}
    />
  );
}
