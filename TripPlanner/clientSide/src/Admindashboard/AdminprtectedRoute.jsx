import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
const AdminprtectedRoute = () => {
   var userlogined = JSON.parse(window.localStorage.getItem("loginedAdminIn"));
   
 return userlogined === true ? <Outlet/>:<Navigate to={'/loginregister'}></Navigate>
  
}

export default AdminprtectedRoute
