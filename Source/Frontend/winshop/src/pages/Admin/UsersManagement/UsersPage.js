import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axiosClient from "../../../services/axiosClient";
import UserBox from "./UserBox";
import "./UsersPage.css";

const UsersPage = () => {
  const dispatch = useDispatch();
  const [testData, setData] = useState(0);
  const usersData = useSelector((state) => state.AdminUser);
  useEffect(() => {
    const fetchUsers = async () => {
      const data = await axiosClient.get("/api/user/admin");
      dispatch({ type: "USER_UPDATE", payload: data.data });
    };
    fetchUsers();
  }, []);
  return (
    <>
      <div className="UserPage">
        {usersData.map((ele, index) => (
          <UserBox
            key={index}
            email={ele.email}
            username={ele.username}
            avatar={ele.profilePic}
            isAdmin={ele.isAdmin}
            _id={ele._id}
            phone={ele.phone}
          />
        ))}
      </div>
    </>
  );
};

export default UsersPage;