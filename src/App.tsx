import { Alert, Snackbar } from "@mui/material";
import { useMemo, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute, { LoginGuard, RoleGuard } from "./authguard/authRoute";
import { AlertBoxContext } from "./context/AlertBoxContext";

import DashboardPage from "./pages/admin/dashboard/dashboard";
import JobPage from "./pages/admin/jobs/jobs";
import LoginPage from "./pages/auth/login/login";
import RegisterPage from "./pages/auth/register/register";
import Page401 from "./pages/page-401/page401";

import PageNotFound from "./pages/page-not-found/pageNotFound";
import { UserRole } from "./utils/localstorageUtils";
import { RoutingURL } from "./utils/urls";

function App() {
  const [message, setMessage] = useState({
    displayMessage: "",
    type: "success",
    isOpen: false,
  });

  const closeAlert = () => {
    setMessage({
      displayMessage: "",
      type: "success",
      isOpen: false,
    });
  };

  return (
    <AlertBoxContext.Provider value={{ message, setMessage }}>
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

          <Route path="portal" element={<ProtectedRoute />}>
            {/* admin routes */}
            <Route path="admin" element={<RoleGuard role={UserRole.ADMIN} />}>
              <Route index element={<Navigate to="dashboard" />} />
              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="jobs" element={<JobPage />} />
            </Route>
          </Route>
          <Route path="page-401" element={<Page401 />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>

        <Snackbar
          open={message.isOpen}
          autoHideDuration={3000}
          onClose={closeAlert}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert
            onClose={closeAlert}
            severity={message.type == "success" ? "success" : "error"}
          >
            {message.displayMessage}
          </Alert>
        </Snackbar>
      </BrowserRouter>
    </AlertBoxContext.Provider>
  );
}

export default App;
