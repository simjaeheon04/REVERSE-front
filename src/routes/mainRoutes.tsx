import CalendarPage from "../pages/CalendarPage";
import BoardPage from "../pages/BoardPage";
import HomePage from "../pages/HomePage/HomePage";
import NoticePage from "../pages/NoticePage";
import RecruitApplyCompletePage from "../pages/RecruitApplyCompletePage/RecruitApplyCompletePage";
import RecruitApplyPage from "../pages/RecruitApplyPage/RecruitApplyPage";
import RecruitPage from "../pages/RecruitPage/RecruitPage";
import FindIdPage from "../pages/auth/FindIdPage/FindIdPage";
import FindPasswordPage from "../pages/auth/FindPasswordPage/FindPasswordPage";

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
  {
    path: "/FindId", // 
    element: <FindIdPage />,
  },
  {
    path: "/FindPs", // 
    element: <FindPasswordPage />,
  }
];
