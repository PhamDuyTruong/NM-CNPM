import React from 'react';
import "./styles.css";
import {useHistory} from 'react-router-dom'
import bgSignin from '../../assets/images/bgsignin.jpg'

function Signin() {
    const history = useHistory();
    const handleCreateOne = () => {
        history.push("/sign-up")
    }
  return (
    <div className="SignIn">
     
    <div className="signin-label">
      <div className="label_img">
        <img className="label_img" src={bgSignin} alt="WinShop"/>
      </div>
      
    </div>
    <form className="signin-form">
      <input className="username" type="text" placeholder="User Name"/> 
      <input className="password" type="password" placeholder="Password"/> 
      <button className="signin-btn btnSignIn" type="submit">Sign In</button>
      <a className="forgot_password" href="#">Forgotten password?</a>
      <hr/>
      <button className="signin-btn btnCreateNew" onClick={handleCreateOne}>Create New Account</button>
    </form>
  </div>
  )
}

export default Signin