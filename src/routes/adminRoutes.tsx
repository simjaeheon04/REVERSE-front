import AdminPage from "../pages/admin/AdminPage";
import BoardAdminPage from "../pages/boardAdmin/BoardAdminPage";
import CalendarManagePage from "../pages/calendarManage/CalendarManagePage";
import ClubIntroManagePage from "../pages/clubIntroManage/ClubIntroManagePage";
import NoticeManagePage from "../pages/noticeManage/NoticeManagePage";
import OfficerManagePage from "../pages/officerManage/OfficerManagePage";
import ProjectManagePage from "../pages/projectManage/ProjectManagePage";
import ProjectMonitorPage from "../pages/projectMonitor/ProjectMonitorPage";
import RecruitApplicationManagePage from "../pages/recruitApplicationManage/RecruitApplicationManagePage";
import RecruitManagePage from "../pages/recruitManage/RecruitManagePage";
import TermsManagePage from "../pages/termsManage/TermsManagePage";
import AdminRouteGuard from "./AdminRouteGuard";

export const adminRoutes = [
  {
    path: "/admin",
    element: (
      <AdminRouteGuard>
        <AdminPage />
      </AdminRouteGuard>
    ),
  },
  {
    path: "/admin/club-intro",
    element: (
      <AdminRouteGuard>
        <ClubIntroManagePage />
      </AdminRouteGuard>
    ),
  },
  {
    path: "/admin/officer",
    element: (
      <AdminRouteGuard>
        <OfficerManagePage />
      </AdminRouteGuard>
    ),
  },
  {
    path: "/admin/terms",
    element: (
      <AdminRouteGuard>
        <TermsManagePage />
      </AdminRouteGuard>
    ),
  },
  {
    path: "/admin/project",
    element: (
      <AdminRouteGuard>
        <ProjectManagePage />
      </AdminRouteGuard>
    ),
  },
  {
    path: "/admin/project-monitoring",
    element: (
      <AdminRouteGuard>
        <ProjectMonitorPage />
      </AdminRouteGuard>
    ),
  },
  {
    path: "/admin/calendar",
    element: (
      <AdminRouteGuard>
        <CalendarManagePage />
      </AdminRouteGuard>
    ),
  },
  {
    path: "/admin/notice",
    element: (
      <AdminRouteGuard>
        <NoticeManagePage />
      </AdminRouteGuard>
    ),
  },
  {
    path: "/admin/board",
    element: (
      <AdminRouteGuard>
        <BoardAdminPage />
      </AdminRouteGuard>
    ),
  },
  {
    path: "/admin/recruit",
    element: (
      <AdminRouteGuard>
        <RecruitManagePage />
      </AdminRouteGuard>
    ),
  },
  {
    path: "/admin/recruit-applications",
    element: (
      <AdminRouteGuard>
        <RecruitApplicationManagePage />
      </AdminRouteGuard>
    ),
  },
];
