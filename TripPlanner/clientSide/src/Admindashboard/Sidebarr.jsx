import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import { FaTachometerAlt, FaUsers, FaBox, FaCog } from "react-icons/fa";
import { CiCalculator2 } from "react-icons/ci";
import { MdLogout } from "react-icons/md";
import { IoPeopleSharp } from "react-icons/io5";
import { BiGridAlt,BiTrip } from "react-icons/bi";
import { RiRoadMapFill } from "react-icons/ri";
import { FaPhoneAlt } from "react-icons/fa";
import { FaQuestionCircle } from "react-icons/fa";
const Sidebarr= ({ isOpen }) => {
  return (
<div className={`sidebar-container ${isOpen ? "open" : "collapsed"}`}>
      <div className="sidebar-header">
        <h2 className="brand">{isOpen ? "Nexus Admin" : "NA"}</h2>
      </div>

      <ul className="sidebar-menu">
        <li>
          <Link to="/admindashboard" className="menu-link">
            <FaTachometerAlt className="menu-icon" />
            {isOpen && <span>Dashboard</span>}
          </Link>
        </li>
        <li>
          <Link to="/userTables" className="menu-link">
            <IoPeopleSharp   className="menu-icon" />
            {isOpen && <span>Users Details</span>}
          </Link>
        </li>
        
        
        <li>
          <Link to="/destinationTables" className="menu-link">
            <RiRoadMapFill  className="menu-icon" />
            {isOpen && <span> Destination</span>}
          </Link>
        </li>
    <li className='w-100'>
          <Link to="/Faqs" className="menu-link">
            <FaQuestionCircle  className="menu-icon" />
            {isOpen && <span>FAQ</span>}
          </Link>
        </li>
    <li>
          <Link to="/contact" className="menu-link">
            <FaPhoneAlt  className="menu-icon" />
            {isOpen && <span>Contact</span>}
          </Link>
        </li>
      </ul>
    </div>  )
}

export default Sidebarr