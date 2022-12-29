import React from 'react';
import "./admin.css";
import AdminHeader from '../../Components/Admin/AdminHeader';
import AdminSidebar from '../../Components/Admin/AdminSidebar';
import {useSelector} from 'react-redux'


function AdminLayout({children}) {
  
  const {darkTheme} = useSelector((state) => state.sidebar);
  const ThemeInLocal = JSON.parse(localStorage.getItem("theme"))
  let isTheme = darkTheme;
  if(!darkTheme){
      isTheme = ThemeInLocal
  }

  return (
    <div className='adminpage' style={{overflowX: "hidden", background: `${isTheme ? "#1A120B" : ""}`, color: `${isTheme ? "#fff" : ""}` }}>
        <AdminSidebar />
        <div className='headerAndContent'>
            <AdminHeader />
            {children}
        </div>
    </div>
  )
}

export default AdminLayout