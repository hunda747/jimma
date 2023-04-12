import { useLocation, Navigate, Outlet } from "react-router-dom";

import { useCookies } from "react-cookie";
import Unauthorized from "./Unauthorized";

const RequireAuth = ({ allowedRoles }) => {
  const location = useLocation();

  const [cookie, setCookie] = useCookies(["user"]);
  // // console.log(allowedRoles);
  return cookie?.toloDAMrole === allowedRoles ? (
    <Outlet />
  ) : (
    <Navigate to="/adminLogin" state={{ from: location }} replace />
  );
  // : cookie?.ADemail
  //     ? <Unauthorized />
  //     // ? <Navigate to="/" state={{ from: location }} replace />
  //     :<Navigate to="/adminstrationLogin" state={{ from: location }} replace />
};

export default RequireAuth;
