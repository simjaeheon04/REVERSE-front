import BoardDetailPage from "../pages/BoardDetailPage/BoardDetailPage";
import BoardPage from "../pages/BoardPage/BoardPage";
import BoardWritePage from "../pages/BoardWritePage/BoardWritePage";
import CalendarPage from "../pages/CalendarPage";
import HomePage from "../pages/HomePage/HomePage";
import NoticePage from "../pages/NoticePage";
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
    path: "/board",
    element: <BoardPage />,
  },
  {
    path: "/board/:postId",
    element: <BoardDetailPage />,
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
    path: "calendar",
    element: <CalendarPage />,
  },
];
