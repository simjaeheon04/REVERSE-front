import BoardDetailPage from "../pages/BoardDetailPage/BoardDetailPage";
import BoardWritePage from "../pages/BoardWritePage/BoardWritePage";
import CalendarPage from "../pages/CalendarPage";
import BoardPage from "../pages/BoardPage";
import HomePage from "../pages/HomePage/HomePage";
import NoticePage from "../pages/NoticePage";
import PostManagementPage from "../pages/PostManagementPage/PostManagementPage";
import ProjectApplyCompletePage from "../pages/ProjectApplyCompletePage/ProjectApplyCompletePage";
import ProjectApplyPage from "../pages/ProjectApplyPage/ProjectApplyPage";
import ProjectDetailPage from "../pages/ProjectDetailPage/ProjectDetailPage";
import ProjectPage from "../pages/ProjectPage/ProjectPage";
import RecruitApplyCompletePage from "../pages/RecruitApplyCompletePage/RecruitApplyCompletePage";
import RecruitApplyPage from "../pages/RecruitApplyPage/RecruitApplyPage";
import RecruitPage from "../pages/RecruitPage/RecruitPage";
import StudyApplyCompletePage from "../pages/StudyApplyCompletePage/StudyApplyCompletePage";
import StudyApplyPage from "../pages/StudyApplyPage/StudyApplyPage";
import StudyDetailPage from "../pages/StudyDetailPage/StudyDetailPage";
import StudyPage from "../pages/StudyPage/StudyPage";
import StudyWritePage from "../pages/StudyWritePage/StudyWritePage";

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
    path: "/project",
    element: <ProjectPage />,
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
    element: <PostManagementPage />,
  },
  {
    path: "/board/write",
    element: <BoardWritePage />,
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
    path: "/study/write",
    element: <StudyWritePage />,
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
    path: "/board",
    element: <BoardPage />,
  },
];
