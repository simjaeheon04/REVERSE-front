import BoardDetailPage from "../pages/BoardDetailPage/BoardDetailPage";
import BoardWritePage from "../pages/BoardWritePage/BoardWritePage";
import CalendarPage from "../pages/CalendarPage";
import BoardPage from "../pages/BoardPage";
import HomePage from "../pages/HomePage/HomePage";
import ItIssuePage from "../pages/ItIssuePage/ItIssuePage";
import MyPage from "../pages/MyPage/MyPage";
import MyPagePasswordPage from "../pages/MyPagePasswordPage/MyPagePasswordPage";
import MyProjectManagePage from "../pages/MyActivityManagePage/MyProjectManagePage";
import MyStudyManagePage from "../pages/MyActivityManagePage/MyStudyManagePage";
import MyVoteManagePage from "../pages/MyActivityManagePage/MyVoteManagePage";
import NoticePage from "../pages/NoticePage";
import PostManagementPage from "../pages/PostManagementPage/PostManagementPage";
import ProjectApplyCompletePage from "../pages/ProjectApplyCompletePage/ProjectApplyCompletePage";
import ProjectApplyPage from "../pages/ProjectApplyPage/ProjectApplyPage";
import ProjectDetailPage from "../pages/ProjectDetailPage/ProjectDetailPage";
import ProjectManagementPage from "../pages/ProjectManagementPage/ProjectManagementPage";
import ProjectPage from "../pages/ProjectPage/ProjectPage";
import ProjectWritePage from "../pages/ProjectWritePage/ProjectWritePage";
import RecruitApplyCompletePage from "../pages/RecruitApplyCompletePage/RecruitApplyCompletePage";
import RecruitApplyPage from "../pages/RecruitApplyPage/RecruitApplyPage";
import RecruitPage from "../pages/RecruitPage/RecruitPage";
import StudyApplyCompletePage from "../pages/StudyApplyCompletePage/StudyApplyCompletePage";
import StudyApplyPage from "../pages/StudyApplyPage/StudyApplyPage";
import StudyApplicationsPage from "../pages/StudyApplicationsPage/StudyApplicationsPage";
import StudyDetailPage from "../pages/StudyDetailPage/StudyDetailPage";
import StudyPage from "../pages/StudyPage/StudyPage";
import StudyWritePage from "../pages/StudyWritePage/StudyWritePage";
import VoteDetailPage from "../pages/VoteDetailPage";
import VoteManagementPage from "../pages/VoteManagementPage/VoteManagementPage";
import VotePage from "../pages/VotePage";
import VoteStatusPage from "../pages/VoteStatusPage";
import VoteWritePage from "../pages/VoteWritePage";
import AuthRouteGuard from "./AuthRouteGuard";
import MemberRouteGuard from "./MemberRouteGuard";

export const mainRoutes = [
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/notice",
    element: <NoticePage />,
  },
  {
    path: "/it-issue",
    element: <ItIssuePage />,
  },
  {
    path: "/project",
    element: <ProjectPage />,
  },
  {
    path: "/project/write",
    element: (
      <AuthRouteGuard>
        <ProjectWritePage />
      </AuthRouteGuard>
    ),
  },
  {
    path: "/project/manage",
    element: <ProjectManagementPage />,
  },
  {
    path: "/project/:projectId",
    element: <ProjectDetailPage />,
  },
  {
    path: "/project/:projectId/apply",
    element: <ProjectApplyPage />,
  },
  {
    path: "/project/:projectId/apply/complete",
    element: <ProjectApplyCompletePage />,
  },
  {
    path: "/board/:postId",
    element: <BoardDetailPage />,
  },
  {
    path: "/board/manage",
    element: (
      <AuthRouteGuard>
        <PostManagementPage />
      </AuthRouteGuard>
    ),
  },
  {
    path: "/board/write",
    element: (
      <AuthRouteGuard>
        <BoardWritePage />
      </AuthRouteGuard>
    ),
  },
  {
    path: "/recruit",
    element: <RecruitPage />,
  },
  {
    path: "/study",
    element: <StudyPage />,
  },
  {
    path: "/mypage",
    element: (
      <AuthRouteGuard>
        <MyPage />
      </AuthRouteGuard>
    ),
  },
  {
    path: "/mypage/votes",
    element: (
      <AuthRouteGuard>
        <MyVoteManagePage />
      </AuthRouteGuard>
    ),
  },
  {
    path: "/mypage/projects",
    element: (
      <AuthRouteGuard>
        <MyProjectManagePage />
      </AuthRouteGuard>
    ),
  },
  {
    path: "/mypage/studies",
    element: (
      <AuthRouteGuard>
        <MyStudyManagePage />
      </AuthRouteGuard>
    ),
  },
  {
    path: "/study/write",
    element: (
      <AuthRouteGuard>
        <StudyWritePage />
      </AuthRouteGuard>
    ),
  },
  {
    path: "/study/:studyId",
    element: <StudyDetailPage />,
  },
  {
    path: "/study/:studyId/apply",
    element: <StudyApplyPage />,
  },
  {
    path: "/study/:studyId/apply/complete",
    element: <StudyApplyCompletePage />,
  },
  {
    path: "/study/:studyId/applications",
    element: (
      <AuthRouteGuard>
        <StudyApplicationsPage />
      </AuthRouteGuard>
    ),
  },
  {
    path: "/recruit/apply",
    element: <RecruitApplyPage />,
  },
  {
    path: "/recruit/apply/complete",
    element: <RecruitApplyCompletePage />,
  },
  {
    path: "/calendar",
    element: <CalendarPage />,
  },
  {
    path: "/vote",
    element: <VotePage />,
  },
  {
    path: "/vote/write",
    element: (
      <AuthRouteGuard>
        <VoteWritePage />
      </AuthRouteGuard>
    ),
  },
  {
    path: "/mypage/password",
    element: (
      <AuthRouteGuard>
        <MyPagePasswordPage />
      </AuthRouteGuard>
    ),
  },
  {
    path: "/vote/manage",
    element: <VoteManagementPage />,
  },
  {
    path: "/vote/:voteId/status",
    element: (
      <MemberRouteGuard fallbackPath="/vote">
        <VoteStatusPage />
      </MemberRouteGuard>
    ),
  },
  {
    path: "/vote/:voteId",
    element: (
      <MemberRouteGuard fallbackPath="/vote">
        <VoteDetailPage />
      </MemberRouteGuard>
    ),
  },
  {
    path: "/board",
    element: <BoardPage />,
  },
];
