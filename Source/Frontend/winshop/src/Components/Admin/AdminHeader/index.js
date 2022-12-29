import React, {useState} from 'react';
import "./AdminHeader.css";
import ProfileDropdown from './ProfileDropdown';
import Brightness2Icon from '@material-ui/icons/Brightness2';
import Switch from "@material-ui/core/Switch";
import {useDispatch, useSelector} from 'react-redux'
import { Tooltip } from "@material-ui/core";
import {getDarkTheme} from '../../../actions/SidebarAction'

function AdminHeader() {
  const {darkTheme} = useSelector((state) => state.sidebar);
  const dispatch = useDispatch();
  const ThemeInLocal = JSON.parse(localStorage.getItem("theme"));
  const handleDarkTheme = (event)=>{
    dispatch(getDarkTheme(event))
 }
 let isTheme = darkTheme;
 if(!darkTheme){
     isTheme = ThemeInLocal
 }
    const [isActive, setStatus] = useState("none");
    const userInfo = JSON.parse(localStorage.getItem("user"));
    const handleAvatarClick = () => {
      if (isActive !== "avatar") setStatus("avatar");
      else setStatus("none");
    };
  return (
    <>
    <div className="adminHeader" style={{ borderBottom:
            isTheme ? "0.5px solid rgb(231, 228, 228)" : "none",}}>
      <div className="searchAreaHeader">
        <input placeholder="Search..."></input>
        <ion-icon className="searchIcon" name="search-outline"></ion-icon>
      </div>
      <div className="mainAreaHeader">
        <div className="itemAdminHeader">
           <Brightness2Icon></Brightness2Icon>
           <Tooltip title="Dark Mode" checked={isTheme} onChange={(e) => handleDarkTheme(e.target.checked)}>
            <Switch>
            </Switch>
        </Tooltip>
        </div>
        <div className="itemAdminHeader avatarContainer">
          <img
            onClick={handleAvatarClick}
            className="avatar"
            alt="avatar"
            src={
              userInfo.profilePic ? userInfo.profilePic :
              "https://images.unsplash.com/photo-1669172460356-1080d53199e6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=415&q=80"
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
  )
}

export default AdminHeader