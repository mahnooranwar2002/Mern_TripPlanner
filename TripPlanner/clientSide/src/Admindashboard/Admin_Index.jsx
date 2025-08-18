
import React, { useState } from "react";
import Sidebarr from "./Sidebarr";
import Headerdashboard from "./Headerdashboard";
import { ToastContainer } from "react-toastify";
import "../../src/assets/css/dashboard.css";
const Admin_Index = () => {
     const [isOpen, setIsOpen] = useState(true);
  const toggleSidebar = () => setIsOpen(!isOpen);
  return (
    <div>
        <Sidebarr isOpen={isOpen} />
      <div >
        <Headerdashboard toggleSidebar={toggleSidebar} />
        <div >
       {/* sidebar and nvabr */}
        </div>
      </div>
      <ToastContainer></ToastContainer>
    </div>
  )
}

export default Admin_Index
