import React from "react";
import { getAuthUser } from "../helper/Storage";
import { Navigate, Outlet } from "react-router-dom";

const Admin = () => {
    const auth = getAuthUser();
    return <>{auth && auth.type === 1 ? <Outlet /> : <Navigate to={"/"} />}</>;
};

export default Admin;

