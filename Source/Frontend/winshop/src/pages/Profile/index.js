import React, {useState, useEffect} from 'react'
import "./settings.css";
import {useHistory} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux';
import  {updateUserProfile} from '../../actions/UserAction';
import axios from "../../services/axios";
import saleOff from '../../assets/images/saleOff.png';
import HandleImage from '../../utils/HandleImage';

function Profile() {
  const [file, setFile] = useState("");
  console.log(file)
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const userInfo = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if(!userInfo){
      history.push('/sign-in')
    }
  }, [userInfo])

  const handleSubmit = async(e) => {
    e.preventDefault();
    const updatedUser = {
      username:  username || userInfo.username,
      email: email || userInfo.email,
      phone: phone || userInfo.phone,
      profilePic: userInfo.profilePic || "",
      password: password || userInfo.password
    }
    if(file){
      const formData = new FormData();
      // const filename = "avatar";
      // data.append("name", filename);
      formData.append("avatar", file);
      try {
        let url = `/user/upload-avatar`;
      
        const headers = {
          "Content-Type": "multipart/form-data",
      };

       const {data} = await axios.post(url, formData, headers);
       setFile(data.profilePic);
       updatedUser.profilePic = data.profilePic || userInfo.profilePic
      } catch (err) {
        console.log(err)
      }
    }
    const newUser = {
      ...updatedUser,
      accessToken: userInfo.accessToken
    }
    localStorage.setItem("user", JSON.stringify(newUser))
    dispatch(updateUserProfile(updatedUser));
    setSuccess(true)
  };
  

  setTimeout(() => {
    setSuccess(false)
  }, 5000);

  
  return (
    <>
       <section className='banner'>
          <img src={HandleImage(saleOff)} alt="Hinh anh" style={{marginTop: "3.5rem"}} width="100%" height="150"/>
    </section>
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsTitleUpdate">Update Your Account</span>
       </div>
      <form className="settingsForm" onSubmit={handleSubmit}>
        <label>Profile Picture</label>
        <div className="settingsPP">
        <img
            src={userInfo.profilePic || "https://www.nicepng.com/png/detail/933-9332131_profile-picture-default-png.png" }
            alt="hinh anh"
          />
          <label htmlFor="fileInput">
            <i className="settingsPPIcon far fa-user-circle"></i>{" "}
          </label>
          <input
            id="fileInput"
            type="file"
            style={{ display: "none" }}
            className="settingsPPInput"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        <label>Username</label>
        <input type="text" placeholder={userInfo.username} name="name"  onChange={(e) => setUsername(e.target.value)}/>
        <label>Email</label>
        <input type="email" placeholder={userInfo.email} name="email"  onChange={(e) => setEmail(e.target.value)}/>
        <label>Phone</label>
        <input type="text" placeholder={userInfo.phone} name="phone"  onChange={(e) => setPhone(e.target.value)}/>
        <label>Password</label>
        <input type="password"  name="password"  onChange={(e) => setPassword(e.target.value)}/>
        <button className="settingsSubmitButton" type="submit">
          Update
        </button>
        {success && (
          <span
            style={{ color: "#82C3EC", textAlign: "center", marginTop: "20px" }}
          >
            Profile has been updated...
          </span>
        )}
      </form>
    </div>
  </div>
  </>
  )
}

export default Profile