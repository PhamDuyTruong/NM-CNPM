import React from "react";
import { Route, Redirect } from "react-router-dom";
import Swal from "sweetalert2";

export default function AdminRoute({ children, ...props }) {
  const userInfo = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  // Nếu người dùng chưa đăng nhập
  if (userInfo === null) {
    return <Redirect to="/sign-in" />;
  }

  // Check người dùng không phải là Admin
  if (userInfo && !userInfo.isAdmin) {
    Swal.fire(
      "You are not allowed to access this ADMIN page !",
      "Authorization required to become admin !",
      "error"
    );
    return <Redirect to="/sign-in" />;
  }

  return <Route {...props}>{children}</Route>;
}