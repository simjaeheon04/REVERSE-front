import AdminPage from "../pages/admin/AdminPage";
import AuthManagePage from "../pages/AuthManagePage/AuthManagePage";
import BoardManagePage from "../pages/BoardManagePage/BoardManagePage";
import ClubIntroManagePage from "../pages/clubIntroManage/ClubIntroManagePage";
import NoticeManagePage from "../pages/NoticeManagePage/NoticeManagePage";
import CalendarManagePage from "../pages/CalendarManagePage/CalendarManagePage";
import OfficerManagePage from "../pages/officerManage/OfficerManagePage";
import ProjectManagePage from "../pages/projectManage/ProjectManagePage";
import TermsManagePage from "../pages/termsManage/TermsManagePage";

export const adminRoutes = [
  {
    path: "/admin",
    element: <AdminPage />,
  },
  {
    path: "/admin/club-intro",
    element: <ClubIntroManagePage />,
  },
  {
    path: "/admin/officer",
    element: <OfficerManagePage />,
  },
  {
    path: "/admin/terms",
    element: <TermsManagePage />,
  },
  {
    path: "/admin/project",
    element: <ProjectManagePage />,
  },
  {
    path: "/admin/notice",
    element: <NoticeManagePage />,
  },
  {
    path: "/admin/calendar",
    element: <CalendarManagePage />,
  },
  {
    path: "/admin/board",
    element: <BoardManagePage />,
  },
  {
    path: "/admin/auth",
    element: <AuthManagePage />,
  }
];
