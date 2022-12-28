import React, { useState, useEffect } from "react";
import UserIcon from "@material-ui/icons/AccountCircle";
import EmailIcon from "@material-ui/icons/Email";

import CancelIcon from "@material-ui/icons/Cancel";
import DeleteIcon from "@material-ui/icons/Delete";
import axios from "../../../services/axios";
import axiosClient from "../../../services/axiosClient";
import { useDispatch, useSelector } from "react-redux";

import "./UserBox.css";

const UserBox = (props) => {
  const [state, setState] = useState(0);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState(false);

  const dispatch = useDispatch();
  const mode = useSelector((state) => state.AdminDarkMode);

  const handleSubmitUpdate = async (e) => {
    e.preventDefault();
    const url = `/api/user/admin/${props._id}`;
    const method = "put";
    const data = {
      username: username || props.username,
      email: email || props.email,
      phone: phone || props.phone,
      isAdmin: role || props.isAdmin,
    };
    const userInfo = JSON.parse(localStorage.getItem("user"));
    const headers = {
      "Content-Type": "application/json",
    };
    if (userInfo) {
      const { accessToken } = userInfo;
      headers.token = `Bearer ${accessToken}`;
    }
    await axios({ url, method, data, headers })
      .then((response) => {
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
    const fetchUsers = async () => {
      const data = await axiosClient.get("/api/user/admin");
      dispatch({ type: "USER_UPDATE", payload: data.data });
    };
    fetchUsers();
    setState(0);
  };
  const handleDelete = async () => {
    const url = `/user/admin/${props._id}`;
    const method = "delete";
    const userInfo = JSON.parse(localStorage.getItem("user"));
    const headers = {};
    if (userInfo) {
      const { accessToken } = userInfo;
      headers.token = `Bearer ${accessToken}`;
    }
    await axios({ headers, url, method }).then((res) => {
      const fetchUsers = async () => {
        const data = await axiosClient.get("/api/user/admin");
        dispatch({ type: "USER_UPDATE", payload: data.data });
      };
      fetchUsers();
      setState(0);
      console.log(res);
    });
  };
  return (
    <>
      <div className="UserBox-container">
        <div className="UserBox-left">
          <p
            className="isAdmin"
            style={{ color: props.isAdmin ? "green" : "blue" }}
          >
            {props.isAdmin ? "Admin" : "User"}
          </p>
          <img
            className="UserBox-avatar-img"
            src={props.avatar}
            alt="avatar"
          ></img>
        </div>
        <div
          className="UserBox-content"
          style={{ color: mode == "light" ? "" : "white" }}
        >
          <div className="UserBox-content-username">
            <UserIcon></UserIcon>
            <span className="UserBox-email">{props.username}</span>
          </div>
          <div className="UserBox-content-email">
            <EmailIcon></EmailIcon>
            <span className="UserBox-email">{props.email}</span>
          </div>
          <button
            className="UserBox-update-button"
            onClick={() => {
              state ? setState(0) : setState(1);
            }}
          >
            UPDATE
          </button>
        </div>
        {/* ----------------------------------------------- */}
        <div
          className="UpdateUser-Model"
          style={{ display: state ? "block" : "none" }}
        >
          <div
            className="UpdateUser-Model-delete-button"
            onClick={handleDelete}
          >
            <DeleteIcon></DeleteIcon>
          </div>
          <div
            className="UpdateUser-Model-cancel-button"
            onClick={() => setState(0)}
          >
            <CancelIcon></CancelIcon>
          </div>
          <div
            className="UpdateUser-Modal-layout"
            onClick={() => setState(0)}
          ></div>
          <form onSubmit={handleSubmitUpdate} className="UpdateUser-Form">
            <span>Username: </span>
            <input
              type="text"
              name="username"
              placeholder={props.username}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <span>Email:</span>
            <input
              type="email"
              value={email}
              placeholder={props.email}
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <span>Phone:</span>
            <input
              type="text"
              name="phone"
              placeholder={props.phone}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <span>Role</span>
            <select onChange={(e) => setRole(e.target.value)}>
              <option value="true">Admin</option>
              <option value="false">User</option>
            </select>
            <div></div>
            <button className="UpdateUser-Modal-Submit-Button" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default UserBox;
