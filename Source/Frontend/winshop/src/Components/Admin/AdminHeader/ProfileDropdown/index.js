import React from 'react';
import "./ProfileDropdown.css";
import {Link} from 'react-router-dom'

function ProfileDropdown() {
  return (
    <>
    <div className="dropdown-avatar">
      <div>
        <Link to="/profile" style={{textDecoration: "none"}}> Profile</Link>
      </div>
      <div>
        <Link to="/logout" style={{textDecoration: "none"}}> Log out</Link>
      </div>
    </div>
  </>
  )
}

export default ProfileDropdown