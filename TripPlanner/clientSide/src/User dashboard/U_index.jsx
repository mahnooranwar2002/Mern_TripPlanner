
import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { ToastContainer } from "react-toastify";
import "../../src/assets/css/dashboard.css";
const U_index = () => {
     const [isOpen, setIsOpen] = useState(true);
  const toggleSidebar = () => setIsOpen(!isOpen);
  return (
    <div>
        <Sidebar isOpen={isOpen} />
      <div >
        <Topbar toggleSidebar={toggleSidebar} />
        <div >
       {/* sidebar and nvabr */}
        </div>
      </div>
      <ToastContainer></ToastContainer>
    </div>
  )
}

export default U_index
