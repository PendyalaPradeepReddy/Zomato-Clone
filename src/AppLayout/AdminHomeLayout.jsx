import React from "react";
import { Outlet } from "react-router-dom";
import AdminFooter from "../admin/components/Footer/AdminFooter";
import AdminHeader from "../admin/components/Headar/AdminHeader";
import AdminMenu from "../admin/components/Menu/AdminMenu";

function AdminHomeLayout() {
  return (
    <>
      <AdminHeader />
      <AdminMenu />
      <Outlet />
      <AdminFooter />
    </>
  );
}

export default AdminHomeLayout;
