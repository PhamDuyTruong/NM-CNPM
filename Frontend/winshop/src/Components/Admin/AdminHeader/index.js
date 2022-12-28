import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./AdminHeader.css";
import ProfileDropdown from "./ProfileDropdown";

function AdminHeader() {
  const [isActive, setStatus] = useState("none");
  const userInfo = JSON.parse(localStorage.getItem("user"));
  const handleAvatarClick = () => {
    if (isActive !== "avatar") setStatus("avatar");
    else setStatus("none");
  };
  const handleSettingClick = () => {
    if (isActive !== "setting") setStatus("setting");
    else setStatus("none");
  };
  const mode = useSelector((state) => state.AdminDarkMode);
  const dispatch = useDispatch();
  const handleDrakMode = () => {
    dispatch({ type: "ADMIN_CHANGE_MODE" });
  };
  return (
    <>
      <div
        className="adminHeader"
        style={{
          borderBottom:
            mode == "light" ? "0.5px solid rgb(231, 228, 228)" : "none",
        }}
      >
        <div className="searchAreaHeader">
          <input placeholder="Search..."></input>
          <ion-icon className="searchIcon" name="search-outline"></ion-icon>
        </div>
        <div className="mainAreaHeader">
          <div className="itemAdminHeader" onClick={handleDrakMode}>
            <ion-icon name="moon-outline"></ion-icon>
          </div>
          <div className="itemAdminHeader avatarContainer">
            <img
              onClick={handleAvatarClick}
              className="avatar"
              alt="avatar"
              src={
                userInfo.profilePic
                  ? userInfo.profilePic
                  : "https://images.unsplash.com/photo-1669172460356-1080d53199e6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=415&q=80"
              }
            ></img>
            <div
              className="profiledropdown"
              style={{ display: isActive === "avatar" ? "block" : "none" }}
            >
              <ProfileDropdown></ProfileDropdown>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminHeader;
