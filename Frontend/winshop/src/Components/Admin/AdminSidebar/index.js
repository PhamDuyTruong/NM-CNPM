import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./AdminSidebar.css";
import TodayIcon from "@material-ui/icons/Today";

function AdminSidebar() {
  const mode = useSelector((state) => state.AdminDarkMode);
  return (
    <>
      <div
        className="sidebar"
        style={{
          borderRight:
            mode == "light" ? "0.5px solid rgb(231, 228, 228)" : "none",
        }}
      >
        <div className="top">
          <div>
            <span className="logo">
              <Link to="/" style={{ textDecoration: "none" }}>
                Winshop
              </Link>
            </span>
          </div>
        </div>
        <div className="mainSidebar">
          <ul className="main">
            <span className="title">MAIN</span>
            <Link to="/admin/dashboard">
              <li>
                <ion-icon name="home-outline"></ion-icon>
                <span>Dashboard</span>
              </li>
            </Link>
            <Link to="/admin/calendar">
              <li>
                <TodayIcon style={{ color: "#7451f8" }}></TodayIcon>
                <span>Calendar</span>
              </li>
            </Link>
          </ul>
          <ul className="lists">
            <span className="title">LIST</span>
            <Link to="/admin/users">
              <li>
                <ion-icon name="person-outline"></ion-icon>
                <span>Users</span>
              </li>
            </Link>
            <Link to="/admin/products">
              <li>
                <ion-icon name="storefront-outline"></ion-icon>
                <span>Products</span>
              </li>
            </Link>
            <Link to="/admin/orders">
              <li>
                <ion-icon name="card-outline"></ion-icon>
                <span>Orders</span>
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </>
  );
}

export default AdminSidebar;
