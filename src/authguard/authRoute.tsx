import { Navigate, Outlet } from "react-router-dom";
import {
  IsAdmin,
  isAuthenticated,
  isAuthorized,
  UserRole,
} from "../utils/localstorageUtils";
import { RoutingURL } from "../utils/urls";

const ProtectedRoute = () => {
  return isAuthenticated() ? (
    <Outlet />
  ) : (
    <Navigate to={`/${RoutingURL.auth.BASEURL}`} />
  );
};

export const LoginGuard = () => {
  return !isAuthenticated() ? (
    <Outlet />
  ) : IsAdmin() ? (
    <Navigate to="/portal/admin/dashboard" />
  ) : (
    <Navigate to="/page-401" />
  );
};

export const RoleGuard = (props: any) => {
  return isAuthorized(props.role) ? <Outlet /> : <Navigate to="/page-401" />;
};

export default ProtectedRoute;
