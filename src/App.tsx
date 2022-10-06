import { Alert, Snackbar } from "@mui/material";
import { useMemo, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AlertBoxContext } from "./context/AlertBoxContext";

import DashboardPage from "./pages/admin/dashboard/dashboard";
import LoginPage from "./pages/auth/login/login";
import RegisterPage from "./pages/auth/register/register";

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
          <Route path="auth">
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
          </Route>

          <Route path="admin">
            <Route path="dashboard" element={<DashboardPage />} />
          </Route>
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
