import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute, { LoginGuard, RoleGuard } from "../authguard/authRoute";
import DashboardPage from "../pages/admin/dashboard/dashboard";
import JobPage from "../pages/admin/jobs/jobs";
import LoginPage from "../pages/auth/login/login";
import RegisterPage from "../pages/auth/register/register";
import Page401 from "../pages/page-401/page401";
import PageNotFound from "../pages/page-not-found/pageNotFound";
import UserHome from "../pages/user-home/user-home";
import { UserRole } from "../utils/localstorageUtils";
import { RoutingURL } from "../utils/urls";

function RouterComponent() {
  return (
    <BrowserRouter>
      <Routes>
        {/* default url */}
        <Route
          index
          element={
            <Navigate
              to={`${RoutingURL.auth.BASEURL}/${RoutingURL.auth.login}`}
            />
          }
        ></Route>

        <Route
          path={RoutingURL.auth.BASEURL}
          element={<LoginGuard></LoginGuard>}
        >
          <Route index element={<Navigate to={RoutingURL.auth.login} />} />
          <Route path={RoutingURL.auth.login} element={<LoginPage />} />
          <Route path={RoutingURL.auth.register} element={<RegisterPage />} />
        </Route>

        <Route path={RoutingURL.portal.BASEURL} element={<ProtectedRoute />}>
          {/* admin routes */}
          <Route
            path={RoutingURL.portal.admin.BASEURL}
            element={<RoleGuard role={UserRole.ADMIN} />}
          >
            <Route
              index
              element={<Navigate to={RoutingURL.portal.admin.dashboard} />}
            />
            <Route
              path={RoutingURL.portal.admin.dashboard}
              element={<DashboardPage />}
            />
            <Route path={RoutingURL.portal.admin.jobs} element={<JobPage />} />
          </Route>

          {/* User Routes */}
          <Route
            path={RoutingURL.portal.user.BASEURL}
            element={<RoleGuard role={UserRole.USER} />}
          >
            <Route
              index
              element={<Navigate to={RoutingURL.portal.user.jobs} />}
            />
            <Route path={RoutingURL.portal.user.jobs} element={<UserHome />} />
          </Route>
        </Route>
        <Route path={RoutingURL.unAuth.BASEURL} element={<Page401 />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default RouterComponent;
