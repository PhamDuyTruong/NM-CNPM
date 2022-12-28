import React from "react";
import "./admin.css";
import AdminHeader from "../../Components/Admin/AdminHeader";
import AdminSidebar from "../../Components/Admin/AdminSidebar";
import { useSelector } from "react-redux";

function AdminLayout({ children }) {
  const mode = useSelector((state) => state.AdminDarkMode);
  return (
    <div
      className="adminpage"
      style={{ backgroundColor: mode == "light" ? "" : "#161616" }}
    >
      <AdminSidebar />
      <div className="headerAndContent">
        <AdminHeader />
        {children}
      </div>
    </div>
  );
}

export default AdminLayout;
