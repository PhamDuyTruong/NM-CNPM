import React from 'react';
import "./admin.css";
import AdminHeader from '../../Components/Admin/AdminHeader';
import AdminSidebar from '../../Components/Admin/AdminSidebar'


function AdminLayout({children}) {
  return (
    <div className='adminpage'>
        <AdminSidebar />
        <div className='headerAndContent'>
            <AdminHeader />
            {children}
        </div>
    </div>
  )
}

export default AdminLayout