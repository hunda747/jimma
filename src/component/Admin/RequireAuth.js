import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

import { useCookies } from 'react-cookie';
import Unauthorized from "./Unauthorized";

const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth();
    const location = useLocation();

    const [cookie, setCookie] = useCookies(['user']);
    console.log(allowedRoles);
    return (
        cookie?.ADrole === allowedRoles
        ? <Outlet />
        : <Navigate to="/adminstrationLogin" state={{ from: location }} replace />
        // : cookie?.ADemail 
        //     ? <Unauthorized />
        //     // ? <Navigate to="/" state={{ from: location }} replace />
        //     :<Navigate to="/adminstrationLogin" state={{ from: location }} replace />
    );
}

export default RequireAuth;