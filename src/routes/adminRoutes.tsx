import AdminPage from "../pages/admin/AdminPage";
import BoardAdminPage from "../pages/boardAdmin/BoardAdminPage";
import CalendarManagePage from "../pages/calendarManage/CalendarManagePage";
import ClubIntroManagePage from "../pages/clubIntroManage/ClubIntroManagePage";
import ItIssueManagePage from "../pages/itIssueManage/ItIssueManagePage";
import MyPageManagePage from "../pages/myPageManage/MyPageManagePage";
import NoticeManagePage from "../pages/noticeManage/NoticeManagePage";
import OfficerManagePage from "../pages/officerManage/OfficerManagePage";
import ProjectManagePage from "../pages/projectManage/ProjectManagePage";
import ProjectMonitorPage from "../pages/projectMonitor/ProjectMonitorPage";
import RecruitApplicationManagePage from "../pages/recruitApplicationManage/RecruitApplicationManagePage";
import RecruitManagePage from "../pages/recruitManage/RecruitManagePage";
import StudyManagePage from "../pages/studyManage/StudyManagePage";
import TermsManagePage from "../pages/termsManage/TermsManagePage";
import UserAdminPage from "../pages/userAdmin/UserAdminPage";
import VoteAdminPage from "../pages/voteAdmin/VoteAdminPage";
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
  {
    path: "/admin/users",
    element: (
      <AdminRouteGuard>
        <UserAdminPage />
      </AdminRouteGuard>
    ),
  },
  {
    path: "/admin/votes",
    element: (
      <AdminRouteGuard>
        <VoteAdminPage />
      </AdminRouteGuard>
    ),
  },
  {
    path: "/admin/study",
    element: (
      <AdminRouteGuard>
        <StudyManagePage />
      </AdminRouteGuard>
    ),
  },
  {
    path: "/admin/mypage",
    element: (
      <AdminRouteGuard>
        <MyPageManagePage />
      </AdminRouteGuard>
    ),
  },
  {
    path: "/admin/it-issue",
    element: (
      <AdminRouteGuard>
        <ItIssueManagePage />
      </AdminRouteGuard>
    ),
  },
];
