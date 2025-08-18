import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const UserprotectedRoutes = () => {
 var userlogined = JSON.parse(window.localStorage.getItem("loginedIn"));
   
 return userlogined === true ? <Outlet/>:<Navigate to={'/loginregister'}></Navigate>
  
  
}

export default UserprotectedRoutes
