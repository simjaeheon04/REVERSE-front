import BoardDetailPage from "../pages/BoardDetailPage/BoardDetailPage";
import BoardWritePage from "../pages/BoardWritePage/BoardWritePage";
import CalendarPage from "../pages/CalendarPage";
import BoardPage from "../pages/BoardPage";
import HomePage from "../pages/HomePage/HomePage";
import NoticePage from "../pages/NoticePage";
import PostManagementPage from "../pages/PostManagementPage/PostManagementPage";
import RecruitApplyCompletePage from "../pages/RecruitApplyCompletePage/RecruitApplyCompletePage";
import RecruitApplyPage from "../pages/RecruitApplyPage/RecruitApplyPage";
import RecruitPage from "../pages/RecruitPage/RecruitPage";

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
