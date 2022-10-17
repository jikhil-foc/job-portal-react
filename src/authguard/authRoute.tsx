import { Navigate, Outlet } from "react-router-dom";
import {
  IsAdmin,
  isAuthenticated,
  isAuthorized,
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
    <Navigate
      to={`/${RoutingURL.portal.BASEURL}/${RoutingURL.portal.admin.BASEURL}`}
    />
  ) : (
    <Navigate
      to={`/${RoutingURL.portal.BASEURL}/${RoutingURL.portal.user.BASEURL}`}
    />
  );
};

export const RoleGuard = (props: any) => {
  return isAuthorized(props.role) ? (
    <Outlet />
  ) : (
    <Navigate to={`/${RoutingURL.unAuth.BASEURL}`} />
  );
};

export default ProtectedRoute;
