import { useLocation, Navigate, Outlet } from "react-router-dom";

import { useCookies } from 'react-cookie';
import Unauthorized from "./Unauthorized";

import { useDispatch, useSelector } from 'react-redux';

const UserAuth = ( ) => {
    const location = useLocation();
    // const user = useSelector((state) => state.getUser.user);
    const [cookie, setCookie] = useCookies(['user']);

    return (
        cookie?.uid
        ? <Outlet />
        : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default UserAuth;